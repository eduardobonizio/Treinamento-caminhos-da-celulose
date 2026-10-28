import React, { useState, useEffect } from 'react';
import { MemoryCardPair } from '../types';
import { RotateCcw, Clock, Trophy, Sparkles, CheckCircle, HelpCircle } from 'lucide-react';

interface MemoryCardGameProps {
  pairs: MemoryCardPair[];
  onRecordBestTime: (seconds: number) => void;
  bestTime: number;
}

interface PlayCard {
  uniqueId: string;
  pairId: string;
  text: string;
  type: 'term' | 'description';
  category: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryCardGame: React.FC<MemoryCardGameProps> = ({
  pairs,
  onRecordBestTime,
  bestTime
}) => {
  const [cards, setCards] = useState<PlayCard[]>([]);
  const [flippedCardIds, setFlippedCardIds] = useState<string[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [pairLimit, setPairLimit] = useState<number>(6); // 6 pairs (12 cards) or 8 pairs (16 cards)

  // Initialize and shuffle deck
  const initializeGame = (limit = pairLimit) => {
    const selectedPairs = pairs.slice(0, limit);
    const deck: PlayCard[] = [];

    selectedPairs.forEach(p => {
      // Term card
      deck.push({
        uniqueId: `${p.id}-term`,
        pairId: p.id,
        text: p.term,
        type: 'term',
        category: p.category,
        isFlipped: false,
        isMatched: false
      });
      // Description card
      deck.push({
        uniqueId: `${p.id}-desc`,
        pairId: p.id,
        text: p.description,
        type: 'description',
        category: p.category,
        isFlipped: false,
        isMatched: false
      });
    });

    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedCardIds([]);
    setMoves(0);
    setTimerSeconds(0);
    setTimerActive(false);
    setIsGameFinished(false);
  };

  useEffect(() => {
    initializeGame(pairLimit);
  }, [pairs, pairLimit]);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (timerActive && !isGameFinished) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isGameFinished]);

