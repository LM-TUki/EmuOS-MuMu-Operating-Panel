
import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, RefreshCw, Terminal, Activity, QrCode, Wifi, AlertCircle } from 'lucide-react';

export const ConsoleView: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [botStatus, setBotStatus] = useState<'stopped' | 'starting' | 'running'>('stopped');
  const [napcatStatus, setNapcatStatus] = useState<'stopped' | 'starting' | 'running'>('stopped');
  const logEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (text: string, type: 'info' | 'success' | 'error' | 'emu' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    let colorClass = 'text-gray-400';
    if (type === 'success') colorClass = 'text-green-400';
    if (type === 'error') colorClass = 'text-red-400';
    if (type === 'emu') colorClass = 'text-emu-300';

    setLogs(prev => [...prev, `<span class="text-gray-600">[${timestamp}]</span> <span class="${colorClass}">${text}</span>`]);
  };

  const handleStart = () => {
    if (isRunning) {
      // Stop logic simulation
      setIsRunning(false);
      setBotStatus('stopped');
      setNapcatStatus('stopped');
      addLog('正在停止所有服务...', 'error');
      setTimeout(() => addLog('服务已停止。', 'emu'), 1000);
      return;
    }

    // Start logic simulation
    setIsRunning(true);
    setLogs([]); // Clear logs
    
    addLog('正在启动 MuMu 全家桶...', 'emu');
    
    // Step 1: Start NapCat
    setNapcatStatus('starting');
    setTimeout(() => {
        addLog('正在启动 NapCat (OneBot V11)...');
        setTimeout(() => {
            setNapcatStatus('running');
            addLog('NapCat 启动成功！监听端口: 8080', 'success');
            addLog('请扫描右侧二维码登录 QQ (模拟)', 'info');
            
            // Step 2: Start Bot
            setBotStatus('starting');
            setTimeout(() => {
                addLog('正在加载 MuMu 核心 (Python)...');
                addLog('加载配置文件: config.toml');
                addLog('加载模型配置: config/model_config.toml');
                setTimeout(() => {
                    setBotStatus('running');
                    addLog('OneBot 连接成功！', 'success');
                    addLog('✨ MuMu 已经准备好在舞台上闪耀啦！', 'emu');
                }, 2000);
            }, 1500);

        }, 1500);
    }, 500);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
        
      {/* Top Status Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-5 rounded-2xl border transition-all ${botStatus === 'running' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${botStatus === 'running' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    <Activity size={20}/>
                </div>
                <div>
                    <div className="text-xs text-gray-500 font-bold uppercase">MuMu Core</div>
                    <div className={`font-bold ${botStatus === 'running' ? 'text-green-700' : 'text-gray-700'}`}>
                        {botStatus === 'running' ? '运行中' : botStatus === 'starting' ? '启动中...' : '已停止'}
                    </div>
                </div>
            </div>
        </div>

        <div className={`p-5 rounded-2xl border transition-all ${napcatStatus === 'running' ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${napcatStatus === 'running' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                    <Wifi size={20}/>
                </div>
                <div>
                    <div className="text-xs text-gray-500 font-bold uppercase">NapCat / QQ</div>
                    <div className={`font-bold ${napcatStatus === 'running' ? 'text-blue-700' : 'text-gray-700'}`}>
                        {napcatStatus === 'running' ? '在线' : napcatStatus === 'starting' ? '连接中...' : '离线'}
                    </div>
                </div>
            </div>
        </div>

        <button 
            onClick={handleStart}
            className={`relative overflow-hidden p-5 rounded-2xl border transition-all shadow-md group active:scale-95 flex items-center justify-center gap-3 text-xl font-bold text-white
            ${isRunning 
                ? 'bg-red-500 hover:bg-red-600 border-red-600' 
                : 'bg-gradient-to-r from-emu-400 to-emu-500 hover:from-emu-500 hover:to-emu-600 border-emu-600'}`}
        >
            {isRunning ? <Square fill="currentColor" /> : <Play fill="currentColor" />}
            {isRunning ? '停止运行' : '启动 MuMu'}
            {!isRunning && <span className="absolute right-0 top-0 p-2 opacity-20 group-hover:scale-125 transition-transform"><Play size={60} /></span>}
        </button>
      </div>

      {/* Main Dashboard Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        
        {/* Terminal */}
        <div className="lg:col-span-2 bg-gray-900 rounded-3xl p-4 flex flex-col shadow-xl border border-gray-800 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2 px-2">
                <Terminal size={16} className="text-gray-500"/>
                <span className="text-xs text-gray-400 font-mono">mumu-console --v1.0</span>
                <div className="flex-1"></div>
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                </div>
            </div>
            <div className="flex-1 bg-black/50 rounded-xl p-4 font-mono text-sm overflow-y-auto custom-scrollbar border border-white/5 shadow-inner">
                {logs.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-gray-600 opacity-50">
                        <Terminal size={48} className="mb-2"/>
                        <p>等待指令...</p>
                    </div>
                )}
                {logs.map((log, i) => (
                    <div key={i} className="mb-1 break-all" dangerouslySetInnerHTML={{ __html: log }} />
                ))}
                <div ref={logEndRef} />
            </div>
        </div>

        {/* QR Code / Info Panel */}
        <div className="bg-white rounded-3xl p-6 border border-emu-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-wonder-300 to-emu-400"></div>
            
            {napcatStatus === 'running' ? (
                <div className="animate-fade-in flex flex-col items-center">
                    <div className="bg-white p-2 rounded-xl shadow-lg border border-gray-100 mb-4">
                        {/* Mock QR Code visual */}
                        <div className="w-48 h-48 bg-gray-900 rounded-lg flex flex-wrap content-center justify-center p-2 gap-1 opacity-80">
                             {/* Just a pattern to look like a QR */}
                             <div className="w-full h-full bg-white grid grid-cols-6 gap-1 p-1">
                                {[...Array(36)].map((_,i) => (
                                    <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`}></div>
                                ))}
                             </div>
                        </div>
                    </div>
                    <p className="text-sm font-bold text-gray-600 mb-1">请使用手机 QQ 扫码</p>
                    <p className="text-xs text-gray-400">等待连接中...</p>
                </div>
            ) : (
                <div className="flex flex-col items-center text-gray-400">
                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                        <QrCode size={48} />
                    </div>
                    <p className="text-sm font-medium">启动后在此处显示登录二维码</p>
                </div>
            )}

            <div className="mt-auto w-full pt-6 border-t border-gray-100">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-left">
                    <div className="flex items-center gap-2 text-yellow-700 font-bold text-xs mb-1">
                        <AlertCircle size={12}/> 注意事项
                    </div>
                    <p className="text-[10px] text-yellow-800 leading-tight">
                        当前为<span className="font-bold">网页演示模式</span>。
                        在真实的桌面版应用中，点击启动将自动调起本地的 Python 进程和 NapCat 客户端。
                    </p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
