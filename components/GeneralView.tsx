
import React, { useState } from 'react';
import { BotConfig, TalkValueRule } from '../data/types';
import { Smile, Heart, Zap, Shield, AlertTriangle, MessageCircle, Clock, Book, Mic, Database, Palette, Type, Scissors, SmilePlus } from 'lucide-react';

interface GeneralViewProps {
  config: BotConfig;
  updateConfig: (key: keyof BotConfig, value: any) => void;
}

export const GeneralView: React.FC<GeneralViewProps> = ({ config, updateConfig }) => {
  const [activeSection, setActiveSection] = useState<'basic' | 'chat' | 'human' | 'advanced'>('basic');

  const handleArrayChange = (key: keyof BotConfig, value: string) => {
    const array = value.split(/[\n,]/).map(s => s.trim()).filter(s => s);
    updateConfig(key, array);
  };

  const handleStatesChange = (value: string) => {
      const array = value.split('\n').filter(s => s.trim());
      updateConfig('states', array);
  };

  const updateTalkRule = (index: number, field: keyof TalkValueRule, value: any) => {
      const newRules = [...config.talk_value_rules];
      newRules[index] = { ...newRules[index], [field]: value };
      updateConfig('talk_value_rules', newRules);
  };

  const addTalkRule = () => {
      updateConfig('talk_value_rules', [...config.talk_value_rules, { target: "", time: "00:00-23:59", value: 0.5 }]);
  };

  const removeTalkRule = (index: number) => {
      const newRules = config.talk_value_rules.filter((_, i) => i !== index);
      updateConfig('talk_value_rules', newRules);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Sub Navigation */}
      <div className="flex flex-wrap gap-2 p-1 bg-white/50 dark:bg-slate-800/50 backdrop-blur rounded-2xl border border-emu-100 dark:border-slate-700">
          {[
              { id: 'basic', label: '基础 & 身份', icon: Smile },
              { id: 'chat', label: '聊天 & 表达', icon: MessageCircle },
              { id: 'human', label: '拟人 & 情绪', icon: Heart },
              { id: 'advanced', label: '高级 & 插件', icon: Zap },
          ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm font-bold ${
                    activeSection === item.id 
                    ? 'bg-emu-500 text-white shadow-md shadow-emu-200 dark:shadow-none' 
                    : 'text-gray-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-emu-600'
                }`}
              >
                  <item.icon size={16} />
                  {item.label}
              </button>
          ))}
      </div>

      {/* SECTION 1: BASIC & IDENTITY */}
      {activeSection === 'basic' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-emu-100 dark:border-slate-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <Smile className="text-emu-500" /> 基本信息
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2 ml-1">MuMu 的昵称</label>
                        <input
                        type="text"
                        value={config.nickname}
                        onChange={(e) => updateConfig('nickname', e.target.value)}
                        className="w-full px-5 py-3 rounded-2xl border border-gray-200 dark:border-slate-600 focus:border-emu-400 focus:ring-4 focus:ring-emu-100 dark:focus:ring-emu-900/30 outline-none transition-all bg-gray-50 dark:bg-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2 ml-1">QQ账号</label>
                        <input
                        type="text"
                        value={config.qq_account}
                        onChange={(e) => updateConfig('qq_account', e.target.value)}
                        className="w-full px-5 py-3 rounded-2xl border border-gray-200 dark:border-slate-600 focus:border-emu-400 focus:ring-4 focus:ring-emu-100 dark:focus:ring-emu-900/30 outline-none transition-all bg-gray-50 dark:bg-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2 ml-1">别名列表 (对它喊什么会回应)</label>
                        <input
                        type="text"
                        value={config.alias_names.join(', ')}
                        onChange={(e) => handleArrayChange('alias_names', e.target.value)}
                        className="w-full px-5 py-3 rounded-2xl border border-gray-200 dark:border-slate-600 focus:border-emu-400 focus:ring-4 focus:ring-emu-100 dark:focus:ring-emu-900/30 outline-none transition-all bg-gray-50 dark:bg-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-blue-100 dark:border-blue-900/50 border-l-8 border-l-blue-400">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <Shield className="text-blue-500" /> 安全与权限 (白名单)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2 flex items-center gap-2">允许的群聊 (ID)</label>
                        <textarea
                            rows={3}
                            value={config.allowed_groups.join('\n')}
                            onChange={(e) => handleArrayChange('allowed_groups', e.target.value)}
                            className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-600 focus:border-blue-400 outline-none text-sm bg-gray-50 dark:bg-slate-900 dark:text-white font-mono"
                            placeholder="每行一个"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2 flex items-center gap-2">允许的私聊 (ID)</label>
                        <textarea
                            rows={3}
                            value={config.allowed_users.join('\n')}
                            onChange={(e) => handleArrayChange('allowed_users', e.target.value)}
                            className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-600 focus:border-blue-400 outline-none text-sm bg-gray-50 dark:bg-slate-900 dark:text-white font-mono"
                            placeholder="每行一个"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                            <AlertTriangle size={16}/> 违禁词过滤 (不理睬包含这些词的消息)
                        </label>
                        <input
                            type="text"
                            value={config.ban_words.join(', ')}
                            onChange={(e) => handleArrayChange('ban_words', e.target.value)}
                            className="w-full px-5 py-3 rounded-2xl border border-red-200 dark:border-red-900 focus:border-red-400 outline-none bg-red-50/30 dark:bg-red-900/20 dark:text-white"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-emu-100 dark:border-slate-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <Heart className="text-emu-500" /> 伙伴性格设定
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2 ml-1">性格描述 (他是谁？)</label>
                        <textarea
                            rows={3}
                            value={config.personality}
                            onChange={(e) => updateConfig('personality', e.target.value)}
                            className="w-full px-5 py-3 rounded-2xl border border-gray-200 dark:border-slate-600 focus:border-emu-400 outline-none bg-gray-50 dark:bg-slate-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2 ml-1">说话风格 (他怎么说话？)</label>
                        <textarea
                            rows={3}
                            value={config.reply_style}
                            onChange={(e) => updateConfig('reply_style', e.target.value)}
                            className="w-full px-5 py-3 rounded-2xl border border-gray-200 dark:border-slate-600 focus:border-emu-400 outline-none bg-gray-50 dark:bg-slate-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2 ml-1">多重状态 (States)</label>
                        <textarea
                            rows={3}
                            value={config.states.join('\n')}
                            onChange={(e) => handleStatesChange(e.target.value)}
                            className="w-full px-5 py-3 rounded-2xl border border-gray-200 dark:border-slate-600 focus:border-emu-400 outline-none bg-gray-50 dark:bg-slate-900 dark:text-white"
                            placeholder="每行一种状态描述，MuMu 会随机切换"
                        />
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">切换概率: {config.state_probability}</div>
                    </div>
                </div>
            </div>
          </div>
      )}

      {/* SECTION 2: CHAT & EXPRESSION */}
      {activeSection === 'chat' && (
          <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-emu-100 dark:border-slate-700">
                 <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <MessageCircle className="text-emu-500" /> 聊天习惯
                 </h2>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {/* Basic Switches */}
                     <div className="space-y-4">
                         <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900 rounded-2xl">
                             <div>
                                 <div className="font-bold text-gray-800 dark:text-gray-200">被叫必回</div>
                                 <div className="text-xs text-gray-500 dark:text-gray-400">别人@他时是否必须回复</div>
                             </div>
                             <input type="checkbox" checked={config.mentioned_bot_reply} onChange={(e) => updateConfig('mentioned_bot_reply', e.target.checked)} className="w-6 h-6 accent-emu-500"/>
                         </div>
                         <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-2xl">
                             <div className="font-bold text-gray-800 dark:text-gray-200 mb-2">主动插话频率 (Talk Value)</div>
                             <input type="range" min="0" max="1" step="0.05" value={config.talk_value} onChange={(e) => updateConfig('talk_value', parseFloat(e.target.value))} className="w-full accent-emu-500 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none"/>
                             <div className="text-right text-xs text-emu-600 dark:text-emu-400 font-bold mt-1">{config.talk_value}</div>
                         </div>
                         <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-2xl">
                             <div className="font-bold text-gray-800 dark:text-gray-200 mb-2">记忆长度</div>
                             <input type="number" value={config.max_context_size} onChange={(e) => updateConfig('max_context_size', parseInt(e.target.value))} className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 dark:text-white"/>
                         </div>
                     </div>

                     {/* Learning */}
                     <div className="space-y-4">
                         <h3 className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2"><Book size={16}/> 学习能力</h3>
                         <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-900">
                             <div>
                                 <div className="font-bold text-green-800 dark:text-green-300">群聊学习</div>
                                 <div className="text-xs text-green-600 dark:text-green-400">从群聊对话中学习新词汇</div>
                             </div>
                             <input type="checkbox" checked={config.enable_group_learning} onChange={(e) => updateConfig('enable_group_learning', e.target.checked)} className="w-6 h-6 accent-green-500"/>
                         </div>
                         <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-900">
                             <div>
                                 <div className="font-bold text-green-800 dark:text-green-300">私聊学习</div>
                                 <div className="text-xs text-green-600 dark:text-green-400">从私聊对话中学习</div>
                             </div>
                             <input type="checkbox" checked={config.enable_private_learning} onChange={(e) => updateConfig('enable_private_learning', e.target.checked)} className="w-6 h-6 accent-green-500"/>
                         </div>
                     </div>
                 </div>

                 {/* Time Rules */}
                 <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2"><Clock size={16}/> 分时段活跃度</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">启用</span>
                            <input type="checkbox" checked={config.enable_talk_value_rules} onChange={(e) => updateConfig('enable_talk_value_rules', e.target.checked)} className="accent-emu-500"/>
                        </div>
                    </div>
                    {config.enable_talk_value_rules && (
                        <div className="space-y-2">
                            {config.talk_value_rules.map((rule, idx) => (
                                <div key={idx} className="flex gap-2 items-center">
                                    <input 
                                        type="text" 
                                        value={rule.time} 
                                        onChange={(e) => updateTalkRule(idx, 'time', e.target.value)}
                                        className="w-32 px-3 py-2 bg-gray-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-600 text-sm font-mono text-center dark:text-white"
                                        placeholder="00:00-08:00"
                                    />
                                    <input 
                                        type="number" 
                                        step="0.1"
                                        value={rule.value}
                                        onChange={(e) => updateTalkRule(idx, 'value', parseFloat(e.target.value))}
                                        className="w-20 px-3 py-2 bg-gray-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-600 text-sm font-mono text-center dark:text-white"
                                    />
                                    <button onClick={() => removeTalkRule(idx)} className="p-2 text-red-400 hover:text-red-600">×</button>
                                </div>
                            ))}
                            <button onClick={addTalkRule} className="text-xs text-emu-500 font-bold hover:underline">+ 添加时间段</button>
                        </div>
                    )}
                 </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-emu-100 dark:border-slate-700">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <SmilePlus className="text-emu-500" /> 表情包设置 (Emoji)
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                         <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">发送表情包概率</label>
                         <input type="range" min="0" max="1" step="0.1" value={config.emoji_chance} onChange={(e) => updateConfig('emoji_chance', parseFloat(e.target.value))} className="w-full accent-yellow-500 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg"/>
                         <div className="text-right text-xs text-gray-500 dark:text-gray-400">{config.emoji_chance}</div>
                     </div>
                     <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-100 dark:border-yellow-900">
                         <div>
                             <div className="font-bold text-yellow-800 dark:text-yellow-300">偷表情</div>
                             <div className="text-xs text-yellow-600 dark:text-yellow-400">自动保存群友的表情包</div>
                         </div>
                         <input type="checkbox" checked={config.steal_emoji} onChange={(e) => updateConfig('steal_emoji', e.target.checked)} className="w-6 h-6 accent-yellow-500"/>
                     </div>
                 </div>
              </div>
          </div>
      )}

      {/* SECTION 3: HUMANIZATION & MOOD */}
      {activeSection === 'human' && (
          <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-pink-100 dark:border-pink-900/30">
                 <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <Heart className="text-pink-500" /> 情绪系统 (Mood)
                 </h2>
                 <div className="flex items-center justify-between mb-4">
                     <span className="text-gray-700 dark:text-slate-300 font-bold">启用情绪波动</span>
                     <input type="checkbox" checked={config.enable_mood} onChange={(e) => updateConfig('enable_mood', e.target.checked)} className="w-6 h-6 accent-pink-500"/>
                 </div>
                 {config.enable_mood && (
                     <div className="space-y-4 animate-fade-in">
                         <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">情绪风格描述</label>
                            <input type="text" value={config.emotion_style} onChange={(e) => updateConfig('emotion_style', e.target.value)} className="w-full px-4 py-3 rounded-2xl border border-pink-200 dark:border-pink-900 bg-pink-50 dark:bg-pink-900/20 dark:text-white text-sm"/>
                         </div>
                         <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">情绪更新阈值 (敏感度)</label>
                            <input type="number" value={config.mood_update_threshold} onChange={(e) => updateConfig('mood_update_threshold', parseFloat(e.target.value))} className="w-full px-4 py-3 rounded-2xl border border-pink-200 dark:border-pink-900 bg-pink-50 dark:bg-pink-900/20 dark:text-white text-sm"/>
                         </div>
                     </div>
                 )}
              </div>

              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-slate-700">
                 <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <Type className="text-gray-600 dark:text-gray-400" /> 拟人化设置
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border border-gray-200 dark:border-slate-600 rounded-2xl">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2"><Scissors size={16}/> 错别字模拟</div>
                            <input type="checkbox" checked={config.enable_typo} onChange={(e) => updateConfig('enable_typo', e.target.checked)} className="accent-gray-600"/>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">偶尔打错字，更像真人</p>
                        {config.enable_typo && (
                            <input type="range" min="0" max="0.1" step="0.001" value={config.typo_error_rate} onChange={(e) => updateConfig('typo_error_rate', parseFloat(e.target.value))} className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded appearance-none accent-gray-600"/>
                        )}
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-slate-600 rounded-2xl">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2"><Palette size={16}/> 长回复切分</div>
                            <input type="checkbox" checked={config.enable_splitter} onChange={(e) => updateConfig('enable_splitter', e.target.checked)} className="accent-gray-600"/>
                        </div>
                         <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">太长的回复分段发送</p>
                    </div>
                 </div>
              </div>
          </div>
      )}

      {/* SECTION 4: ADVANCED */}
      {activeSection === 'advanced' && (
          <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-purple-100 dark:border-purple-900/30">
                 <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <Database className="text-purple-500" /> 知识库与记忆 (LPMM)
                 </h2>
                 <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                     <div>
                         <div className="font-bold text-purple-800 dark:text-purple-300">启用 LPMM 知识库</div>
                         <div className="text-xs text-purple-600 dark:text-purple-400">让 MuMu 拥有长期记忆和知识检索能力</div>
                     </div>
                     <input type="checkbox" checked={config.enable_knowledge} onChange={(e) => updateConfig('enable_knowledge', e.target.checked)} className="w-6 h-6 accent-purple-500"/>
                 </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-orange-100 dark:border-orange-900/30">
                 <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <Mic className="text-orange-500" /> 语音与听觉 (ASR)
                 </h2>
                 <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl">
                     <div>
                         <div className="font-bold text-orange-800 dark:text-orange-300">启用语音识别</div>
                         <div className="text-xs text-orange-600 dark:text-orange-400">允许 MuMu 听懂语音消息 (需要配置 SenseVoice 模型)</div>
                     </div>
                     <input type="checkbox" checked={config.enable_asr} onChange={(e) => updateConfig('enable_asr', e.target.checked)} className="w-6 h-6 accent-orange-500"/>
                 </div>
              </div>

               <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-slate-700">
                 <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <Zap className="text-gray-500" /> 逻辑思维指导 (Prompt)
                 </h2>
                 <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Plan Style (思维链指导)</label>
                        <textarea
                            rows={6}
                            value={config.plan_style}
                            onChange={(e) => updateConfig('plan_style', e.target.value)}
                            className="w-full px-5 py-3 rounded-2xl border border-gray-200 dark:border-slate-600 focus:border-emu-400 outline-none bg-gray-50 dark:bg-slate-900 dark:text-white font-mono text-sm"
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">Visual Style (识图指导)</label>
                        <textarea
                            rows={3}
                            value={config.visual_style}
                            onChange={(e) => updateConfig('visual_style', e.target.value)}
                            className="w-full px-5 py-3 rounded-2xl border border-gray-200 dark:border-slate-600 focus:border-emu-400 outline-none bg-gray-50 dark:bg-slate-900 dark:text-white"
                        />
                    </div>
                 </div>
              </div>
          </div>
      )}

    </div>
  );
};
