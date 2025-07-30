import Link from "next/link";
import { Metadata } from "next";
import { PAGE_SEO } from "@/lib/seo-constants";
import { createFAQSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: PAGE_SEO.HOME.title,
  description: PAGE_SEO.HOME.description,
  keywords: PAGE_SEO.HOME.keywords,
  openGraph: {
    title: PAGE_SEO.HOME.title,
    description: PAGE_SEO.HOME.description,
    type: "website",
  },
  twitter: {
    title: PAGE_SEO.HOME.title,
    description: PAGE_SEO.HOME.description,
  },
};

const faqs = [
  {
    question: "What is VocabPractice?",
    answer: "VocabPractice is an interactive online platform designed to help you master TOEIC and IELTS vocabulary through flashcards, quizzes, and systematic learning."
  },
  {
    question: "How does the vocabulary practice work?",
    answer: "Our platform offers multiple study modes including flashcards, multiple-choice quizzes, and spelling tests. You can track your progress and focus on areas that need improvement."
  },
  {
    question: "Is VocabPractice free to use?",
    answer: "Yes, VocabPractice offers free access to vocabulary topics and basic practice features. Premium features may be available for advanced learners."
  },
  {
    question: "How many vocabulary words are available?",
    answer: "We offer hundreds of carefully curated vocabulary words across multiple topics for both TOEIC and IELTS exams, with new words added regularly."
  }
];

export default function Home() {
  const faqSchema = createFAQSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Master <span className="text-blue-600">TOEIC</span> & <span className="text-green-600">IELTS</span>
              <br />
              Vocabulary
            </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Practice with interactive flashcards, take quizzes, and track your progress.
            Build your vocabulary systematically with our comprehensive learning platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Learning Free
            </Link>
            <Link
              href="/toeic"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Browse Topics
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose VocabPractice?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Content</h3>
              <p className="text-gray-600">
                Carefully curated vocabulary lists for both TOEIC and IELTS exams with definitions, examples, and pronunciations.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your learning journey with detailed statistics, streak tracking, and personalized recommendations.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
              <p className="text-gray-600">
                Engage with flashcards, quizzes, and spelling tests designed to reinforce your memory effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Choose Your Exam
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/toeic" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-blue-600">TOEIC</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">TOEIC Vocabulary</h3>
                  <p className="text-gray-600 mb-6">
                    Business English vocabulary for the Test of English for International Communication.
                    Perfect for workplace and professional contexts.
                  </p>
                  <div className="text-blue-600 font-semibold group-hover:text-blue-700">
                    Start TOEIC Practice →
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/ielts" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-green-600">IELTS</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">IELTS Vocabulary</h3>
                  <p className="text-gray-600 mb-6">
                    Academic and general vocabulary for the International English Language Testing System.
                    Essential for university and immigration purposes.
                  </p>
                  <div className="text-green-600 font-semibold group-hover:text-green-700">
                    Start IELTS Practice →
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
