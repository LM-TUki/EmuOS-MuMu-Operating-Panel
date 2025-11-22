import React, { useEffect, useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

// Reused Taiyaki Icon for consistency
const TaiyakiIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12C2 7.5 5 4 10 4C13 4 15 5.5 16 7C17.5 5.5 20 5 22 5C22 8 20 10 19 11C21 12.5 21.5 15 20 17C18 19 15 20 12 20C6 20 2 16.5 2 12ZM13 10C13 9.44772 13.4477 9 14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11C13.4477 11 13 10.5523 13 10Z" />
    <path d="M6 11C6.55 11 7 11.45 7 12C7 12.55 6.55 13 6 13C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11Z" fill="white" opacity="0.5"/>
  </svg>
);

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Total duration 2.5s, fade out starts at 2.0s
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onFinish, 500); // Wait for CSS transition
    }, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-emu-50 to-wonder-50 dark:from-gray-900 dark:to-slate-900 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      
      <div className="relative mb-8">
          {/* Animated Background Blobs */}
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-slow dark:bg-pink-900"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-slow animation-delay-2000 dark:bg-yellow-900"></div>
          
          {/* Main Icon */}
          <div className="relative bg-white dark:bg-slate-800 w-40 h-40 rounded-[2.5rem] shadow-xl flex items-center justify-center animate-pop border-4 border-white dark:border-slate-700 transform hover:rotate-6 transition-transform">
              <div className="animate-wiggle">
                <TaiyakiIcon className="w-24 h-24 text-emu-500 dark:text-emu-400" />
              </div>
              {/* Floating Decor */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-white p-2 rounded-full animate-bounce shadow-lg">
                  <Sparkles size={24} />
              </div>
              <div className="absolute -bottom-2 -left-2 bg-pink-400 text-white p-2 rounded-full animate-bounce shadow-lg delay-75">
                  <Heart size={20} fill="currentColor"/>
              </div>
          </div>
      </div>

      {/* Text */}
      <div className="text-center space-y-3 z-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white tracking-tight animate-fade-in">
              MuMu Config
          </h1>
          <p className="text-emu-500 dark:text-emu-400 font-medium text-sm tracking-widest uppercase animate-pulse">
              正在唤醒你的可爱伙伴...
          </p>
      </div>

      {/* Loading Bar */}
      <div className="mt-12 w-64 h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
          <div className="h-full bg-gradient-to-r from-emu-400 to-wonder-400 animate-loading-bar rounded-full shadow-[0_0_10px_rgba(255,92,150,0.5)]"></div>
      </div>
      
      <div className="absolute bottom-8 text-gray-400 text-xs font-mono opacity-50">
          v6.25.0 Loading...
      </div>
    </div>
  );
};