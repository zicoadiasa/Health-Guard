# HealthGuard v2.0 — Database Architecture

**Document Type:** Database Architecture Specification
**Product:** HealthGuard — AI Lifestyle Companion for Diabetes Prevention
**Scope:** Defines the architectural principles and data boundaries for the HealthGuard database foundation, in alignment with AI_WORKFLOW.md, AI_MEMORY.md, AI_PROMPT.md, and AI_MODULES.md.

This document extends the existing AI and workflow specifications. It does not replace them.

---

## 1. Database Philosophy

The database exists to provide a durable, structured foundation for the HealthGuard product experience. It stores the stable facts, user preferences, progress records, reminders, reports, and AI-related context needed to support personalized coaching over time.

AI requires structured data because personalization depends on reliable information about the user, their preferences, their goals, and their historical behavior. Without structured records, the AI cannot consistently apply onboarding, daily coaching, meal planning, monitoring, and reminder workflows.

The relationship between workflows, memory, and database is as follows:
- workflows define what the system must do
- memory defines what the AI should retain for personalization
- the database provides the persistent foundation that supports both

In this architecture, the database is not an implementation detail. It is the system of record for persistent user and product state.

---

## 2. Design Principles

The database architecture is guided by the following principles.

### Single Source of Truth
Each category of persistent information should have one authoritative location. The application and AI modules should rely on that authoritative record rather than maintaining parallel versions of the same data.

### Normalization
The architecture should avoid unnecessary duplication while preserving clarity and maintainability. Core entities should be modeled once and referenced where needed.

### Referential Integrity
Relationships between entities should remain explicit and dependable. The architecture must preserve consistency between a user, their health profile, goals, reminders, reports, and AI-generated context.

### Separation of Concerns
Different data domains should remain logically distinct. Health data, nutrition data, AI data, notification data, and system data should not be mixed into a single monolithic structure.

### Immutable Historical Records
Historical facts such as prior meal logs, past weekly summaries, and completed goals should be preserved as records of what happened, rather than overwritten in place.

### Extensibility
The database should support future growth without requiring a redesign of the core architecture. New capabilities such as wearables, additional health integrations, or richer AI context should be able to extend the existing model cleanly.

### Soft Delete Strategy
Records that are no longer active should be marked as inactive or archived rather than immediately destroyed, preserving accountability and supporting review.

### Auditability
Changes to important user and coaching data should be traceable so that the system can understand what changed, when, and by which workflow.

---

## 3. Data Domains

The architecture is organized into logical data domains. Each domain exists to separate concerns and to make the system easier to evolve.

### Identity
This domain contains user identity and account-level context. It serves as the root for all user-specific data and is the boundary for access and ownership.

### Health
This domain contains the health profile, health-related preferences, and user self-reported health context required for onboarding and coaching. It forms the foundation for the Health Persona and related guidance.

### Nutrition
This domain contains food preferences, meal plans, meal items, alternative foods, and related nutritional context used by daily coaching and meal planning workflows.

### Activity
This domain contains activity and behavioral records that support monitoring, coaching continuity, and weekly review.

### AI
This domain contains AI-generated reasoning artifacts, memory state, persona information, weekly reports, and conversation-related context used by the AI layer.

### Coaching
This domain contains the user’s goals, progress, reminders, and coaching state. It connects the user’s intentions and daily interaction with the AI’s recommendations.

### Notifications
This domain contains reminder and notification state used to support follow-up, re-engagement, and user communication.

### Reporting
This domain contains the structured summaries and progress artifacts that support periodic review and weekly reflection.

### System
This domain contains operational and administrative data that supports the application platform without being part of the user experience itself.

---

## 4. Entity Ownership

Data ownership should follow the workflows that create or update it. The responsibility for maintaining each category of data should remain clear and consistent.

### Onboarding Workflow Ownership
The onboarding workflow is responsible for creating or establishing the initial user-facing baseline, including the user’s health profile, initial goals, and initial preference values.

### Daily Workflow Ownership
The daily workflow is responsible for the ongoing state of daily coaching, current meal plan context, daily reminders, and temporary coaching context.

### Meal Planner Workflow Ownership
The meal planner workflow is responsible for meal planning data, approved meal suggestions, and related nutrition guidance context.

### Food Alternative Workflow Ownership
The food alternative workflow is responsible for tracking accepted and rejected alternatives and the related decision context that influences future suggestions.

### Monitoring Workflow Ownership
The monitoring workflow is responsible for progress records, weekly summaries, and other data that reflects recent user behavior and coaching outcomes.

### Reminder Workflow Ownership
The reminder workflow is responsible for reminder preferences, reminder state, and reminder delivery context.

### AI Module Ownership
The AI module layer is responsible for producing AI-derived content such as insight summaries, persona summaries, memory updates, and coaching context, while still relying on the database to persist the resulting state.

---

## 5. Relationship Philosophy

Relationships between entities should be modeled conceptually as stable, meaningful associations between business concepts.

### One-to-One Relationships
Used when one entity is tightly associated with exactly one other entity. Examples include a user and a primary health profile, or a user and a current active coaching state if that state is modeled as a single record.

### One-to-Many Relationships
Used when one parent entity owns or influences many child records. Examples include one user owning many goals, many reminders, many meal plans, or many weekly reports.

