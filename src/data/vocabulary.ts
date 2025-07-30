import { VocabularyWord } from '@/types';

export const businessCommunicationWords: VocabularyWord[] = [
  {
    id: 'word-1',
    word: 'agenda',
    pronunciation: '/əˈdʒendə/',
    partOfSpeech: 'noun',
    definition: 'A list of items to be discussed at a formal meeting',
    example: 'Please review the agenda before tomorrow\'s board meeting.',
    translation: 'chương trình nghị sự',
    difficulty: 'intermediate',
    topicId: 'toeic-business-1'
  },
  {
    id: 'word-2',
    word: 'negotiate',
    pronunciation: '/nɪˈɡoʊʃieɪt/',
    partOfSpeech: 'verb',
    definition: 'To discuss something with someone in order to reach an agreement',
    example: 'We need to negotiate the terms of the contract.',
    translation: 'đàm phán, thương lượng',
    difficulty: 'intermediate',
    topicId: 'toeic-business-1'
  },
  {
    id: 'word-3',
    word: 'deadline',
    pronunciation: '/ˈdedlaɪn/',
    partOfSpeech: 'noun',
    definition: 'A time or date by which something must be finished',
    example: 'The deadline for the project is next Friday.',
    translation: 'hạn chót',
    difficulty: 'beginner',
    topicId: 'toeic-business-1'
  },
  {
    id: 'word-4',
    word: 'collaborate',
    pronunciation: '/kəˈlæbəreɪt/',
    partOfSpeech: 'verb',
    definition: 'To work jointly with others or together especially in an intellectual endeavor',
    example: 'Our teams will collaborate on this new initiative.',
    translation: 'hợp tác',
    difficulty: 'intermediate',
    topicId: 'toeic-business-1'
  },
  {
    id: 'word-5',
    word: 'proposal',
    pronunciation: '/prəˈpoʊzəl/',
    partOfSpeech: 'noun',
    definition: 'A plan or suggestion, especially a formal or written one, put forward for consideration',
    example: 'The client accepted our proposal for the marketing campaign.',
    translation: 'đề xuất, đề nghị',
    difficulty: 'intermediate',
    topicId: 'toeic-business-1'
  }
];

export const academicWritingWords: VocabularyWord[] = [
  {
    id: 'word-6',
    word: 'analyze',
    pronunciation: '/ˈænəlaɪz/',
    partOfSpeech: 'verb',
    definition: 'To examine methodically and in detail the constitution or structure of something',
    example: 'Students must analyze the data before drawing conclusions.',
    translation: 'phân tích',
    difficulty: 'advanced',
    topicId: 'ielts-academic-1'
  },
  {
    id: 'word-7',
    word: 'hypothesis',
    pronunciation: '/haɪˈpɑːθəsɪs/',
    partOfSpeech: 'noun',
    definition: 'A supposition or proposed explanation made on the basis of limited evidence',
    example: 'The researcher\'s hypothesis was proven correct by the experiment.',
    translation: 'giả thuyết',
    difficulty: 'advanced',
    topicId: 'ielts-academic-1'
  },
  {
    id: 'word-8',
    word: 'methodology',
    pronunciation: '/ˌmeθəˈdɑːlədʒi/',
    partOfSpeech: 'noun',
    definition: 'A system of methods used in a particular area of study or activity',
    example: 'The research methodology was clearly explained in the paper.',
    translation: 'phương pháp luận',
    difficulty: 'advanced',
    topicId: 'ielts-academic-1'
  },
  {
    id: 'word-9',
    word: 'significant',
    pronunciation: '/sɪɡˈnɪfɪkənt/',
    partOfSpeech: 'adjective',
    definition: 'Sufficiently great or important to be worthy of attention; noteworthy',
    example: 'There was a significant improvement in test scores.',
    translation: 'đáng kể, quan trọng',
    difficulty: 'intermediate',
    topicId: 'ielts-academic-1'
  },
  {
    id: 'word-10',
    word: 'correlation',
    pronunciation: '/ˌkɔːrəˈleɪʃən/',
    partOfSpeech: 'noun',
    definition: 'A mutual relationship or connection between two or more things',
    example: 'The study found a strong correlation between exercise and mental health.',
    translation: 'mối tương quan',
    difficulty: 'advanced',
    topicId: 'ielts-academic-1'
  }
];

export const allVocabulary = [...businessCommunicationWords, ...academicWritingWords];
