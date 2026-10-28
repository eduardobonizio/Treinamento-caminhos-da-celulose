import React, { useState } from 'react';
import { Radio, Camera, Cpu, Activity, Play, CheckCircle2 } from 'lucide-react';

interface SensorInfo {
  id: string;
  name: string;
  category: string;
  spec: string;
  ccaRole: string;
  color: string;
}

const sensors: SensorInfo[] = [
  {
    id: 'rfid',
    name: 'Antenas RFID DSRC',
    category: 'Comunicação por Rádio',
    spec: 'Frequência de 915 MHz (Protocolo ISO 18000-6C)',
    ccaRole: 'Faz a leitura imediata da TAG do para-brisa. Se a TAG for válida e tiver saldo/pós-pago ativo, o débito é automático sem necessidade de intervenção do CCA.',
    color: 'emerald'
  },
  {
    id: 'ocr',
    name: 'Câmeras OCR Frontais & Traseiras',
    category: 'Visão Computacional',
    spec: 'Alta resolução com sensores globais e LEDs infravermelhos (850nm)',
    ccaRole: 'Capturam fotografias de altíssima definição das placas (Mercosul e padrão antigo). Se a leitura for incerta ou o veículo não tiver TAG, a imagem vai para a Mesa de Triagem do CCA.',
    color: 'sky'
  },
  {
    id: 'lidar',
    name: 'Scanners Laser Volumétricos (LiDAR)',
    category: 'Perfilamento 3D',
    spec: 'Cortina laser a 50 Hz calculando comprimento, altura e largura',
    ccaRole: 'Classifica o porte veicular (moto, automóvel, caminhão 2 a 9 eixos, tritrem de celulose) e evita que carretas longas sejam faturadas como dois veículos separados.',
    color: 'amber'
  },
  {
    id: 'axle',
    name: 'Módulo de Detecção de Eixos',
    category: 'Classificação de Rodagem',
    spec: 'Varredura angular de solo e câmeras de flanco',
    ccaRole: 'Detecta a quantidade de eixos em contato direto com o pavimento e identifica visualmente eixos suspensos para aplicação da isenção legal.',
    color: 'indigo'
  }
];

