export const SEO_CONSTANTS = {
  SITE_NAME: 'VocabPractice',
  SITE_DESCRIPTION: 'Master TOEIC and IELTS vocabulary with interactive flashcards, quizzes, and progress tracking. Build your English vocabulary systematically with our comprehensive learning platform.',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://vocab-practice.com',
  DEFAULT_OG_IMAGE: '/images/og-default.jpg',
  TWITTER_HANDLE: '@vocabpractice',
  FACEBOOK_APP_ID: '123456789',
  
  // Common keywords
  COMMON_KEYWORDS: [
    'vocabulary learning',
    'English vocabulary',
    'TOEIC vocabulary',
    'IELTS vocabulary',
    'English exam preparation',
    'vocabulary practice',
    'flashcards',
    'English learning',
    'vocabulary building',
    'language learning'
  ],
  
  TOEIC_KEYWORDS: [
    'TOEIC preparation',
    'TOEIC vocabulary',
    'TOEIC practice',
    'business English',
    'TOEIC test',
    'TOEIC study',
    'TOEIC words',
    'TOEIC exam',
    'professional English',
    'workplace English'
  ],
  
  IELTS_KEYWORDS: [
    'IELTS preparation',
    'IELTS vocabulary',
    'IELTS practice',
    'academic English',
    'IELTS test',
    'IELTS study',
    'IELTS words',
    'IELTS exam',
    'band score',
    'IELTS writing',
    'IELTS speaking'
  ]
}

export const generatePageTitle = (title: string, includesSiteName = false): string => {
  if (includesSiteName || title.includes(SEO_CONSTANTS.SITE_NAME)) {
    return title
  }
  return `${title} | ${SEO_CONSTANTS.SITE_NAME}`
}

export const generateMetaDescription = (description: string, maxLength = 160): string => {
  if (description.length <= maxLength) {
    return description
  }
  return description.substring(0, maxLength - 3) + '...'
}

export const generateKeywords = (specificKeywords: string[] = [], examType?: 'toeic' | 'ielts'): string[] => {
  const baseKeywords = [...SEO_CONSTANTS.COMMON_KEYWORDS]
  
  if (examType === 'toeic') {
    baseKeywords.push(...SEO_CONSTANTS.TOEIC_KEYWORDS)
  } else if (examType === 'ielts') {
    baseKeywords.push(...SEO_CONSTANTS.IELTS_KEYWORDS)
  }
  
  return [...new Set([...specificKeywords, ...baseKeywords])]
}

export const generateCanonicalUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${SEO_CONSTANTS.SITE_URL}${cleanPath}`
}

export const generateOgImageUrl = (imagePath?: string): string => {
  if (!imagePath) {
    return `${SEO_CONSTANTS.SITE_URL}${SEO_CONSTANTS.DEFAULT_OG_IMAGE}`
  }
  
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`
  return `${SEO_CONSTANTS.SITE_URL}${cleanPath}`
}

// Page-specific SEO configurations
export const PAGE_SEO = {
  HOME: {
    title: 'Master TOEIC & IELTS Vocabulary - Interactive Learning Platform',
    description: 'Learn TOEIC and IELTS vocabulary with interactive flashcards, quizzes, and progress tracking. Join thousands of students improving their English exam scores.',
    keywords: generateKeywords(['online learning', 'exam preparation', 'English proficiency'])
  },
  
  TOEIC_TOPICS: {
    title: 'TOEIC Vocabulary Topics - Business English Practice',
    description: 'Comprehensive TOEIC vocabulary topics covering business communication, finance, travel, and workplace English. Practice with flashcards and quizzes.',
    keywords: generateKeywords(['TOEIC topics', 'business vocabulary'], 'toeic')
  },
  
  IELTS_TOPICS: {
    title: 'IELTS Vocabulary Topics - Academic & General English',
    description: 'Essential IELTS vocabulary topics for academic writing, speaking, and general English. Achieve your target band score with systematic practice.',
    keywords: generateKeywords(['IELTS topics', 'academic vocabulary'], 'ielts')
  },
  
  BLOG: {
    title: 'Vocabulary Learning Blog - Tips & Strategies',
    description: 'Expert tips, strategies, and insights for mastering TOEIC and IELTS vocabulary. Latest learning techniques and exam preparation advice.',
    keywords: generateKeywords(['learning tips', 'study strategies', 'vocabulary blog'])
  },
  
  LOGIN: {
    title: 'Login - Access Your Vocabulary Learning Dashboard',
    description: 'Sign in to your VocabPractice account to continue your vocabulary learning journey and track your progress.',
    keywords: generateKeywords(['login', 'sign in', 'account access'])
  },
  
  REGISTER: {
    title: 'Create Account - Start Your Vocabulary Learning Journey',
    description: 'Join VocabPractice for free and start mastering TOEIC and IELTS vocabulary with personalized learning and progress tracking.',
    keywords: generateKeywords(['sign up', 'create account', 'free registration'])
  }
}
