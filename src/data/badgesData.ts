import { Badge } from '../types';

export const initialBadges: Badge[] = [
  {
    id: 'badge-welcome',
    title: 'Recruta do Pedágio Eletrônico',
    description: 'Iniciou a jornada de capacitação técnica na Caminhos da Celulose.',
    iconName: 'Sparkles',
    conditionText: 'Concluir o Módulo 1 de Fundamentos'
  },
  {
    id: 'badge-memory-master',
    title: 'Mestre da Memória CCA',
    description: 'Encontrou todos os pares de termos técnicos do pórtico no jogo da memória.',
    iconName: 'Brain',
    conditionText: 'Completar o Jogo da Memória em menos de 2 minutos'
  },
  {
    id: 'badge-simulator-ace',
    title: 'Auditor de Alta Precisão',
    description: 'Resolveu os casos de triagem operacional do CCA com 100% de acerto nas decisões.',
    iconName: 'ShieldCheck',
    conditionText: 'Resolver com sucesso os cenários do simulador de ocorrências'
  },
  {
    id: 'badge-quiz-champion',
    title: 'Gabarito da Rota da Celulose',
    description: 'Alcançou nota superior a 80% na prova oficial de avaliação do pedágio eletrônico.',
    iconName: 'Award',
    conditionText: 'Atingir 80%+ de aproveitamento no Quiz Oficial'
  },
  {
    id: 'badge-full-certification',
    title: 'Especialista Certificado CCA',
    description: 'Finalizou todos os módulos e obteve a certificação oficial no portal.',
    iconName: 'GraduationCap',
    conditionText: 'Concluir todos os 4 módulos de treinamento'
  }
];
