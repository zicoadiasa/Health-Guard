# HealthGuard v2.0 - AI Lifestyle Companion

![HealthGuard Logo](public/healthguard-logo.png) <!-- Placeholder for a future logo -->

## Project Vision

HealthGuard is an AI-first healthcare application designed to be a personal digital health coach for diabetes prevention and monitoring. Our goal is to empower users to proactively manage their health through personalized insights, guidance, and motivation, making healthy living an intuitive and engaging experience.

Instead of manual logging, HealthGuard leverages advanced AI to:

-   Understand individual lifestyles and habits.
-   Learn favorite foods and dietary preferences.
-   Create personalized meal plans and recommend healthier alternatives.
-   Evaluate health trends and detect potential risks.
-   Provide motivational support and generate insightful weekly reports.

## Project Philosophy (Vibe Coding)

This project is developed with a strong emphasis on **Vibe Coding** – a highly iterative, efficient, and collaborative development approach focused on delivering production-ready software in an accelerated timeline (12 days for bootstrap). Every architectural and development decision prioritizes:

-   **Scalability:** Designed to handle growth in users and data without significant re-architecture.
-   **Maintainability:** Clean, modular code and comprehensive documentation for easy understanding and updates.
-   **Developer Experience:** Tools, conventions, and workflows that enable rapid and enjoyable development.
-   **Clean Architecture:** Strict separation of concerns for clarity and testability.
-   **AI-first Design:** AI is at the core of all major features, not an afterthought.
-   **Rapid Iteration:** Agile methodologies and efficient feedback loops to quickly adapt and evolve.

## Features (Bootstrap Focus)

This bootstrap phase focuses on establishing the robust foundation for these future features. No feature implementation is done in this stage.

-   **AI Lifestyle Companion:** Understands user lifestyle, learns favorite foods, creates personalized meal plans, recommends healthier alternatives, evaluates health trends, motivates users, generates weekly reports, and detects risks.
-   **Personalized Meal Planning:** AI-generated meal plans based on dietary preferences, health goals, and learned eating habits.
-   **Health Trend Analysis:** Visual representation of health data over time, identifying patterns and potential risks.
-   **Motivation & Reminders:** AI-driven motivational messages and timely reminders for medication, appointments, and healthy habits.
-   **Weekly Reports:** Comprehensive summaries of health progress, insights, and recommendations.
-   **Risk Detection:** AI identifies potential health risks based on collected data and provides actionable advice.

## Tech Stack

### Frontend
-   **Framework:** Next.js 15 (App Router, Server Components, Server Actions)
-   **Library:** React 19
-   **Language:** TypeScript
-   **Styling:** TailwindCSS, shadcn/ui
-   **Animation:** Framer Motion
-   **Forms:** React Hook Form, Zod
-   **Icons:** Lucide React

### Backend
-   **Database:** Supabase (PostgreSQL)
-   **Authentication:** Supabase Auth
-   **Serverless:** Supabase Edge Functions

### AI & External APIs
-   **AI Platform:** Google Gemini API
-   **Nutrition Data:** Nutrition API
-   **Health Data Integration (Future):** Google Health Connect, Apple Health

### Deployment
-   **Frontend:** Vercel
-   **Backend/Database:** Supabase

## Architecture Rules

-   **App Router:** Utilize Next.js App Router for all routing and layout management.
-   **Server Components:** Prefer Server Components by default for optimal performance and SEO.
-   **Server Actions:** Use Server Actions whenever possible for data mutations and server-side logic to minimize client-side JavaScript.
-   **Clean Architecture:** Enforce strict separation of concerns: UI, Application, Domain, Infrastructure, AI modules.
-   **Feature-based Architecture:** Organize code by features, ensuring each feature is isolated and modular. Business logic must *never* be embedded directly within UI components.

## Project Structure

```
healthguard-v2/
├── src/
│   ├── app/                # Next.js App Router routes, layouts, pages
│   ├── components/         # Reusable UI components (general)
│   ├── features/           # Self-contained feature modules (e.g., user-profile/, meal-planning/)
│   │   └── [feature-name]/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── services/
│   │       ├── types/
│   │       └── ...
│   ├── hooks/              # Custom React hooks (general)
│   ├── lib/                # Utility functions and external integrations
│   │   ├── ai/             # AI-related utilities (Gemini, Nutrition API)
│   │   ├── api/            # General API utilities
│   │   ├── auth/           # Authentication utilities (Supabase Auth)
│   │   └── utils/          # General purpose utilities
│   ├── services/           # Business logic, data fetching, Supabase interactions
│   ├── providers/          # React Context providers
│   ├── types/              # Global TypeScript type definitions
│   ├── utils/              # Small, specific utility functions (general)
│   ├── constants/          # Application-wide constants
│   ├── styles/             # Global styles, TailwindCSS config
│   └── supabase/           # Supabase client initialization, config
├── public/                 # Static assets
└── docs/                   # Project documentation (PRD, Architecture, Development Guides)
    ├── PRD.md
    ├── PROJECT_RULES.md
    ├── SYSTEM_ARCHITECTURE.md
    ├── AI_ARCHITECTURE.md
    ├── DATABASE_DESIGN.md
    ├── DEVELOPMENT_GUIDE.md
    ├── DEVELOPMENT_PLAN.md
    └── README.md (this file)
├── .env.example            # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.mjs
├── postcss.config.mjs
└── tailwind.config.ts
```

## Getting Started

### 1. Clone the repository

```bash
git clone [repository-url]
cd healthguard-v2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy `.env.example` to `.env.local` and fill in the required variables (refer to `.env.example` for details).

```bash
cp .env.example .env.local
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

### 5. Supabase Setup

Follow the instructions in `DEVELOPMENT_GUIDE.md` for local Supabase setup and database migrations.

## Development Guidelines

Refer to `DEVELOPMENT_GUIDE.md` for detailed workflows on:

-   Feature creation
-   Database migrations
-   API interactions (Server Actions, Edge Functions)
-   AI module integration
-   Component development
-   Form handling and validation
-   Testing
-   Deployment

## Coding Standards

Refer to `CODING_STANDARDS.md` for detailed guidelines on naming conventions, accessibility, security, performance, and more.

## Contributing

We welcome contributions! Please refer to `PROJECT_RULES.md` and `DEVELOPMENT_GUIDE.md` for contributing guidelines.

## License

[Specify your license here - e.g., MIT, Apache 2.0]))
