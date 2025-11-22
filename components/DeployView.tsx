
import React, { useState, useRef } from 'react';
import { AppState } from '../data/types';
import { INITIAL_STATE } from '../data/constants';
import { generateGeneralToml, generateModelToml } from '../utils/tomlGenerator';
import { Copy, Check, Rocket, FolderOpen, FileText, Save, Upload, Settings, HelpCircle, AlertTriangle } from 'lucide-react';

interface DeployViewProps {
  config: AppState;
  setConfig?: React.Dispatch<React.SetStateAction<AppState>>; // Optional for import
}

export const DeployView: React.FC<DeployViewProps> = ({ config, setConfig }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [coreVersion, setCoreVersion] = useState("6.25.0");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generalToml = generateGeneralToml(config, coreVersion);
  const modelToml = generateModelToml(config);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Export Project (JSON)
  const handleExportJson = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `mumu_project_${config.bot.nickname}_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import Project (JSON) with Safe Merge
  const handleImportJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result as string;
        const parsedConfig = JSON.parse(result);
        
        if (setConfig && parsedConfig.bot && parsedConfig.tasks) {
            // SAFE MERGE LOGIC
            const safeConfig: AppState = {
                ...INITIAL_STATE,
                ...parsedConfig,
                bot: {
                    ...INITIAL_STATE.bot,
                    ...parsedConfig.bot
                },
                tasks: {
                    ...INITIAL_STATE.tasks,
                    ...parsedConfig.tasks
                },
                models: parsedConfig.models || INITIAL_STATE.models,
                providers: parsedConfig.providers || INITIAL_STATE.providers
            };

            setConfig(safeConfig);
            alert(`成功读取工程存档！\n昵称: ${safeConfig.bot.nickname}\n已自动补全缺失的新版配置项。`);
        } else {
            alert("这个文件好像不是 MuMu 的工程文件 (.json) 哦...\n请不要导入 config.toml");
        }
      } catch (err) {
        alert("文件解析失败: " + err);
      }
    };
    reader.readAsText(file);
    event.target.value = ''; 
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emu-500 to-emu-600 p-8 rounded-3xl text-white shadow-lg shadow-emu-200 dark:shadow-none">
        <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-full">
                <Rocket size={32} />
            </div>
            <div>
                <h2 className="text-3xl font-bold">部署中心</h2>
                <p className="text-emu-100">导出配置文件，或备份整个 MuMu 工程。</p>
            </div>
        </div>
      </div>

      {/* Project Management (Backup/Restore) */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-emu-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Settings className="text-gray-500" /> 工程管理与兼容性
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Version Selector */}
              <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-700 flex flex-col justify-between">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                        目标内核版本 (Core Version)
                    </label>
                    <div className="flex items-center gap-3 mb-2">
                        <select 
                            value={coreVersion} 
                            onChange={(e) => setCoreVersion(e.target.value)}
                            className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-slate-600 focus:border-emu-400 outline-none bg-white dark:bg-slate-800 dark:text-white font-mono text-sm"
                        >
                            <option value="6.25.0">MuMu Core v6.25 (Stable)</option>
                            <option value="7.0.0-beta">MuMu Core v7.0 (Preview)</option>
                            <option value="5.0.0">Legacy v5.x</option>
                        </select>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 leading-tight flex gap-1">
                      <AlertTriangle size={12} className="mt-0.5"/>
                      切换版本会调整生成格式，但不会修改您填写的设定。
                  </div>
              </div>

              {/* Import / Export */}
              <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <button 
                        onClick={handleExportJson}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 font-bold hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors"
                    >
                        <Save size={18} />
                        备份工程 (.json)
                    </button>
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 font-bold hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors relative"
                    >
                        <Upload size={18} />
                        导入工程
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleImportJson} 
                            accept=".json" 
                            className="absolute inset-0 opacity-0 cursor-pointer" 
                        />
                    </button>
                  </div>
                  <div className="text-[10px] text-gray-400 text-center">
                      * 导入功能拥有「安全合并」机制，旧存档导入不会覆盖新功能的默认值。
                  </div>
              </div>
          </div>
          
          {/* FAQ / Help Box */}
          <div className="mt-6 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/50 text-sm text-blue-900 dark:text-blue-200">
              <h4 className="font-bold flex items-center gap-2 mb-2">
                  <HelpCircle size={16}/> 关于工程文件 (.json)
              </h4>
              <ul className="list-disc list-inside space-y-1 opacity-80 text-xs">
                  <li><b>它是存档：</b> 包含您在网页上填写的所有人设、Key、模型配置。建议每次修改后都下载备份。</li>
                  <li><b>不是配置文件：</b> 机器人无法直接读取它。您需要点击下方的“复制”按钮，把生成的代码写入机器人的文件。</li>
                  <li><b>兼容性：</b> 即使导入了半年前的存档，新版本增加的功能（如情绪系统）会自动使用默认值填补，您可以继续编辑。</li>
              </ul>
          </div>
      </div>

      {/* Generated Configs */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* General Config */}
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 p-3 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
                <FileText className="text-emu-500" />
                <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">根目录 /</div>
                    <div className="font-bold">config.toml</div>
                </div>
                <div className="flex-1"></div>
                <button 
                    onClick={() => handleCopy(generalToml, 'general')}
                    className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                        copied === 'general' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-emu-50 text-emu-600 dark:bg-emu-900/30 dark:text-emu-300 hover:bg-emu-100 dark:hover:bg-emu-900/50'
                    }`}
                >
                    {copied === 'general' ? <Check size={16} /> : <Copy size={16} />}
                    {copied === 'general' ? '已复制' : '复制代码'}
                </button>
            </div>
            
            <div className="bg-gray-900 rounded-2xl p-4 overflow-hidden shadow-lg border border-gray-800 relative group">
                <div className="absolute top-0 left-0 w-full h-8 bg-gray-800 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-400 ml-2 font-mono">config.toml (v{coreVersion})</span>
                </div>
                <pre className="text-xs md:text-sm text-gray-300 font-mono overflow-x-auto p-2 pt-6 max-h-[500px] custom-scrollbar">
                    {generalToml}
                </pre>
            </div>
            <p className="text-xs text-gray-500 px-2">
                * 这个文件包含了 MuMu 的昵称、性格、回复风格以及连接设置。请直接覆盖根目录下的同名文件。
            </p>
        </div>

        {/* Model Config */}
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 p-3 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
                <FolderOpen className="text-blue-500" />
                <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">config 文件夹 /</div>
                    <div className="font-bold">model_config.toml</div>
                </div>
                <div className="flex-1"></div>
                <button 
                    onClick={() => handleCopy(modelToml, 'model')}
                    className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                        copied === 'model' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50'
                    }`}
                >
                    {copied === 'model' ? <Check size={16} /> : <Copy size={16} />}
                    {copied === 'model' ? '已复制' : '复制代码'}
                </button>
            </div>

            <div className="bg-gray-900 rounded-2xl p-4 overflow-hidden shadow-lg border border-gray-800 relative group">
                <div className="absolute top-0 left-0 w-full h-8 bg-gray-800 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                     <span className="text-xs text-gray-400 ml-2 font-mono">config/model_config.toml</span>
                </div>
                <pre className="text-xs md:text-sm text-gray-300 font-mono overflow-x-auto p-2 pt-6 max-h-[500px] custom-scrollbar">
                    {modelToml}
                </pre>
            </div>
            <p className="text-xs text-gray-500 px-2">
                * 这个文件定义了 MuMu 使用哪个大脑（API Key 和 模型设置）。请放在 config 文件夹内。
            </p>
        </div>
      </div>
    </div>
  );
};
