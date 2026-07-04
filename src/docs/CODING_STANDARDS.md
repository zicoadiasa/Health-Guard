# Coding Standards for HealthGuard v2.0

These coding standards ensure consistency, maintainability, and high quality across the HealthGuard v2.0 codebase. Adherence to these guidelines is mandatory for all development.

## 1. Naming Conventions

-   **Folders:** `kebab-case` (e.g., `user-profile`, `meal-planning`).
-   **Files:**
    -   React Components: `PascalCase.tsx` (e.g., `Button.tsx`, `UserProfileForm.tsx`).
    -   Hooks: `camelCase.ts` (e.g., `useAuth.ts`, `useDebounce.ts`).
    -   Services/Utilities: `camelCase.ts` or `kebab-case.ts` if a collection of related functions (e.g., `userService.ts`, `apiClient.ts`).
    -   Types: `camelCaseTypes.ts` (e.g., `userProfileTypes.ts`).
    -   Constants: `CONSTANT_NAME.ts` (e.g., `appConstants.ts`).
-   **Variables:** `camelCase` (e.g., `userName`, `mealPlanData`).
-   **Functions:** `camelCase` (e.g., `fetchUserData`, `calculateBMI`).
-   **Constants (global/module-level):** `SCREAMING_SNAKE_CASE` (e.g., `MAX_RETRIES`, `DEFAULT_THEME`).
-   **TypeScript Interfaces/Types:** `PascalCase` (e.g., `IUser`, `HealthProfileType`). Prefer `Type` suffix for type aliases and `I` prefix for interfaces.

## 2. Folder Conventions

-   **`src/app/`**: Follow Next.js App Router conventions. Pages should export a default React component. Layouts should define shared UI for routes.
-   **`src/components/`**: For highly reusable, generic UI components not tied to a specific feature. Organize into sub-directories for related components (e.g., `components/ui` for shadcn components, `components/common` for custom common components).
-   **`src/features/[feature-name]/`**: Each feature should be a self-contained module. Organize internally by `components/`, `hooks/`, `services/`, `types/`, `utils/` etc.
-   **`src/hooks/`**: Custom React hooks used across multiple features or general application logic.
-   **`src/lib/`**: Core utilities, external integrations, and helper functions.
    -   `src/lib/ai/`: All AI model interactions, prompt engineering, and AI-related utility functions.
    -   `src/lib/api/`: General API client setup, common API helpers.
    -   `src/lib/auth/`: Authentication logic, Supabase Auth integration.
    -   `src/lib/utils/`: Generic utility functions (e.g., date formatting, data manipulation).
-   **`src/services/`**: Business logic, data fetching, and transformations that interact with the backend (Supabase) or external APIs. This layer orchestrates data flow and implements core application rules.
-   **`src/providers/`**: React Context providers for global state management (e.g., theme provider, auth provider).
-   **`src/types/`**: Global TypeScript type declarations, enums, and interfaces that are used across multiple features or modules.
-   **`src/utils/`**: Small, specific utility functions that don't fit into `lib/utils` due to their narrow scope or direct relation to a specific, non-feature-specific task.
-   **`src/constants/`**: Store immutable values like API endpoints, magic strings, configuration values.
-   **`src/styles/`**: Global CSS files, TailwindCSS configuration, and custom CSS variables.
-   **`src/supabase/`**: Supabase client initialization, database configuration, and any related database-specific utilities.

## 3. Component Conventions

-   **Functional Components:** Always use functional components with React Hooks.
-   **Props Typing:** Explicitly type all props using TypeScript interfaces.
-   **Destructuring Props:** Destructure props at the component's top level for readability.
-   **Single Responsibility:** Components should do one thing well. Break down complex components into smaller, focused ones.
-   **No Business Logic in UI:** Business logic must be extracted to `services/` or custom hooks (`hooks/`, `features/[feature-name]/hooks/`).
-   **Server Components First:** Default to Server Components for pages and layouts. Use `"use client"` directive only when client-side interactivity is required.
-   **Shadcn/UI & TailwindCSS:** Use shadcn/ui components as a base. Customize styling primarily with TailwindCSS classes. Avoid inline styles where possible.
-   **Accessibility:** Ensure all interactive components are accessible (semantic HTML, ARIA attributes, keyboard navigation).

## 4. Hook Conventions

-   **Naming:** Start with `use` prefix (e.g., `useAuth`, `useFormValidation`).
-   **Single Responsibility:** Each hook should encapsulate a single piece of reusable logic.
-   **Dependencies:** Correctly list all dependencies in `useEffect`, `useCallback`, `useMemo` hooks to avoid stale closures and unnecessary re-renders.
-   **Abstraction:** Abstract complex logic into custom hooks to keep components clean.

## 5. API Conventions

-   **RESTful Principles:** Design APIs following RESTful principles (resources, HTTP methods).
-   **Server Actions:** Prefer Next.js Server Actions for mutations and server-side data fetching when possible.
-   **Edge Functions:** Use Supabase Edge Functions for complex backend logic, integrations, or real-time functionalities.
-   **Error Handling:** Implement consistent error response structures (e.g., JSON with `message`, `code`, `details`).
-   **Input Validation:** Validate all incoming API inputs on the server-side using Zod.

