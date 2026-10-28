import React, { useState } from 'react';
import { ArenaSubTab, MemoryCardPair, CCAOccurrence, QuizQuestion, OperatorProfile } from '../types';
import { MemoryCardGame } from './MemoryCardGame';
import { CaseSimulator } from './CaseSimulator';
import { TimedQuiz } from './TimedQuiz';
import { Layers, ShieldCheck, Award } from 'lucide-react';

interface ArenaViewProps {
  initialSubTab?: ArenaSubTab;
  memoryPairs: MemoryCardPair[];
  cases: CCAOccurrence[];
  questions: QuizQuestion[];
  profile: OperatorProfile;
  onRecordMemoryTime: (seconds: number) => void;
  onRecordCaseCompleted: (caseId: string) => void;
  onRecordQuizScore: (percentage: number) => void;
  onOpenCertificate: () => void;
}

export const ArenaView: React.FC<ArenaViewProps> = ({
  initialSubTab = 'memory',
  memoryPairs,
  cases,
  questions,
  profile,
  onRecordMemoryTime,
  onRecordCaseCompleted,
  onRecordQuizScore,
  onOpenCertificate
}) => {
  const [activeSubTab, setActiveSubTab] = useState<ArenaSubTab>(initialSubTab);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
          Arena de Fixação & Avaliações
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Treinamento Interativo do Operador
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Escolha o modo de treinamento abaixo: pratique termos técnicos no Jogo da Memória, simule ocorrências reais do CCA ou realize o Quiz Oficial com cronômetro.
        </p>
      </div>

      {/* Segmented Mode Selector */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-xl">
        <button
          onClick={() => setActiveSubTab('memory')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'memory'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-700" />
          <span>Jogo da Memória</span>
        </button>

        <button
          onClick={() => setActiveSubTab('simulator')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'simulator'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-sky-700" />
          <span>Simulador CCA</span>
        </button>

        <button
          onClick={() => setActiveSubTab('quiz')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'quiz'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-700" />
          <span>Quiz Avaliativo</span>
        </button>
      </div>

      {/* Render Active Sub Mode */}
      {activeSubTab === 'memory' && (
        <MemoryCardGame
          pairs={memoryPairs}
          onRecordBestTime={onRecordMemoryTime}
          bestTime={profile.memoryBestTime || 0}
        />
      )}

      {activeSubTab === 'simulator' && (
        <CaseSimulator
          cases={cases}
          completedCases={profile.casesCompleted || []}
          onCompleteCase={onRecordCaseCompleted}
        />
      )}

      {activeSubTab === 'quiz' && (
        <TimedQuiz
          questions={questions}
          onRecordScore={onRecordQuizScore}
          bestScore={profile.quizBestScore || 0}
          onOpenCertificate={onOpenCertificate}
        />
      )}

    </div>
  );
};
