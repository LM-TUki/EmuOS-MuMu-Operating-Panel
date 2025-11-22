import React, { useState } from 'react';
import { Github, MessageCircle, Users, Copy, Check, Heart, ExternalLink, Star } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const contacts = [
    {
      id: 'author',
      label: '作者 QQ',
      value: '3374364602',
      desc: '有问题可以敲小窗哦 (如果不忙的话)',
      icon: MessageCircle,
      color: 'blue'
    },
    {
      id: 'group',
      label: 'QQ 交流群',
      value: '1050548419',
      desc: '欢迎加入大家庭，一起讨论配置心得',
      icon: Users,
      color: 'pink'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-emu-500 p-8 rounded-[2rem] text-white shadow-lg shadow-pink-200 dark:shadow-none relative overflow-hidden">
         <div className="absolute right-0 top-0 opacity-10 transform translate-x-10 -translate-y-10">
             <Heart size={200} fill="currentColor" />
         </div>
         <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Heart className="animate-pulse" fill="currentColor" /> 联系我们
            </h2>
            <p className="text-pink-100 text-lg">
                MuMu 的成长离不开你的支持！<br/>
                如果在使用过程中遇到问题，或者有好的建议，欢迎联系~
            </p>
         </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* GitHub Card */}
          <div className="col-span-1 md:col-span-2 bg-gray-900 text-white p-6 rounded-3xl shadow-xl border border-gray-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity transform group-hover:rotate-12 duration-500">
                  <Github size={120} />
              </div>
              <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                      <Github size={32} />
                      <h3 className="text-2xl font-bold">GitHub 开源主页</h3>
                  </div>
                  <p className="text-gray-400 mb-6 max-w-lg">
                      MuMu 的源代码完全公开。如果你喜欢这个项目，请去 GitHub 点一颗免费的星星 (Star) ⭐，这对我真的很重要！
                  </p>
                  <a 
                    href="https://github.com/LM-TUki" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                  >
                      <Star size={18} className="text-yellow-500" fill="currentColor"/>
                      前往 GitHub 主页
                      <ExternalLink size={16} />
                  </a>
              </div>
          </div>

          {/* Contact Info Cards */}
          {contacts.map((item) => (
              <div key={item.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 hover:border-emu-200 dark:hover:border-emu-800 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-2xl bg-${item.color}-50 dark:bg-${item.color}-900/20 text-${item.color}-500`}>
                          <item.icon size={24} />
                      </div>
                      <button 
                        onClick={() => handleCopy(item.value, item.id)}
                        className={`p-2 rounded-lg transition-colors ${copied === item.id ? 'bg-green-100 text-green-600' : 'bg-gray-50 dark:bg-slate-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
                      >
                          {copied === item.id ? <Check size={18} /> : <Copy size={18} />}
                      </button>
                  </div>
                  
                  <h4 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{item.label}</h4>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white mb-2 font-mono tracking-wide select-all">
                      {item.value}
                  </div>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                      {item.desc}
                  </p>
              </div>
          ))}

      </div>
      
      <div className="text-center text-gray-400 text-xs pt-8">
          Created with ❤️ by LM-TUki
      </div>
    </div>
  );
};
