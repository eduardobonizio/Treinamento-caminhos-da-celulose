import React from 'react';
import { OperatorProfile, Badge } from '../types';
import { Award, Printer, X, CheckCircle2, ShieldCheck, Sparkles, Brain, GraduationCap } from 'lucide-react';
import { initialBadges } from '../data/badgesData';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: OperatorProfile;
  totalModulesCount: number;
}

const badgeIconMap: Record<string, any> = {
  Sparkles,
  Brain,
  ShieldCheck,
  Award,
  GraduationCap
};

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  profile,
  totalModulesCount
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const certCode = `CC-FF-${(profile.name || 'OPERADOR').slice(0, 3).toUpperCase()}-${Math.abs(
    (profile.name || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 1024)
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl border border-slate-200 relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer print:hidden"
          aria-label="Fechar Certificado"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Printable Canvas */}
        <div className="border-8 border-double border-emerald-900/40 p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-emerald-50/20 via-white to-emerald-50/10 text-center relative overflow-hidden">
          
          {/* Subtle Watermark seal */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <Award className="w-96 h-96 text-emerald-950" />
          </div>

          {/* Header */}
          <div className="relative z-10 flex flex-col items-center">
            {profile.companyLogoUrl ? (
              <img
                src={profile.companyLogoUrl}
                alt="Logo"
                className="h-12 w-auto max-w-[160px] object-contain mb-3"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-lg mb-2 shadow-sm">
                CC
              </div>
            )}
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-900 font-mono">
              CONCESSIONÁRIA CAMINHOS DA CELULOSE S.A.
            </h2>
            <span className="text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">
              CENTRO DE CONTROLE DE ARRECADAÇÃO · CCA
            </span>
          </div>

          {/* Main Title */}
          <div className="relative z-10 mt-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif tracking-tight">
              Certificado de Capacitação Técnica
            </h1>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mt-1">
              SISTEMA DE LIVRE PASSAGEM · FREE FLOW
            </p>
          </div>

          {/* Recipient */}
          <div className="relative z-10 my-8">
            <p className="text-xs text-slate-600">
              Certificamos para os devidos fins operacionais e regulatórios que o(a) colaborador(a):
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-emerald-900 mt-2 border-b-2 border-emerald-800/20 pb-2 inline-block px-6">
              {profile.name || 'Nome do Colaborador'}
            </h3>
            <span className="text-xs text-slate-500 block mt-1 font-mono">
              Função: {profile.role || 'Operador de CCA'}
            </span>
          </div>

          {/* Statement */}
          <div className="relative z-10 max-w-xl mx-auto text-xs text-slate-700 leading-relaxed space-y-2">
            <p>
              Concluiu com aproveitamento o programa de capacitação em <strong>Tecnologia de Pórticos Free Flow, Procedimentos de Triagem do CCA, Verificação de Eixos Suspensos, Isenções e Legislação do Artigo 209-A do CTB / AGEMS</strong>.
            </p>
            <p className="font-mono text-[11px] text-slate-500">
              Carga Horária: 4 Horas · Aproveitamento na Avaliação: {profile.quizBestScore > 0 ? `${profile.quizBestScore}%` : 'Concluído'}
            </p>
          </div>

          {/* Signatures & Seal */}
          <div className="relative z-10 mt-10 pt-6 border-t border-slate-200 grid grid-cols-2 gap-6 text-center text-xs">
            <div>
              <div className="w-36 h-0.5 bg-slate-300 mx-auto mb-1.5" />
              <span className="font-bold text-slate-800 block">Coordenação do CCA</span>
              <span className="text-[10px] text-slate-500">Caminhos da Celulose</span>
            </div>
            <div>
              <div className="w-36 h-0.5 bg-slate-300 mx-auto mb-1.5" />
              <span className="font-bold text-slate-800 block">Emissão do Registro</span>
              <span className="text-[10px] text-slate-500">{currentDate}</span>
            </div>
          </div>

          {/* Verification Code */}
          <div className="relative z-10 mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>CÓD. AUTENTICIDADE: {certCode}</span>
            <span>AGEMS · ROTA DA CELULOSE MS</span>
          </div>

        </div>

        {/* Badges Earned Section */}
        <div className="mt-6 pt-4 border-t border-slate-100 print:hidden">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-3">
            Emblemas de Proficiência Conquistados ({profile.earnedBadges?.length || 0}/{initialBadges.length}):
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {initialBadges.map((badge) => {
              const isEarned = profile.earnedBadges?.includes(badge.id);
              const IconComp = badgeIconMap[badge.iconName] || Award;

              return (
                <div
                  key={badge.id}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-xs transition-colors ${
                    isEarned
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950 font-medium'
                      : 'bg-slate-50 border-slate-200 text-slate-400 opacity-50'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isEarned ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-400'
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="block truncate font-bold text-[11px]">{badge.title}</span>
                    <span className="block truncate text-[10px] text-slate-500">{badge.conditionText}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="mt-8 flex items-center justify-end gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Fechar
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Salvar em PDF</span>
          </button>
        </div>

      </div>

    </div>
  );
};
