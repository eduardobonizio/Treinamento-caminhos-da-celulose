import React from 'react';
import { TabType, ArenaSubTab } from '../types';
import { FreeFlowInfographic } from './FreeFlowInfographic';
import { BookOpen, Layers, ShieldCheck, ArrowRight, MapPin, Zap, Clock, FileCheck } from 'lucide-react';

interface HomeOverviewProps {
  onNavigateToTraining: () => void;
  onNavigateToArena: (subTab?: ArenaSubTab) => void;
  completedModulesCount: number;
  totalModulesCount: number;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  onNavigateToTraining,
  onNavigateToArena,
  completedModulesCount,
  totalModulesCount
}) => {
  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-lg">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-3">
            <span>Concessionária Caminhos da Celulose</span>
            <span>·</span>
            <span>Centro de Controle de Arrecadação (CCA)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Capacitação Operacional em Free Flow
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Bem-vindo ao portal de formação técnica da Rota da Celulose. O sistema de pedágio 100% automático e sem cancelas está transformando as rodovias de Mato Grosso do Sul — e o papel do operador do CCA é fundamental para garantir fluidez, justiça tarifária e segurança de dados.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onNavigateToTraining}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-md cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Iniciar Módulos de Estudo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateToArena('memory')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Acessar Jogos & Simulador</span>
            </button>
          </div>
        </div>

        {/* Hero Proof Metrics Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">
              870,3 km
            </span>
            <span className="text-xs text-slate-400 mt-1 block">
              Malha concedida na Rota da Celulose
            </span>
          </div>

          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums">
              14 Pórticos
            </span>
            <span className="text-xs text-slate-400 mt-1 block">
              Pontos de leitura eletrônica sem cancelas
            </span>
          </div>

          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold font-mono text-amber-400 tabular-nums">
              30 Dias
            </span>
            <span className="text-xs text-slate-400 mt-1 block">
              Prazo legal para condutores sem TAG
            </span>
          </div>

          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold font-mono text-sky-400 tabular-nums">
              24h / 7d
            </span>
            <span className="text-xs text-slate-400 mt-1 block">
              Auditoria e triagem contínua no CCA
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Gantry Component */}
      <section>
        <div className="mb-4">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
            Tecnologia Embarcada
          </span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Como os Sensores do Free Flow se Comunicam com o CCA
          </h2>
        </div>
        <FreeFlowInfographic />
      </section>

      {/* Quick Navigation Cards: 3 Interactive Learning Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Capacitação Teórica */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-all shadow-xs">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Trilha de Capacitação CCA
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              4 módulos dinâmicos detalhando sensores, POPs de triagem, verificação de eixos suspensos e legislação de evasão (Art. 209-A CTB).
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">
              Progresso: {completedModulesCount}/{totalModulesCount}
            </span>
            <button
              onClick={onNavigateToTraining}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
            >
              <span>Estudar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Jogo da Memória de Termos */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-all shadow-xs">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Jogo da Memória Operacional
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Associe os termos técnicos do Free Flow às suas definições reais. Cada par correto desaparece do tabuleiro! Treine sua velocidade.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Descarte de pares
            </span>
            <button
              onClick={() => onNavigateToArena('memory')}
              className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
            >
              <span>Jogar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: Simulador de Casos Práticos */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-all shadow-xs">
          <div>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Simulador de Ocorrências CCA
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Analise cenários reais de triagem: placas encobertas, ambulâncias, eixos suspensos e tome a decisão correta de acordo com o POP.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Casos Reais do POP
            </span>
            <button
              onClick={() => onNavigateToArena('simulator')}
              className="text-xs font-bold text-sky-800 hover:text-sky-950 flex items-center gap-1 cursor-pointer"
            >
              <span>Simular</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
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
              <span className="text-xs font-bold text-emerald-900 block">Total de 14 Pórticos</span>
              <span className="text-xs text-emerald-700 mt-1 block">
                Monitorados ininterruptamente pelo Centro de Controle de Arrecadação (CCA).
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-800 font-semibold mt-2">
              AGEMS · REGULAÇÃO OFICIAL
            </span>
          </div>

        </div>
      </section>

    </div>
  );
};
