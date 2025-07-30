import type { Topic, BlogPost } from '@/lib/types';

export const topics: Topic[] = [
  {
    id: 'business-contracts',
    title: 'Business Contracts',
    description: 'Essential vocabulary for negotiating and understanding business contracts.',
    category: 'TOEIC',
    words: [
      { word: 'agreement', pronunciation: '/əˈɡriːmənt/', definition: 'A negotiated and typically legally binding arrangement between parties.', example: 'Both parties signed the agreement yesterday.' },
      { word: 'clause', pronunciation: '/klɔːz/', definition: 'A particular and separate article, stipulation, or proviso in a treaty, bill, or contract.', example: 'Please review the termination clause carefully.' },
      { word: 'oblige', pronunciation: '/əˈblaɪdʒ/', definition: 'Make (someone) legally or morally bound to an action or course of action.', example: 'The contract obliges the company to provide training.' },
      { word: 'negotiate', pronunciation: '/nəˈɡoʊʃieɪt/', definition: 'Obtain or bring about by discussion.', example: 'We need to negotiate a better price.' },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing',
    description: 'Key terms used in marketing, advertising, and sales.',
    category: 'TOEIC',
    words: [
      { word: 'campaign', pronunciation: '/kæmˈpeɪn/', definition: 'A series of coordinated activities to achieve a specific goal.', example: 'The new marketing campaign was very successful.' },
      { word: 'demographics', pronunciation: '/ˌdeməˈɡræfɪks/', definition: 'Statistical data relating to the population and particular groups within it.', example: 'The campaign targets a young demographic.' },
      { word: 'brand', pronunciation: '/brænd/', definition: 'A type of product manufactured by a particular company under a particular name.', example: 'Their brand is known for its quality.' },
    ],
  },
  {
    id: 'environment',
    title: 'Environment',
    description: 'Vocabulary related to environmental issues and conservation.',
    category: 'IELTS',
    words: [
      { word: 'sustainability', pronunciation: '/səˌsteɪnəˈbɪləti/', definition: 'The ability to be maintained at a certain rate or level.', example: 'Sustainability is a key goal for our company.' },
      { word: 'biodiversity', pronunciation: '/ˌbaɪoʊdaɪˈvɜːrsəti/', definition: 'The variety of life in the world or in a particular habitat or ecosystem.', example: 'The Amazon rainforest is known for its rich biodiversity.' },
      { word: 'conservation', pronunciation: '/ˌkɒnsərˈveɪʃn/', definition: 'The protection of animals, plants, and natural resources.', example: 'Conservation efforts are crucial to save endangered species.' },
    ],
  },
  {
    id: 'technology',
    title: 'Technology',
    description: 'Essential terms for discussing modern technology and innovation.',
    category: 'IELTS',
    words: [
      { word: 'innovation', pronunciation: '/ˌɪnəˈveɪʃn/', definition: 'A new method, idea, product, etc.', example: 'The company encourages innovation at all levels.' },
      { word: 'automation', pronunciation: '/ˌɔːtəˈmeɪʃn/', definition: 'The use of largely automatic equipment in a system of manufacturing or other production process.', example: 'Automation has increased factory output.' },
      { word: 'cybersecurity', pronunciation: '/ˌsaɪbərsɪˈkjʊrəti/', definition: 'The state of being protected against the criminal or unauthorized use of electronic data.', example: 'We need to invest more in cybersecurity.' },
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'mastering-toeic-vocabulary',
    title: 'Mastering TOEIC Vocabulary: A Strategic Approach',
    author: 'Jane Doe',
    date: '2024-05-15',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['TOEIC', 'Vocabulary', 'Strategy'],
    content: `
      <p>The TOEIC exam is a gateway to many professional opportunities, and a strong vocabulary is a cornerstone of success. But how do you go from simply knowing words to mastering them in context? This post outlines a strategic approach to not just learn, but retain and effectively use TOEIC vocabulary.</p>
      <h3 class="font-headline text-2xl mt-6 mb-3">1. Focus on High-Frequency Words</h3>
      <p>Start by identifying words that appear most frequently in business contexts. Our "Business Contracts" and "Marketing" topics are excellent starting points. Focus on understanding these words in various sentences.</p>
      <h3 class="font-headline text-2xl mt-6 mb-3">2. Context is King</h3>
      <p>Never learn a word in isolation. Pay attention to the example sentences provided in our app. Try creating your own sentences to solidify your understanding. The TOEIC exam tests your ability to understand words in context, so this practice is invaluable.</p>
      <h3 class="font-headline text-2xl mt-6 mb-3">3. Active Recall and Spaced Repetition</h3>
      <p>Use our practice feature regularly. The flashcard system is designed for active recall, forcing you to retrieve the meaning of a word from memory. This is far more effective than passive reading. Spaced repetition, the principle of reviewing information at increasing intervals, is built into a consistent study habit.</p>
    `
  },
  {
    id: '2',
    slug: 'ielts-speaking-environmental-topics',
    title: 'How to Excel in IELTS Speaking on Environmental Topics',
    author: 'John Smith',
    date: '2024-05-20',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['IELTS', 'Speaking', 'Environment'],
    content: `
      <p>The 'Environment' is a common topic in the IELTS Speaking test. To score highly, you need to use specific and relevant vocabulary. This guide will help you build the lexical resources you need to discuss environmental issues with confidence and precision.</p>
      <h3 class="font-headline text-2xl mt-6 mb-3">Key Vocabulary Areas</h3>
      <p>Familiarize yourself with terms related to:</p>
      <ul class="list-disc list-inside space-y-2 my-4">
        <li><strong>Conservation:</strong> Words like 'conservation', 'preservation', 'biodiversity', 'habitat'.</li>
        <li><strong>Pollution:</strong> 'Contamination', 'emissions', 'carbon footprint', 'renewable energy'.</li>
        <li><strong>Climate Change:</strong> 'Global warming', 'greenhouse effect', 'fossil fuels'.</li>
      </ul>
      <h3 class="font-headline text-2xl mt-6 mb-3">Structuring Your Answers</h3>
      <p>When asked about an environmental problem, try to structure your answer. First, state the problem (e.g., plastic pollution). Second, explain its causes. Third, discuss its effects. Finally, suggest possible solutions. Using words like 'sustainability' and 'conservation' will show the examiner your range of vocabulary.</p>
    `
  },
  {
    id: '3',
    slug: 'tech-talk-impress-in-ielts',
    title: 'Tech Talk: Impressing Examiners with Technology Vocabulary in IELTS',
    author: 'Emily White',
    date: '2024-06-01',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['IELTS', 'Technology', 'Vocabulary'],
    content: `
      <p>Technology is shaping our world, and it's a frequent topic in the IELTS exam. Whether you're discussing the pros and cons of automation or the future of artificial intelligence, having the right vocabulary is essential. Let's explore some key terms.</p>
      <h3 class="font-headline text-2xl mt-6 mb-3">Core Concepts</h3>
      <p>Focus on understanding and using terms like 'innovation', 'automation', and 'cybersecurity'. These are broad concepts that can apply to many different questions.</p>
      <ul class="list-disc list-inside space-y-2 my-4">
        <li>When discussing new inventions, use 'innovation' or 'breakthrough'.</li>
        <li>When talking about the impact on jobs, 'automation' is a key term.</li>
        <li>When considering online safety, 'cybersecurity' and 'data privacy' are crucial.</li>
      </ul>
      <h3 class="font-headline text-2xl mt-6 mb-3">Forming Opinions</h3>
      <p>The IELTS test often requires you to give your opinion. Practice forming sentences like: "While automation can lead to job displacement, it also drives economic growth through increased efficiency." This demonstrates a balanced view and a strong command of the vocabulary.</p>
    `
  },
];
