import React, { useState } from 'react';
import { CCAOccurrence } from '../types';
import { ShieldCheck, CheckCircle2, XCircle, AlertCircle, ArrowRight, RotateCcw, Eye, Camera, Tag } from 'lucide-react';

interface CaseSimulatorProps {
  cases: CCAOccurrence[];
  completedCases: string[];
  onCompleteCase: (caseId: string) => void;
}

export const CaseSimulator: React.FC<CaseSimulatorProps> = ({
  cases,
  completedCases,
  onCompleteCase
}) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const currentCase = cases[currentCaseIndex] || cases[0];
  const isCaseCompleted = completedCases.includes(currentCase?.id);

  const handleSelectOption = (optId: string) => {
    if (submitted) return;
    setSelectedOptionId(optId);
  };

  const handleSubmitDecision = () => {
    if (!selectedOptionId) return;
    setSubmitted(true);
    const chosen = currentCase.options.find(o => o.id === selectedOptionId);
    if (chosen?.isCorrect) {
      onCompleteCase(currentCase.id);
    }
  };

  const handleNextCase = () => {
    if (currentCaseIndex < cases.length - 1) {
      setCurrentCaseIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setSubmitted(false);
    }
  };

  const handlePrevCase = () => {
    if (currentCaseIndex > 0) {
      setCurrentCaseIndex(prev => prev - 1);
      setSelectedOptionId(null);
      setSubmitted(false);
    }
  };

  const handleRestartCase = () => {
    setSelectedOptionId(null);
    setSubmitted(false);
  };

  const selectedOption = currentCase.options.find(o => o.id === selectedOptionId);

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Stepper */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block">
            Mesa de Triagem Operacional · CCA
          </span>
          <span className="text-sm font-semibold text-slate-800">
            Simulador de Procedimentos Operacionais Padrão (POP)
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-500 font-mono">
            Caso {currentCaseIndex + 1} de {cases.length}
          </span>
          <div className="flex gap-1.5">
            {cases.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => {
                  setCurrentCaseIndex(idx);
                  setSelectedOptionId(null);
                  setSubmitted(false);
                }}
                className={`w-7 h-7 rounded-lg font-mono text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                  currentCaseIndex === idx
                    ? 'bg-sky-800 text-white shadow-xs'
                    : completedCases.includes(c.id)
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Terminal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Terminal Telemetry & Camera Inspection (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 text-white rounded-2xl border border-slate-800 overflow-hidden shadow-md">
          
          {/* Terminal Header */}
          <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SISTEMA DE AUDITORIA DE IMAGENS · CCA
            </span>
            <span className="text-slate-400">ID: {currentCase.id.toUpperCase()}</span>
          </div>

          <div className="p-5 space-y-4">
            
            {/* Gantry & Passage Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Rodovia</span>
                <span className="text-white font-bold">{currentCase.highway}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Pórtico / Local</span>
                <span className="text-slate-200 truncate block">{currentCase.gantryId}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Registro / Faixa</span>
                <span className="text-slate-200">{currentCase.timestamp}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Tipo de Veículo</span>
                <span className="text-white font-semibold">{currentCase.vehicleType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Velocidade Medida</span>
                <span className="text-emerald-400 font-bold">{currentCase.speed}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Status da TAG RFID</span>
                <span className={currentCase.tagDetected ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                  {currentCase.tagDetected ? 'ATIVA / LIDA' : 'NÃO DETECTADA'}
                </span>
              </div>
            </div>

            {/* OCR Comparison Box */}
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide block mb-2">
                Comparativo de OCR Automático (Frontal vs. Traseiro)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">CÂMERA FRONTAL:</span>
                  <span className="text-amber-300 font-bold text-sm block mt-0.5">{currentCase.frontPlateOcr}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">CÂMERA TRASEIRA:</span>
                  <span className="text-emerald-400 font-bold text-sm block mt-0.5">{currentCase.rearPlateOcr}</span>
                </div>
              </div>
            </div>

            {/* Axles Scanner read */}
            <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono">
              <span>Eixos Detectados no Asfalto: <strong className="text-white">{currentCase.detectedAxles}</strong></span>
              <span>Eixos Suspensos: <strong className={currentCase.suspendedAxles > 0 ? 'text-amber-400 font-bold' : 'text-slate-400'}>{currentCase.suspendedAxles}</strong></span>
            </div>

            {/* Camera Visual Inspection Window */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 relative">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="flex items-center gap-1.5 font-mono">
                  <Camera className="w-3.5 h-3.5 text-sky-400" />
                  FEED VISUAL DE ALTA RESOLUÇÃO
                </span>
                <span className="text-[11px] font-mono text-slate-500">ZOOM 100% DISPONÍVEL</span>
              </div>

              {/* Graphic visual representing camera view */}
              <div className="h-36 rounded-lg bg-slate-950 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-2 right-2 text-[10px] font-mono bg-slate-900/80 px-2 py-0.5 rounded text-slate-400 border border-slate-800">
                  CAM_02_LANE_{currentCase.lane}
                </div>
                
                {/* Visual target reticle */}
                <div className="text-center my-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-700 text-xs font-mono">
                    <Eye className="w-4 h-4 text-sky-400" />
                    <span className="text-slate-200">{currentCase.imageHint}</span>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-500 flex justify-between">
                  <span>RES: 4096x2160 · 60 FPS</span>
                  <span>IR_ILLUM: 850nm ON</span>
                </div>
              </div>
            </div>

            {/* Scenario Description */}
            <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-white block mb-1">Descrição da Ocorrência:</span>
              <p>{currentCase.scenarioDescription}</p>
            </div>

          </div>
        </div>

        {/* Right: Decision Matrix & Action Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block">
              Ação Operacional do Auditor
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              {currentCase.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Avalie as evidências do pórtico e selecione a conduta prevista no POP:
            </p>
          </div>

          {/* Decision Choices */}
          <div className="mt-4 space-y-3">
            {currentCase.options.map((option) => {
              const isSelected = selectedOptionId === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  disabled={submitted}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'border-sky-800 bg-sky-50 text-sky-950 font-semibold shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 shrink-0 ${
                      isSelected ? 'border-sky-800 bg-sky-800 text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="leading-relaxed">{option.actionText}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Submit Action */}
          {!submitted ? (
            <div className="mt-6">
              <button
                onClick={handleSubmitDecision}
                disabled={!selectedOptionId}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-xs ${
                  selectedOptionId
                    ? 'bg-sky-800 hover:bg-sky-900 text-white cursor-pointer'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Confirmar Decisão no CCA
              </button>
            </div>
          ) : (
            /* Decision Feedback Box */
            <div className="mt-6 space-y-4">
              {selectedOption && (
                <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                  selectedOption.isCorrect
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}>
                  <div className="flex items-center gap-2 font-bold mb-1.5">
                    {selectedOption.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>Decisão Correta · Procedimento Aprovado!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-700" />
                        <span>Decisão Incorreta · Risco Operacional</span>
                      </>
                    )}
                  </div>
                  <p>{selectedOption.feedback}</p>
                </div>
              )}

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={handleRestartCase}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Tentar Novamente</span>
                </button>

                {currentCaseIndex < cases.length - 1 ? (
                  <button
                    onClick={handleNextCase}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>Próximo Caso</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-xs font-bold text-emerald-800">
                    Todos os casos concluídos!
                  </span>
                )}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
