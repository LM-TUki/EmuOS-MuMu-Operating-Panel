import React, { useState } from 'react';
import { ModelDef, TaskConfig, ApiProvider } from '../types';
import { TASK_DESCRIPTIONS, TASK_GROUPS } from '../constants';
import { Plug, Server, Brain, ChevronDown, ChevronUp, List, Rocket, Info, ExternalLink, BookOpen, Zap } from 'lucide-react';

interface ModelsViewProps {
  providers: ApiProvider[];
  models: ModelDef[];
  tasks: TaskConfig;
  updateProvider: (index: number, field: keyof ApiProvider, value: any) => void;
  updateModel: (index: number, field: keyof ModelDef, value: any) => void;
  updateTask: (taskName: string, field: string, value: any) => void;
}

export const ModelsView: React.FC<ModelsViewProps> = ({ providers, models, tasks, updateProvider, updateModel, updateTask }) => {
  const [activeTab, setActiveTab] = useState<'connections' | 'library' | 'tasks'>('tasks');
  const [openCategories, setOpenCategories] = useState<string[]>(['core']);
  const [showWiki, setShowWiki] = useState(false);

  const toggleCategory = (id: string) => {
      setOpenCategories(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const handleModelListChange = (taskName: string, value: string) => {
    const list = value.split(/[\n,]/).map(s => s.trim()).filter(Boolean);
    updateTask(taskName, 'model_list', list);
  };

  const addModelToTask = (taskName: string, modelName: string) => {
    const currentList = tasks[taskName].model_list;
    if (!currentList.includes(modelName)) {
        updateTask(taskName, 'model_list', [modelName, ...currentList]);
    } else {
        const newList = [modelName, ...currentList.filter(m => m !== modelName)];
        updateTask(taskName, 'model_list', newList);
    }
  };

  const applyPreset = (type: 'economy' | 'value' | 'performance') => {
      let presetConfig: Record<string, string[]> = {};

      if (type === 'economy') {
          // 全免费 / 低成本
          presetConfig = {
              replyer: ["SF-Qwen2.5-7B (免费)", "GLM-4-Flash (免费)"],
              planner: ["SF-Qwen2.5-72B", "SF-Qwen2.5-7B (免费)"],
              tool_use: ["SF-Qwen2.5-72B", "GLM-4-Flash (免费)"],
              vlm: ["GLM-4V-Flash (免费)"],
              utils: ["SF-Qwen2.5-7B (免费)"],
              utils_small: ["SF-Qwen2.5-7B (免费)"]
          };
      } else if (type === 'value') {
          // 性价比 (DeepSeek V3 主力)
          presetConfig = {
              replyer: ["SF-DeepSeek-V3", "DeepSeek-V3", "GPT-4o-mini"],
              planner: ["SF-DeepSeek-R1", "DeepSeek-R1", "SF-DeepSeek-V3"],
              tool_use: ["SF-DeepSeek-V3", "GPT-4o"],
              vlm: ["GPT-4o", "GLM-4V-Flash (免费)"],
              utils: ["SF-Qwen2.5-7B (免费)"],
              utils_small: ["GLM-4-Flash (免费)"]
          };
      } else if (type === 'performance') {
          // 高性能 (R1 / GPT-4o)
          presetConfig = {
              replyer: ["GPT-4o", "SF-DeepSeek-V3", "DeepSeek-V3"],
              planner: ["OpenAI-o1", "DeepSeek-R1", "SF-DeepSeek-R1"],
              tool_use: ["GPT-4o", "DeepSeek-V3"],
              vlm: ["GPT-4o", "Gemini-1.5-Pro"],
              utils: ["GPT-4o-mini"],
              utils_small: ["GPT-4o-mini"]
          };
      }

      // Apply the changes
      Object.entries(presetConfig).forEach(([task, list]) => {
          updateTask(task, 'model_list', list);
      });

      alert(`已应用【${type === 'economy' ? '省钱' : type === 'value' ? '性价比' : '高性能'}】预设方案！\n请检查各任务的模型列表。`);
  };

  const getProviderGuide = (name: string) => {
      if (name.includes("DeepSeek")) return { url: "https://platform.deepseek.com/api_keys", text: "登录 DeepSeek 开放平台 -> API Keys -> 创建 API Key" };
      if (name.includes("OpenAI")) return { url: "https://platform.openai.com/api-keys", text: "登录 OpenAI Platform -> Dashboard -> API Keys" };
      if (name.includes("SiliconFlow")) return { url: "https://cloud.siliconflow.cn/account/ak", text: "登录硅基流动 -> 账号管理 -> API 密钥 (推荐，送 14 元额度)" };
      if (name.includes("Google")) return { url: "https://aistudio.google.com/app/apikey", text: "登录 Google AI Studio -> Get API Key (需魔法)" };
      if (name.includes("Kimi")) return { url: "https://platform.moonshot.cn/console/api-keys", text: "登录 Moonshot 开放平台 -> API Key 管理" };
      if (name.includes("Zhipu")) return { url: "https://open.bigmodel.cn/usercenter/apikeys", text: "登录智谱 AI 开放平台 -> 查看 API Key" };
      return { url: "", text: "请前往对应的官方网站获取 API Key" };
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Sub-Navigation */}
      <div className="flex flex-wrap gap-2 p-1 bg-white/50 dark:bg-slate-800/50 backdrop-blur rounded-2xl border border-emu-100 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('connections')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all text-sm font-bold ${
                activeTab === 'connections' 
                ? 'bg-blue-500 text-white shadow-md shadow-blue-200 dark:shadow-none' 
                : 'text-gray-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-blue-600'
            }`}
          >
              <Plug size={16} />
              1. 连接管理 (API)
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all text-sm font-bold ${
                activeTab === 'library' 
                ? 'bg-purple-500 text-white shadow-md shadow-purple-200 dark:shadow-none' 
                : 'text-gray-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-purple-600'
            }`}
          >
              <Server size={16} />
              2. 模型库
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all text-sm font-bold ${
                activeTab === 'tasks' 
                ? 'bg-emu-500 text-white shadow-md shadow-emu-200 dark:shadow-none' 
                : 'text-gray-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-emu-600'
            }`}
          >
              <Brain size={16} />
              3. 任务分配
          </button>
      </div>

      {/* TAB 1: API CONNECTIONS */}
      {activeTab === 'connections' && (
          <div className="space-y-6">
               <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 p-4 rounded-r-xl">
                  <h3 className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2"><Info size={18}/> 温馨提示</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">请在此填入您的 API Key。MuMu 通过 OpenAI 兼容协议连接所有服务商，因此 Base URL 必须以 `/v1` 结尾 (Google 除外)。</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {providers.map((provider, idx) => {
                       const guide = getProviderGuide(provider.name);
                       return (
                       <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group">
                           <div className="flex items-center gap-3 mb-4">
                               <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold">
                                   {provider.name.charAt(0)}
                               </div>
                               <div className="font-bold text-lg text-gray-800 dark:text-white">{provider.name}</div>
                           </div>
                           
                           <div className="space-y-3">
                               <div>
                                   <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-1">Base URL (接口地址)</label>
                                   <input 
                                        type="text" 
                                        value={provider.base_url}
                                        onChange={(e) => updateProvider(idx, 'base_url', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-600 text-xs font-mono bg-gray-50 dark:bg-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-blue-400 outline-none transition-all"
                                   />
                               </div>
                               <div>
                                   <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-1 flex justify-between">
                                       <span>API Key (连接密钥)</span>
                                       {guide.url && (
                                            <a href={guide.url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                                                获取 Key <ExternalLink size={10}/>
                                            </a>
                                       )}
                                   </label>
                                   <div className="relative">
                                        <input 
                                                type="password" 
                                                value={provider.api_key}
                                                onChange={(e) => updateProvider(idx, 'api_key', e.target.value)}
                                                placeholder={provider.api_key ? "已隐藏" : "sk-..."}
                                                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-600 text-xs font-mono bg-gray-50 dark:bg-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:border-blue-400 outline-none transition-all"
                                        />
                                   </div>
                                   <p className="text-[10px] text-gray-400 mt-1 ml-1">
                                       {guide.text}
                                   </p>
                               </div>
                           </div>
                       </div>
                   )})}
               </div>
          </div>
      )}

      {/* TAB 2: MODEL LIBRARY */}
      {activeTab === 'library' && (
          <div className="space-y-6">
              
              {/* Model Wiki Toggle */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl border border-purple-100 dark:border-purple-900/30 shadow-sm overflow-hidden">
                   <button 
                        onClick={() => setShowWiki(!showWiki)}
                        className="w-full flex items-center justify-between p-5 bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
                   >
                       <div className="flex items-center gap-3 font-bold">
                           <BookOpen size={20}/>
                           模型百科：如果不清楚选什么模型，点我看介绍
                       </div>
                       {showWiki ? <ChevronUp/> : <ChevronDown/>}
                   </button>
                   
                   {showWiki && (
                       <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-slate-800 text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                            <div>
                                <h4 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2"><Zap size={16} className="text-yellow-500"/> DeepSeek R1 (推理模型)</h4>
                                <p className="mb-4">
                                    国产最强推理模型。特点是<b>会思考 (Chain of Thought)</b>，在回答前会进行长逻辑推演。
                                    <br/><b>适用：</b> 规划任务 (Planner)、复杂逻辑判断、写代码。
                                    <br/><b>缺点：</b> 速度较慢，不适合做闲聊回复 (Replyer)。
                                </p>
                                
                                <h4 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2"><Zap size={16} className="text-blue-500"/> DeepSeek V3 (全能模型)</h4>
                                <p className="mb-4">
                                    性价比之王。智商接近 GPT-4，但价格极低（甚至免费）。
                                    <br/><b>适用：</b> 回复生成 (Replyer)、日常工具调用、所有通用任务。
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2"><Zap size={16} className="text-green-500"/> GPT-4o / 4o-mini</h4>
                                <p className="mb-4">
                                    OpenAI 的旗舰。由于连接不稳定且昂贵，通常作为<b>备用</b>或<b>视觉识别 (Vision)</b> 的首选，因为它的看图能力目前仍是顶尖。
                                </p>

                                <h4 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2"><Zap size={16} className="text-orange-500"/> Qwen 2.5 / GLM-4 (开源/免费)</h4>
                                <p>
                                    处理简单杂活的神器。硅基流动等平台提供免费版。
                                    <br/><b>适用：</b> 提取信息、格式化文本等不需要高智商但消耗量大的任务 (Utils)。
                                </p>
                            </div>
                       </div>
                   )}
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">可用模型清单</h2>
                  <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
                      这里定义了 MuMu “认识”的所有模型。如果使用了 DeepSeek-R1 或 OpenAI-o1 等支持思考的模型，请务必开启“思考模式”。
                  </p>

                  <div className="space-y-3">
                      {models.map((model, idx) => (
                          <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 gap-4 hover:border-purple-200 dark:hover:border-purple-800 transition-colors">
                              <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                      <input 
                                        type="text" 
                                        value={model.name} 
                                        onChange={(e) => updateModel(idx, 'name', e.target.value)}
                                        className="font-bold text-gray-800 dark:text-white bg-transparent border-b border-transparent hover:border-gray-300 dark:hover:border-slate-600 outline-none w-full md:w-auto transition-all focus:border-purple-400"
                                      />
                                      <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-slate-800 rounded-md text-gray-600 dark:text-gray-400">{model.api_provider_name}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                      <span className="text-xs font-mono text-gray-400">ID:</span>
                                      <input 
                                        type="text" 
                                        value={model.model_identifier} 
                                        onChange={(e) => updateModel(idx, 'model_identifier', e.target.value)}
                                        className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-transparent w-full md:w-64 outline-none hover:text-gray-700 dark:hover:text-gray-200"
                                      />
                                  </div>
                              </div>

                              <div className="flex items-center gap-4">
                                  <div className="flex flex-col items-end">
                                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">思考模式</label>
                                      <button 
                                        onClick={() => updateModel(idx, 'enable_thinking', !model.enable_thinking)}
                                        className={`relative w-10 h-6 rounded-full transition-colors duration-200 ease-in-out ${model.enable_thinking ? 'bg-purple-500 shadow-lg shadow-purple-200 dark:shadow-none' : 'bg-gray-300 dark:bg-slate-700'}`}
                                      >
                                          <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform ${model.enable_thinking ? 'translate-x-4' : 'translate-x-0'}`} />
                                      </button>
                                  </div>
                                  <div className="flex flex-col items-end min-w-[80px]">
                                       <span className="text-xs text-gray-500 dark:text-gray-400">输入: ¥{model.price_in}</span>
                                       <span className="text-xs text-gray-500 dark:text-gray-400">输出: ¥{model.price_out}</span>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      )}

      {/* TAB 3: TASK CONFIGURATION */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
            {/* Presets */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-emu-100 dark:border-slate-700 mb-8">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <Rocket className="text-emu-500" size={20} /> 快速预设方案
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button onClick={() => applyPreset('economy')} className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl text-center hover:bg-green-100 dark:hover:bg-green-900/40 hover:scale-105 transition-all cursor-pointer group">
                        <div className="font-bold text-green-700 dark:text-green-400 mb-1 group-hover:text-green-800">省钱模式</div>
                        <p className="text-xs text-green-600 dark:text-green-500">全免费 / 低价模型</p>
                    </button>
                    <button onClick={() => applyPreset('value')} className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl text-center hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:scale-105 transition-all cursor-pointer group">
                        <div className="font-bold text-blue-700 dark:text-blue-400 mb-1 group-hover:text-blue-800">性价比模式</div>
                        <p className="text-xs text-blue-600 dark:text-blue-500">DeepSeek V3 主力</p>
                    </button>
                    <button onClick={() => applyPreset('performance')} className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl text-center hover:bg-purple-100 dark:hover:bg-purple-900/40 hover:scale-105 transition-all cursor-pointer group">
                        <div className="font-bold text-purple-700 dark:text-purple-400 mb-1 group-hover:text-purple-800">高性能模式</div>
                        <p className="text-xs text-purple-600 dark:text-purple-500">启用 R1 / GPT-4o</p>
                    </button>
                </div>
            </div>

            {/* Categories */}
            {TASK_GROUPS.map(group => (
                <div key={group.id} className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
                    <button 
                        onClick={() => toggleCategory(group.id)}
                        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-left"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl ${openCategories.includes(group.id) ? 'bg-emu-500 text-white shadow-lg shadow-emu-200 dark:shadow-none' : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400'} transition-all`}>
                                <group.icon size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{group.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-slate-400">{group.description}</p>
                            </div>
                        </div>
                        {openCategories.includes(group.id) ? <ChevronUp className="text-gray-400"/> : <ChevronDown className="text-gray-400"/>}
                    </button>

                    {openCategories.includes(group.id) && (
                        <div className="border-t border-gray-100 dark:border-slate-700 p-6 bg-gray-50/30 dark:bg-slate-900/30 space-y-8 animate-fade-in">
                            {group.tasks.map(taskName => {
                                const config = tasks[taskName];
                                if (!config) return null; // Safety check
                                const description = TASK_DESCRIPTIONS[taskName] || "通用任务模块";

                                return (
                                    <div key={taskName} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:border-emu-200 dark:hover:border-emu-800 transition-all">
                                        <div className="mb-4">
                                            <h4 className="font-bold text-lg text-gray-700 dark:text-gray-200 capitalize flex items-center gap-2">
                                                {taskName.replace(/_/g, ' ')}
                                            </h4>
                                            <p className="text-xs text-gray-400 mt-1">{description}</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">
                                                    模型优先级 (自动回退)
                                                </label>
                                                <div className="relative group">
                                                    <List className="absolute left-3 top-3 text-gray-400 group-focus-within:text-emu-500 transition-colors" size={16} />
                                                    <input
                                                        type="text"
                                                        value={config.model_list.join(', ')}
                                                        onChange={(e) => handleModelListChange(taskName, e.target.value)}
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 focus:border-emu-400 focus:ring-4 focus:ring-emu-100 dark:focus:ring-emu-900/30 outline-none transition-all text-sm font-mono bg-gray-50 dark:bg-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800"
                                                    />
                                                </div>
                                                
                                                {/* Quick Add Chips */}
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {models.slice(0, 8).map(m => (
                                                        <button
                                                            key={m.id}
                                                            onClick={() => addModelToTask(taskName, m.name)}
                                                            className={`px-2 py-1 rounded-md text-[10px] border transition-all ${
                                                                config.model_list.includes(m.name)
                                                                ? 'bg-emu-100 dark:bg-emu-900 text-emu-600 dark:text-emu-300 border-emu-200 dark:border-emu-800 font-bold shadow-sm'
                                                                : 'bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-700'
                                                            }`}
                                                        >
                                                            {m.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Temperature</label>
                                                    <input
                                                        type="number"
                                                        step="0.1"
                                                        value={config.temperature}
                                                        onChange={(e) => updateTask(taskName, 'temperature', parseFloat(e.target.value))}
                                                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 text-sm focus:border-emu-400 outline-none transition-colors bg-white dark:bg-slate-900 dark:text-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Max Tokens</label>
                                                    <input
                                                        type="number"
                                                        step="128"
                                                        value={config.max_tokens}
                                                        onChange={(e) => updateTask(taskName, 'max_tokens', parseInt(e.target.value))}
                                                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 text-sm focus:border-emu-400 outline-none transition-colors bg-white dark:bg-slate-900 dark:text-white"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}
        </div>
      )}

    </div>
  );
};