### Many-to-Many Relationships
Used when data concepts can belong to multiple groups or contexts. The architecture should model these relationships conceptually without requiring direct duplication of the underlying data. This is particularly relevant where AI-generated recommendations may relate to multiple goals or where reports may reflect multiple activity and nutrition themes.

The database architecture should favor clear ownership and direct relationships over overly complex associations. If an association is not essential to the workflow or AI behavior, it should not be introduced prematurely.

---

## 6. Data Lifecycle

Data should move through a clear lifecycle from creation to eventual archival or deletion.

### Creation
New records are created when the user completes onboarding, changes preferences, logs progress, receives reminders, or triggers AI-generated guidance.

### Update
Records are updated when user behavior or system context changes. For example, goals may change, reminder preferences may shift, or weekly summaries may be refreshed.

### Archival
Historical records should be preserved as part of the system’s timeline. Weekly summaries, completed goals, and past meal plans may be archived rather than deleted when they cease to be active.

### Deletion
Deletion should be rare and deliberate. Temporary or invalid data may be removed, but permanent user and coaching records should generally follow a soft-delete or archive approach rather than immediate destruction.

### Short-lived versus Long-lived Data
Short-lived AI memory and temporary workflow context should not be treated like permanent user records. They should be stored only as long as they remain relevant and should expire or be archived according to the retention rules defined in AI_MEMORY.md.

---

## 7. AI Data Strategy

AI-related information should be stored in a way that separates operational guidance from user records and preserves the distinction between ephemeral AI context and durable user history.

### AI Insight
AI insight represents a generated interpretation or recommendation produced by the AI layer. It should be stored as a structured historical artifact when it has value for later review, coaching continuity, or reporting.

### AI Memory
AI memory represents the personalized preferences and behaviors that influence future recommendations. It should be stored as durable memory state, but only within the scope of HealthGuard coaching and the rules defined in AI_MEMORY.md.

### AI Persona
The AI persona is a conceptual representation of the user’s coaching profile. It should be stored as a structured summary that can be reused by workflows and prompts without becoming a free-form or ambiguous artifact.

### Weekly Reports
Weekly reports should be retained as structured summaries of progress and coaching outcomes. They support reflection, continuity, and future recommendations.

### Conversation Summary
Conversation summaries are useful for continuity but should remain bounded and contextual. They should not be stored as unrestricted free text without clear purpose or retention policy.

The database should support these AI artifacts without turning the system into a general-purpose conversational memory platform.

---

## 8. Timestamp Strategy

Timestamps are essential for auditability, retention, and lifecycle management. The architecture should define a consistent approach to time tracking across all persistent entities.

### created_at
Used to record when a record was first created. It is the authoritative timestamp for the birth of the record.

### updated_at
Used to record the most recent change to a record. It should be updated whenever meaningful state changes occur.

### archived_at
Used to mark when a record moved from active use to historical or archived status.

### deleted_at
Used to indicate a logical deletion when the record should no longer be active but must remain traceable for audit or recovery purposes.

The timestamp strategy should be consistent across domains so that the system can reliably evaluate recency, history, and lifecycle state.

---

## 9. UUID Strategy

UUIDs are preferred because they support distributed systems, reduce collision risk, and provide stable identifiers across services and workflows. They are especially useful in an AI-first product where data may be created from multiple interaction paths and later correlated across modules.

The architecture should use UUIDs as the standard identifier strategy for persistent entities to preserve consistency and interoperability.

---

## 10. Audit Strategy

The database should support traceability for all meaningful changes to user and coaching state.

Examples of auditable changes include:
- goal changes
- reminder changes
- health profile updates
- preference changes
- weekly report generation
- AI memory updates that materially affect future recommending behavior

Auditability should focus on changes that affect user experience, safety, or personalization. It should not require excessive logging for routine transient state.

---

## 11. Future Expansion

The database architecture should be extensible without requiring a redesign of the core model.

Potential future expansions include:
- Apple Health integration
- Google Health Connect integration
- wearable device data
- family account support
- doctor portal or care-team visibility

The current architecture should remain compatible with these future directions by preserving clear domains, stable ownership, and extensible relationships.

---

## 12. Database Boundaries

The database should contain persistent data that supports the HealthGuard product experience. It should not be treated as a general-purpose storage layer for ephemeral AI execution details.

### Store
The database should store:
- user preferences
- health profile information
- goals
- progress records
- meal plans and meal-related context
- reminders and notification state
- weekly reports
- AI-generated summaries and memory state that affects future coaching

### Do Not Store
The database should not store:
- raw prompts
- API secrets
- temporary AI context that is purely execution-specific
- vendor-specific implementation details
- non-health private conversations unrelated to the app’s purpose

These boundaries ensure that the database remains a durable, maintainable system of record rather than a repository for transient operational artifacts.

## 13. Database Functions

### Database Functions

HealthGuard uses PostgreSQL functions to centralize reusable business calculations and automation that should remain consistent regardless of the application client.

The initial implementation includes:

- calculate_bmi()
- calculate_bmr()
- generate_weekly_report()
- create_notification()

These functions improve consistency, reduce duplicated application logic, and support future service-layer integration.