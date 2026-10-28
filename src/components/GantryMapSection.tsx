import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Filter, CheckCircle2, Info, ChevronRight } from 'lucide-react';

export interface GantryLocation {
  id: string;
  number: number;
  highway: 'BR-262' | 'MS-040' | 'BR-267' | 'MS-338';
  km: number;
  stretch: string;
  cities: string;
  gantriesCount: number;
  description: string;
  coords: { x: number; y: number }; // Relative coordinates for SVG map (0-800 x 0-480)
}

export const gantryLocations: GantryLocation[] = [
  // BR-262 (Três Lagoas -> Água Clara -> Ribas do Rio Pardo -> Campo Grande)
  {
    id: 'g-262-1',
    number: 1,
    highway: 'BR-262',
    km: 39,
    stretch: 'Entre Três Lagoas e Água Clara',
    cities: 'Três Lagoas · Água Clara',
    gantriesCount: 1,
    description: 'Pórtico próximo ao polo industrial de Três Lagoas. Monitora alto fluxo de caminhões florestais e cargas industriais.',
    coords: { x: 680, y: 150 }
  },
  {
    id: 'g-262-2',
    number: 2,
    highway: 'BR-262',
    km: 104,
    stretch: 'Entre Três Lagoas e Água Clara',
    cities: 'Água Clara',
    gantriesCount: 1,
    description: 'Ponto estratégico intermediário no corredor leste de Mato Grosso do Sul.',
    coords: { x: 550, y: 140 }
  },
  {
    id: 'g-262-3',
    number: 3,
    highway: 'BR-262',
    km: 207,
    stretch: 'Entre Água Clara e Ribas do Rio Pardo',
    cities: 'Água Clara · Ribas do Rio Pardo',
    gantriesCount: 1,
    description: 'Trecho de aproximação do grande polo de celulose em Ribas do Rio Pardo. Elevado tráfego de tritrens e bitrens.',
    coords: { x: 390, y: 135 }
  },
  {
    id: 'g-262-4',
    number: 4,
    highway: 'BR-262',
    km: 292,
    stretch: 'Entre Ribas do Rio Pardo e Campo Grande',
    cities: 'Ribas do Rio Pardo · Campo Grande',
    gantriesCount: 2,
    description: 'Trecho duplicado com 2 pórticos instalados para leitura bidirecional no acesso à capital Campo Grande.',
    coords: { x: 230, y: 155 }
  },

  // MS-040 (Campo Grande -> Santa Rita do Pardo)
  {
    id: 'g-040-1',
    number: 5,
    highway: 'MS-040',
    km: 47,
    stretch: 'Entre Campo Grande e Santa Rita do Pardo',
    cities: 'Campo Grande',
    gantriesCount: 1,
    description: 'Saída leste da capital em direção à bacia florestal do Rio Pardo.',
    coords: { x: 230, y: 240 }
  },
  {
    id: 'g-040-2',
    number: 6,
    highway: 'MS-040',
    km: 123,
    stretch: 'Entre Campo Grande e Santa Rita do Pardo',
    cities: 'Campo Grande · Santa Rita do Pardo',
    gantriesCount: 1,
    description: 'Pórtico no coração da MS-040, rodovia vital para transporte florestal sustentável.',
    coords: { x: 340, y: 260 }
  },
  {
    id: 'g-040-3',
    number: 7,
    highway: 'MS-040',
    km: 217,
    stretch: 'Entre Campo Grande e Santa Rita do Pardo',
    cities: 'Santa Rita do Pardo',
    gantriesCount: 1,
    description: 'Aproximação de Santa Rita do Pardo e conexão com a MS-338.',
    coords: { x: 450, y: 285 }
  },

  // BR-267 (Bataguassu / Divisa SP -> Casa Verde -> Nova Alvorada do Sul)
  {
    id: 'g-267-1',
    number: 8,
    highway: 'BR-267',
    km: 21,
    stretch: 'Entre a divisa MS-SP e Bataguassu',
    cities: 'Bataguassu · Divisa SP',
    gantriesCount: 2,
    description: 'Portal de entrada interestadual vindo de São Paulo via Ponte Hélio Serejo / Rio Paraná.',
    coords: { x: 670, y: 390 }
  },
  {
    id: 'g-267-2',
    number: 9,
    highway: 'BR-267',
    km: 66,
    stretch: 'Entre Bataguassu e Casa Verde',
    cities: 'Bataguassu · Nova Andradina (Distr. Casa Verde)',
    gantriesCount: 1,
    description: 'Corredor de escoamento de grãos e produtos florestais do sul do estado.',
    coords: { x: 540, y: 380 }
  },
  {
    id: 'g-267-3',
    number: 10,
    highway: 'BR-267',
    km: 130,
    stretch: 'Entre Casa Verde e Nova Alvorada do Sul',
    cities: 'Casa Verde · Nova Alvorada do Sul',
    gantriesCount: 1,
    description: 'Ponto estratégico entre o entroncamento da BR-163 e a Rota Bioceânica.',
    coords: { x: 380, y: 370 }
  },
  {
    id: 'g-267-4',
    number: 11,
    highway: 'BR-267',
    km: 180,
    stretch: 'Entre Casa Verde e Nova Alvorada do Sul',
    cities: 'Nova Alvorada do Sul',
    gantriesCount: 1,
    description: 'Acesso ao polo de Nova Alvorada do Sul, interligando o tráfego pesado com o centro do estado.',
    coords: { x: 250, y: 350 }
  },

  // MS-338 (Santa Rita do Pardo -> Bataguassu)
  {
    id: 'g-338-1',
    number: 12,
    highway: 'MS-338',
    km: 312,
    stretch: 'Entre Santa Rita do Pardo e Bataguassu',
    cities: 'Santa Rita do Pardo · Bataguassu',
    gantriesCount: 1,
    description: 'Ligação estratégica unindo o corredor da MS-040 com a BR-267 e BR-262.',
    coords: { x: 530, y: 320 }
  }
];