## 6. Database Conventions

-   **Table Names:** `snake_case`, plural (e.g., `users`, `health_profiles`).
-   **Column Names:** `snake_case`, singular (e.g., `created_at`, `user_id`, `food_name`).
-   **Primary Keys:** `id` (UUID), automatically generated.
-   **Foreign Keys:** `[related_table_singular]_id` (e.g., `user_id` in `health_profiles` table).
-   **Timestamps:** Include `created_at` and `updated_at` (TIMESTAMP WITH TIME ZONE) for all tables, automatically managed by Supabase.
-   **Row Level Security (RLS):** Implement robust RLS policies on all tables to enforce data access control.
-   **Indexes:** Create indexes on frequently queried columns (especially foreign keys) for performance.
-   **JSONB for Flexible Data:** Use `JSONB` for semi-structured data where the schema might evolve (e.g., `nutritional_info` in `meal_items`).

## 7. Git Commit Convention

Follow Conventional Commits specification for clear and automated changelog generation.

-   **Format:** `type(scope): description`
    -   **`type`**: `feat` (new feature), `fix` (bug fix), `docs` (documentation), `style` (formatting, no code change), `refactor` (code refactoring), `perf` (performance improvement), `test` (adding tests), `chore` (build process or auxiliary changes), `revert` (reverts a previous commit).
    -   **`scope` (optional)**: The part of the codebase affected (e.g., `auth`, `meal-planning`, `database`, `AI`).
    -   **`description`**: Concise, imperative, present tense: do not capitalize first letter; no period at the end.
-   **Examples:**
    -   `feat(auth): add user registration flow`
    -   `fix(ui): correct button styling on mobile`
    -   `docs(readme): update getting started section`
    -   `refactor(userService): extract data validation logic`

## 8. Accessibility

-   **Semantic HTML:** Use appropriate HTML elements for their semantic meaning.
-   **ARIA Attributes:** Employ ARIA attributes where semantic HTML is insufficient (e.g., custom widgets).
-   **Keyboard Navigation:** Ensure all interactive elements are keyboard navigable and have visible focus states.
-   **Color Contrast:** Maintain sufficient color contrast for text and interactive elements.
-   **Alt Text:** Provide descriptive `alt` text for all meaningful images.

## 9. Security

-   **Input Validation:** Always validate all user inputs on both client and server sides.
-   **Authentication & Authorization:** Use Supabase Auth for robust user authentication. Implement RLS and proper authorization checks at every data access point.
-   **Environment Variables:** Store sensitive information (API keys, secrets) in environment variables, never hardcode them. Use server-side environment variables (`SUPABASE_SERVICE_ROLE_KEY`) securely.
-   **CORS:** Configure CORS policies strictly.
-   **Dependency Security:** Regularly audit dependencies for vulnerabilities (`npm audit`).
-   **SQL Injection:** Use parameterized queries or ORMs (like Supabase client) to prevent SQL injection.

## 10. Performance

-   **Server Components:** Leverage Server Components to minimize client-side JavaScript bundles and improve initial page load times.
-   **Lazy Loading:** Implement lazy loading for components, images, and data that are not immediately needed.
-   **Image Optimization:** Optimize images using Next.js `Image` component or external services.
-   **Caching:** Utilize HTTP caching headers and data caching strategies.
-   **Database Indexing:** Ensure frequently queried columns in PostgreSQL are indexed.
-   **Debouncing/Throttling:** Apply debouncing or throttling to frequently triggered events (e.g., search inputs).

## 11. Dark Mode

-   **Implementation:** Support dark mode using TailwindCSS `dark` variant and a theme provider (e.g., `next-themes`).
-   **Consistency:** Ensure all UI components and elements are styled correctly in both light and dark modes.

## 12. Reusable Components

-   **Abstraction:** Identify recurring UI patterns and abstract them into reusable components.
-   **Props over Logic:** Prefer passing props to components for customization rather than embedding complex logic within them.
-   **Atomic Design Principles:** Consider organizing components following Atomic Design principles (atoms, molecules, organisms).

## 13. Validation

-   **Client-side:** Use Zod schemas with React Hook Form for immediate user feedback.
-   **Server-side:** Re-validate all incoming data on the server, especially for Server Actions and API endpoints.
-   **Database:** Utilize database constraints for final data integrity.

## 14. Error Handling

-   **Consistent Approach:** Implement a consistent error handling strategy across the application (try-catch blocks, custom error classes).
-   **User Feedback:** Provide clear, user-friendly error messages in the UI.
-   **Logging:** Log errors to a centralized logging service (e.g., Vercel Analytics, Sentry) for monitoring and debugging.
-   **Fallback UIs:** Implement error boundaries for React components to gracefully handle rendering errors.

## 15. Loading States

-   **User Feedback:** Provide visual feedback during data fetching or long-running operations (spinners, skeleton loaders, progress bars).
-   **Suspense:** Utilize React Suspense for data fetching to manage loading states declaratively.

## 16. Empty States

-   **User Guidance:** Design informative and actionable empty states for lists, tables, or sections with no data. Explain why it's empty and how the user can populate it.
-   **Consistency:** Maintain a consistent design language for empty states across the application.))
