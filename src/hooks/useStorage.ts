import { useState, useEffect } from 'react';
import { OperatorProfile, TrainingModule, QuizQuestion, MemoryCardPair, CCAOccurrence } from '../types';
import { initialModules } from '../data/modulesData';
import { initialQuizQuestions } from '../data/quizData';
import { initialMemoryPairs } from '../data/memoryData';
import { initialCCACases } from '../data/casesData';

const STORAGE_KEYS = {
  PROFILE: 'caminhos_celulose_operator_profile_v1',
  CUSTOM_MODULES: 'caminhos_celulose_custom_modules_v1',
  CUSTOM_QUESTIONS: 'caminhos_celulose_custom_questions_v1',
  CUSTOM_MEMORY: 'caminhos_celulose_custom_memory_v1',
  CUSTOM_CASES: 'caminhos_celulose_custom_cases_v1'
};

const defaultProfile: OperatorProfile = {
  name: 'Colaborador CCA',
  role: 'Operador de Arrecadação e Triagem',
  completedModules: [],
  quizBestScore: 0,
  quizTotalTaken: 0,
  memoryBestTime: 0,
  casesCompleted: [],
  earnedBadges: [],
  companyLogoUrl: ''
};

export function useStorage() {
  const [profile, setProfile] = useState<OperatorProfile>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return stored ? { ...defaultProfile, ...JSON.parse(stored) } : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [modules, setModules] = useState<TrainingModule[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_MODULES);
      return stored ? JSON.parse(stored) : initialModules;
    } catch {
      return initialModules;
    }
  });

  const [questions, setQuestions] = useState<QuizQuestion[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_QUESTIONS);
      return stored ? JSON.parse(stored) : initialQuizQuestions;
    } catch {
      return initialQuizQuestions;
    }
  });

  const [memoryPairs, setMemoryPairs] = useState<MemoryCardPair[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_MEMORY);
      return stored ? JSON.parse(stored) : initialMemoryPairs;
    } catch {
      return initialMemoryPairs;
    }
  });

  const [cases, setCases] = useState<CCAOccurrence[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_CASES);
      return stored ? JSON.parse(stored) : initialCCACases;
    } catch {
      return initialCCACases;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch {
      // Ignore quota errors if storage is restricted
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_MODULES, JSON.stringify(modules));
    } catch {}
  }, [modules]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_QUESTIONS, JSON.stringify(questions));
    } catch {}
  }, [questions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_MEMORY, JSON.stringify(memoryPairs));
    } catch {}
  }, [memoryPairs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_CASES, JSON.stringify(cases));
    } catch {}
  }, [cases]);

  const updateProfile = (updates: Partial<OperatorProfile>) => {
    setProfile(prev => {
      const updated = { ...prev, ...updates };
      // Check automated badge grants
      const newBadges = [...(updated.earnedBadges || [])];
      
      if (updated.completedModules.includes('mod-1') && !newBadges.includes('badge-welcome')) {
        newBadges.push('badge-welcome');
      }
      if (updated.completedModules.length >= modules.length && modules.length > 0 && !newBadges.includes('badge-full-certification')) {
        newBadges.push('badge-full-certification');
      }
      if (updated.quizBestScore >= 80 && !newBadges.includes('badge-quiz-champion')) {
        newBadges.push('badge-quiz-champion');
      }
      if (updated.casesCompleted.length >= cases.length && cases.length > 0 && !newBadges.includes('badge-simulator-ace')) {
        newBadges.push('badge-simulator-ace');
      }
      if (updated.memoryBestTime > 0 && updated.memoryBestTime <= 120 && !newBadges.includes('badge-memory-master')) {
        newBadges.push('badge-memory-master');
      }

      return { ...updated, earnedBadges: newBadges };
    });
  };

  const markModuleCompleted = (moduleId: string) => {
    if (!profile.completedModules.includes(moduleId)) {
      updateProfile({
        completedModules: [...profile.completedModules, moduleId]
      });
    }
  };

  const recordQuizResult = (scorePercentage: number) => {
    updateProfile({
      quizTotalTaken: (profile.quizTotalTaken || 0) + 1,
      quizBestScore: Math.max(profile.quizBestScore || 0, scorePercentage)
    });
  };

  const recordMemoryTime = (seconds: number) => {
    updateProfile({
      memoryBestTime: profile.memoryBestTime === 0 ? seconds : Math.min(profile.memoryBestTime, seconds)
    });
  };

  const recordCaseCompleted = (caseId: string) => {
    if (!profile.casesCompleted.includes(caseId)) {
      updateProfile({
        casesCompleted: [...profile.casesCompleted, caseId]
      });
    }
  };

  const resetAllProgress = () => {
    setProfile({
      ...defaultProfile,
      name: profile.name,
      role: profile.role,
      companyLogoUrl: profile.companyLogoUrl
    });
  };

  const addQuestion = (newQ: QuizQuestion) => {
    setQuestions(prev => [newQ, ...prev]);
  };

  const addMemoryPair = (newPair: MemoryCardPair) => {
    setMemoryPairs(prev => [newPair, ...prev]);
  };

  const exportAllDataJson = () => {
    const backup = {
      profile,
      modules,
      questions,
      memoryPairs,
      cases,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_capacitacao_caminhos_celulose_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDataJson = (jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.modules) setModules(data.modules);
      if (data.questions) setQuestions(data.questions);
      if (data.memoryPairs) setMemoryPairs(data.memoryPairs);
      if (data.cases) setCases(data.cases);
      if (data.profile) setProfile(data.profile);
      return true;
    } catch {
      return false;
    }
  };

  return {
    profile,
    updateProfile,
    modules,
    questions,
    memoryPairs,
    cases,
    markModuleCompleted,
    recordQuizResult,
    recordMemoryTime,
    recordCaseCompleted,
    resetAllProgress,
    addQuestion,
    addMemoryPair,
    exportAllDataJson,
    importDataJson
  };
}
