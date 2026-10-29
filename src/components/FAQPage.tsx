import React, { useState, useMemo } from 'react';
import { 
  Search, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Calculator, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Sparkles, 
  ArrowRight,
  MapPin,
  Car,
  Truck,
  RotateCcw
} from 'lucide-react';
import { FAQ_CATEGORIES, OFFICIAL_GANTRIES_FAQ, FAQCategory, FAQQuestion } from '../data/faqData';

interface FAQPageProps {
  onGoToCalculator?: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onGoToCalculator }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({
    'q1-1': true,
    'q1-2': true,
    'q4-4': true
  });

  const toggleQuestion = (id: string) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = (questionIds: string[]) => {
    const nextState: Record<string, boolean> = {};
    questionIds.forEach(id => {
      nextState[id] = true;
    });
    setExpandedQuestions(nextState);
  };

  const collapseAll = () => {
    setExpandedQuestions({});
  };

  // Filtered categories and questions based on category selection and search
  const filteredData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return FAQ_CATEGORIES.map(category => {
      // Category filter match
      if (selectedCategoryId !== 'all' && category.id !== selectedCategoryId) {
        return null;
      }

      // Filter questions within category
      const matchedQuestions = category.questions.filter(q => {
        if (!query) return true;
        const inQuestion = q.question.toLowerCase().includes(query);
        const inAnswer = q.answer.toLowerCase().includes(query);
        const inTip = q.friendlyTip?.toLowerCase().includes(query);
        const inHighlights = q.highlights?.some(h => h.toLowerCase().includes(query));
        return inQuestion || inAnswer || inTip || inHighlights;
      });

      if (matchedQuestions.length === 0) return null;

      return {
        ...category,
        questions: matchedQuestions
      };
    }).filter((c): c is FAQCategory => c !== null);
  }, [searchQuery, selectedCategoryId]);

  const allFilteredQuestionIds = useMemo(() => {
    return filteredData.flatMap(c => c.questions.map(q => q.id));
  }, [filteredData]);

  const totalQuestionsCount = useMemo(() => {
    return FAQ_CATEGORIES.reduce((acc, cat) => acc + cat.questions.length, 0);
  }, []);

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1A2B49] via-[#16243E] to-[#0D182B] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-200/20 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#46973A]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-xs text-xs font-semibold text-emerald-300 tracking-wider uppercase border border-white/10">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Guia Oficial do Usuário · Central de Dúvidas</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Perguntas Frequentes sobre o Pedágio Eletrônico
          </h1>

          <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed">
            Tire todas as suas dúvidas sobre o funcionamento do pedágio 100% digital, sem cancelas e sem paradas da Rota da Celulose: como pagar em até 30 dias, formas de desconto com TAG, prevenção contra golpes e regras da concessão.
          </p>

          {/* Quick Notice Pill */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Regulamentado pela AGEMS</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>Prazo legal de 30 dias pelo CTB</span>
            </span>
            {onGoToCalculator && (
              <button
                type="button"
                onClick={onGoToCalculator}
                className="inline-flex items-center gap-1.5 bg-[#46973A] hover:bg-[#3d8332] text-white font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer text-xs shadow-xs"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Simular Tarifa na Calculadora</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search and Category Control Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquise por qualquer tema (ex: Pix, 30 dias, multa, carro alugado, eixo suspenso, TAG, moto)..."
            className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 text-sm font-medium rounded-2xl text-slate-900 focus:bg-white focus:border-[#46973A] focus:ring-2 focus:ring-[#46973A]/20 focus:outline-none transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700 bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded-lg transition-colors cursor-pointer"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Categories Horizontal Tabs */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Navegar por Categoria ({FAQ_CATEGORIES.length} temas):
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => expandAll(allFilteredQuestionIds)}
                className="text-xs font-bold text-[#46973A] hover:underline cursor-pointer"
              >
                Expandir Todas
              </button>
              <span className="text-slate-300">·</span>
              <button
                type="button"
                onClick={collapseAll}
                className="text-xs font-bold text-slate-500 hover:underline cursor-pointer"
              >
                Recolher
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategoryId('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedCategoryId === 'all'
                  ? 'bg-[#1A2B49] text-white border-[#1A2B49] shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              Todos os Tópicos ({totalQuestionsCount})
            </button>

            {FAQ_CATEGORIES.map(category => {
              const isSelected = selectedCategoryId === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategoryId(category.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#46973A] text-white border-[#46973A] shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {category.shortTitle}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Search results banner if searching */}
      {searchQuery && (
        <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 font-medium">
          <span>
            Mostrando resultados para: <strong>"{searchQuery}"</strong> ({allFilteredQuestionIds.length} {allFilteredQuestionIds.length === 1 ? 'pergunta encontrada' : 'perguntas encontradas'})
          </span>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-emerald-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ver todas as perguntas</span>
          </button>
        </div>
      )}

      {/* Main FAQ Accordion List by Categories */}
      {filteredData.length > 0 ? (
        <div className="space-y-8">
          {filteredData.map(category => (
            <div 
              key={category.id} 
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4"
            >
              {/* Category Header */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#46973A]" />
                  <h2 className="text-lg sm:text-xl font-extrabold text-[#1A2B49]">
                    {category.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 pl-4.5">
                  {category.description}
                </p>
              </div>

              {/* Questions Accordion */}
              <div className="space-y-3">
                {category.questions.map(q => {
                  const isExpanded = !!expandedQuestions[q.id];

                  return (
                    <div 
                      key={q.id}
                      className={`rounded-2xl border transition-all ${
                        isExpanded 
                          ? 'border-[#46973A]/40 bg-slate-50/70 shadow-2xs' 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      {/* Question Trigger */}
                      <button
                        type="button"
                        onClick={() => toggleQuestion(q.id)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      >
                        <span className="font-bold text-sm sm:text-base text-[#1A2B49] leading-snug">
                          {q.question}
                        </span>
                        <div className={`p-1.5 rounded-xl transition-transform ${isExpanded ? 'bg-[#46973A] text-white rotate-180' : 'bg-slate-100 text-slate-600'}`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {/* Answer Body */}
                      {isExpanded && (
                        <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-1 space-y-3.5 text-xs sm:text-sm text-slate-700 border-t border-slate-200/60 mt-1 animate-fadeIn">
                          {/* Main Text Answer */}
                          <div className="whitespace-pre-line leading-relaxed">
                            {q.answer}
                          </div>

                          {/* Highlights Pills */}
                          {q.highlights && q.highlights.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                              {q.highlights.map((h, i) => (
                                <span 
                                  key={i}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold text-xs"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#46973A]" />
                                  <span>{h}</span>
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Friendly Tip Box */}
                          {q.friendlyTip && (
                            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-950 flex items-start gap-2.5">
                              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                              <div className="leading-relaxed">
                                <strong className="font-semibold text-blue-900">Dica Prática:</strong> {q.friendlyTip}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Special Addition for Category 12: Official Gantries Table */}
              {category.id === 'tabela-porticos-tarifas' && (
                <div className="pt-4 space-y-4">
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-[#1A2B49] text-white font-mono uppercase text-[11px] tracking-wider">
                        <tr>
                          <th className="py-3 px-3.5">Rodovia</th>
                          <th className="py-3 px-3.5">Pórtico</th>
                          <th className="py-3 px-3.5">Código</th>
                          <th className="py-3 px-3.5">Estaca / KM</th>
                          <th className="py-3 px-3.5">Município de Referência</th>
                          <th className="py-3 px-3.5 text-right">Tarifa Base (CAT 1)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {OFFICIAL_GANTRIES_FAQ.map((gantry, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="py-2.5 px-3.5 font-bold text-[#1A2B49]">
                              <span className="font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-[#46973A]">
                                {gantry.highway}
                              </span>
                            </td>
                            <td className="py-2.5 px-3.5 font-mono font-bold text-slate-800">
                              {gantry.code}
                            </td>
                            <td className="py-2.5 px-3.5 font-mono text-slate-500">
                              {gantry.pffCode}
                            </td>
                            <td className="py-2.5 px-3.5 font-mono font-semibold text-slate-700">
                              km {gantry.km}
                            </td>
                            <td className="py-2.5 px-3.5 text-slate-700 font-medium">
                              <div>{gantry.city}</div>
                              {gantry.note && (
                                <div className="text-[10px] text-amber-700 font-normal">
                                  {gantry.note}
                                </div>
                              )}
                            </td>
                            <td className="py-2.5 px-3.5 text-right font-mono font-bold text-[#1A2B49]">
                              R$ {gantry.baseFee.toFixed(2).replace('.', ',')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-emerald-900 block">
                        Deseja calcular o valor exato para o seu veículo e sua rota?
                      </span>
                      <p className="text-xs text-emerald-800">
                        Acesse nossa calculadora interativa para selecionar cidades de origem e destino, eixos comerciais e descontos de TAG.
                      </p>
                    </div>

                    {onGoToCalculator && (
                      <button
                        type="button"
                        onClick={onGoToCalculator}
                        className="px-4 py-2 bg-[#1A2B49] hover:bg-[#121E33] text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-2 shrink-0"
                      >
                        <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Abrir Calculadora</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="text-base font-bold text-[#1A2B49]">
            Nenhuma pergunta encontrada para "{searchQuery}"
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Tente buscar por termos mais simples, como "pagamento", "prazo", "tag", "multa" ou escolha uma das categorias acima.
          </p>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setSelectedCategoryId('all'); }}
            className="px-4 py-2 bg-[#1A2B49] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[#121E33] transition-colors"
          >
            Redefinir Busca
          </button>
        </div>
      )}

      {/* Final Safety & Anti-Fraud Warning Box */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-4">
        <div className="p-2.5 rounded-2xl bg-amber-500 text-white shrink-0 mt-0.5 shadow-xs">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1.5 text-xs sm:text-sm text-amber-950">
          <h4 className="font-extrabold text-amber-900 text-sm sm:text-base">
            Alerta Importante: Cuidado com Golpes de Falsos Pedágios na Internet
          </h4>
          <p className="leading-relaxed">
            Nunca realize pagamentos de pedágio através de links recebidos por SMS, e-mails não solicitados ou mensagens de WhatsApp. A Concessionária Caminhos da Celulose <strong>não envia chaves Pix pessoais</strong>.
          </p>
          <p className="leading-relaxed font-semibold text-amber-900">
            A consulta de débitos e geração de código Pix deve ser realizada exclusivamente através do site oficial ou aplicativo oficial da concessionária. Ao efetuar o Pix em seu banco, verifique sempre se o nome do recebedor é <strong>Concessionária Caminhos da Celulose</strong>.
          </p>
        </div>
      </div>

    </div>
  );
};
