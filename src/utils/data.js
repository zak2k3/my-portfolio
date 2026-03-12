// Portfolio data constants

export const PERSONAL_INFO = {
  name: 'Zakariya Baaziz',
  title: 'Full Stack Web Developer',
  location: 'Tangier, Morocco',
  email: 'zakarriyabaaziz2k3@gmail.com',
  phone: '+212625913711',
  bio: 'Full-stack developer based in Tangier specializing in React and Laravel. Passionate about building tools that solve real problems, especially in trading and data analysis. Currently finishing my final year while building production-ready web applications.',
  social: {
    linkedin: 'https://www.linkedin.com/in/zakariya-baaziz-769b77390/',
    github: 'https://github.com/zak2k3',
    fiverr: 'https://www.fiverr.com/zech2k3',
  },
  languages: [
    { lang: 'English', level: 'C1', flag: '🇬🇧', percent: 85 },
    { lang: 'Arabic', level: 'Native', flag: '🇲🇦', percent: 100 },
    { lang: 'French', level: 'A2', flag: '🇫🇷', percent: 30 },
  ],
}

export const SKILLS = [
  { name: 'HTML', percent: 95, color: '#e34f26', category: 'Frontend' },
  { name: 'CSS', percent: 90, color: '#1572b6', category: 'Frontend' },
  { name: 'JavaScript', percent: 85, color: '#f7df1e', category: 'Frontend' },
  { name: 'React', percent: 80, color: '#61dafb', category: 'Frontend' },
  { name: 'Laravel', percent: 65, color: '#ff2d20', category: 'Backend' },
  { name: 'MySQL', percent: 80, color: '#4479a1', category: 'Database' },
  { name: 'MongoDB', percent: 75, color: '#47a248', category: 'Database' },
  { name: 'Git/GitHub', percent: 75, color: '#f05032', category: 'DevOps' },
  { name: 'Docker', percent: 60, color: '#2496ed', category: 'DevOps' },
  { name: 'Jira', percent: 70, color: '#0052cc', category: 'Tools' },
  { name: 'Cloud Native', percent: 60, color: '#00f5ff', category: 'DevOps' },
]

export const PROJECTS = [
  {
    id: 1,
    title: 'Trade Journal App',
    description: 'A web application that allows traders to track trades, maintain a trading journal, and analyze performance through dashboards and charts.',
    features: ['Authentication', 'Analytics dashboards', 'Charts', 'Trade tracking'],
    tech: ['Laravel', 'React', 'MySQL', 'Docker'],
    github: 'https://github.com/zak2k3/trade-journal-app',
    demo: 'https://trade-journal-app-blue.vercel.app',
    color: '#00f5ff',
    icon: '📈',
    featured: true,
  },
  {
    id: 2,
    title: 'Text Summarizer',
    description: 'A web application that allows users to summarize long texts using AI and save the summaries to a database.',
    features: ['AI text summarization', 'Database storage', 'Read saved summaries'],
    tech: ['PHP', 'HTML', 'CSS', 'JavaScript', 'MySQL', 'HuggingFace API'],
    github: null,
    demo: null,
    color: '#bf00ff',
    icon: '🤖',
    featured: true,
  },
  {
    id: 3,
    title: 'Restaurant Commands',
    description: 'A static restaurant website displaying menu items with ordering functionality.',
    features: ['Menu display', 'Order functionality', 'Responsive design'],
    tech: ['HTML', 'CSS'],
    github: null,
    demo: null,
    color: '#ff0080',
    icon: '🍽️',
    featured: false,
  },
]

export const BLOG_POSTS = [
  {
    id: 1,
    title: 'Building a Trade Journal with React & Laravel',
    excerpt: 'How I built a production-ready trade journal application from scratch, handling authentication, real-time charts, and Docker deployment.',
    date: '2024-02-15',
    readTime: 8,
    tags: ['React', 'Laravel', 'Docker'],
    type: 'article',
    content: `
# Building a Trade Journal with React & Laravel

When I decided to build a trade journal application, I knew I wanted something that could handle real trading data while being easy to use.

## The Architecture

The application uses a **Laravel** backend as a REST API and a **React** frontend for the UI. Here's how the authentication flow works:

\`\`\`php
// Laravel - AuthController.php
public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (!Auth::attempt($credentials)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $token = $request->user()->createToken('auth_token')->plainTextToken;
    return response()->json(['token' => $token]);
}
\`\`\`

## React Integration

On the frontend, I used React Query for data fetching and Chart.js for analytics:

\`\`\`javascript
// TradeChart.jsx
const TradeChart = ({ trades }) => {
  const chartData = useMemo(() => ({
    labels: trades.map(t => t.date),
    datasets: [{
      label: 'P&L',
      data: trades.map(t => t.profit_loss),
      borderColor: '#00f5ff',
      fill: false,
    }]
  }), [trades]);

  return <Line data={chartData} />;
};
\`\`\`

## Deployment with Docker

Docker made deployment seamless with separate containers for Laravel, MySQL, and Nginx.
    `,
    image: null,
  },
  {
    id: 2,
    title: 'AI-Powered Text Summarization with HuggingFace',
    excerpt: 'Integrating the HuggingFace API into a PHP application to create smart text summaries that actually make sense.',
    date: '2024-01-20',
    readTime: 5,
    tags: ['PHP', 'AI', 'HuggingFace'],
    type: 'article',
    content: `
# AI-Powered Text Summarization

Integrating AI into web apps has never been more accessible. Here's how I built a text summarizer using HuggingFace's free API.

## The API Call

\`\`\`php
function summarizeText($text) {
    $apiUrl = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';
    
    $response = file_get_contents($apiUrl, false, stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => 'Authorization: Bearer ' . API_KEY . '\\r\\n' .
                       'Content-Type: application/json\\r\\n',
            'content' => json_encode(['inputs' => $text]),
        ]
    ]));
    
    return json_decode($response, true)[0]['summary_text'];
}
\`\`\`

## Challenges I Faced

- **Cold start delays**: HuggingFace free models can take 20-30 seconds to warm up
- **Rate limiting**: Had to implement a queue system for multiple requests
- **Text length limits**: The model has a max token limit, so I had to chunk longer texts
    `,
    image: null,
  },
  {
    id: 3,
    title: 'Why I Use Docker for Every Project',
    excerpt: 'Docker has transformed how I develop and deploy applications. Here\'s why every developer should adopt containerization.',
    date: '2023-12-10',
    readTime: 4,
    tags: ['Docker', 'DevOps', 'Development'],
    type: 'article',
    content: `
# Why I Use Docker for Every Project

Docker changed how I think about development environments. No more "it works on my machine" problems.

## My Typical docker-compose.yml

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - .:/var/www/html
    depends_on:
      - db

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: myapp
    volumes:
      - dbdata:/var/lib/mysql

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    depends_on:
      - app

volumes:
  dbdata:
\`\`\`

## Benefits I've Experienced

1. **Consistent environments** across dev, staging, and production
2. **Easy onboarding** - new developers just run \`docker-compose up\`
3. **Isolated dependencies** - no conflicts between projects
    `,
    image: null,
  },
]
