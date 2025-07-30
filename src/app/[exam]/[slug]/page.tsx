import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { toeicTopics, ieltsTopics } from '@/data/topics'
import { allVocabulary } from '@/data/vocabulary'
import { createTopicSchema, createBreadcrumbSchema } from '@/lib/structured-data'
import { generateKeywords } from '@/lib/seo-constants'

interface PageProps {
  params: Promise<{ exam: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { exam, slug } = await params

  if (exam !== 'toeic' && exam !== 'ielts') {
    return {}
  }

  const examTopics = exam === 'toeic' ? toeicTopics : ieltsTopics
  const topic = examTopics.find(t => t.slug === slug)

  if (!topic) {
    return {}
  }

  const examUpper = exam.toUpperCase()
  const title = `${topic.name} - ${examUpper} Vocabulary | VocabPractice`
  const description = `Learn ${topic.name.toLowerCase()} vocabulary for ${examUpper} with ${topic.wordCount} essential words. ${topic.description}`

  return {
    title,
    description,
    keywords: generateKeywords([topic.name, `${exam} ${topic.name}`, topic.difficulty], exam as 'toeic' | 'ielts'),
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      title,
      description,
    },
  }
}

export default async function ExamTopicPage({ params }: PageProps) {
  const { exam, slug } = await params

  // Validate exam parameter
  if (exam !== 'toeic' && exam !== 'ielts') {
    notFound()
  }

  const examTopics = exam === 'toeic' ? toeicTopics : ieltsTopics
  const topic = examTopics.find(t => t.slug === slug)

  if (!topic) {
    notFound()
  }

  // Get vocabulary words for this topic
  const vocabularyWords = allVocabulary.filter(word => word.topicId === topic.id)
  const examUpper = exam.toUpperCase()
  const examColor = exam === 'toeic' ? 'blue' : 'green'

  const topicSchema = createTopicSchema(topic, vocabularyWords)
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: `${examUpper}`, url: `/${exam}` },
    { name: topic.name, url: `/${exam}/${slug}` }
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([topicSchema, breadcrumbSchema])
        }}
      />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className={`text-gray-700 hover:text-${examColor}-600`}>
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <Link href={`/${exam}`} className={`ml-1 text-gray-700 hover:text-${examColor}-600 md:ml-2`}>
                    {examUpper}
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="ml-1 text-gray-500 md:ml-2">{topic.name}</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Topic Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{topic.name}</h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    topic.difficulty === 'beginner'
                      ? 'bg-green-100 text-green-800'
                      : topic.difficulty === 'intermediate'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{vocabularyWords.length} words</span>
                  <span>•</span>
                  <span>{examUpper} Category</span>
                  {exam === 'ielts' && (
                    <>
                      <span>•</span>
                      <span>Band 6.0-9.0</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/study/${exam}/${topic.slug}`}
                  className={`bg-${examColor}-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-${examColor}-700 transition-colors`}
                >
                  Start Practice
                </Link>
                <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* IELTS Skills Info (only for IELTS) */}
          {exam === 'ielts' && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">IELTS Skills Coverage</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">Reading</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">Writing</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">Listening</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">Speaking</div>
                </div>
              </div>
            </div>
          )}

          {/* Vocabulary List */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Vocabulary Words</h2>
              <p className="text-gray-600 mt-1">
                {exam === 'toeic'
                  ? 'Click on any word to hear pronunciation and see more details'
                  : 'Essential vocabulary for IELTS success - click to practice pronunciation'
                }
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {vocabularyWords.length > 0 ? (
                vocabularyWords.map((word, index) => (
                  <div key={word.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm text-gray-500 font-medium">#{index + 1}</span>
                          <h3 className="text-xl font-semibold text-gray-900">{word.word}</h3>
                          <span className="text-sm text-gray-500">{word.pronunciation}</span>
                          <button className={`text-${examColor}-600 hover:text-${examColor}-700`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M8.464 15.536a5 5 0 01-7.072-7.072m9.9-2.828a9 9 0 00-14.142 0M12 12h.01" />
                            </svg>
                          </button>
                        </div>

                        <div className="mb-2">
                          <span className={`inline-block bg-${examColor}-100 text-${examColor}-800 text-xs px-2 py-1 rounded-full font-medium`}>
                            {word.partOfSpeech}
                          </span>
                        </div>

                        <p className="text-gray-700 mb-2">
                          <strong>Definition:</strong> {word.definition}
                        </p>

                        <p className="text-gray-600 mb-2">
                          <strong>Example:</strong> <em>{word.example}</em>
                        </p>

                        {word.translation && (
                          <p className="text-gray-600">
                            <strong>Translation:</strong> {word.translation}
                          </p>
                        )}
                      </div>

                      <div className="ml-4 flex flex-col gap-2">
                        <button className="text-gray-400 hover:text-yellow-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        </button>
                        <button className={`text-gray-400 hover:text-${examColor}-500`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <p>No vocabulary words available for this topic yet.</p>
                  <p className="text-sm mt-2">Check back soon for updates!</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/study/${exam}/${topic.slug}`}
              className={`bg-${examColor}-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-${examColor}-700 transition-colors text-center`}
            >
              Practice with Flashcards
            </Link>
            <Link
              href={`/study/${exam}/${topic.slug}?mode=quiz`}
              className={`bg-${exam === 'toeic' ? 'green' : 'blue'}-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-${exam === 'toeic' ? 'green' : 'blue'}-700 transition-colors text-center`}
            >
              Take Quiz
            </Link>
            <Link
              href={`/${exam}`}
              className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
            >
              Back to Topics
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