  const handleCardClick = (card: PlayCard) => {
    // If card is already matched, flipped or 2 cards are currently being evaluated, ignore
    if (card.isMatched || card.isFlipped || flippedCardIds.length >= 2) {
      return;
    }

    // Start timer on first move
    if (!timerActive) {
      setTimerActive(true);
    }

    const nextFlipped = [...flippedCardIds, card.uniqueId];
    
    // Flip clicked card
    setCards(prev =>
      prev.map(c => c.uniqueId === card.uniqueId ? { ...c, isFlipped: true } : c)
    );
    setFlippedCardIds(nextFlipped);

    // If 2 cards are flipped, check for match
    if (nextFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const firstCard = cards.find(c => c.uniqueId === nextFlipped[0]);
      const secondCard = card;

      if (firstCard && firstCard.pairId === secondCard.pairId) {
        // MATCH FOUND! Keep cards flipped and visible for 5 seconds (5000ms) before vanishing
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.pairId === firstCard.pairId ? { ...c, isMatched: true, isFlipped: false } : c
            )
          );
          setFlippedCardIds([]);

          // Check if game completed
          const remainingUnmatched = cards.filter(
            c => c.pairId !== firstCard.pairId && !c.isMatched
          ).length;

          if (remainingUnmatched === 0) {
            setIsGameFinished(true);
            setTimerActive(false);
            onRecordBestTime(timerSeconds + 5);
          }
        }, 5000);
      } else {
        // No match: keep cards flipped for 5 seconds (5000ms) so players have time to read and memorize
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              nextFlipped.includes(c.uniqueId) ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCardIds([]);
        }, 5000);
      }
    }
  };

  const remainingPairsCount = Math.ceil(cards.filter(c => !c.isMatched).length / 2);
  const matchedPairsCount = pairLimit - remainingPairsCount;

  const isPairMatch = flippedCardIds.length === 2 && (() => {
    const c1 = cards.find(c => c.uniqueId === flippedCardIds[0]);
    const c2 = cards.find(c => c.uniqueId === flippedCardIds[1]);
    return !!(c1 && c2 && c1.pairId === c2.pairId);
  })();

  return (
    <div className="space-y-6">
      
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
            Jogo da Memória do Free Flow
          </span>
          <span className="text-sm font-semibold text-slate-800">
            Combine o Termo Técnico à sua Definição (Pares corretos desaparecem!)
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-slate-700">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-800" />
            <span className="tabular-nums font-bold text-base text-slate-900">{timerSeconds}s</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>Tentativas:</span>
            <span className="tabular-nums font-bold text-base text-slate-900">{moves}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>Restantes:</span>
            <span className="tabular-nums font-bold text-base text-amber-700">{remainingPairsCount}</span>
          </div>

          {bestTime > 0 && (
            <div className="hidden md:flex items-center gap-1 text-slate-500">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Recorde: {bestTime}s</span>
            </div>
          )}

          <button
            onClick={() => initializeGame()}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-sans font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* 5-Second Review Banner */}
      {flippedCardIds.length === 2 && (
        <div className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-between transition-all ${
          isPairMatch
            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
            : 'bg-amber-50 border-amber-300 text-amber-950 shadow-xs'
        }`}>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 animate-pulse shrink-0" />
            <span>
              {isPairMatch
                ? 'Par correto encontrado! Os cards permanecerão visíveis por 5 segundos antes de sumir do tabuleiro.'
                : 'Os cards permanecerão virados por 5 segundos para você memorizar os conceitos com calma.'}
            </span>
          </span>
          <span className="font-mono font-bold text-[11px] px-2 py-0.5 rounded bg-white/80 border border-current shrink-0">
            5s leitura
          </span>
        </div>
      )}

      {/* Difficulty Switcher */}
      <div className="flex items-center justify-between px-2 text-xs text-slate-500">
        <span>Tamanho do Tabuleiro:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPairLimit(6)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
              pairLimit === 6
                ? 'bg-amber-800 text-white font-semibold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Rápido (6 Pares / 12 Cards)
          </button>
          <button
            onClick={() => setPairLimit(8)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
              pairLimit === 8
                ? 'bg-amber-800 text-white font-semibold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Completo (8 Pares / 16 Cards)
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      {!isGameFinished ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 min-h-[380px]">
          {cards.map((card) => {
            // If matched, make it disappear smoothly!
            if (card.isMatched) {
              return (
                <div
                  key={card.uniqueId}
                  className="rounded-xl border border-dashed border-emerald-200/40 bg-emerald-50/20 p-4 flex items-center justify-center opacity-0 scale-90 pointer-events-none transition-all duration-500"
                >
                  <span className="text-xs text-emerald-600 font-mono">PAR ENCONTRADO</span>
                </div>
              );
            }

            return (
              <div
                key={card.uniqueId}
                onClick={() => handleCardClick(card)}
                className={`perspective-1000 h-36 sm:h-40 cursor-pointer select-none`}
              >
                <div
                  className={`relative w-full h-full duration-500 transform-style-3d transition-transform rounded-xl shadow-xs border ${
                    card.isFlipped
                      ? flippedCardIds.length === 2
                        ? isPairMatch
                          ? 'rotate-y-180 border-2 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                          : 'rotate-y-180 border-2 border-amber-400 shadow-sm'
                        : 'rotate-y-180 border-amber-400'
                      : 'border-slate-200 hover:border-amber-400 hover:shadow-md'
                  }`}
                >
                  {/* Card Back (Facedown - Logo / Free Flow Symbol) */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-xl p-4 flex flex-col items-center justify-center backface-hidden">
                    <div className="w-9 h-9 rounded-full bg-emerald-800/60 border border-emerald-500/40 flex items-center justify-center mb-2">
                      <HelpCircle className="w-5 h-5 text-emerald-300" />
                    </div>
                    <span className="text-xs font-bold tracking-wider text-slate-200 uppercase">
                      Caminhos
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      FREE FLOW
                    </span>
                  </div>

                  {/* Card Front (Faceup - Term or Description) */}
                  <div className="absolute inset-0 w-full h-full bg-white text-slate-900 rounded-xl p-3 sm:p-4 flex flex-col justify-between rotate-y-180 backface-hidden overflow-y-auto">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-amber-700 block mb-1">
                        {card.type === 'term' ? 'CONCEITO / SIGLA' : 'DEFINIÇÃO OPERACIONAL'}
                      </span>
                      <p className={`font-semibold leading-snug ${
                        card.type === 'term' ? 'text-sm text-slate-950 font-bold' : 'text-xs text-slate-700'
                      }`}>
                        {card.text}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{card.category}</span>
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Victory Screen */
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-extrabold text-slate-900">
            Excelente Memória Operacional!
          </h3>
          
          <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
            Você eliminou todos os pares do tabuleiro associando com precisão os termos técnicos de Free Flow e normas do CCA.
          </p>

          <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-4 text-center">
            <div>
              <span className="text-xs text-slate-500 block">Tempo Total</span>
              <span className="text-2xl font-extrabold font-mono text-emerald-800 tabular-nums">
                {timerSeconds}s
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Total de Tentativas</span>
              <span className="text-2xl font-extrabold font-mono text-slate-900 tabular-nums">
                {moves}
              </span>
            </div>
          </div>

          <button
            onClick={() => initializeGame()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
          >
            Jogar Outra Rodada
          </button>
        </div>
      )}

    </div>
  );
};
