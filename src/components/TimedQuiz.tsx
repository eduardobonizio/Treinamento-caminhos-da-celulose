import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { Clock, CheckCircle2, XCircle, RotateCcw, Award, ChevronRight, Check } from 'lucide-react';

interface TimedQuizProps {
  questions: QuizQuestion[];
  onRecordScore: (percentage: number) => void;
  bestScore: number;
  onOpenCertificate: () => void;
}

export const TimedQuiz: React.FC<TimedQuizProps> = ({
  questions,
  onRecordScore,
  bestScore,
  onOpenCertificate
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [timerEnabled, setTimerEnabled] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(30); // 30s per question if enabled

  const currentQ = questions[currentIdx] || questions[0];

  // Timer per question
  useEffect(() => {
    let timer: any = null;
    if (timerEnabled && !quizFinished && !isAnswerConfirmed) {
      if (timeLeft <= 0) {
        // Auto-confirm empty or whatever selected
        handleConfirmAnswer();
        return;
      }
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerEnabled, timeLeft, quizFinished, isAnswerConfirmed]);

  const handleSelectOption = (idx: number) => {
    if (isAnswerConfirmed) return;
    setSelectedOpt(idx);
  };

  const handleConfirmAnswer = () => {
    setIsAnswerConfirmed(true);
    if (selectedOpt !== null) {
      setUserAnswers(prev => ({ ...prev, [currentIdx]: selectedOpt }));
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setIsAnswerConfirmed(false);
      setTimeLeft(30);
    } else {
      // Quiz completed!
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / questions.length) * 100);
    onRecordScore(percentage);
    setQuizFinished(true);
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setUserAnswers({});
    setSelectedOpt(null);
    setIsAnswerConfirmed(false);
    setQuizFinished(false);
    setTimeLeft(30);
  };

  // Calculate results
  const correctCount = questions.reduce((acc, q, idx) => {
    return userAnswers[idx] === q.correctIndex ? acc + 1 : acc;
  }, 0);
  const finalPercentage = Math.round((correctCount / questions.length) * 100);
  const isApproved = finalPercentage >= 70;

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
            Avaliação Oficial de Desempenho
          </span>
          <span className="text-sm font-semibold text-slate-800">
            Quiz Avaliativo do Free Flow & Operações de CCA
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs">
          {timerEnabled && !quizFinished && (
            <div className="flex items-center gap-1.5 font-mono">
              <Clock className={`w-4 h-4 ${timeLeft < 10 ? 'text-rose-600 animate-pulse' : 'text-slate-600'}`} />
              <span className={`tabular-nums font-bold text-base ${timeLeft < 10 ? 'text-rose-600 font-extrabold' : 'text-slate-900'}`}>
                {timeLeft}s
              </span>
            </div>
          )}

          <div className="text-slate-500 font-mono">
            Pergunta {currentIdx + 1} de {questions.length}
          </div>

          {bestScore > 0 && (
            <div className="hidden sm:flex items-center gap-1 text-slate-600 font-mono">
              <span>Melhor Nota:</span>
              <strong className="text-emerald-800">{bestScore}%</strong>
            </div>
          )}
        </div>
      </div>

      {!quizFinished ? (
        /* Quiz Question Deck */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-3xl mx-auto space-y-6">
          
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
            <span>Categoria: {currentQ.category}</span>
            <span>Dificuldade: {currentQ.difficulty}</span>
          </div>

          {/* Question Text */}
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {currentQ.question}
          </h3>

          {/* Options List */}
          <div className="space-y-3">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedOpt === optIdx;
              const isCorrect = optIdx === currentQ.correctIndex;
              
              let optionStyle = 'border-slate-200 bg-white hover:border-slate-300 text-slate-800';
              if (isAnswerConfirmed) {
                if (isCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                } else if (isSelected) {
                  optionStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                } else {
                  optionStyle = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'border-emerald-800 bg-emerald-50 text-emerald-950 font-semibold';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isAnswerConfirmed}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs shrink-0 font-mono">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-relaxed">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Answer Confirmation / Explanation Feedback */}
          {isAnswerConfirmed && (
            <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
              selectedOpt === currentQ.correctIndex
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}>
              <span className="font-bold block mb-1">
                {selectedOpt === currentQ.correctIndex ? 'Resposta Correta!' : 'Gabarito Oficial:'}
              </span>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setTimerEnabled(!timerEnabled)}
              className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {timerEnabled ? 'Desativar cronômetro' : 'Ativar cronômetro (30s)'}
            </button>

            {!isAnswerConfirmed ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={selectedOpt === null}
                className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedOpt !== null
                    ? 'bg-emerald-800 hover:bg-emerald-900 text-white cursor-pointer shadow-xs'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Confirmar Resposta
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              >
                <span>{currentIdx < questions.length - 1 ? 'Próxima Questão' : 'Ver Resultado Final'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Results View */
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm space-y-6">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto ${
            isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              {isApproved ? 'Aprovado na Avaliação do CCA!' : 'Avaliação Concluída!'}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {isApproved
                ? 'Parabéns! Você demonstrou domínio sobre os procedimentos do Free Flow e regulação da AGEMS.'
                : 'Você precisa de 70% de acertos para atingir a nota mínima de aprovação. Revise os módulos e tente novamente.'}
            </p>
          </div>

          {/* Score metrics */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono">
            <div>
              <span className="text-[11px] text-slate-500 block">Aproveitamento</span>
              <span className="text-2xl font-extrabold text-emerald-800 tabular-nums">
                {finalPercentage}%
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Acertos</span>
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                {correctCount}/{questions.length}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Status</span>
              <span className={`text-base font-bold ${isApproved ? 'text-emerald-700' : 'text-amber-700'}`}>
                {isApproved ? 'APROVADO' : 'EM REVISÃO'}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={restartQuiz}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#1A2B49] hover:bg-[#121E33] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Refazer Quiz Avaliativo</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
