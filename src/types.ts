export type QuestionType = 'single' | 'multiple' | 'numerical' | 'truefalse';

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: number[] | number | string;
  positiveMark: number;
  negativeMark: number;
  explanation?: string;
  hasImage?: boolean;
  imagePage?: number;
  imageBBox?: [number, number, number, number];
  imageData?: string;
}

export interface TestConfig {
  title: string;
  durationMinutes: number;
  questions: Question[];
}

export interface MarkingRule {
  id: string;
  label: string;
  questionRange: string; // e.g. "1-20"
  positiveMark: number;
  negativeMark: number;
  applyToAll: boolean;
}

export interface AnswerState {
  selectedOptions: number[];
  numericalAnswer: string;
  status: 'unanswered' | 'answered' | 'marked' | 'answered-marked' | 'visited-unanswered';
}

export type Page = 'home' | 'setup' | 'test' | 'results' | 'myexams' | 'library';

export interface TestResult {
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  score: number;
  maxScore: number;
  percentage: number;
  perQuestion: {
    questionId: number;
    isCorrect: boolean;
    isAttempted: boolean;
    marksAwarded: number;
  }[];
}
