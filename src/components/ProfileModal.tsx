import React, { useState } from 'react';
import { OperatorProfile } from '../types';
import { X, User, Award, RotateCcw, Check, Sparkles } from 'lucide-react';
import { initialBadges } from '../data/badgesData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: OperatorProfile;
  onUpdateProfile: (updates: Partial<OperatorProfile>) => void;
  onResetProgress: () => void;
  totalModulesCount: number;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  onResetProgress,
  totalModulesCount
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ name, role });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const completedModules = profile.completedModules?.length || 0;
  const progressPercent = totalModulesCount > 0 ? Math.round((completedModules / totalModulesCount) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Perfil do Operador do CCA
              </h3>
              <span className="text-xs text-slate-500">Dados salvos no armazenamento local</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4 py-4">
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>Nome e função atualizados!</span>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Nome Completo do Colaborador (aparece no Certificado):
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-emerald-800"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Cargo / Função Operacional:
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-emerald-800"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Salvar Alterações
          </button>
        </form>

        {/* Performance metrics overview */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-xs">
          <span className="font-bold text-slate-800 uppercase tracking-wide block text-[11px]">
            Estatísticas de Capacitação:
          </span>

          <div className="grid grid-cols-2 gap-3 font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">MÓDULOS CONCLUÍDOS</span>
              <span className="text-base font-bold text-slate-900">{completedModules} de {totalModulesCount} ({progressPercent}%)</span>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px]">MELHOR NOTA NO QUIZ</span>
              <span className="text-base font-bold text-emerald-800">{profile.quizBestScore}%</span>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px]">TEMPO RECORDE MEMÓRIA</span>
              <span className="text-base font-bold text-amber-700">
                {profile.memoryBestTime > 0 ? `${profile.memoryBestTime}s` : 'Não registrado'}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px]">CASOS POP RESOLVIDOS</span>
              <span className="text-base font-bold text-sky-800">{profile.casesCompleted?.length || 0}</span>
            </div>
          </div>
        </div>

        {/* Reset Progress Danger Action */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-400">Deseja reiniciar todas as notas?</span>
          <button
            type="button"
            onClick={() => {
              if (confirm('Tem certeza de que deseja resetar todo o progresso dos testes e módulos?')) {
                onResetProgress();
                onClose();
              }
            }}
            className="flex items-center gap-1 text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Zerar Progresso</span>
          </button>
        </div>

      </div>

    </div>
  );
};
