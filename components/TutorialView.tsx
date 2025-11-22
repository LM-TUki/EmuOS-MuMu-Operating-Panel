import React, { useState } from 'react';
import { Terminal, Box, ArrowRight, Save, MessageCircle, AlertCircle, Play, ExternalLink, Download, Layers, Sparkles, FileCode, Settings, CheckCircle } from 'lucide-react';

export const TutorialView: React.FC = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-gray-200 dark:border-slate-700 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emu-50 dark:from-emu-900/20 to-transparent rounded-bl-full -mr-16 -mt-16 pointer-events-none"></div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-3 z-10 relative">
            MuMu 唤醒指南
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg font-medium z-10 relative">
           零基础？没问题。本教程将手把手教你如何从零开始唤醒可爱的 MuMu。
           <br/><span className="text-sm text-gray-400 dark:text-gray-500 font-normal">本教程适用于 Windows 和 Linux 系统。</span>
        </p>
      </div>

      {/* 流程概览 */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 gap-4">
        {[
            { id: 1, icon: Download, label: "下载环境" },
            { id: 2, icon: MessageCircle, label: "配置 QQ (NapCat)" },
            { id: 3, icon: Settings, label: "配置 MuMu (本站)" },
            { id: 4, icon: Play, label: "唤醒她" }
        ].map((item, idx) => (
            <React.Fragment key={item.id}>
                <div 
                    onClick={() => setStep(item.id)}
                    className={`flex flex-col items-center gap-2 cursor-pointer transition-all hover:scale-105 ${step === item.id ? 'text-emu-600 dark:text-emu-400 font-bold' : 'text-gray-400 dark:text-gray-500'}`}
                >
                    <div className={`p-4 rounded-2xl transition-colors ${step === item.id ? 'bg-emu-100 dark:bg-emu-900/30 text-emu-600 dark:text-emu-300 shadow-md' : 'bg-gray-50 dark:bg-slate-900'}`}>
                        <item.icon size={24}/>
                    </div>
                    <span className="text-sm">{item.id}. {item.label}</span>
                </div>
                {idx < 3 && <ArrowRight className="text-gray-200 dark:text-gray-700 hidden md:block" />}
            </React.Fragment>
        ))}
      </div>

      {/* 步骤内容切换 */}
      <div className="space-y-6">
        
        {/* Step 1: 下载环境 */}
        {step === 1 && (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm animate-fade-in">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-slate-700">
                <div className="w-10 h-10 bg-gray-900 dark:bg-gray-700 text-white rounded-xl flex items-center justify-center font-bold text-xl">1</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">准备运行环境</h3>
            </div>
            
            <div className="space-y-6 text-gray-600 dark:text-gray-300">
                <p>MuMu 是一个 Python 程序，你需要先安装 Python，并下载 MuMu 的源码。</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">A. 安装 Python</h4>
                        <p className="text-sm mb-4">MuMu 需要 Python 3.10 或更高版本。</p>
                        <a href="https://www.python.org/downloads/" target="_blank" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                            前往官网下载 <ExternalLink size={14}/>
                        </a>
                        <p className="text-xs text-gray-400 mt-2">* 安装时请务必勾选 "Add Python to PATH"</p>
                    </div>

                    <div className="p-6 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">B. 下载 MuMu 源码</h4>
                        <p className="text-sm mb-4">从 GitHub 或网盘下载最新的 MuMu 压缩包并解压。</p>
                        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-gray-300 dark:border-slate-600 font-mono text-xs text-gray-500 dark:text-gray-400">
                            解压后的目录结构应包含:<br/>
                            📁 config/<br/>
                            📄 main.py<br/>
                            📄 requirements.txt
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}

        {/* Step 2: 配置 QQ */}
        {step === 2 && (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm animate-fade-in">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-slate-700">
                 <div className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center font-bold text-xl">2</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">配置 QQ 接入端 (NapCat)</h3>
            </div>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                    MuMu 只是一个“大脑”，它需要一个“身体”来登录 QQ。我们推荐使用 <b>NapCatQQ</b>。
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                    <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3">操作步骤：</h4>
                    <ol className="list-decimal list-inside space-y-3 text-sm text-blue-900 dark:text-blue-200">
                        <li>下载并解压 <b>NapCatQQ</b> (Windows用户推荐下载 WebUI 版本)。</li>
                        <li>运行 NapCat，扫描二维码登录你的小号。</li>
                        <li>进入 NapCat 的 Web 配置界面 (通常是 <code>http://127.0.0.1:6099</code>)。</li>
                        <li>
                            <span className="font-bold">关键步骤：</span> 点击“网络配置”，添加一个 <span className="bg-white dark:bg-slate-800 px-1 rounded border border-blue-200 dark:border-blue-800">反向 WebSocket</span>。
                        </li>
                        <li>
                             在 URL 一栏填写：
                             <code className="bg-white dark:bg-slate-800 px-2 py-1 rounded border border-blue-200 dark:border-blue-800 font-mono select-all mx-1">ws://127.0.0.1:8090/onebot/v11/ws</code>
                        </li>
                        <li>保存配置。</li>
                    </ol>
                </div>
                <div className="text-xs text-gray-400 text-center">
                    * 端口 8090 是 MuMu 的默认端口，如果你修改了 MuMu 的配置，这里也要对应修改。
                </div>
            </div>
        </div>
        )}

        {/* Step 3: 填写与导出 */}
        {step === 3 && (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm animate-fade-in">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-slate-700">
                 <div className="w-10 h-10 bg-emu-500 text-white rounded-xl flex items-center justify-center font-bold text-xl">3</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">生成配置文件</h3>
            </div>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>现在，请回到本网页的左侧菜单，完成 MuMu 的设置。</p>
                
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="text-green-500 mt-1" size={18}/>
                        <div>
                            <strong className="text-gray-800 dark:text-white">设置人设：</strong> 在“身份设定”中填写 MuMu 的名字、性格。
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle className="text-green-500 mt-1" size={18}/>
                        <div>
                            <strong className="text-gray-800 dark:text-white">填入 Key：</strong> 在“思维核心”中填入你的 API Key (如 DeepSeek, OpenAI)。
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle className="text-green-500 mt-1" size={18}/>
                        <div>
                            <strong className="text-gray-800 dark:text-white">导出文件：</strong> 点击左侧“配置文件”菜单。
                        </div>
                    </div>
                </div>
                
                <div className="mt-6 p-6 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <Save size={20} className="text-emu-500"/> 如何放置文件？
                    </h4>
                    <p className="text-sm mb-4">
                        在“配置文件”页面，你会看到两段代码。请分别复制它们，覆盖 MuMu 源码目录下的文件：
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
                        <div className="bg-white dark:bg-slate-800 border-2 border-green-100 dark:border-green-900/50 p-4 rounded-xl">
                            <div className="text-gray-400 mb-1 text-xs uppercase">文件 1</div>
                            <div className="font-bold text-green-600 dark:text-green-400 mb-2">config.toml</div>
                            <p className="text-gray-500 dark:text-gray-400 text-xs">这是主配置文件，放在根目录。</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 border-2 border-blue-100 dark:border-blue-900/50 p-4 rounded-xl">
                            <div className="text-gray-400 mb-1 text-xs uppercase">文件 2</div>
                            <div className="font-bold text-blue-600 dark:text-blue-400 mb-2">config/model_config.toml</div>
                            <p className="text-gray-500 dark:text-gray-400 text-xs">这是模型配置文件，放在 config 文件夹里。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}

        {/* Step 4: 启动 */}
        {step === 4 && (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm animate-fade-in">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-slate-700">
                 <div className="w-10 h-10 bg-green-500 text-white rounded-xl flex items-center justify-center font-bold text-xl">4</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">唤醒 MuMu！</h3>
            </div>
            
            <div className="space-y-6 text-gray-600 dark:text-gray-300">
                <p>万事俱备，准备见证奇迹。</p>

                <div className="bg-gray-900 text-gray-300 font-mono p-6 rounded-2xl shadow-lg">
                    <div className="mb-4 text-xs text-gray-500">Windows PowerShell / CMD:</div>
                    
                    <div className="mb-2">
                        <span className="text-blue-400"># 1. 安装依赖 (仅第一次需要)</span><br/>
                        <span className="text-white">pip install -r requirements.txt</span>
                    </div>
                    <br/>
                    <div>
                        <span className="text-green-400"># 2. 唤醒她</span><br/>
                        <span className="text-white">python main.py</span>
                    </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-900 flex gap-3 items-start">
                    <Sparkles className="text-green-600 dark:text-green-400 mt-1" size={20} />
                    <div className="text-sm text-green-800 dark:text-green-300">
                        <p className="font-bold mb-1">如何确认成功？</p>
                        当你在控制台看到 <span className="font-mono bg-white dark:bg-slate-800 px-1 rounded">Connected to OneBot</span> 字样时，说明 MuMu 已经连接成功。
                        <br/>试着给你的 MuMu 发一句“你好”吧！
                    </div>
                </div>
            </div>
        </div>
        )}

      </div>
    </div>
  );
};