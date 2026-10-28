import React, { useState } from 'react';
import { TrainingModule } from '../types';
import { CheckCircle2, Clock, BookOpen, AlertTriangle, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';

interface TrainingModulesProps {
  modules: TrainingModule[];
  completedModules: string[];
  onMarkCompleted: (moduleId: string) => void;
  onNavigateToArena: () => void;
}

export const TrainingModules: React.FC<TrainingModulesProps> = ({
  modules,
  completedModules,
  onMarkCompleted,
  onNavigateToArena
}) => {
  const [activeModuleId, setActiveModuleId] = useState<string>(modules[0]?.id || 'mod-1');
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const activeModule = modules.find(m => m.id === activeModuleId) || modules[0];
  const activeSection = activeModule?.sections[activeSectionIndex] || activeModule?.sections[0];
  const isModuleCompleted = completedModules.includes(activeModuleId);

  const toggleChecklist = (itemKey: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  const handleNextSection = () => {
    if (activeSectionIndex < activeModule.sections.length - 1) {
      setActiveSectionIndex(prev => prev + 1);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    } else {
      // Complete current module
      onMarkCompleted(activeModule.id);
      // Try to jump to next module if exists
      const currentIndex = modules.findIndex(m => m.id === activeModule.id);
      if (currentIndex < modules.length - 1) {
        setActiveModuleId(modules[currentIndex + 1].id);
        setActiveSectionIndex(0);
        window.scrollTo({ top: 180, behavior: 'smooth' });
      }
    }
  };

  const handlePrevSection = () => {
    if (activeSectionIndex > 0) {
      setActiveSectionIndex(prev => prev - 1);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
          Capacitação Técnica & POPs
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Módulos de Treinamento do CCA
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Estude o conteúdo detalhado de cada módulo, revise os pontos operacionais e marque a conclusão para liberar seus certificados e conquistas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Module Selector Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block px-1">
            Trilha de Módulos ({completedModules.length}/{modules.length} Concluídos)
          </span>

          <div className="space-y-2">
            {modules.map((mod, idx) => {
              const isSelected = mod.id === activeModuleId;
              const isDone = completedModules.includes(mod.id);

              return (
                <button
                  key={mod.id}
                  onClick={() => {
                    setActiveModuleId(mod.id);
                    setActiveSectionIndex(0);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                      : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                    <span className={isSelected ? 'text-emerald-200' : 'text-emerald-800 font-semibold'}>
                      Módulo 0{idx + 1} · {mod.category}
                    </span>
                    {isDone ? (
                      <span className={`flex items-center gap-1 font-semibold ${isSelected ? 'text-emerald-200' : 'text-emerald-700'}`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Concluído
                      </span>
                    ) : (
                      <span className={`flex items-center gap-1 text-[11px] ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                        <Clock className="w-3 h-3" />
                        {mod.estimatedMinutes} min
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold leading-snug">
                    {mod.title}
                  </h3>
                  
                  <p className={`text-xs mt-1.5 line-clamp-2 ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                    {mod.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Quick Arena Banner in sidebar */}
          <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide block">
              Pronto para praticar?
            </span>
            <p className="text-xs text-slate-300 mt-1">
              Teste seus conhecimentos no Jogo da Memória e no Simulador de Ocorrências do CCA.
            </p>
            <button
              onClick={onNavigateToArena}
              className="mt-3 w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ir para Arena de Provas</span>
            </button>
          </div>
        </div>

        {/* Content Viewer Main Column */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          
          {/* Module Title Header */}
          <div className="border-b border-slate-100 pb-6">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>{activeModule.category}</span>
              <span>{activeModule.estimatedMinutes} minutos estimados</span>
            </div>
            
            <h1 className="text-2xl font-extrabold text-slate-900">
              {activeModule.title}
            </h1>
            
            <p className="text-sm text-slate-600 mt-2">
              {activeModule.description}
            </p>

            {/* Section tabs if multiple */}
            {activeModule.sections.length > 1 && (
              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100 overflow-x-auto pb-1">
                {activeModule.sections.map((sec, sIdx) => (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSectionIndex(sIdx)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      activeSectionIndex === sIdx
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Parte {sIdx + 1}: {sec.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section Body */}
          {activeSection && (
            <div className="py-6 space-y-6">
              <div>
                <span className="text-xs font-mono text-emerald-800 font-semibold tracking-wider uppercase block">
                  Seção {activeSectionIndex + 1} de {activeModule.sections.length}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  {activeSection.title}
                </h2>
                <h3 className="text-xs font-medium text-slate-500 mt-0.5">
                  {activeSection.subtitle}
                </h3>
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                {activeSection.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Warning or Critical Note if present */}
              {activeSection.warningNote && (
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">Aviso Importante do CCA:</span>
                    <span className="leading-relaxed">{activeSection.warningNote}</span>
                  </div>
                </div>
              )}

              {/* Key Takeaways */}
              {activeSection.keyPoints && activeSection.keyPoints.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block mb-2">
                    Pontos-Chave Operacionais:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {activeSection.keyPoints.map((pt, ptIdx) => (
                      <li key={ptIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Interactive Checklist */}
              {activeSection.checklist && activeSection.checklist.length > 0 && (
                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide block mb-2">
                    Checklist de Fixação:
                  </span>
                  <div className="space-y-2">
                    {activeSection.checklist.map((chk, cIdx) => {
                      const itemKey = `${activeSection.id}-chk-${cIdx}`;
                      const isChecked = !!checkedItems[itemKey];

                      return (
                        <button
                          key={cIdx}
                          onClick={() => toggleChecklist(itemKey)}
                          className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left text-xs transition-colors cursor-pointer border ${
                            isChecked
                              ? 'bg-white border-emerald-300 text-slate-900 font-medium'
                              : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 transition-colors ${
                            isChecked ? 'bg-emerald-800 border-emerald-800 text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span>{chk}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Footer Controls & Next Actions */}
          <div className="border-t border-slate-100 pt-6 mt-6 flex flex-wrap items-center justify-between gap-4">
            
            <button
              onClick={handlePrevSection}
              disabled={activeSectionIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeSectionIndex === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-700 hover:bg-slate-100 cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Seção Anterior</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onMarkCompleted(activeModule.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isModuleCompleted
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>{isModuleCompleted ? 'Módulo Concluído' : 'Marcar como Concluído'}</span>
              </button>

              <button
                onClick={handleNextSection}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <span>
                  {activeSectionIndex < activeModule.sections.length - 1
                    ? 'Próxima Seção'
                    : 'Avançar Módulo'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
