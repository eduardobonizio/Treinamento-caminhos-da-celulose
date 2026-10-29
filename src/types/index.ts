export type TabType = 'home' | 'calculator' | 'training' | 'arena' | 'certificates' | 'faq';
export type ArenaSubTab = 'memory' | 'simulator' | 'quiz';

export interface ModuleSection {
  id: string;
  title: string;
  subtitle: string;
  content: string[];
  keyPoints?: string[];
  warningNote?: string;
  checklist?: string[];
}

export interface TrainingModule {
  id: string;
  order: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  category: 'Tecnologia' | 'Operações CCA' | 'Regulatório' | 'Procedimentos';
  sections: ModuleSection[];
}

export interface QuizQuestion {
  id: string;
  moduleId?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
}

export interface MemoryCardPair {
  id: string;
  term: string;
  description: string;
  category: 'Tecnologia' | 'Regras & CTB' | 'Operações';
}

export interface CCAOccurrence {
  id: string;
  title: string;
  highway: 'BR-262' | 'BR-267' | 'MS-040' | 'MS-338';
  gantryId: string;
  timestamp: string;
  vehicleType: string;
  lane: number;
  speed: string;
  tagDetected: boolean;
  tagId?: string;
  frontPlateOcr: string;
  rearPlateOcr: string;
  detectedAxles: number;
  suspendedAxles: number;
  scenarioDescription: string;
  imageHint: string;
  options: {
    id: string;
    actionText: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export interface OperatorProfile {
  name: string;
  role: string;
  completedModules: string[];
  quizBestScore: number;
  quizTotalTaken: number;
  memoryBestTime: number; // in seconds
  casesCompleted: string[];
  earnedBadges: string[];
  companyLogoUrl?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  conditionText: string;
}
