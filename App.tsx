
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { GeneralView } from './components/GeneralView';
import { ModelsView } from './components/ModelsView';
import { DeployView } from './components/DeployView';
import { TutorialView } from './components/TutorialView';
import { ContactView } from './components/ContactView';
import { SplashScreen } from './components/SplashScreen';
import { INITIAL_STATE } from './data/constants';
import { AppState, BotConfig, ApiProvider, ModelDef } from './data/types';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('models');
  const [config, setConfig] = useState<AppState>(INITIAL_STATE);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference on load, or rely on user toggle default (false)
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
       // setIsDarkMode(true); // Optional: auto-detect system theme
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const updateBotConfig = (key: keyof BotConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      bot: { ...prev.bot, [key]: value }
    }));
  };

  const updateTaskConfig = (taskName: string, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [taskName]: {
          ...prev.tasks[taskName],
          [field]: value
        }
      }
    }));
  };

  const updateProvider = (index: number, field: keyof ApiProvider, value: any) => {
      const newProviders = [...config.providers];
      newProviders[index] = { ...newProviders[index], [field]: value };
      setConfig(prev => ({ ...prev, providers: newProviders }));
  };

  const updateModel = (index: number, field: keyof ModelDef, value: any) => {
      const newModels = [...config.models];
      newModels[index] = { ...newModels[index], [field]: value };
      setConfig(prev => ({ ...prev, models: newModels }));
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      
      <div className={`flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-slate-900 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300 ${showSplash ? 'h-screen overflow-hidden filter blur-sm' : ''}`}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'tutorial' && (
              <TutorialView />
            )}
            {activeTab === 'general' && (
              <GeneralView config={config.bot} updateConfig={updateBotConfig} />
            )}
            {activeTab === 'models' && (
              <ModelsView 
                providers={config.providers}
                models={config.models} 
                tasks={config.tasks} 
                updateTask={updateTaskConfig} 
                updateProvider={updateProvider}
                updateModel={updateModel}
              />
            )}
            {activeTab === 'deploy' && (
              <DeployView config={config} setConfig={setConfig} />
            )}
            {activeTab === 'contact' && (
              <ContactView />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
