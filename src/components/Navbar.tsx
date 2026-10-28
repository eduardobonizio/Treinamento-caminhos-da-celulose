import React, { useState } from 'react';
import { TabType, OperatorProfile } from '../types';
import { Award, User, BookOpen, Layers, Home, CheckCircle2, SlidersHorizontal } from 'lucide-react';

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
          
          {/* Zone 1: Single text element wordmark with Concession branding */}
          <div className="flex items-center gap-3 shrink-0">
            {profile.companyLogoUrl ? (
              <img
                src={profile.companyLogoUrl}
                alt="Logo Caminhos da Celulose"
                className="h-9 w-auto max-w-[140px] object-contain rounded"
                onError={(e) => {
                  // Fallback if URL fails
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-9 h-9 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-base shadow-sm">
                CC
              </div>
            )}
            <button
              onClick={() => onSelectTab('home')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <div className="text-base font-bold tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors whitespace-nowrap">
                Caminhos da Celulose
              </div>
              <div className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                Capacitação Free Flow · CCA
              </div>
            </button>
          </div>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => onSelectTab('home')}
              className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap ${
                currentTab === 'home'
                  ? 'text-emerald-800 font-semibold border-b-2 border-emerald-800'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Visão Geral</span>
            </button>

            <button
              onClick={() => onSelectTab('training')}
              className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap ${
                currentTab === 'training'
                  ? 'text-emerald-800 font-semibold border-b-2 border-emerald-800'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Módulos de Estudo</span>
              {completedCount > 0 && (
                <span className="text-xs text-emerald-700 font-semibold">
                  ({completedCount}/{totalModulesCount})
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectTab('arena')}
              className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap ${
                currentTab === 'arena'
                  ? 'text-emerald-800 font-semibold border-b-2 border-emerald-800'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Arena Interativa & Provas</span>
            </button>

            <button
              onClick={() => onSelectTab('certificates')}
              className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap ${
                currentTab === 'certificates'
                  ? 'text-emerald-800 font-semibold border-b-2 border-emerald-800'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Certificado</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action & Profile Info */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Content Manager Icon */}
            <button
              onClick={onOpenContentManager}
              title="Gerenciador de Conteúdos (Adicionar perguntas/módulos)"
              className="p-2 text-slate-500 hover:text-emerald-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Progress & Profile Button */}
            <button
              onClick={onOpenProfileModal}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors text-xs font-medium cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-emerald-800" />
              <span className="max-w-[120px] truncate hidden sm:inline">{profile.name}</span>
              <span className="font-mono text-emerald-800 font-semibold">
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
              Visão Geral do Free Flow
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
            <button
              onClick={() => { onSelectTab('certificates'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg ${currentTab === 'certificates' ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-slate-600'}`}
            >
              Certificado & Badges
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
