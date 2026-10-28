import React, { useState, useEffect } from 'react';
import { OperatorProfile, Badge } from '../types';
import { Award, Printer, X, CheckCircle2, ShieldCheck, Sparkles, Brain, GraduationCap, User, ArrowRight, Edit3 } from 'lucide-react';
import { initialBadges } from '../data/badgesData';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: OperatorProfile;
  onUpdateProfile: (updates: Partial<OperatorProfile>) => void;
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
  onUpdateProfile,
  totalModulesCount
}) => {
  const [fullName, setFullName] = useState(profile.name && profile.name !== 'Colaborador CCA' ? profile.name : '');
  const [role, setRole] = useState(profile.role || 'Operador de CCA');
  const [isNameConfirmed, setIsNameConfirmed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (profile.name && profile.name !== 'Colaborador CCA') {
        setFullName(profile.name);
        setRole(profile.role || 'Operador de CCA');
        setIsNameConfirmed(true);
      } else {
        setFullName('');
        setIsNameConfirmed(false);
      }
    }
  }, [isOpen, profile.name, profile.role]);

  if (!isOpen) return null;

  const handleSubmitName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    onUpdateProfile({
      name: fullName.trim(),
      role: role.trim() || 'Operador de CCA'
    });
    setIsNameConfirmed(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const certCode = `CC-FF-${(fullName || 'OPERADOR').slice(0, 3).toUpperCase()}-${Math.abs(
    (fullName || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 1024)
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs certificate-modal-wrapper">
      
      <div className="bg-white rounded-3xl max-w-3xl w-full p-4 sm:p-7 shadow-2xl border border-slate-200 relative my-4 sm:my-8 certificate-modal-card">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer print-hide z-10"
          aria-label="Fechar Certificado"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: Ask for Full Name before displaying certificate */}
        {!isNameConfirmed ? (
          <div className="py-6 space-y-6">
            
            <div className="text-center max-w-md mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-[#46973A]/10 text-[#46973A] flex items-center justify-center mx-auto mb-3">
                <Award className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono font-bold text-[#46973A] uppercase tracking-wider block">
                Emissão de Certificado Oficial
              </span>
              <h2 className="text-2xl font-extrabold text-[#1A2B49] mt-1">
                Identificação do Colaborador
              </h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Por favor, digite seu <strong>nome completo</strong> exatamente como deseja que conste no Certificado de Capacitação Técnica da Concessionária Caminhos da Celulose.
              </p>
            </div>

            <form onSubmit={handleSubmitName} className="max-w-md mx-auto space-y-4 pt-2">
              <div>
                <label className="text-xs font-bold text-[#1A2B49] block mb-1">
                  Nome Completo: *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="Ex: Eduardo Bonizio"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#46973A] focus:border-transparent font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1A2B49] block mb-1">
                  Cargo / Função Operacional:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Analista de Recuperação de Receita e Cobrança"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#46973A] focus:border-transparent"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!fullName.trim()}
                  className={`w-full py-3 px-6 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                    fullName.trim()
                      ? 'bg-[#46973A] hover:bg-[#387A2E] text-white cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Gerar Certificado Oficial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <span className="text-[11px] text-slate-400 text-center block">
                Seu nome ficará gravado no seu navegador para futuras consultas.
              </span>
            </form>

          </div>
        ) : (
          /* STEP 2: Display Official Certificate */
          <div className="space-y-4">
            
            {/* Top Toolbar in Modal: 100% visible, fully responsive, print-hidden */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl print-hide text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-slate-500">Certificado emitido para:</span>
                <strong className="text-[#1A2B49] text-sm">{fullName}</strong>
                <button
                  onClick={() => setIsNameConfirmed(false)}
                  className="flex items-center gap-1 text-[#46973A] hover:text-[#387A2E] font-semibold ml-2 cursor-pointer text-xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Alterar Nome</span>
                </button>
              </div>

              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#46973A] hover:bg-[#387A2E] text-white font-bold transition-all shadow-xs cursor-pointer ml-auto text-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir / Salvar em PDF</span>
              </button>
            </div>

            {/* Certificate Printable Canvas (Target of @media print: exactly 1 single page) */}
            <div
              id="certificate-print-area"
              className="border-4 sm:border-8 border-double border-[#1A2B49]/30 p-5 sm:p-8 rounded-2xl bg-gradient-to-b from-[#46973A]/5 via-white to-[#1A2B49]/5 text-center relative overflow-hidden"
            >
              
              {/* Subtle Watermark seal */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                <Award className="w-80 h-80 text-[#1A2B49]" />
              </div>

              {/* Header with Official Logo */}
              <div className="relative z-10 flex flex-col items-center">
                <img
                  src={profile.companyLogoUrl || './assets/aistudio/logo_caminhos_da_celulose_861efee6.jpeg'}
                  alt="Concessionária Caminhos da Celulose"
                  className="h-12 sm:h-14 w-auto max-w-[200px] object-contain mb-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/aistudio/logo_caminhos_da_celulose_861efee6.jpeg';
                  }}
                />
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#1A2B49] font-mono">
                  CONCESSIONÁRIA CAMINHOS DA CELULOSE S.A.
                </h2>
                <span className="text-[10px] font-semibold text-[#46973A] uppercase tracking-wider mt-0.5">
                  CENTRO DE CONTROLE DE ARRECADAÇÃO · CCA
                </span>
              </div>

              {/* Main Title */}
              <div className="relative z-10 mt-3 sm:mt-4">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#1A2B49] font-serif tracking-tight">
                  Certificado de Capacitação Técnica
                </h1>
                <p className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-widest mt-0.5">
                  SISTEMA DE LIVRE PASSAGEM · FREE FLOW
                </p>
              </div>

              {/* Recipient */}
              <div className="relative z-10 my-4 sm:my-5">
                <p className="text-[11px] text-slate-600">
                  Certificamos para os devidos fins operacionais e regulatórios que o(a) colaborador(a):
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1A2B49] mt-1.5 border-b-2 border-[#46973A] pb-1.5 inline-block px-6 tracking-wide">
                  {fullName}
                </h3>
                <span className="text-[11px] text-slate-600 block mt-1 font-mono font-medium">
                  Função: {role}
                </span>
              </div>

              {/* Statement */}
              <div className="relative z-10 max-w-xl mx-auto text-[11px] text-slate-700 leading-relaxed space-y-1">
                <p>
                  Concluiu com aproveitamento o programa de capacitação em <strong>Tecnologia de Pórticos Free Flow, Procedimentos de Triagem do CCA, Verificação de Eixos Suspensos, Isenções e Legislação do Artigo 209-A do CTB / AGEMS</strong>.
                </p>
                <p className="font-mono text-[10px] text-slate-500 pt-1">
                  Carga Horária: 4 Horas · Aproveitamento na Avaliação: {profile.quizBestScore > 0 ? `${profile.quizBestScore}%` : '100%'}
                </p>
              </div>

              {/* Signatures & Seal */}
              <div className="relative z-10 mt-6 sm:mt-8 pt-4 border-t border-slate-200 grid grid-cols-2 gap-4 text-center text-[11px]">
                <div>
                  <div className="w-36 h-0.5 bg-slate-400 mx-auto mb-1" />
                  <span className="font-bold text-[#1A2B49] block">Coordenação do CCA</span>
                  <span className="text-[10px] text-slate-500">Caminhos da Celulose</span>
                </div>
                <div>
                  <div className="w-36 h-0.5 bg-slate-400 mx-auto mb-1" />
                  <span className="font-bold text-[#1A2B49] block">Emissão do Registro</span>
                  <span className="text-[10px] text-slate-500">{currentDate}</span>
                </div>
              </div>

              {/* Verification Code */}
              <div className="relative z-10 mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] font-mono text-slate-400">
                <span>CÓD. AUTENTICIDADE: {certCode}</span>
                <span>AGEMS · ROTA DA CELULOSE MS</span>
              </div>

            </div>

            {/* Badges Earned Section (Hidden from Print) */}
            <div className="pt-2 print-hide">
              <span className="text-xs font-bold text-[#1A2B49] uppercase tracking-wide block mb-2.5">
                Emblemas de Proficiência Conquistados ({profile.earnedBadges?.length || 0}/{initialBadges.length}):
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {initialBadges.map((badge) => {
                  const isEarned = profile.earnedBadges?.includes(badge.id);
                  const IconComp = badgeIconMap[badge.iconName] || Award;

                  return (
                    <div
                      key={badge.id}
                      className={`p-2 rounded-xl border flex items-center gap-2 text-xs transition-colors ${
                        isEarned
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 font-medium'
                          : 'bg-slate-50 border-slate-200 text-slate-400 opacity-50'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        isEarned ? 'bg-[#46973A] text-white' : 'bg-slate-200 text-slate-400'
                      }`}>
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="block truncate font-bold text-[10px]">{badge.title}</span>
                        <span className="block truncate text-[9px] text-slate-500">{badge.conditionText}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Bottom Close Button (Hidden from Print) */}
            <div className="flex items-center justify-end gap-3 pt-2 print-hide">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
