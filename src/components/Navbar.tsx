import React, { useState } from 'react';
import { TabType, OperatorProfile } from '../types';
import { Award, User, BookOpen, Layers, Home, CheckCircle2, SlidersHorizontal, Calculator } from 'lucide-react';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  profile: OperatorProfile;
  totalModulesCount: number;
  onOpenProfileModal: () => void;
  onOpenContentManager: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  profile,
  totalModulesCount,
  onOpenProfileModal,
  onOpenContentManager
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const completedCount = profile.completedModules?.length || 0;
  const progressPercent = totalModulesCount > 0 ? Math.round((completedCount / totalModulesCount) * 100) : 0;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          
          {/* Zone 1: Brand Zone with Official Concession Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectTab('home')}
              className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
            >
              <img
                src={profile.companyLogoUrl || './assets/aistudio/logo_caminhos_da_celulose_861efee6.jpeg'}
                alt="Concessionária Caminhos da Celulose"
                className="h-10 sm:h-11 w-auto max-w-[190px] object-contain"
                onError={(e) => {
                  // Fallback to local absolute if relative fails
                  (e.target as HTMLImageElement).src = '/assets/aistudio/logo_caminhos_da_celulose_861efee6.jpeg';
                }}
              />
              <div className="hidden lg:block pl-2 border-l border-slate-200">
                <span className="text-[11px] font-bold text-[#1A2B49] tracking-wider uppercase block">
                  Capacitação em Pedágio Eletrônico
                </span>
                <span className="text-[10px] font-medium text-[#46973A] tracking-wide block">
                  Centro de Controle de Arrecadação · CCA
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Clean single-line text navigation links styled like official site */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => onSelectTab('home')}
              className={`flex items-center gap-1.5 py-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                currentTab === 'home'
                  ? 'text-[#46973A] font-bold border-b-2 border-[#46973A]'
                  : 'text-[#1A2B49] hover:text-[#46973A]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Visão Geral</span>
            </button>

            <button
              onClick={() => onSelectTab('calculator')}
              className={`flex items-center gap-1.5 py-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                currentTab === 'calculator'
                  ? 'text-[#46973A] font-bold border-b-2 border-[#46973A]'
                  : 'text-[#1A2B49] hover:text-[#46973A]'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Calculadora de Pedágio</span>
            </button>

            <button
              onClick={() => onSelectTab('training')}
              className={`flex items-center gap-1.5 py-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                currentTab === 'training'
                  ? 'text-[#46973A] font-bold border-b-2 border-[#46973A]'
                  : 'text-[#1A2B49] hover:text-[#46973A]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Módulos de Estudo</span>
              {completedCount > 0 && (
                <span className="text-xs text-[#46973A] font-bold">
                  ({completedCount}/{totalModulesCount})
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectTab('arena')}
              className={`flex items-center gap-1.5 py-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                currentTab === 'arena'
                  ? 'text-[#46973A] font-bold border-b-2 border-[#46973A]'
                  : 'text-[#1A2B49] hover:text-[#46973A]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Arena & Provas</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action & Profile Info */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Content Manager Icon */}
            <button
              onClick={onOpenContentManager}
              title="Gerenciador de Conteúdos (Adicionar perguntas/módulos)"
              className="p-2 text-slate-500 hover:text-[#1A2B49] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Progress & Profile Button */}
            <button
              onClick={onOpenProfileModal}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#1A2B49] hover:bg-[#121E33] text-white rounded-xl transition-all text-xs font-semibold cursor-pointer shadow-xs"
            >
              <User className="w-3.5 h-3.5 text-[#46973A]" />
              <span className="max-w-[120px] truncate hidden sm:inline">{profile.name}</span>
              <span className="font-mono text-[#46973A] bg-white/10 px-1.5 py-0.5 rounded text-[11px] font-bold">
                {progressPercent}%
              </span>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Abrir menu de navegação"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-100 flex flex-col gap-2 text-sm font-medium">
            <button
              onClick={() => { onSelectTab('home'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg ${currentTab === 'home' ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-slate-600'}`}
            >
              Visão Geral do Pedágio Eletrônico
            </button>
            <button
              onClick={() => { onSelectTab('calculator'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg ${currentTab === 'calculator' ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-slate-600'}`}
            >
              Calculadora de Pedágio por Rota
            </button>
            <button
              onClick={() => { onSelectTab('training'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg ${currentTab === 'training' ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-slate-600'}`}
            >
              Módulos de Estudo ({completedCount}/{totalModulesCount})
            </button>
            <button
              onClick={() => { onSelectTab('arena'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg ${currentTab === 'arena' ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-slate-600'}`}
            >
              Arena Interativa (Quiz, Memória & Casos)
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