export const FreeFlowInfographic: React.FC = () => {
  const [selectedSensor, setSelectedSensor] = useState<SensorInfo>(sensors[0]);
  const [simulating, setSimulating] = useState(false);
  const [telemetry, setTelemetry] = useState<{
    plate: string;
    tagStatus: string;
    axles: string;
    speed: string;
    time: string;
  } | null>(null);

  const runSimulation = () => {
    if (simulating) return;
    setSimulating(true);
    setTelemetry(null);

    setTimeout(() => {
      setTelemetry({
        plate: 'RTA-2026',
        tagStatus: 'TAG Reconhecida (Sem Parar)',
        axles: '2 Eixos (Automóvel)',
        speed: '94.2 km/h',
        time: new Date().toLocaleTimeString('pt-BR')
      });
      setSimulating(false);
    }, 2400);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Anatomia do Pórtico Free Flow · Caminhos da Celulose
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Clique nos sensores aéreos para inspecionar os subsistemas conectados diretamente ao CCA
          </p>
        </div>

        <button
          onClick={runSimulation}
          disabled={simulating}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
            simulating
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
              : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm cursor-pointer'
          }`}
        >
          <Play className={`w-3.5 h-3.5 ${simulating ? 'animate-spin' : ''}`} />
          {simulating ? 'Processando Passagem...' : 'Simular Passagem no Pórtico'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left: Interactive Visual Canvas (SVG) */}
        <div className="lg:col-span-7 bg-slate-950 p-6 flex flex-col justify-between relative overflow-hidden min-h-[380px]">
          
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none" />

          {/* Top Bar inside Canvas */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              PÓRTICO 04 · BR-262 KM 142
            </span>
            <span>AGEMS · PROTOCOLO ATIVO</span>
          </div>

          {/* SVG Diagram */}
          <div className="relative z-10 my-4 flex justify-center items-center">
            <svg
              viewBox="0 0 600 320"
              className="w-full max-w-[540px] h-auto select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Sky Backdrop */}
              <rect x="10" y="10" width="580" height="200" rx="8" fill="#0B132B" opacity="0.4" />

              {/* Road Asphalt */}
              <rect x="20" y="210" width="560" height="90" fill="#1E293B" rx="4" />
              {/* Lane Divider Lines */}
              <line x1="30" y1="255" x2="570" y2="255" stroke="#E2E8F0" strokeWidth="3" strokeDasharray="16 14" opacity="0.4" />
              {/* Highway Shoulders */}
              <line x1="20" y1="212" x2="580" y2="212" stroke="#CBD5E1" strokeWidth="2" opacity="0.8" />
              <line x1="20" y1="298" x2="580" y2="298" stroke="#CBD5E1" strokeWidth="2" opacity="0.8" />

              {/* Steel Truss Overhead Gantry Structure */}
              {/* Left Pillar */}
              <rect x="60" y="40" width="16" height="210" fill="#64748B" />
              <rect x="56" y="240" width="24" height="15" fill="#475569" rx="2" />
              {/* Right Pillar */}
              <rect x="524" y="40" width="16" height="210" fill="#64748B" />
              <rect x="520" y="240" width="24" height="15" fill="#475569" rx="2" />
              
              {/* Main Overhead Crossbeam */}
              <rect x="60" y="40" width="480" height="26" fill="#475569" rx="2" />
              <line x1="76" y1="53" x2="524" y2="53" stroke="#94A3B8" strokeWidth="2" />
              {/* Truss cross lattice */}
              <path d="M 80 40 L 120 66 M 120 40 L 160 66 M 160 40 L 200 66 M 200 40 L 240 66 M 240 40 L 280 66 M 280 40 L 320 66 M 320 40 L 360 66 M 360 40 L 400 66 M 400 40 L 440 66 M 440 40 L 480 66 M 480 40 L 520 66" stroke="#94A3B8" strokeWidth="1.5" opacity="0.5" />

              {/* Sensor 1: RFID DSRC Antenna */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => setSelectedSensor(sensors[0])}
              >
                <rect
                  x="160"
                  y="66"
                  width="44"
                  height="22"
                  rx="4"
                  fill={selectedSensor.id === 'rfid' ? '#10B981' : '#334155'}
                  stroke="#10B981"
                  strokeWidth="2"
                />
                <text x="182" y="81" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">RFID</text>
                {/* Radio Beams */}
                <path
                  d="M 170 92 Q 182 120 194 92"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className={simulating ? 'animate-ping' : 'opacity-60'}
                />
              </g>

              {/* Sensor 2: Dual OCR Cameras */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => setSelectedSensor(sensors[1])}
              >
                <rect
                  x="260"
                  y="66"
                  width="48"
                  height="24"
                  rx="4"
                  fill={selectedSensor.id === 'ocr' ? '#0284C7' : '#334155'}
                  stroke="#38BDF8"
                  strokeWidth="2"
                />
                <circle cx="284" cy="78" r="6" fill="#0EA5E9" />
                <circle cx="284" cy="78" r="2" fill="#FFFFFF" />
                <text x="284" y="102" textAnchor="middle" fill="#38BDF8" fontSize="9" fontWeight="bold">OCR DUAL</text>
                {/* Vision Cone */}
                <polygon
                  points="284,90 200,240 370,240"
                  fill="#0284C7"
                  opacity={simulating ? '0.35' : '0.1'}
                />
              </g>

              {/* Sensor 3: LiDAR Volumetric Scanner */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => setSelectedSensor(sensors[2])}
              >
                <rect
                  x="368"
                  y="66"
                  width="44"
                  height="22"
                  rx="4"
                  fill={selectedSensor.id === 'lidar' ? '#D97706' : '#334155'}
                  stroke="#F59E0B"
                  strokeWidth="2"
                />
                <text x="390" y="81" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">LiDAR</text>
                {/* Laser scan line */}
                <line
                  x1="390"
                  y1="88"
                  x2={simulating ? '430' : '390'}
                  y2="240"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  opacity={simulating ? '0.9' : '0.3'}
                />
              </g>

              {/* Sensor 4: Axle Detector Module */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => setSelectedSensor(sensors[3])}
              >
                <rect
                  x="460"
                  y="66"
                  width="44"
                  height="22"
                  rx="4"
                  fill={selectedSensor.id === 'axle' ? '#6366F1' : '#334155'}
                  stroke="#818CF8"
                  strokeWidth="2"
                />
                <text x="482" y="81" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">EIXOS</text>
                {/* Ground Sensor indicator */}
                <rect x="470" y="270" width="24" height="6" fill="#818CF8" rx="2" />
              </g>

              {/* Vehicle Passing Animation */}
              <g
                className="transition-all duration-1000 ease-in-out"
                transform={simulating ? 'translate(220, 0)' : 'translate(0, 0)'}
              >
                {/* Car Silhouette in Lane 1 */}
                <rect x="110" y="235" width="84" height="28" rx="6" fill="#F8FAFC" />
                <path d="M 125 235 L 140 220 L 175 220 L 190 235 Z" fill="#E2E8F0" />
                {/* Wheels */}
                <circle cx="130" cy="263" r="8" fill="#0F172A" stroke="#64748B" strokeWidth="2" />
                <circle cx="175" cy="263" r="8" fill="#0F172A" stroke="#64748B" strokeWidth="2" />
                {/* Windshield TAG sticker */}
                <rect x="145" y="224" width="8" height="5" fill="#10B981" rx="1" />
                {/* License Plate */}
                <rect x="188" y="244" width="14" height="7" rx="1" fill="#FFFFFF" stroke="#000000" strokeWidth="0.5" />
                <text x="195" y="249" textAnchor="middle" fill="#000000" fontSize="4" fontWeight="bold">RTA-2026</text>
              </g>

              {/* Flash effect when simulating */}
              {simulating && (
                <circle cx="284" cy="78" r="40" fill="#FFFFFF" opacity="0.4" className="animate-ping" />
              )}
            </svg>
          </div>

          {/* Bottom Telemetry Card inside canvas */}
          <div className="relative z-10 bg-slate-900/90 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-300">
            {telemetry ? (
              <div className="flex flex-wrap items-center justify-between gap-3 text-emerald-400">
                <span className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  PASSAGEM CONCILIADA
                </span>
                <span>Placa: <strong className="text-white">{telemetry.plate}</strong></span>
                <span>TAG: <strong className="text-white">{telemetry.tagStatus}</strong></span>
                <span>Velocidade: <strong className="text-white">{telemetry.speed}</strong></span>
                <span>Hora: <strong className="text-white">{telemetry.time}</strong></span>
              </div>
            ) : (
              <div className="flex items-center justify-between text-slate-400">
                <span>Clique em "Simular Passagem no Pórtico" para ver o envio de telemetria ao CCA</span>
                <span className="text-slate-500">STANDBY 24H</span>
              </div>
            )}
          </div>

        </div>

        {/* Right: Technical Inspector Deck */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                {selectedSensor.category}
              </span>
              <span className="text-xs font-mono text-slate-400">
                SUBSISTEMA #{selectedSensor.id.toUpperCase()}
              </span>
            </div>

            <h4 className="text-xl font-bold text-slate-900 mt-1">
              {selectedSensor.name}
            </h4>

            <div className="mt-4 p-3 bg-white rounded-lg border border-slate-200 text-xs">
              <span className="font-semibold text-slate-700 block">Especificação Técnica:</span>
              <span className="font-mono text-slate-600 mt-0.5 block">{selectedSensor.spec}</span>
            </div>

            <div className="mt-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Papel Operacional para a Equipe do CCA:
              </span>
              <p className="text-xs leading-relaxed text-slate-600 mt-1.5">
                {selectedSensor.ccaRole}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Selecione outro subsistema:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {sensors.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSensor(s)}
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer border ${
                    selectedSensor.id === s.id
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="block truncate">{s.name}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
