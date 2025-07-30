import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { toeicTopics, ieltsTopics } from '@/data/topics'
import { PAGE_SEO, generateKeywords } from '@/lib/seo-constants'
import { createCourseSchema, createBreadcrumbSchema } from '@/lib/structured-data'

interface PageProps {
  params: Promise<{ exam: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { exam } = await params

  if (exam !== 'toeic' && exam !== 'ielts') {
    return {}
  }

  const isToiec = exam === 'toeic'

  return {
    title: isToiec ? PAGE_SEO.TOEIC_TOPICS.title : PAGE_SEO.IELTS_TOPICS.title,
    description: isToiec ? PAGE_SEO.TOEIC_TOPICS.description : PAGE_SEO.IELTS_TOPICS.description,
    keywords: generateKeywords([], exam as 'toeic' | 'ielts'),
    openGraph: {
      title: isToiec ? PAGE_SEO.TOEIC_TOPICS.title : PAGE_SEO.IELTS_TOPICS.title,
      description: isToiec ? PAGE_SEO.TOEIC_TOPICS.description : PAGE_SEO.IELTS_TOPICS.description,
      type: "website",
    },
    twitter: {
      title: isToiec ? PAGE_SEO.TOEIC_TOPICS.title : PAGE_SEO.IELTS_TOPICS.title,
      description: isToiec ? PAGE_SEO.TOEIC_TOPICS.description : PAGE_SEO.IELTS_TOPICS.description,
    },
  }
}

export default async function ExamTopicsPage({ params }: PageProps) {
  const { exam } = await params

  // Validate exam parameter
  if (exam !== 'toeic' && exam !== 'ielts') {
    notFound()
  }

  const examTopics = exam === 'toeic' ? toeicTopics : ieltsTopics
  const examUpper = exam.toUpperCase()
  const examColor = exam === 'toeic' ? 'blue' : 'green'

  const courseSchema = createCourseSchema(exam as 'toeic' | 'ielts', examTopics)
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: `${examUpper} Topics`, url: `/${exam}` }
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([courseSchema, breadcrumbSchema])
        }}
      />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {examUpper} Vocabulary Topics
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {exam === 'toeic'
                ? 'Master business English vocabulary with our comprehensive TOEIC preparation materials. Each topic contains carefully selected words commonly found in the TOEIC exam.'
                : 'Enhance your academic and general English vocabulary for IELTS success. Our topics cover essential vocabulary for all four IELTS skills: Reading, Writing, Listening, and Speaking.'
              }
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className={`text-3xl font-bold text-${examColor}-600 mb-2`}>{examTopics.length}</div>
              <div className="text-gray-600">Topics Available</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className={`text-3xl font-bold text-${examColor}-600 mb-2`}>
                {examTopics.reduce((total, topic) => total + topic.wordCount, 0)}
              </div>
              <div className="text-gray-600">Total Words</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className={`text-3xl font-bold text-${examColor}-600 mb-2`}>
                {exam === 'toeic' ? '3' : '9.0'}
              </div>
              <div className="text-gray-600">
                {exam === 'toeic' ? 'Difficulty Levels' : 'Target Band Score'}
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button className={`px-6 py-2 bg-${examColor}-600 text-white rounded-full font-medium hover:bg-${examColor}-700 transition-colors`}>
              All Topics
            </button>
            <button className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium hover:bg-gray-50 border border-gray-300 transition-colors">
              Beginner
            </button>
            <button className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium hover:bg-gray-50 border border-gray-300 transition-colors">
              Intermediate
            </button>
            <button className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium hover:bg-gray-50 border border-gray-300 transition-colors">
              Advanced
            </button>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examTopics.map((topic) => (
              <div key={topic.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      topic.difficulty === 'beginner'
                        ? 'bg-green-100 text-green-800'
                        : topic.difficulty === 'intermediate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">{topic.wordCount} words</span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {topic.name}
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm">
                    {topic.description}
                  </p>

                  <div className="flex gap-2">
                    <Link
                      href={`/${exam}/${topic.slug}`}
                      className={`flex-1 bg-${examColor}-600 text-white text-center py-2 px-4 rounded-md hover:bg-${examColor}-700 transition-colors text-sm font-medium`}
                    >
                      View Words
                    </Link>
                    <Link
                      href={`/study/${exam}/${topic.slug}`}
                      className="flex-1 bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      Start Practice
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* IELTS Band Score Info (only for IELTS) */}
          {exam === 'ielts' && (
            <div className="mt-16">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  IELTS Band Score Requirements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">6.0-6.5</div>
                    <div className="font-semibold text-gray-900 mb-2">Competent User</div>
                    <div className="text-sm text-gray-600">
                      Generally effective command of the language despite some inaccuracies
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">7.0-7.5</div>
                    <div className="font-semibold text-gray-900 mb-2">Good User</div>
                    <div className="text-sm text-gray-600">
                      Good operational command with occasional inaccuracies
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">8.0-9.0</div>
                    <div className="font-semibold text-gray-900 mb-2">Expert User</div>
                    <div className="text-sm text-gray-600">
                      Fully operational command with complete understanding
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className={`bg-${examColor}-50 rounded-lg p-8`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {exam === 'toeic'
                  ? 'Ready to Start Your TOEIC Journey?'
                  : 'Achieve Your Target IELTS Score'
                }
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {exam === 'toeic'
                  ? 'Join thousands of learners who have improved their TOEIC scores with our systematic vocabulary training.'
                  : 'Build the vocabulary foundation you need for IELTS success. Our systematic approach helps you learn and retain essential words.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/register"
                  className={`bg-${examColor}-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-${examColor}-700 transition-colors`}
                >
                  {exam === 'toeic' ? 'Create Free Account' : 'Start Free Trial'}
                </Link>
                <Link
                  href={`/study/${exam}/${examTopics[0]?.slug}`}
                  className={`bg-white text-${examColor}-600 px-8 py-3 rounded-lg font-semibold border border-${examColor}-600 hover:bg-${examColor}-50 transition-colors`}
                >
                  {exam === 'toeic' ? 'Try Sample Topic' : 'Try Academic Writing'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
