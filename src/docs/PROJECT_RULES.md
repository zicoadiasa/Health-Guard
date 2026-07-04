# Project Rules

## 1. Architecture Principles

- **Clean Architecture:** Strict separation of concerns into UI, Application, Domain, and Infrastructure layers.
- **Feature-based Architecture:** Features are isolated, self-contained, and modular.
- **App Router:** Utilize Next.js App Router for routing and layout management.
- **Server Components:** Prioritize Server Components by default for better performance and SEO.
- **Server Actions:** Use Server Actions whenever possible for data mutations and server-side logic.

## 2. Code Organization

- **Business Logic:** Must NEVER be inside UI components. Abstract business logic into services or domain layers.
- **Separation of Concerns:** Clearly separate UI, Application, Domain, Infrastructure, and AI modules.

## 3. Folder Structure

- `app/`: Next.js App Router specific files (routes, layouts, pages).
- `components/`: Reusable UI components (shadcn/ui overrides, custom general components).
- `features/`: Isolated feature modules. Each feature directory should contain its own components, hooks, services, types, etc.
- `hooks/`: Custom React hooks.
- `lib/`: Utility functions and external integrations.
  - `lib/ai`: AI-related utility functions and API integrations (Google Gemini API, Nutrition API).
  - `lib/api`: General API utility functions.
  - `lib/auth`: Authentication related utilities (Supabase Auth).
  - `lib/utils`: General utility functions.
- `services/`: Business logic and data fetching logic (Supabase interactions, external API calls).
- `providers/`: React Context providers for global state management.
- `types/`: TypeScript type definitions.
- `utils/`: Small, specific utility functions.
- `constants/`: Application-wide constants.
- `styles/`: Global styles and TailwindCSS configurations.
- `supabase/`: Supabase client initialization and database configuration.
- `public/`: Static assets.
- `docs/`: Project documentation.

## 4. Technology Stack Guidelines

- **Frontend:** Next.js 15, React 19, TypeScript, TailwindCSS, shadcn/ui, Framer Motion, React Hook Form, Zod, Lucide React.
- **Backend:** Supabase, PostgreSQL, Supabase Auth, Edge Functions.
- **AI:** Google Gemini API, Nutrition API.
- **Deployment:** Vercel (Frontend), Supabase (Backend).

## 5. Development Guidelines

- **Rapid Iteration:** Embrace a fast-paced development cycle.
- **Scalability & Maintainability:** Design for future growth and easy maintenance.
- **Developer Experience:** Prioritize clear code, comprehensive documentation, and efficient workflows.
- **AI-first Design:** Ensure AI is central to the application's core functionalities.

## 6. Naming Conventions (brief examples, detailed in Coding Standards)

- **Components:** PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Functions/Hooks:** camelCase (e.g., `useAuth.ts`, `fetchUserData.ts`)
- **Files:** kebab-case for directories, PascalCase for components, camelCase for hooks/utilities. (e.g., `user-profile/` for a feature, `Button.tsx`, `useAuth.ts`)

## 7. Version Control

- **Git Flow:** Utilize a branching strategy (e.g., Git Flow or GitHub Flow) for feature development, bug fixes, and releases.
- **Commit Messages:** Follow a consistent commit message convention (e.g., Conventional Commits) for clear history.))
