export interface VocabularyWord {
  word: string;
  pronunciation: string;
  definition: string;
  example: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  category: 'TOEIC' | 'IELTS';
  words: VocabularyWord[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  imageUrl: string;
  content: string;
  tags: string[];
}
