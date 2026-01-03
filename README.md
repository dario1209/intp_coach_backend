# INTP Coach Backend

A TypeScript-based REST API that powers an AI productivity coach specifically designed for INTP personality types. Built with Express, Prisma, and Perplexity AI to deliver systems-thinking oriented coaching through structured experiments and testable hypotheses.

## Features

### Core Capabilities
- **INTP-Optimized Coaching**: Analytical, hypothesis-driven productivity advice that avoids motivational platitudes
- **AI-Powered Conversations**: Integration with Perplexity AI for intelligent, context-aware coaching sessions
- **Structured Planning**: Break down goals into measurable experiments with clear success metrics
- **Smart Nudges**: Personalized productivity reminders based on user context
- **Session Management**: Persistent conversation history and goal tracking
- **User Profiling**: Store and leverage user preferences for personalized coaching

### Technical Highlights
- **Type-Safe**: Full TypeScript implementation with strict type checking
- **Schema Validation**: Runtime validation using Zod for request/response safety
- **Database ORM**: Prisma for type-safe database queries and migrations
- **Production-Ready**: Comprehensive logging, error handling, and CORS configuration
- **Security**: Helmet.js for HTTP security headers
- **Developer Experience**: Hot reload, linting, and clear project structure

## Architecture

```
src/
├── config/          # Environment & service configuration
├── controllers/     # Request handlers
├── db/              # Database client
├── middleware/      # Express middleware (CORS, logging, errors)
├── models/          # Domain models
├── routes/          # API route definitions
├── services/        # Business logic (AI, planning, profiling)
└── utils/           # Shared utilities (logger, validation, prompts)
```

## API Endpoints

### Coach Routes
- `POST /api/coach/chat` - Interactive coaching conversation
- `POST /api/coach/plan` - Generate structured goal breakdown
- `POST /api/coach/nudge` - Get personalized productivity reminder

### User Routes
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Health Check
- `GET /health` - Server status

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- PostgreSQL database
- Perplexity API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd intp_coach_backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit [.env](.env) with your configuration:
```env
PORT=4000
NODE_ENV=development

# Perplexity AI
PERPLEXITY_API_KEY=your_api_key_here
PERPLEXITY_BASE_URL=https://api.perplexity.ai
PERPLEXITY_MODEL=llama-3.1-sonar-large-128k-online

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/intp_coach

# CORS
FRONTEND_ORIGIN=http://localhost:3000
```

4. Set up the database:
```bash
npm run db:generate
npm run db:migrate
```

### Development

Start the development server with hot reload:
```bash
npm run dev
```

The server will start on [http://localhost:4000](http://localhost:4000)

### Production Build

```bash
npm run build
npm start
```

## Database Schema

### User
- `id` - Unique identifier (CUID)
- `email` - User email (unique)
- `profile` - JSON profile data
- `createdAt` / `updatedAt` - Timestamps

### Session
- `id` - Session identifier
- `userId` - Reference to User
- `title` - Optional session name
- `messages` - JSON array of conversation history
- `goals` - JSON array of tracked goals

### Task
- `id` - Task identifier
- `sessionId` - Reference to Session
- `title` - Task description
- `status` - Current state (pending/complete)
- `priority` - Integer priority level
- `completedAt` - Completion timestamp

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run production server |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:push` | Push schema changes to database |
| `npm run lint` | Lint TypeScript files |
| `npm run typecheck` | Check types without emitting |

## Tech Stack

### Core
- **Runtime**: Node.js 18+
- **Language**: TypeScript 5.6
- **Framework**: Express 4.x
- **Database**: PostgreSQL + Prisma ORM

### AI & APIs
- **Perplexity AI**: Chat completions API
- **Axios**: HTTP client

### Validation & Security
- **Zod**: Schema validation
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing

### Developer Tools
- **ts-node**: TypeScript execution
- **nodemon**: Hot reload
- **ESLint**: Code linting
- **Winston**: Structured logging
- **Morgan**: HTTP request logging

## Coaching Philosophy

The INTP Coach follows a structured approach designed for analytical thinkers:

1. **Diagnosis** - Identify root causes using systems thinking
2. **Hypothesis** - Propose testable experiments (not generic advice)
3. **Metrics** - Define measurable success criteria
4. **Implementation** - Minimal viable steps to test quickly
5. **Debugging** - Clear pivot conditions and feedback loops

Instead of "work harder", suggest "test 25min focus blocks vs 90min deep work sessions and measure output quality". The coaching style emphasizes curiosity-driven exploration over discipline-based motivation.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 4000 |
| `NODE_ENV` | Environment mode | development |
| `PERPLEXITY_API_KEY` | Perplexity AI key | - |
| `PERPLEXITY_BASE_URL` | Perplexity API endpoint | https://api.perplexity.ai |
| `PERPLEXITY_MODEL` | AI model to use | llama-3.1-sonar-large-128k-online |
| `DATABASE_URL` | PostgreSQL connection string | - |
| `FRONTEND_ORIGIN` | Allowed CORS origin | http://localhost:3000 |
| `LOG_LEVEL` | Winston log level | info |

## Deployment

### Railway (Recommended)

1. Connect your GitHub repository to Railway
2. Add PostgreSQL plugin
3. Set environment variables in Railway dashboard
4. Deploy automatically on push to main branch

### Vercel

```bash
vercel --prod
```

Configure environment variables in Vercel project settings.

## Error Handling

The API uses a centralized error handling middleware that:
- Catches all errors from routes and controllers
- Logs errors with Winston
- Returns consistent JSON error responses
- Includes validation error details from Zod

## Logging

Winston logger with multiple transports:
- **Console**: Colorized output for development
- **File**: Persistent logs for production
- **Levels**: error, warn, info, http, debug

Morgan middleware logs all HTTP requests with response times.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Contact

For questions or support, please open an issue in the repository.

---

Built with systems thinking for systems thinkers.

# WTF