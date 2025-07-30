'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { toeicTopics, ieltsTopics } from '@/data/topics'
import { allVocabulary } from '@/data/vocabulary'
import { shuffleArray } from '@/lib/utils'

interface PageProps {
  params: Promise<{ exam: string; slug: string }>
}

function StudyContent({
  exam,
  slug,
  mode
}: {
  exam: string;
  slug: string;
  mode: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [studiedWords, setStudiedWords] = useState<string[]>([])
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizOptions, setQuizOptions] = useState<string[]>([])

  const examTopics = exam === 'toeic' ? toeicTopics : ieltsTopics
  const topic = examTopics.find(t => t.slug === slug)
  const vocabularyWords = topic ? allVocabulary.filter(word => word.topicId === topic.id) : []
  const currentWord = vocabularyWords[currentIndex]
  const examColor = exam === 'toeic' ? 'blue' : 'green'

  // Generate quiz options when in quiz mode - moved to top to avoid conditional hook calls
  useEffect(() => {
    if (mode === 'quiz' && currentWord) {
      const otherWords = allVocabulary.filter(w => w.id !== currentWord.id)
      const wrongAnswers = shuffleArray(otherWords).slice(0, 3).map(w => w.definition)
      const allOptions = shuffleArray([currentWord.definition, ...wrongAnswers])
      setQuizOptions(allOptions)
    }
  }, [currentIndex, mode, currentWord])

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Topic not found</h2>
          <p className="text-gray-600 mb-6">The requested topic could not be found.</p>
          <Link href={`/${exam}`} className={`bg-${exam === 'toeic' ? 'blue' : 'green'}-600 text-white px-6 py-3 rounded-lg hover:bg-${exam === 'toeic' ? 'blue' : 'green'}-700`}>
            Back to Topics
          </Link>
        </div>
      </div>
    )
  }

  if (vocabularyWords.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No vocabulary available</h2>
          <p className="text-gray-600 mb-6">This topic doesn&apos;t have vocabulary words yet.</p>
          <Link href={`/${exam}`} className={`bg-${exam === 'toeic' ? 'blue' : 'green'}-600 text-white px-6 py-3 rounded-lg hover:bg-${exam === 'toeic' ? 'blue' : 'green'}-700`}>
            Back to Topics
          </Link>
        </div>
      </div>
    )
  }

  const handleNext = () => {
    if (currentIndex < vocabularyWords.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
      setSelectedAnswer(null)
      if (!studiedWords.includes(currentWord.id)) {
        setStudiedWords([...studiedWords, currentWord.id])
      }
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowAnswer(false)
      setSelectedAnswer(null)
    }
  }

  const handleQuizAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex)
    const isCorrect = quizOptions[optionIndex] === currentWord.definition
    setScore({
      correct: score.correct + (isCorrect ? 1 : 0),
      total: score.total + 1
    })
    setShowAnswer(true)
  }

  const resetStudy = () => {
    setCurrentIndex(0)
    setShowAnswer(false)
    setStudiedWords([])
    setScore({ correct: 0, total: 0 })
    setSelectedAnswer(null)
  }

  const progress = ((currentIndex + 1) / vocabularyWords.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{topic.name}</h1>
              <p className="text-gray-600">
                {mode === 'flashcard' ? 'Flashcard Mode' : 'Quiz Mode'} •
                Word {currentIndex + 1} of {vocabularyWords.length}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/study/${exam}/${slug}?mode=flashcard`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mode === 'flashcard'
                    ? `bg-${examColor}-600 text-white`
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Flashcards
              </Link>
              <Link
                href={`/study/${exam}/${slug}?mode=quiz`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mode === 'quiz'
                    ? `bg-${examColor}-600 text-white`
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Quiz
              </Link>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`bg-${examColor}-600 h-2 rounded-full transition-all duration-300`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Stats */}
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Progress: {Math.round(progress)}%</span>
            {mode === 'quiz' && score.total > 0 && (
              <span>Score: {score.correct}/{score.total} ({Math.round((score.correct/score.total)*100)}%)</span>
            )}
          </div>
        </div>

        {/* Study Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 min-h-[400px] flex flex-col justify-center">
          {mode === 'flashcard' ? (
            // Flashcard Mode
            <div className="text-center">
              <div className="mb-6">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">{currentWord.word}</h2>
                <p className="text-lg text-gray-600">{currentWord.pronunciation}</p>
                <span className={`inline-block bg-${examColor}-100 text-${examColor}-800 text-sm px-3 py-1 rounded-full mt-2`}>
                  {currentWord.partOfSpeech}
                </span>
              </div>

              {showAnswer ? (
                <div className="space-y-4">
                  <p className="text-xl text-gray-700">{currentWord.definition}</p>
                  <p className="text-gray-600 italic">&ldquo;{currentWord.example}&rdquo;</p>
                  {currentWord.translation && (
                    <p className="text-gray-500">Translation: {currentWord.translation}</p>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAnswer(true)}
                  className={`bg-${examColor}-600 text-white px-8 py-3 rounded-lg hover:bg-${examColor}-700 transition-colors`}
                >
                  Show Definition
                </button>
              )}
            </div>
          ) : (
            // Quiz Mode
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  What does &ldquo;{currentWord.word}&rdquo; mean?
                </h2>
                <p className="text-gray-600">{currentWord.pronunciation}</p>
              </div>

              <div className="space-y-3">
                {quizOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showAnswer && handleQuizAnswer(index)}
                    disabled={showAnswer}
                    className={`w-full p-4 text-left rounded-lg border transition-colors ${
                      showAnswer
                        ? option === currentWord.definition
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : selectedAnswer === index
                          ? 'bg-red-100 border-red-500 text-red-800'
                          : 'bg-gray-50 border-gray-300 text-gray-600'
                        : 'bg-white border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showAnswer && (
                <div className={`mt-6 p-4 bg-${examColor}-50 rounded-lg`}>
                  <p className={`text-${examColor}-800`}>
                    <strong>Example:</strong> <em>{currentWord.example}</em>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <div className="flex gap-3">
            <button
              onClick={resetStudy}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Restart
            </button>
            <Link
              href={`/${exam}/${slug}`}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              View All Words
            </Link>
          </div>

          {currentIndex < vocabularyWords.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={mode === 'flashcard' && !showAnswer}
              className={`flex items-center gap-2 px-6 py-3 bg-${examColor}-600 text-white rounded-lg hover:bg-${examColor}-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
            >
              Next
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <Link
              href={`/${exam}/${slug}`}
              className={`flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors`}
            >
              Complete
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ExamStudyPage({ params }: PageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ exam: string; slug: string } | null>(null)
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode') || 'flashcard'

  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  if (!resolvedParams) {
    return <div>Loading...</div>
  }

  const { exam, slug } = resolvedParams

  // Validate exam parameter
  if (exam !== 'toeic' && exam !== 'ielts') {
    return <div>Invalid exam type</div>
  }

  return <StudyContent exam={exam} slug={slug} mode={mode} />
}
