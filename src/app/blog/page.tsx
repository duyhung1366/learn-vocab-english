import Link from 'next/link'
import { Metadata } from 'next'
import { PAGE_SEO } from '@/lib/seo-constants'
import { createBreadcrumbSchema } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: PAGE_SEO.BLOG.title,
  description: PAGE_SEO.BLOG.description,
  keywords: PAGE_SEO.BLOG.keywords,
  openGraph: {
    title: PAGE_SEO.BLOG.title,
    description: PAGE_SEO.BLOG.description,
    type: "website",
  },
  twitter: {
    title: PAGE_SEO.BLOG.title,
    description: PAGE_SEO.BLOG.description,
  },
}

// Sample blog posts data
const blogPosts = [
  {
    id: '1',
    title: '10 Essential TOEIC Vocabulary Tips for Business Success',
    slug: 'toeic-vocabulary-tips-business-success',
    excerpt: 'Master the most important business vocabulary for TOEIC with these proven strategies and techniques.',
    author: 'Sarah Johnson',
    publishedAt: new Date('2024-01-15'),
    tags: ['TOEIC', 'Business English', 'Vocabulary'],
    readTime: 8,
    imageUrl: '/images/blog/toeic-tips.jpg'
  },
  {
    id: '2',
    title: 'IELTS Academic Writing: Advanced Vocabulary for Band 8+',
    slug: 'ielts-academic-writing-advanced-vocabulary',
    excerpt: 'Discover sophisticated vocabulary and phrases that will elevate your IELTS writing to band 8 and beyond.',
    author: 'Dr. Michael Chen',
    publishedAt: new Date('2024-01-10'),
    tags: ['IELTS', 'Academic Writing', 'Band Score'],
    readTime: 12,
    imageUrl: '/images/blog/ielts-writing.jpg'
  },
  {
    id: '3',
    title: 'Memory Techniques: How to Remember Vocabulary Faster',
    slug: 'memory-techniques-vocabulary-retention',
    excerpt: 'Learn scientifically-proven memory techniques to boost your vocabulary retention and recall.',
    author: 'Emma Rodriguez',
    publishedAt: new Date('2024-01-05'),
    tags: ['Study Tips', 'Memory', 'Learning'],
    readTime: 6,
    imageUrl: '/images/blog/memory-techniques.jpg'
  },
  {
    id: '4',
    title: 'Common TOEIC Listening Vocabulary Mistakes to Avoid',
    slug: 'toeic-listening-vocabulary-mistakes',
    excerpt: 'Identify and avoid the most common vocabulary mistakes that trip up TOEIC test-takers.',
    author: 'James Wilson',
    publishedAt: new Date('2023-12-28'),
    tags: ['TOEIC', 'Listening', 'Common Mistakes'],
    readTime: 7,
    imageUrl: '/images/blog/toeic-listening.jpg'
  },
  {
    id: '5',
    title: 'IELTS Speaking: Impressive Vocabulary for Part 2',
    slug: 'ielts-speaking-vocabulary-part-2',
    excerpt: 'Stand out in IELTS Speaking Part 2 with these impressive vocabulary words and phrases.',
    author: 'Lisa Thompson',
    publishedAt: new Date('2023-12-20'),
    tags: ['IELTS', 'Speaking', 'Vocabulary'],
    readTime: 9,
    imageUrl: '/images/blog/ielts-speaking.jpg'
  },
  {
    id: '6',
    title: 'Building Your English Vocabulary: A 30-Day Challenge',
    slug: 'english-vocabulary-30-day-challenge',
    excerpt: 'Transform your English vocabulary in just 30 days with this structured learning challenge.',
    author: 'David Park',
    publishedAt: new Date('2023-12-15'),
    tags: ['Challenge', 'Vocabulary Building', 'Study Plan'],
    readTime: 5,
    imageUrl: '/images/blog/30-day-challenge.jpg'
  }
]

const categories = ['All', 'TOEIC', 'IELTS', 'Study Tips', 'Vocabulary Building']

export default function BlogPage() {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' }
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Vocabulary Learning Blog
            </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert tips, strategies, and insights to help you master TOEIC and IELTS vocabulary.
            Stay updated with the latest learning techniques and exam preparation advice.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                category === 'All'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <h3 className="text-2xl font-bold mb-2">Featured Article</h3>
                    <p className="text-blue-100">Latest insights and tips</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                    Featured
                  </span>
                  <span className="text-sm text-gray-500">{formatDate(blogPosts[0].publishedAt)}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>By {blogPosts[0].author}</span>
                    <span>•</span>
                    <span>{blogPosts[0].readTime} min read</span>
                  </div>
                  <Link
                    href={`/blog/${blogPosts[0].slug}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-lg flex items-center justify-center">
                <div className="text-gray-500 text-center">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <p className="text-sm">Blog Image</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        tag === 'TOEIC'
                          ? 'bg-blue-100 text-blue-800'
                          : tag === 'IELTS'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <span>{post.readTime} min</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="block mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Read Article →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Stay Updated with Our Latest Tips
            </h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Get weekly vocabulary tips, study strategies, and exam preparation advice delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-blue-100 mt-3">
              No spam, unsubscribe at any time.
            </p>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}