export const GantryMapSection: React.FC = () => {
  const [selectedHighway, setSelectedHighway] = useState<string>('TODAS');
  const [activeGantry, setActiveGantry] = useState<GantryLocation>(gantryLocations[0]);

  const filteredGantries = selectedHighway === 'TODAS'
    ? gantryLocations
    : gantryLocations.filter(g => g.highway === selectedHighway);

  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#46973A] uppercase tracking-wider">
            <span>Mapeamento da Concessão</span>
            <span>·</span>
            <span>AGEMS · 870,3 km</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2B49] tracking-tight mt-1">
            Localização de Todos os Pórticos Free Flow
          </h2>
          <div className="w-16 h-1 bg-[#46973A] rounded-full mt-2" />
          <p className="text-sm text-slate-600 mt-2 max-w-2xl">
            A malha concedida conta com <strong>12 pontos de cobrança eletrônica distribuídos em 14 pórticos aéreos</strong> monitorados 24h pelo Centro de Controle de Arrecadação (CCA).
          </p>
        </div>

        {/* Highway Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold self-start md:self-auto overflow-x-auto max-w-full">
          {['TODAS', 'BR-262', 'MS-040', 'BR-267', 'MS-338'].map((hw) => (
            <button
              key={hw}
              onClick={() => setSelectedHighway(hw)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedHighway === hw
                  ? 'bg-[#1A2B49] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#1A2B49]'
              }`}
            >
              {hw === 'TODAS' ? 'Todas as Rodovias' : hw}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map + Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Graphic SVG Highway Schematic Map (7 cols) */}
        <div className="lg:col-span-7 bg-[#0F172A] rounded-2xl border border-slate-800 p-4 sm:p-6 text-white relative overflow-hidden shadow-inner flex flex-col justify-between min-h-[460px]">
          
          {/* Subtle grid texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

          {/* Map Top Bar */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800/80 pb-3">
            <span className="flex items-center gap-2 text-emerald-400 font-bold">
              <Compass className="w-4 h-4 text-[#46973A]" />
              MAPA ESQUEMÁTICO DA ROTA DA CELULOSE (MS)
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:inline">CLIQUE NOS PÓRTICOS</span>
          </div>

          {/* SVG Canvas */}
          <div className="relative z-10 my-3 flex items-center justify-center">
            <svg
              viewBox="0 0 760 480"
              className="w-full h-auto select-none max-h-[380px]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* State boundaries faint shape */}
              <path
                d="M 120 70 L 710 80 L 740 430 L 480 460 L 150 420 Z"
                fill="#1E293B"
                opacity="0.15"
                stroke="#334155"
                strokeWidth="1"
                strokeDasharray="4 4"
              />

              {/* Highway Corridors Lines */}
              {/* BR-262 (Top horizontal curve) */}
              <path
                d="M 160 160 Q 380 120 710 150"
                stroke="#475569"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M 160 160 Q 380 120 710 150"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeDasharray="8 6"
              />
              <text x="560" y="120" fill="#94A3B8" fontSize="11" fontWeight="bold" className="font-mono">BR-262</text>

              {/* MS-040 (Middle diagonal line: Campo Grande -> Santa Rita) */}
              <path
                d="M 160 160 L 230 240 L 460 285"
                stroke="#475569"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M 160 160 L 230 240 L 460 285"
                stroke="#38BDF8"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                opacity="0.8"
              />
              <text x="310" y="235" fill="#38BDF8" fontSize="11" fontWeight="bold">MS-040</text>

              {/* MS-338 (Connecting Santa Rita to Bataguassu / BR-267) */}
              <path
                d="M 460 285 L 530 320 L 590 385"
                stroke="#475569"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 460 285 L 530 320 L 590 385"
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <text x="500" y="305" fill="#F59E0B" fontSize="10" fontWeight="bold">MS-338</text>

              {/* BR-267 (Bottom corridor: Nova Alvorada -> Casa Verde -> Bataguassu -> SP) */}
              <path
                d="M 180 340 L 250 350 L 380 370 L 540 380 L 710 390"
                stroke="#475569"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M 180 340 L 250 350 L 380 370 L 540 380 L 710 390"
                stroke="#34D399"
                strokeWidth="2"
                strokeDasharray="8 6"
              />
              <text x="360" y="415" fill="#34D399" fontSize="11" fontWeight="bold">BR-267</text>

              {/* City Nodes */}
              {/* Campo Grande */}
              <g transform="translate(160, 160)">
                <circle cx="0" cy="0" r="8" fill="#F8FAFC" stroke="#1A2B49" strokeWidth="2.5" />
                <text x="-15" y="-12" fill="#F8FAFC" fontSize="12" fontWeight="bold">Campo Grande</text>
              </g>

              {/* Ribas do Rio Pardo */}
              <g transform="translate(320, 140)">
                <circle cx="0" cy="0" r="5" fill="#E2E8F0" />
                <text x="0" y="-8" fill="#CBD5E1" fontSize="10" textAnchor="middle">Ribas do Rio Pardo</text>
              </g>

              {/* Água Clara */}
              <g transform="translate(480, 130)">
                <circle cx="0" cy="0" r="5" fill="#E2E8F0" />
                <text x="0" y="-8" fill="#CBD5E1" fontSize="10" textAnchor="middle">Água Clara</text>
              </g>

              {/* Três Lagoas */}
              <g transform="translate(710, 150)">
                <circle cx="0" cy="0" r="7" fill="#F8FAFC" />
                <text x="-10" y="-12" fill="#F8FAFC" fontSize="11" fontWeight="bold">Três Lagoas</text>
              </g>

              {/* Santa Rita do Pardo */}
              <g transform="translate(460, 285)">
                <circle cx="0" cy="0" r="5" fill="#E2E8F0" />
                <text x="12" y="4" fill="#CBD5E1" fontSize="10">Santa Rita do Pardo</text>
              </g>

              {/* Bataguassu */}
              <g transform="translate(630, 385)">
                <circle cx="0" cy="0" r="6" fill="#F8FAFC" />
                <text x="0" y="18" fill="#F8FAFC" fontSize="10" fontWeight="bold" textAnchor="middle">Bataguassu (Divisa SP)</text>
              </g>

              {/* Casa Verde */}
              <g transform="translate(450, 375)">
                <circle cx="0" cy="0" r="5" fill="#E2E8F0" />
                <text x="0" y="16" fill="#CBD5E1" fontSize="10" textAnchor="middle">Casa Verde</text>
              </g>

              {/* Nova Alvorada do Sul */}
              <g transform="translate(200, 345)">
                <circle cx="0" cy="0" r="6" fill="#F8FAFC" />
                <text x="-10" y="18" fill="#F8FAFC" fontSize="10" fontWeight="bold">Nova Alvorada</text>
              </g>

              {/* Gantry Markers (Interactive Pins) */}
              {gantryLocations.map((g) => {
                const isSelected = activeGantry.id === g.id;
                const isFiltered = selectedHighway === 'TODAS' || g.highway === selectedHighway;

                return (
                  <g
                    key={g.id}
                    transform={`translate(${g.coords.x}, ${g.coords.y})`}
                    className={`cursor-pointer transition-all duration-300 ${!isFiltered ? 'opacity-20' : 'opacity-100'}`}
                    onClick={() => setActiveGantry(g)}
                  >
                    {/* Pulsing ring if selected */}
                    {isSelected && (
                      <circle cx="0" cy="0" r="14" fill="#46973A" opacity="0.4" className="animate-ping" />
                    )}

                    {/* Outer marker pin */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? 10 : 8}
                      fill={isSelected ? '#46973A' : '#1A2B49'}
                      stroke={isSelected ? '#FFFFFF' : '#46973A'}
                      strokeWidth="2"
                    />

                    {/* Gantry Number label */}
                    <text
                      x="0"
                      y="3.5"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize={isSelected ? '9' : '8'}
                      fontWeight="bold"
                    >
                      {g.number}
                    </text>

                    {/* Km Tag Label */}
                    <rect
                      x="-22"
                      y={isSelected ? "-25" : "-20"}
                      width="44"
                      height="14"
                      rx="3"
                      fill="#0F172A"
                      stroke={isSelected ? '#46973A' : '#334155'}
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y={isSelected ? "-15" : "-10"}
                      textAnchor="middle"
                      fill={isSelected ? '#46973A' : '#E2E8F0'}
                      fontSize="8"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      Km {g.km}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Map Legend */}
          <div className="relative z-10 pt-3 border-t border-slate-800 text-[11px] flex flex-wrap items-center justify-between gap-3 text-slate-400 font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#46973A]" />
                Pórtico Free Flow
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white" />
                Polo Urbano
              </span>
            </div>
            <span>TOTAL: 14 PÓRTICOS EM 12 PONTOS</span>
          </div>

        </div>

        {/* Right: Gantry Technical Inspector Panel (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-6">
          
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#1A2B49] text-white">
                PÓRTICO #{activeGantry.number.toString().padStart(2, '0')}
              </span>
              <span className="text-xs font-mono font-bold text-[#46973A]">
                {activeGantry.highway} · KM {activeGantry.km}
              </span>
            </div>

            <div className="mt-4">
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider block">
                Trecho de Operação:
              </span>
              <h3 className="text-lg font-bold text-[#1A2B49] mt-0.5">
                {activeGantry.stretch}
              </h3>
              <span className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#46973A] shrink-0" />
                {activeGantry.cities}
              </span>
            </div>

            {/* Structure info */}
            <div className="grid grid-cols-2 gap-3 my-4 p-3 bg-white rounded-xl border border-slate-200 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Estrutura Aérea</span>
                <span className="text-slate-900 font-bold">
                  {activeGantry.gantriesCount === 2 ? '2 Pórticos (Bidirecional)' : '1 Pórtico Integrado'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Status AGEMS</span>
                <span className="text-[#46973A] font-bold">Aprovado Contratual</span>
              </div>
            </div>

            {/* Description */}
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-[#1A2B49] block mb-1">Particularidade no CCA:</span>
              <p>{activeGantry.description}</p>
            </div>
          </div>

          {/* Quick list of other gantries in same highway */}
          <div className="pt-4 border-t border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Selecione outro pórtico na lista:
            </span>
            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
              {filteredGantries.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setActiveGantry(g)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors cursor-pointer text-left border ${
                    activeGantry.id === g.id
                      ? 'bg-[#1A2B49] text-white border-[#1A2B49] font-semibold'
                      : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className="font-mono text-[11px] font-bold">P{g.number}</span>
                    <span className="truncate">{g.highway} · Km {g.km}</span>
                  </span>
                  <span className={`text-[11px] font-mono shrink-0 ${activeGantry.id === g.id ? 'text-[#46973A]' : 'text-slate-500'}`}>
                    {g.stretch.split('Entre')[1] || g.stretch}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Complete Table Matrix of All 12 Points / 14 Gantries */}
      <div className="pt-6 border-t border-slate-100">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-bold text-[#1A2B49] uppercase tracking-wider block">
            Quadro Oficial de Localização dos Pórticos · Rota da Celulose
          </span>
          <span className="text-xs font-mono text-slate-500">
            {filteredGantries.length} pontos exibidos
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#1A2B49] text-white text-[11px] uppercase tracking-wider font-mono">
              <tr>
                <th className="py-3 px-4">Pórtico</th>
                <th className="py-3 px-4">Rodovia</th>
                <th className="py-3 px-4">Quilômetro</th>
                <th className="py-3 px-4">Trecho de Cobertura</th>
                <th className="py-3 px-4">Municípios Atendidos</th>
                <th className="py-3 px-4 text-center">Pórticos Físicos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredGantries.map((g) => (
                <tr
                  key={g.id}
                  onClick={() => setActiveGantry(g)}
                  className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                    activeGantry.id === g.id ? 'bg-[#46973A]/10 font-medium' : ''
                  }`}
                >
                  <td className="py-3 px-4 font-mono font-bold text-[#1A2B49]">
                    Pórtico {g.number.toString().padStart(2, '0')}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[#46973A]">
                    {g.highway}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 tabular-nums">
                    Km {g.km}
                  </td>
                  <td className="py-3 px-4">
                    {g.stretch}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {g.cities}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-900">
                    {g.gantriesCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
};
