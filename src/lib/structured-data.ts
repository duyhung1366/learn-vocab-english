import { Topic, VocabularyWord, BlogPost } from '@/types'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vocab-practice.com'

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "VocabPractice",
  "description": "Master TOEIC and IELTS vocabulary with interactive learning platform",
  "url": siteUrl,
  "logo": `${siteUrl}/images/logo.png`,
  "sameAs": [
    "https://twitter.com/vocabpractice",
    "https://facebook.com/vocabpractice",
    "https://linkedin.com/company/vocabpractice"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-123-4567",
    "contactType": "customer service",
    "availableLanguage": ["English", "Vietnamese"]
  }
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "VocabPractice",
  "description": "Master TOEIC and IELTS vocabulary with interactive learning platform",
  "url": siteUrl,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${siteUrl}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
}

export const educationalOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "VocabPractice",
  "description": "Online vocabulary learning platform for TOEIC and IELTS preparation",
  "url": siteUrl,
  "logo": `${siteUrl}/images/logo.png`,
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "name": "TOEIC and IELTS Vocabulary Certification",
    "description": "Comprehensive vocabulary training for English proficiency exams"
  }
}

export const createCourseSchema = (examType: 'toeic' | 'ielts', topics: Topic[]) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": `${examType.toUpperCase()} Vocabulary Course`,
  "description": `Comprehensive ${examType.toUpperCase()} vocabulary training with ${topics.length} topics`,
  "provider": {
    "@type": "Organization",
    "name": "VocabPractice",
    "url": siteUrl
  },
  "url": `${siteUrl}/${examType}`,
  "courseCode": examType.toUpperCase(),
  "educationalLevel": "Intermediate to Advanced",
  "teaches": topics.map(topic => topic.name),
  "numberOfCredits": topics.length,
  "timeRequired": "P30D",
  "inLanguage": "en",
  "availableLanguage": ["en", "vi"],
  "isAccessibleForFree": true,
  "learningResourceType": "Interactive Course",
  "interactivityType": "active",
  "educationalUse": "instruction"
})

export const createTopicSchema = (topic: Topic, words: VocabularyWord[]) => ({
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": topic.name,
  "description": topic.description,
  "url": `${siteUrl}/${topic.category}/${topic.slug}`,
  "learningResourceType": "Vocabulary List",
  "educationalLevel": topic.difficulty,
  "inLanguage": "en",
  "isAccessibleForFree": true,
  "teaches": words.map(word => word.word),
  "numberOfItems": words.length,
  "about": {
    "@type": "Thing",
    "name": `${topic.category.toUpperCase()} ${topic.name}`,
    "description": topic.description
  },
  "educationalUse": "instruction",
  "interactivityType": "active",
  "typicalAgeRange": "18-65"
})

export const createVocabularySchema = (word: VocabularyWord) => ({
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": word.word,
  "description": word.definition,
  "inDefinedTermSet": {
    "@type": "DefinedTermSet",
    "name": `${word.topicId} Vocabulary`,
    "description": "Vocabulary set for exam preparation"
  },
  "termCode": word.id,
  "url": `${siteUrl}/word/${word.id}`,
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "partOfSpeech",
      "value": word.partOfSpeech
    },
    {
      "@type": "PropertyValue",
      "name": "pronunciation",
      "value": word.pronunciation
    },
    {
      "@type": "PropertyValue",
      "name": "difficulty",
      "value": word.difficulty
    }
  ]
})

export const createBlogPostSchema = (post: BlogPost) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.excerpt,
  "image": post.imageUrl ? `${siteUrl}${post.imageUrl}` : `${siteUrl}/images/blog-default.jpg`,
  "author": {
    "@type": "Person",
    "name": post.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "VocabPractice",
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/images/logo.png`
    }
  },
  "datePublished": post.publishedAt.toISOString(),
  "dateModified": post.publishedAt.toISOString(),
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${siteUrl}/blog/${post.slug}`
  },
  "url": `${siteUrl}/blog/${post.slug}`,
  "wordCount": Math.ceil(post.content.length / 5),
  "timeRequired": `PT${post.readTime}M`,
  "keywords": post.tags.join(', '),
  "articleSection": "Education",
  "inLanguage": "en",
  "about": {
    "@type": "Thing",
    "name": "Vocabulary Learning",
    "description": "Tips and strategies for learning vocabulary"
  }
})

export const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `${siteUrl}${item.url}`
  }))
})

export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
})
