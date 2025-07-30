import { Topic } from '@/types';

export const toeicTopics: Topic[] = [
  {
    id: 'toeic-business-1',
    name: 'Business Communication',
    description: 'Essential vocabulary for business meetings, emails, and presentations',
    category: 'toeic',
    difficulty: 'intermediate',
    wordCount: 50,
    slug: 'business-communication',
    imageUrl: '/images/business-communication.jpg'
  },
  {
    id: 'toeic-travel-1',
    name: 'Travel & Transportation',
    description: 'Vocabulary related to airports, hotels, and transportation',
    category: 'toeic',
    difficulty: 'beginner',
    wordCount: 45,
    slug: 'travel-transportation',
    imageUrl: '/images/travel.jpg'
  },
  {
    id: 'toeic-finance-1',
    name: 'Finance & Banking',
    description: 'Financial terms, banking vocabulary, and money-related expressions',
    category: 'toeic',
    difficulty: 'advanced',
    wordCount: 60,
    slug: 'finance-banking',
    imageUrl: '/images/finance.jpg'
  },
  {
    id: 'toeic-office-1',
    name: 'Office Environment',
    description: 'Workplace vocabulary, office equipment, and daily work activities',
    category: 'toeic',
    difficulty: 'beginner',
    wordCount: 40,
    slug: 'office-environment',
    imageUrl: '/images/office.jpg'
  }
];

export const ieltsTopics: Topic[] = [
  {
    id: 'ielts-academic-1',
    name: 'Academic Writing',
    description: 'Advanced vocabulary for IELTS academic writing tasks',
    category: 'ielts',
    difficulty: 'advanced',
    wordCount: 80,
    slug: 'academic-writing',
    imageUrl: '/images/academic-writing.jpg'
  },
  {
    id: 'ielts-environment-1',
    name: 'Environment & Nature',
    description: 'Environmental issues, climate change, and nature vocabulary',
    category: 'ielts',
    difficulty: 'intermediate',
    wordCount: 55,
    slug: 'environment-nature',
    imageUrl: '/images/environment.jpg'
  },
  {
    id: 'ielts-technology-1',
    name: 'Technology & Innovation',
    description: 'Modern technology, digital communication, and innovation terms',
    category: 'ielts',
    difficulty: 'intermediate',
    wordCount: 65,
    slug: 'technology-innovation',
    imageUrl: '/images/technology.jpg'
  },
  {
    id: 'ielts-health-1',
    name: 'Health & Medicine',
    description: 'Medical vocabulary, health issues, and wellness terminology',
    category: 'ielts',
    difficulty: 'advanced',
    wordCount: 70,
    slug: 'health-medicine',
    imageUrl: '/images/health.jpg'
  }
];

export const allTopics = [...toeicTopics, ...ieltsTopics];
