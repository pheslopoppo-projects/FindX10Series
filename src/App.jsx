import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ModuleViewer from './components/ModuleViewer';
import ChatQuiz from './components/ChatQuiz';
import { moduleContent } from './data/moduleContent';
import { getUserProfile, clearUserProfile } from './utils/storage';

export default function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [currentView, setCurrentView] = useState('login'); // 'login' | 'dashboard' | 'viewer'
  const [activeModuleId, setActiveModuleId] = useState(null);

  // Check existing session in localStorage or URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    const moduleParam = params.get('module');

    const profile = getUserProfile();

    if (viewParam === 'viewer' && moduleParam) {
      setUserProfile(profile || {
        fullName: 'Alex Morgan',
        storeName: 'Oxford Street Flagship',
        asmName: 'Zach'
      });
      setActiveModuleId(moduleParam);
      setCurrentView('viewer');
      return;
    }

    if (viewParam === 'quiz') {
      setUserProfile(profile || {
        fullName: 'Alex Morgan',
        storeName: 'Oxford Street Flagship',
        asmName: 'Zach'
      });
      setActiveModuleId(moduleParam || 'module-1');
      setCurrentView('quiz');
      return;
    }

    if (viewParam === 'dashboard') {
      setUserProfile(profile || {
        fullName: 'Alex Morgan',
        storeName: 'Oxford Street Flagship',
        asmName: 'Zach'
      });
      setCurrentView('dashboard');
      return;
    }

    if (profile && profile.fullName) {
      setUserProfile(profile);
      setCurrentView('dashboard');
    } else {
      setCurrentView('login');
    }
  }, []);

  const handleLoginSuccess = (profile) => {
    setUserProfile(profile);
    setCurrentView('dashboard');
  };

  const handleSelectModule = (moduleId) => {
    const targetModule = moduleContent.find((m) => m.id === moduleId);
    if (targetModule && !targetModule.locked) {
      setActiveModuleId(moduleId);
      setCurrentView('viewer');
    }
  };

  const handleBackToDashboard = () => {
    setActiveModuleId(null);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    clearUserProfile();
    setUserProfile(null);
    setActiveModuleId(null);
    setCurrentView('login');
  };

  // Find active module data for the viewer
  const activeModule = moduleContent.find((m) => m.id === activeModuleId);

  return (
    <div className="w-full min-h-screen bg-moon-white text-titanium-dark">
      {currentView === 'login' && (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}

      {currentView === 'dashboard' && (
        <Dashboard
          userProfile={userProfile}
          onSelectModule={handleSelectModule}
          onLogout={handleLogout}
        />
      )}

      {currentView === 'viewer' && activeModule && (
        <ModuleViewer
          module={activeModule}
          onBack={handleBackToDashboard}
        />
      )}

      {currentView === 'quiz' && activeModule && (
        <div className="h-screen w-full bg-moon-white flex flex-col justify-center items-center p-3 sm:p-5">
          <div className="w-full max-w-md h-full flex flex-col justify-between pt-4 pb-4">
            <ChatQuiz
              moduleId={activeModule.id}
              moduleTitle={activeModule.title}
              quiz={activeModule.quiz}
              onComplete={handleBackToDashboard}
              onExit={handleBackToDashboard}
            />
          </div>
        </div>
      )}
    </div>
  );
}
