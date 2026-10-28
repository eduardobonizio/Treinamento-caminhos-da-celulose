import { MemoryCardPair } from '../types';

export const initialMemoryPairs: MemoryCardPair[] = [
  {
    id: 'mem-1',
    term: 'RFID 915 MHz',
    description: 'Frequência de rádio da antena do pórtico para leitura instantânea da TAG veicular',
    category: 'Tecnologia'
  },
  {
    id: 'mem-2',
    term: 'Câmera OCR Dupla',
    description: 'Captura em alta resolução frontal e traseira para decodificação da placa veicular',
    category: 'Tecnologia'
  },
  {
    id: 'mem-3',
    term: 'Art. 209-A do CTB',
    description: 'Infração grave (5 pontos e R$ 195,23) por não pagar o pedágio eletrônico em até 30 dias',
    category: 'Regras & CTB'
  },
  {
    id: 'mem-4',
    term: 'Eixo Suspenso',
    description: 'Conferência visual no CCA para conceder isenção da fração tarifária do rodado erguido',
    category: 'Operações'
  },
  {
    id: 'mem-5',
    term: 'Scanner LiDAR 3D',
    description: 'Cortina laser no pórtico que calcula o perfil volumétrico, altura e comprimento',
    category: 'Tecnologia'
  },
  {
    id: 'mem-6',
    term: 'Prazo de 30 Dias',
    description: 'Período legal concedido ao condutor sem TAG para quitar a tarifa nos canais digitais',
    category: 'Regras & CTB'
  },
  {
    id: 'mem-7',
    term: 'Mesa de Triagem CCA',
    description: 'Ambiente de auditoria humana onde operadores validam placas ilegíveis ou sujas',
    category: 'Operações'
  },
  {
    id: 'mem-8',
    term: 'DUF (Usuário Frequente)',
    description: 'Desconto tarifário progressivo para veículos de passeio que utilizam TAG no mês',
    category: 'Regras & CTB'
  }
];
