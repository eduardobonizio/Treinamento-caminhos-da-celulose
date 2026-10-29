import React, { useState, useEffect } from 'react';
import { TabType, ArenaSubTab } from './types';
import { useStorage } from './hooks/useStorage';
import { Navbar } from './components/Navbar';
import { HomeOverview } from './components/HomeOverview';
import { TrainingModules } from './components/TrainingModules';
import { ArenaView } from './components/ArenaView';
import { CertificateModal } from './components/CertificateModal';
import { ContentManagerModal } from './components/ContentManagerModal';
import { ProfileModal } from './components/ProfileModal';
import { RouteTollCalculator } from './components/RouteTollCalculator';
import { FAQPage } from './components/FAQPage';

export function App() {
  const {
    profile,
    updateProfile,
    modules,
    questions,
    memoryPairs,
    cases,
    markModuleCompleted,
    recordQuizResult,
    recordMemoryTime,
    recordCaseCompleted,
    resetAllProgress,
    addQuestion,
    addMemoryPair,
    exportAllDataJson,
    importDataJson
  } = useStorage();

  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [initialArenaSubTab, setInitialArenaSubTab] = useState<ArenaSubTab>('memory');
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isContentManagerOpen, setIsContentManagerOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Sync state with URL hash for flawless GitHub Pages deep-linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash === 'treinamento') setCurrentTab('training');
      else if (hash === 'calculadora' || hash === 'calculador') setCurrentTab('calculator');
      else if (hash === 'arena' || hash === 'provas') setCurrentTab('arena');
      else if (hash === 'faq' || hash === 'duvidas' || hash === 'perguntas') setCurrentTab('faq');
      else setCurrentTab('home');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tab: TabType) => {
    if (tab === 'certificates') {
      return; // Ocultado temporariamente conforme solicitado
    }
    setCurrentTab(tab);
    if (tab === 'home') window.location.hash = '#/inicio';
    else if (tab === 'calculator') window.location.hash = '#/calculadora';
    else if (tab === 'training') window.location.hash = '#/treinamento';
    else if (tab === 'arena') window.location.hash = '#/arena';
    else if (tab === 'faq') window.location.hash = '#/faq';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToTraining = () => {
    handleSelectTab('training');
  };

  const handleNavigateToArena = (subTab?: ArenaSubTab) => {
    if (subTab) setInitialArenaSubTab(subTab);
    handleSelectTab('arena');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-emerald-800 selection:text-white">
      
      {/* Corporate Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        profile={profile}
        totalModulesCount={modules.length}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenContentManager={() => setIsContentManagerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentTab === 'home' && (
          <HomeOverview
            onNavigateToTraining={handleNavigateToTraining}
            onNavigateToArena={handleNavigateToArena}
            onNavigateToFaq={() => handleSelectTab('faq')}
            completedModulesCount={profile.completedModules?.length || 0}
            totalModulesCount={modules.length}
          />
        )}

        {currentTab === 'calculator' && (
          <RouteTollCalculator />
        )}

        {currentTab === 'training' && (
          <TrainingModules
            modules={modules}
            completedModules={profile.completedModules || []}
            onMarkCompleted={markModuleCompleted}
            onNavigateToArena={() => handleNavigateToArena('memory')}
          />
        )}

        {currentTab === 'arena' && (
          <ArenaView
            initialSubTab={initialArenaSubTab}
            memoryPairs={memoryPairs}
            cases={cases}
            questions={questions}
            profile={profile}
            onRecordMemoryTime={recordMemoryTime}
            onRecordCaseCompleted={recordCaseCompleted}
            onRecordQuizScore={recordQuizResult}
            onOpenCertificate={() => {}}
          />
        )}

        {currentTab === 'faq' && (
          <FAQPage
            onGoToCalculator={() => handleSelectTab('calculator')}
          />
        )}
      </main>

      {/* Modals */}
      <CertificateModal
        isOpen={false}
        onClose={() => setIsCertificateOpen(false)}
        profile={profile}
        onUpdateProfile={updateProfile}
        totalModulesCount={modules.length}
      />

      <ContentManagerModal
        isOpen={isContentManagerOpen}
        onClose={() => setIsContentManagerOpen(false)}
        onAddQuestion={addQuestion}
        onAddMemoryPair={addMemoryPair}
        onExportJson={exportAllDataJson}
        onImportJson={importDataJson}
        companyLogoUrl={profile.companyLogoUrl || ''}
        onUpdateLogoUrl={(url) => updateProfile({ companyLogoUrl: url })}
        totalQuestions={questions.length}
        totalMemoryPairs={memoryPairs.length}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onUpdateProfile={updateProfile}
        onResetProgress={resetAllProgress}
        totalModulesCount={modules.length}
      />

      {/* Clean Corporate Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Concessionária Caminhos da Celulose S.A.</span>
            <span>·</span>
            <span>Centro de Controle de Arrecadação (CCA)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <button
              onClick={() => handleSelectTab('home')}
              className="hover:text-emerald-800 cursor-pointer"
            >
              Visão Geral
            </button>
            <button
              onClick={() => handleSelectTab('calculator')}
              className="hover:text-emerald-800 cursor-pointer font-semibold text-[#46973A]"
            >
              Calculadora
            </button>
            <button
              onClick={() => handleSelectTab('training')}
              className="hover:text-emerald-800 cursor-pointer"
            >
              Módulos
            </button>
            <button
              onClick={() => handleSelectTab('arena')}
              className="hover:text-emerald-800 cursor-pointer"
            >
              Provas & Jogos
            </button>
            <button
              onClick={() => handleSelectTab('faq')}
              className="hover:text-emerald-800 cursor-pointer"
            >
              FAQ / Dúvidas
            </button>
            <button
              onClick={() => setIsContentManagerOpen(true)}
              className="hover:text-emerald-800 cursor-pointer"
            >
              Gerenciar Conteúdo
            </button>
          </div>

          <span className="text-[11px] font-mono text-slate-400">
            Pronto para GitHub Pages · Sem servidor
          </span>
        </div>
      </footer>

    </div>
  );
}

export default App;
