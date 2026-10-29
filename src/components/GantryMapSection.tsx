import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Filter, CheckCircle2, Info, ChevronRight, Layers } from 'lucide-react';

export interface GantryLocation {
  id: string;
  code: string; // "Pórtico 01", "Pórtico 02", etc.
  pffCode: string; // "PFF-01" to "PFF-12"
  number: number;
  fullName: string; // "Pórtico 01 - BR262 - km 040+450"
  highway: 'BR-262' | 'MS-040' | 'BR-267' | 'MS-338';
  kmDisplay: string; // "km 040+450"
  city: string; // "Três Lagoas/MS"
  gantriesCount: number;
  description: string;
  coords: { x: number; y: number }; // Relative coordinates for SVG map (0-800 x 0-480)
}

export const gantryLocations: GantryLocation[] = [
  {
    id: 'portico-01',
    code: 'Pórtico 01',
    pffCode: 'PFF-01',
    number: 1,
    fullName: 'Pórtico 01 (PFF-01) - BR262 - km 040+450',
    highway: 'BR-262',
    kmDisplay: 'km 040+450',
    city: 'Três Lagoas/MS',
    gantriesCount: 1,
    description: 'Pórtico localizado no km 040+450 da BR-262, no município de Três Lagoas/MS. Monitora intenso tráfego florestal e industrial no polo leste.',
    coords: { x: 670, y: 148 }
  },
  {
    id: 'portico-02',
    code: 'Pórtico 02',
    pffCode: 'PFF-02',
    number: 2,
    fullName: 'Pórtico 02 (PFF-02) - BR262 - km 109+500',
    highway: 'BR-262',
    kmDisplay: 'km 109+500',
    city: 'Água Clara/MS',
    gantriesCount: 1,
    description: 'Pórtico no km 109+500 da BR-262, no município de Água Clara/MS. Ponto estratégico no escoamento de madeira de eucalipto.',
    coords: { x: 540, y: 138 }
  },
  {
    id: 'portico-03',
    code: 'Pórtico 03',
    pffCode: 'PFF-03',
    number: 3,
    fullName: 'Pórtico 03 (PFF-03) - BR262 - km 204+460',
    highway: 'BR-262',
    kmDisplay: 'km 204+460',
    city: 'Ribas do Rio Pardo/MS',
    gantriesCount: 1,
    description: 'Pórtico no km 204+460 da BR-262, em Ribas do Rio Pardo/MS. Corredor essencial de acesso ao grande complexo fabril de celulose.',
    coords: { x: 380, y: 135 }
  },
  {
    id: 'portico-04',
    code: 'Pórtico 04',
    pffCode: 'PFF-04',
    number: 4,
    fullName: 'Pórtico 04 (PFF-04) - BR262 - km 288+300',
    highway: 'BR-262',
    kmDisplay: 'km 288+300',
    city: 'Campo Grande/MS',
    gantriesCount: 2,
    description: 'Localizado em trecho de pista duplicada no km 288+300 da BR-262 (Campo Grande/MS). Conta com 2 estruturas físicas na mesma localização (uma para o sentido Leste e outra para o sentido Oeste), cobrando apenas 1 tarifa por sentido trafegado.',
    coords: { x: 230, y: 155 }
  },
  {
    id: 'portico-05',
    code: 'Pórtico 05',
    pffCode: 'PFF-05',
    number: 5,
    fullName: 'Pórtico 05 (PFF-05) - MS040 - km 045+360',
    highway: 'MS-040',
    kmDisplay: 'km 045+360',
    city: 'Campo Grande/MS',
    gantriesCount: 1,
    description: 'Pórtico no km 045+360 da MS-040, no município de Campo Grande/MS. Saída sudeste da capital interligando as bacias florestais.',
    coords: { x: 230, y: 240 }
  },
  {
    id: 'portico-06',
    code: 'Pórtico 06',
    pffCode: 'PFF-06',
    number: 6,
    fullName: 'Pórtico 06 (PFF-06) - MS040 - km 216+120',
    highway: 'MS-040',
    kmDisplay: 'km 216+120',
    city: 'Santa Rita do Pardo/MS',
    gantriesCount: 1,
    description: 'Pórtico no km 216+120 da MS-040, em Santa Rita do Pardo/MS. Intersecção estratégica com o entroncamento da MS-338.',
    coords: { x: 450, y: 285 }
  },
  {
    id: 'portico-07',
    code: 'Pórtico 07',
    pffCode: 'PFF-07',
    number: 7,
    fullName: 'Pórtico 07 (PFF-07) - MS338 - km 311+900',
    highway: 'MS-338',
    kmDisplay: 'km 311+900',
    city: 'Santa Rita do Pardo/MS',
    gantriesCount: 1,
    description: 'Pórtico no km 311+900 da MS-338, em Santa Rita do Pardo/MS. Rodovia que integra a MS-040 à BR-267.',
    coords: { x: 520, y: 320 }
  },
  {
    id: 'portico-08',
    code: 'Pórtico 08',
    pffCode: 'PFF-08',
    number: 8,
    fullName: 'Pórtico 08 (PFF-08) - BR267 - km 021+200',
    highway: 'BR-267',
    kmDisplay: 'km 021+200',
    city: 'Bataguassu/MS',
    gantriesCount: 2,
    description: 'Localizado em trecho de pista duplicada no km 021+200 da BR-267 (Bataguassu/MS). Conta com 2 estruturas físicas na mesma localização (sentido Leste e sentido Oeste) junto ao portal interestadual com SP.',
    coords: { x: 670, y: 390 }
  },
  {
    id: 'portico-09',
    code: 'Pórtico 09',
    pffCode: 'PFF-09',
    number: 9,
    fullName: 'Pórtico 09 (PFF-09) - BR267 - km 129+100',
    highway: 'BR-267',
    kmDisplay: 'km 129+100',
    city: 'Nova Andradina/MS',
    gantriesCount: 1,
    description: 'Pórtico no km 129+100 da BR-267, no município de Nova Andradina/MS (região de Casa Verde). Corredor logístico de cargas.',
    coords: { x: 420, y: 372 }
  },
  {
    id: 'portico-10',
    code: 'Pórtico 10',
    pffCode: 'PFF-10',
    number: 10,
    fullName: 'Pórtico 10 (PFF-10) - BR267 - km 182+000',
    highway: 'BR-267',
    kmDisplay: 'km 182+000',
    city: 'Nova Alvorada do Sul/MS',
    gantriesCount: 1,
    description: 'Pórtico no km 182+000 da BR-267, em Nova Alvorada do Sul/MS. Entroncamento de escoamento para o sul do estado.',
    coords: { x: 250, y: 350 }
  },
  {
    id: 'portico-11',
    code: 'Pórtico 11',
    pffCode: 'PFF-11',
    number: 11,
    fullName: 'Pórtico 11 (PFF-11) - MS040 - km 123+860',
    highway: 'MS-040',
    kmDisplay: 'km 123+860',
    city: 'Ribas do Rio Pardo/MS',
    gantriesCount: 1,
    description: 'Pórtico no km 123+860 da MS-040, no município de Ribas do Rio Pardo/MS. Monitoramento no trecho intermediário da rodovia.',
    coords: { x: 340, y: 260 }
  },
  {
    id: 'portico-12',
    code: 'Pórtico 12',
    pffCode: 'PFF-12',
    number: 12,
    fullName: 'Pórtico 12 (PFF-12) - BR267 - km 065+750',
    highway: 'BR-267',
    kmDisplay: 'km 065+750',
    city: 'Anaurilândia/MS',
    gantriesCount: 1,
    description: 'Pórtico no km 065+750 da BR-267, no município de Anaurilândia/MS. Integração viária no leste sul-mato-grossense.',
    coords: { x: 560, y: 382 }
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
            <span>Mapeamento Oficial da Concessão</span>
            <span>·</span>
            <span>AGEMS · 12 Pontos de Cobrança</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2B49] tracking-tight mt-1">
            Localização Oficial dos 12 Pontos de Cobrança (Pórticos 01 a 12)
          </h2>
          <div className="w-16 h-1 bg-[#46973A] rounded-full mt-2" />
          <p className="text-sm text-slate-600 mt-2 max-w-2xl">
            A malha concedida conta com <strong>12 pontos de pedágio eletrônico</strong> distribuídos em 870,3 km. Em 2 pontos onde a rodovia se divide, a cobrança é realizada por estruturas bidirecionais (totalizando 14 pórticos físicos instalados).
          </p>
        </div>

        {/* Highway Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold self-start md:self-auto">
          {['TODAS', 'BR-262', 'MS-040', 'BR-267', 'MS-338'].map((hw) => (
            <button
              key={hw}
              onClick={() => setSelectedHighway(hw)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedHighway === hw
                  ? 'bg-[#1A2B49] text-white shadow-xs font-bold'
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

              {/* Nova Andradina */}
              <g transform="translate(450, 375)">
                <circle cx="0" cy="0" r="5" fill="#E2E8F0" />
                <text x="0" y="16" fill="#CBD5E1" fontSize="10" textAnchor="middle">Nova Andradina</text>
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

                    {/* Gantry Code label */}
                    <text
                      x="0"
                      y="3"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize={isSelected ? '8' : '7'}
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {g.number.toString().padStart(2, '0')}
                    </text>

                    {/* Km Tag Label */}
                    <rect
                      x="-26"
                      y={isSelected ? "-24" : "-20"}
                      width="52"
                      height="14"
                      rx="3"
                      fill="#0F172A"
                      stroke={isSelected ? '#46973A' : '#334155'}
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y={isSelected ? "-14" : "-10"}
                      textAnchor="middle"
                      fill={isSelected ? '#46973A' : '#E2E8F0'}
                      fontSize="7.5"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {g.kmDisplay.replace('km ', 'Km ').replace('KM ', 'Km ')}
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
                Pórticos de Pedágio Eletrônico (Pórticos 01 a 12)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white" />
                Polo Urbano
              </span>
            </div>
            <span>TOTAL: 12 PONTOS DE COBRANÇA</span>
          </div>

        </div>

        {/* Right: Gantry Technical Inspector Panel (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-6">
          
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#1A2B49] text-white">
                  {activeGantry.code}
                </span>
                <span className="text-[11px] font-mono font-bold px-2 py-1 rounded bg-slate-200 text-slate-700">
                  {activeGantry.pffCode}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#46973A]">
                {activeGantry.highway} · {activeGantry.kmDisplay}
              </span>
            </div>

            <div className="mt-4">
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider block">
                Nome Oficial do Ponto:
              </span>
              <h3 className="text-lg font-bold text-[#1A2B49] mt-0.5">
                {activeGantry.fullName}
              </h3>
              <span className="text-xs text-slate-600 flex items-center gap-1 mt-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#46973A] shrink-0" />
                {activeGantry.city}
              </span>
            </div>

            {/* Structure info */}
            <div className="grid grid-cols-2 gap-3 my-4 p-3 bg-white rounded-xl border border-slate-200 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Estrutura Aérea</span>
                <span className="text-slate-900 font-bold">
                  {activeGantry.gantriesCount === 2 ? '2 Pórticos (Pista Duplicada)' : '1 Pórtico Integrado'}
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
              Selecione outro pórtico na lista ({filteredGantries.length}):
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
                    <span className="font-mono text-[11px] font-bold text-[#46973A]">{g.code}</span>
                    <span className={`font-mono text-[10px] px-1 rounded ${activeGantry.id === g.id ? 'bg-white/15 text-slate-200' : 'bg-slate-100 text-slate-500'}`}>{g.pffCode}</span>
                    <span className="truncate">{g.highway} · {g.kmDisplay}</span>
                  </span>
                  <span className={`text-[11px] font-mono shrink-0 ${activeGantry.id === g.id ? 'text-white' : 'text-slate-500'}`}>
                    {g.city}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
