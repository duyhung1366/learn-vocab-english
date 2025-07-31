# VocabPractice - TOEIC & IELTS Vocabulary Learning Platform

A comprehensive Next.js 15 application for mastering TOEIC and IELTS vocabulary through interactive learning methods.

## Features

- 🎯 **Interactive Learning**: Flashcards, quizzes, and spelling tests
- 📚 **Comprehensive Content**: TOEIC and IELTS vocabulary topics
- 📊 **Progress Tracking**: Monitor your learning journey
- 🎨 **Modern UI**: Responsive design with Tailwind CSS
- 🔍 **SEO Optimized**: Complete SEO implementation with structured data
- 🚀 **Performance**: Built with Next.js 15 and optimized for speed
- 📱 **PWA Ready**: Progressive Web App capabilities

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Node Version**: 20
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://gitlab.com/duyhungfa102/learn-vocab-english.git
cd learn-vocab-english
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker Deployment

### Building the Docker Image

```bash
# Build the image
docker build -t registry.gitlab.com/duyhungfa102/learn-vocab-english:latest .

# Push to GitLab Registry
docker push registry.gitlab.com/duyhungfa102/learn-vocab-english:latest
```

### Using Docker Compose

For development:
```bash
docker compose up -d
```

For production:
```bash
docker compose -f docker-compose.prod.yml up -d
```

## GitLab CI/CD

The project includes a complete GitLab CI/CD pipeline that:

1. **Build Stage**: Creates Docker image and pushes to GitLab Registry
2. **Test Stage**: Runs linting and build tests
3. **Deploy Stage**: Deploys to staging and production environments

### Environment Variables

Set these variables in your GitLab CI/CD settings:

- `CI_REGISTRY_USER`: GitLab registry username
- `CI_REGISTRY_PASSWORD`: GitLab registry password
- `NEXT_PUBLIC_SITE_URL`: Your production URL

## SEO Features

### Implemented SEO Optimizations

- ✅ **Meta Tags**: Title, description, keywords for all pages
- ✅ **Open Graph**: Social media sharing optimization
- ✅ **Twitter Cards**: Twitter-specific meta tags
- ✅ **Structured Data**: JSON-LD schema markup
- ✅ **Sitemap**: Auto-generated XML sitemap
- ✅ **Robots.txt**: Search engine crawling instructions
- ✅ **Canonical URLs**: Prevent duplicate content issues
- ✅ **Semantic HTML**: Proper heading hierarchy (H1, H2, etc.)
- ✅ **Performance**: Optimized images and fonts
- ✅ **Mobile-First**: Responsive design
- ✅ **PWA**: Progressive Web App manifest

### SEO Best Practices

1. **Page Titles**: Unique, descriptive titles under 60 characters
2. **Meta Descriptions**: Compelling descriptions under 160 characters
3. **URL Structure**: Clean, descriptive URLs
4. **Internal Linking**: Strategic internal link structure
5. **Content Quality**: High-quality, relevant content
6. **Loading Speed**: Optimized for Core Web Vitals

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── blog/              # Blog pages
│   ├── ielts/             # IELTS vocabulary pages
│   ├── study/             # Practice/study pages
│   ├── toeic/             # TOEIC vocabulary pages
│   ├── layout.tsx         # Root layout with SEO
│   ├── page.tsx           # Home page
│   ├── sitemap.ts         # Auto-generated sitemap
│   ├── robots.ts          # Robots.txt configuration
│   └── manifest.ts        # PWA manifest
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   └── SEO.tsx           # SEO component
├── data/                  # Static data files
│   ├── topics.ts          # Vocabulary topics
│   └── vocabulary.ts      # Vocabulary words
├── lib/                   # Utility functions
│   ├── seo-constants.ts   # SEO configuration
│   ├── structured-data.ts # Schema.org markup
│   └── utils.ts          # General utilities
└── types/                 # TypeScript type definitions
    └── index.ts          # Application types
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## Deployment

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

### Docker Deployment

1. Build and run with Docker:
```bash
docker build -t vocab-practice .
docker run -p 3000:3000 vocab-practice
```

### GitLab CI/CD Deployment

The project automatically deploys when you push to:
- `develop` branch → Staging environment
- `main` branch → Production environment (manual approval required)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@vocab-practice.com or create an issue in the GitLab repository.
