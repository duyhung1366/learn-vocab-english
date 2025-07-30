export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VocabularyWord {
  id: string;
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  translation?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topicId: string;
  audioUrl?: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  category: 'toeic' | 'ielts';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  wordCount: number;
  imageUrl?: string;
  slug: string;
}

export interface StudySession {
  id: string;
  userId: string;
  topicId: string;
  wordsStudied: string[];
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
  completedAt: Date;
  studyMode: 'flashcard' | 'quiz' | 'spelling';
}

export interface UserProgress {
  userId: string;
  topicId: string;
  wordsLearned: string[];
  masteredWords: string[];
  totalTimeSpent: number;
  lastStudiedAt: Date;
  streakDays: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  tags: string[];
  imageUrl?: string;
  readTime: number; // in minutes
}

export interface QuizQuestion {
  id: string;
  wordId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  type: 'multiple-choice' | 'fill-blank' | 'definition-match';
}

export type StudyMode = 'flashcard' | 'quiz' | 'spelling' | 'listening';
export type ExamType = 'toeic' | 'ielts';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
