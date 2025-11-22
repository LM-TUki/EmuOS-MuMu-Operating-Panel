import React, { useState } from 'react';
import { User, Cpu, Rocket, Sparkles, BookOpen, Moon, Sun, HeartHandshake } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Custom Taiyaki Icon SVG (Used as fallback/decoration)
const TaiyakiIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12C2 7.5 5 4 10 4C13 4 15 5.5 16 7C17.5 5.5 20 5 22 5C22 8 20 10 19 11C21 12.5 21.5 15 20 17C18 19 15 20 12 20C6 20 2 16.5 2 12ZM13 10C13 9.44772 13.4477 9 14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11C13.4477 11 13 10.5523 13 10Z" />
    <path d="M6 11C6.55 11 7 11.45 7 12C7 12.55 6.55 13 6 13C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11Z" fill="white" opacity="0.5"/>
  </svg>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isDarkMode, toggleDarkMode }) => {
  const [imgError, setImgError] = useState(false);

  const navItems = [
    { id: 'models', label: '思维核心', icon: Cpu },
    { id: 'general', label: '身份设定', icon: User },
    { id: 'deploy', label: '配置文件', icon: Rocket },
    { id: 'tutorial', label: '唤醒教程', icon: BookOpen },
    { id: 'contact', label: '联系我们', icon: HeartHandshake },
  ];

  return (
    <div className="w-full md:w-72 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl h-auto md:h-screen flex flex-col border-r border-emu-100 dark:border-slate-800 sticky top-0 z-10 shadow-lg shadow-emu-100/50 dark:shadow-none transition-colors duration-300">
      {/* Header */}
      <div className="p-6 border-b border-emu-100 dark:border-slate-800 bg-gradient-to-r from-emu-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer">
             <div className="w-12 h-12 rounded-full flex items-center justify-center bg-emu-500 shadow-md shadow-emu-300 overflow-hidden hover:scale-105 transition-transform duration-300">
               {!imgError ? (
                 <img 
                    src="/mumu_icon.png" 
                    alt="MuMu" 
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                 />
               ) : (
                 <Sparkles size={24} className="text-white animate-pulse" />
               )}
             </div>
             {/* Status Dot */}
             <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-slate-800 rounded-full"></div>
          </div>
          <div>
            <h1 className="font-bold text-2xl text-emu-600 dark:text-emu-400 tracking-tight font-sans">MuMu Config</h1>
            <p className="text-xs text-emu-400 dark:text-emu-600 font-medium tracking-wider uppercase">Your AI Partner</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-3xl transition-all duration-300 font-bold relative overflow-hidden group ${
                isActive
                  ? 'bg-gradient-to-r from-emu-500 to-emu-400 text-white shadow-lg shadow-emu-200 dark:shadow-none transform scale-105'
                  : 'text-gray-500 dark:text-slate-400 hover:bg-emu-50 dark:hover:bg-slate-800 hover:text-emu-600 hover:scale-102'
              }`}
            >
              <Icon size={22} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
              {item.label}
              {isActive && (
                  <div className="ml-auto text-wonder-200 animate-bounce">
                      <TaiyakiIcon className="w-5 h-5" />
                  </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Mode Toggle */}
      <div className="p-6 m-4 mt-auto">
        <button 
            onClick={toggleDarkMode}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all border border-transparent hover:border-gray-300 dark:hover:border-slate-600"
        >
            <span className="text-sm font-bold ml-2">{isDarkMode ? '暗夜模式' : '明亮模式'}</span>
            <div className={`p-2 rounded-full transition-transform duration-500 ${isDarkMode ? 'bg-indigo-500 text-white rotate-180' : 'bg-orange-400 text-white rotate-0'}`}>
                {isDarkMode ? <Moon size={16}/> : <Sun size={16}/>}
            </div>
        </button>
      </div>
    </div>
  );
};