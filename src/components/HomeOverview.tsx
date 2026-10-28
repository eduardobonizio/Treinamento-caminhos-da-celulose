import React from 'react';
import { TabType, ArenaSubTab } from '../types';
import { FreeFlowInfographic } from './FreeFlowInfographic';
import { GantryMapSection } from './GantryMapSection';
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
            Segurança, compromisso com o desenvolvimento sustentável e inovação em cada quilômetro da sua viagem. Conheça as diretrizes operacionais do pedágio 100% automático (Free Flow) na Rota da Celulose.
          </p>

          {/* Interactive Carousel Dots like official site */}
          <div className="flex items-center gap-2 my-6">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span className="w-6 h-2 rounded-full bg-[#46973A]" />
            <span className="w-2 h-2 rounded-full bg-white/40" />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onNavigateToTraining}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#46973A] hover:bg-[#387A2E] text-white font-bold text-sm transition-all shadow-md cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Acessar Módulos de Estudo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateToArena('memory')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all cursor-pointer backdrop-blur-xs"
            >
              <Layers className="w-4 h-4 text-[#46973A]" />
              <span>Arena & Jogos de Fixação</span>
            </button>
          </div>
        </div>

        {/* Hero Proof Metrics Strip */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
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
              14 Pórticos
            </span>
            <span className="text-xs text-slate-300 mt-1 block">
              Pontos de leitura sem cancelas físicas
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
              Auditoria contínua no CCA
            </span>
          </div>
        </div>
      </section>

      {/* About Section Styled exactly like official screenshot */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs">
        <div className="max-w-3xl mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2B49] tracking-tight">
            Sobre a Caminhos da Celulose & o Free Flow
          </h2>
          <div className="w-14 h-1 bg-[#46973A] rounded-full mt-2.5 mb-3" />
          <h3 className="text-base font-semibold text-[#1A2B49]/80">
            Compromisso com a segurança viária e o desenvolvimento sustentável do Mato Grosso do Sul.
          </h3>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            A Concessionária Caminhos da Celulose é responsável pela administração, recuperação e modernização de 870,3 km de rodovias estaduais e federais. Nosso objetivo é transformar a experiência do usuário através de tecnologia de livre passagem (Free Flow), serviços de atendimento e obras de infraestrutura que impulsionam o escoamento florestal e o agronegócio sul-mato-grossense.
          </p>
        </div>

        {/* Interactive Gantry Component */}
        <div>
          <div className="mb-4">
            <span className="text-xs font-bold text-[#46973A] uppercase tracking-wider block">
              Tecnologia Embarcada nos Pórticos
            </span>
            <h3 className="text-xl font-bold text-[#1A2B49] mt-0.5">
              Como os Sensores do Free Flow se Comunicam com o CCA
            </h3>
          </div>
          <FreeFlowInfographic />
        </div>
      </section>

      {/* Map of All 14 Gantries with exact KMs on Rota da Celulose */}
      <GantryMapSection />

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
