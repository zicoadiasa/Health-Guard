# Development Guide

This guide outlines the standard workflows and best practices for developing features within the HealthGuard v2.0 project. Adhering to these guidelines ensures consistency, maintainability, and a smooth development experience.

## 1. Feature Creation Workflow

All features must follow the feature-based architecture pattern, being encapsulated within their own directory under `src/features/`.

### Steps:
1.  **Create Feature Directory:** Create a new folder under `src/features/` with a kebab-case name (e.g., `user-profile`, `meal-planning`).
2.  **Module Structure:** Inside the feature directory, organize files by their responsibility. Common sub-directories include:
    -   `components/`: UI components specific to this feature.
    -   `hooks/`: Custom hooks for this feature.
    -   `services/`: Data fetching and business logic for this feature.
    -   `types/`: TypeScript type definitions for this feature.
    -   `utils/`: Utility functions specific to this feature.
    -   `[FeatureName]Page.tsx`: The main page component for the feature (if applicable).
3.  **Define Routes (if applicable):** For new pages, create a `page.tsx` file within the `app/` directory that imports and renders the main feature component.
4.  **Implement UI:** Develop React components using TailwindCSS and shadcn/ui. Prioritize Server Components.
5.  **Implement Business Logic:** Create services in `src/features/[feature-name]/services/` to handle data interactions with Supabase or external APIs.
6.  **Use Server Actions:** Wherever possible, use Server Actions for data mutations and server-side operations.
7.  **Testing:** Write unit and integration tests for components, hooks, and services.

### Example: `user-profile` feature

```
src/
└── features/
    └── user-profile/
        ├── components/
        │   ├── UserProfileForm.tsx
        │   └── UserProfileDisplay.tsx
        ├── hooks/
        │   └── useUserProfile.ts
        ├── services/
        │   └── userProfileService.ts
        ├── types/
        │   └── userProfileTypes.ts
        └── UserProfilePage.tsx
```

## 2. Database Migration Workflow

Supabase handles database migrations. Follow Supabase CLI guidelines for managing schema changes.

### Steps:
1.  **Local Development:** Make schema changes directly in your local Supabase project.
2.  **Generate Migration:** Use Supabase CLI to generate a migration file:
    ```bash
    supabase migration new "description_of_change"
    ```
3.  **Review Migration:** Inspect the generated SQL file (`supabase/migrations/[timestamp]_description_of_change.sql`) to ensure it accurately reflects the intended changes.
4.  **Apply Locally:** Apply the migration to your local database:
    ```bash
    supabase db diff > supabase/migrations/V<timestamp>__<name>.sql
    supabase db reset
    ```
5.  **Commit and Deploy:** Commit the migration file to version control. When deploying to production, Supabase automatically applies migrations.

## 3. API Workflow

Backend interactions primarily occur through Supabase Edge Functions or Server Actions.

### Steps:
1.  **Define API Endpoint/Server Action:**
    -   For Edge Functions: Create a new file in `supabase/functions/[function-name].ts`.
    -   For Server Actions: Define an `async` function marked with `"use server";` in a component or a separate file.
2.  **Implement Logic:** Write the server-side logic, interacting with the database (`supabase/client.ts`) and potentially AI modules (`lib/ai/`).
3.  **Error Handling:** Implement robust error handling and return meaningful error messages.
4.  **Client-side Integration:** Call Edge Functions via standard `fetch` API or Server Actions directly from React components.

### Example: Server Action for user profile update

```tsx
// src/features/user-profile/services/userProfileActions.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { UserProfile } from "@/features/user-profile/types/userProfileTypes";

export async function updateProfile(formData: FormData): Promise<UserProfile | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated.");
  }

  const displayName = formData.get("displayName") as string;
  const avatarUrl = formData.get("avatarUrl") as string;

  const { data, error } = await supabase
    .from("health_profiles") // Assuming health_profiles table stores display_name, avatar_url
    .update({ display_name: displayName, avatar_url: avatarUrl })
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating profile:", error);
    return null;
  }

  return data as UserProfile;
}
```

## 4. AI Workflow

Integrate AI capabilities primarily through the `lib/ai` module, interacting with the Google Gemini API and Nutrition API.

### Steps:
1.  **Define AI Module Function:** Create a function in `lib/ai/` that encapsulates the logic for interacting with a specific AI module (e.g., `generateMealPlan`, `assessHealth`).
2.  **Construct Prompt:** Carefully craft prompts for the Google Gemini API, ensuring clarity, specificity, and inclusion of all necessary contextual data.
3.  **API Call:** Make the API call to Google Gemini or Nutrition API.
4.  **Process Response:** Parse and validate the AI response, handling potential errors or unexpected formats.
5.  **Fallback Strategy:** Implement fallback mechanisms in case AI API calls fail or return unsatisfactory results.
6.  **Integration:** Call AI module functions from `services/` or Server Actions.

