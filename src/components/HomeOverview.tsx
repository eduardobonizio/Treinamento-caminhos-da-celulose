import React from 'react';
import { ArenaSubTab } from '../types';
import { GantryMapSection } from './GantryMapSection';
import { MapPin, HelpCircle, ArrowRight } from 'lucide-react';

interface HomeOverviewProps {
  onNavigateToTraining?: () => void;
  onNavigateToArena?: (subTab?: ArenaSubTab) => void;
  onNavigateToFaq?: () => void;
  completedModulesCount?: number;
  totalModulesCount?: number;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({ onNavigateToFaq }) => {
  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section matching official website style */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1A2B49] via-[#16243E] to-[#0D182B] text-white p-8 sm:p-14 border border-slate-200/20 shadow-xl">
        {/* Subtle decorative highway curve glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#46973A]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#1A2B49]/40 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-xs text-xs font-semibold text-emerald-300 tracking-wider uppercase mb-4 border border-white/10">
            <span>Concessionária Caminhos da Celulose</span>
            <span>·</span>
            <span>CCA</span>
          </div>

          {/* Slogan from official website */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Sua companhia para chegar lá
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
            Segurança, compromisso com o desenvolvimento sustentável e inovação em cada quilômetro da sua viagem. Conheça as diretrizes operacionais do sistema de pedágio eletrônico na Rota da Celulose.
          </p>

          {/* Interactive Carousel Dots like official site */}
          <div className="flex items-center gap-2 my-6">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span className="w-6 h-2 rounded-full bg-[#46973A]" />
            <span className="w-2 h-2 rounded-full bg-white/40" />
          </div>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap gap-2 text-xs font-medium">
            <span className="bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10 text-slate-200">
              Operação Ininterrupta 24h
            </span>
            <span className="bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10 text-slate-200">
              Auditoria Automática & Manual
            </span>
            <span className="bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10 text-slate-200">
              Regulação Oficial AGEMS
            </span>
          </div>
        </div>

        {/* Floating Quick Key Metrics */}
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold font-mono text-[#46973A] tabular-nums">
              870,3 km
            </span>
            <span className="text-xs text-slate-300 mt-1 block">
              Malha concedida na Rota da Celulose
            </span>
          </div>

          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums">
              12 Pontos
            </span>
            <span className="text-xs text-slate-300 mt-1 block">
              Pontos de cobrança eletrônica
            </span>
          </div>

          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold font-mono text-amber-400 tabular-nums">
              30 Dias
            </span>
            <span className="text-xs text-slate-300 mt-1 block">
              Prazo legal para condutores sem TAG
            </span>
          </div>

          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold font-mono text-sky-300 tabular-nums">
              24h / 7d
            </span>
            <span className="text-xs text-slate-300 mt-1 block">
              Monitoramento pelo CCA
            </span>
          </div>
        </div>
      </section>

      {/* Highway Network Matrix: Caminhos da Celulose */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
            Malha Rodoviária Concedida
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            As Rodovias da Concessão e Localização dos Pórticos
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            A Rota da Celulose conecta polos estratégicos da indústria florestal e agronegócio em Mato Grosso do Sul.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-2 font-mono font-bold text-sm text-slate-900">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>BR-262</span>
            </div>
            <span className="text-xs text-slate-600 mt-1.5 block">
              Trecho entre Campo Grande, Ribas do Rio Pardo e Três Lagoas. Corredor vital de escoamento das fábricas de celulose.
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-2 font-mono font-bold text-sm text-slate-900">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>BR-267</span>
            </div>
            <span className="text-xs text-slate-600 mt-1.5 block">
              Ligação com Bataguassu e a divisa do estado de São Paulo, polo de cargas pesadas e tráfego interestadual.
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-2 font-mono font-bold text-sm text-slate-900">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>MS-040</span>
            </div>
            <span className="text-xs text-slate-600 mt-1.5 block">
              Conexão direta entre Campo Grande e Santa Rita do Pardo, rota de integração com o leste sul-mato-grossense.
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-2 font-mono font-bold text-sm text-slate-900">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>MS-338</span>
            </div>
            <span className="text-xs text-slate-600 mt-1.5 block">
              Interligação de Ribas do Rio Pardo e Camapuã, rodovia estratégica para o transporte florestal de madeira.
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-2 font-mono font-bold text-sm text-slate-900">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>MS-395</span>
            </div>
            <span className="text-xs text-slate-600 mt-1.5 block">
              Trecho conectando Bataguassu e Brasilândia, com ligação à malha hidroviária e portos fluviais.
            </span>
          </div>

          <div className="p-4 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/40 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-900 block">Total de 12 Pontos de Cobrança</span>
              <span className="text-xs text-emerald-700 mt-1 block">
                Distribuídos em 870,3 km de rodovias (incluindo 2 pontos com estruturas bidirecionais onde as pistas se dividem, totalizando 14 pórticos físicos).
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-800 font-semibold mt-2">
              AGEMS · REGULAÇÃO OFICIAL
            </span>
          </div>

        </div>
      </section>

      {/* Quick FAQ Guide Access Banner */}
      {onNavigateToFaq && (
        <section className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 rounded-3xl border border-emerald-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#46973A] text-white rounded-2xl shadow-xs shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#46973A] uppercase tracking-wider">
                  Guia do Motorista & Dúvidas
                </span>
                <span className="text-xs font-mono text-slate-400">·</span>
                <span className="text-xs font-medium text-slate-500">12 Categorias Explicadas</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#1A2B49]">
                Tem dúvidas sobre como funciona o Pedágio Eletrônico?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                Consulte nosso FAQ completo: passo a passo para pagar com Pix, prazo de 30 dias pelo CTB, descontos de TAG, regras para veículos alugados e prevenção contra golpes.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onNavigateToFaq}
            className="px-5 py-3 rounded-2xl bg-[#1A2B49] hover:bg-[#121E33] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shrink-0 self-stretch md:self-auto justify-center"
          >
            <span>Acessar Perguntas Frequentes</span>
            <ArrowRight className="w-4 h-4 text-[#46973A]" />
          </button>
        </section>
      )}

      {/* Map of All 12 Payment Points on Rota da Celulose */}
      <GantryMapSection />

    </div>
  );
};