### Example: AI Meal Plan Generation

```typescript
// src/lib/ai/mealPlannerAI.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { UserHealthProfile, MealPlan } from "@/types"; // Assuming types are defined

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function generateMealPlan(userProfile: UserHealthProfile): Promise<MealPlan | null> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Generate a 7-day diabetes-friendly meal plan for a user with the following profile: ${JSON.stringify(userProfile)}. Include breakfast, lunch, dinner, and two snacks per day. Provide calorie estimates and macronutrient breakdown for each meal.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Parse the text response into a MealPlan object
    const mealPlan: MealPlan = JSON.parse(text); // Assuming Gemini returns parseable JSON
    return mealPlan;
  } catch (error) {
    console.error("Error generating meal plan:", error);
    // Implement fallback strategy: return a default meal plan or null
    return null;
  }
}
```

## 5. Component Workflow

Components should be reusable, accessible, and follow Shadcn/UI conventions.

### Steps:
1.  **Identify Component Type:** Determine if the component is a general-purpose UI component (`components/`) or feature-specific (`features/[feature-name]/components/`).
2.  **Create Component File:** Use PascalCase for component names (e.g., `Button.tsx`).
3.  **Use TailwindCSS & shadcn/ui:** Style components using TailwindCSS classes. Leverage shadcn/ui components and extend them as needed.
4.  **Props & Types:** Define clear TypeScript interfaces for component props.
5.  **Accessibility:** Ensure components adhere to WCAG guidelines (semantic HTML, ARIA attributes).
6.  **Storybook (Future):** Consider creating Storybook stories for isolated component development and documentation.

## 6. Form Workflow

Forms are managed using React Hook Form and Zod for schema validation.

### Steps:
1.  **Define Zod Schema:** Create a Zod schema to define the shape and validation rules for your form data.
2.  **Use `useForm` Hook:** Integrate `react-hook-form`'s `useForm` hook in your component.
3.  **Connect Inputs:** Connect form inputs using `register` or `Controller`.
4.  **Handle Submission:** Implement the `onSubmit` function, typically triggering a Server Action or API call.
5.  **Error Display:** Display validation errors to the user.

### Example: User Profile Form

```tsx
// src/features/user-profile/components/UserProfileForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { updateProfile } from "@/features/user-profile/services/userProfileActions"; // Server Action

const formSchema = z.object({
  displayName: z.string().min(2, { message: "Display name must be at least 2 characters." }),
  avatarUrl: z.string().url({ message: "Invalid URL" }).optional(),
});

type UserProfileFormValues = z.infer<typeof formSchema>;

export function UserProfileForm() {
  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      avatarUrl: "",
    },
  });

  async function onSubmit(values: UserProfileFormValues) {
    // Call your Server Action
    const formData = new FormData();
    formData.append("displayName", values.displayName);
    if (values.avatarUrl) {
      formData.append("avatarUrl", values.avatarUrl);
    }

    const result = await updateProfile(formData);
    if (result) {
      console.log("Profile updated successfully:", result);
      // Handle success (e.g., show a toast notification, revalidate data)
    } else {
      console.error("Failed to update profile.");
      // Handle error
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/avatar.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Profile</Button>
      </form>
    </Form>
  );
}
```

## 7. Validation Workflow

Client-side and server-side validation is crucial for data integrity and user experience.

### Steps:
1.  **Client-side Validation (Zod & React Hook Form):** Implement Zod schemas for all form inputs. This provides immediate feedback to the user.
2.  **Server-side Validation:** Re-validate data on the server within Server Actions or Edge Functions to prevent malicious data submission. Zod schemas can be reused.
3.  **Database Constraints:** Utilize PostgreSQL database constraints (e.g., `NOT NULL`, `UNIQUE`, `CHECK` constraints) for final data integrity enforcement.

## 8. Testing Workflow

Ensure code quality and reliability through comprehensive testing.

### Steps:
1.  **Unit Tests:** Write unit tests for individual functions, hooks, and small components using Jest/React Testing Library.
2.  **Integration Tests:** Test the interaction between different modules (e.g., a form submitting data to a Server Action).
3.  **End-to-End Tests (Future):** Implement end-to-end tests using tools like Playwright or Cypress for critical user flows.

## 9. Deployment Workflow

HealthGuard is deployed on Vercel (Frontend) and Supabase (Backend/Database).

### Steps:
1.  **Version Control:** Ensure all changes are committed and pushed to the main branch (or relevant deployment branch).
2.  **Vercel Deployment:** Vercel automatically deploys the Next.js frontend upon pushes to the configured branch.
3.  **Supabase Deployment:** Supabase automatically applies database migrations and deploys Edge Functions when changes are pushed to your linked repository.
4.  **Environment Variables:** Ensure all necessary environment variables are configured correctly in both Vercel and Supabase.
5.  **Monitoring:** Monitor deployments for errors and performance issues.))
