# HealthGuard v2.0 — ERD Specification

This document extends the existing database design and database architecture specifications for HealthGuard v2.0. It defines the logical relationships between persistent entities before any physical database implementation is undertaken.

The purpose of this specification is to preserve clear ownership, business meaning, and referential consistency across the full HealthGuard data model. It is intentionally implementation-ready for future database modeling work while remaining free of SQL, DBML, and physical storage detail.

---

## 1. Introduction

HealthGuard v2.0 requires a consistent logical model for all persistent entities that support user identity, health context, nutrition, coaching, monitoring, reminders, AI-generated insight, and reporting. This document provides the canonical relationship definition for those entities.

The logical model is intended to support the following design goals:

- preserve clear ownership between a user and their personal records
- express relationships in a way that is understandable to architects and future implementers
- keep the model aligned with the existing database design and architecture documents
- remain suitable for future DBML or ERD generation without requiring implementation-specific decisions

This document does not define tables, columns, indexes, or database engine behavior. It defines the logical relationship structure that should be preserved in any physical implementation.

---

## 2. Relationship Principles

The relationship model for HealthGuard follows the same principles as the business-oriented database design.

### Ownership First
Every personal record should remain owned by a User. Ownership establishes the primary boundary for persistence, access, and lifecycle management.

### Parent and Child Relationships
A parent entity owns or governs one or more child entities. Child records may be created only when their parent context is valid.

### Normalization
The logical model minimizes redundant data and preserves consistency by representing each business relationship once through its authoritative parent-to-child association. This approach keeps the model easier to reason about, easier to extend, and better aligned with long-term data integrity requirements.

### Optional References
Some relationships are optional because a child record may be meaningful even when the associated context is not present. In such cases, the relationship remains logical but does not require the reference to be populated.

### Soft Delete and On Delete Behavior
HealthGuard primarily uses soft delete for normal business operations so that records remain available for history, review, and accountability. The ON DELETE rules described in this document apply only when an administrative or permanent physical deletion is explicitly performed. Soft-deleted records should remain available for historical purposes and should not be treated as fully erased from the system.

### Referential Consistency
Relationships should remain explicit and dependable. If a parent record is removed from active use, the dependent relationships must be handled according to the rules defined in this document.

### Historical Continuity
Historical data should remain traceable and should not be lost simply because a related record is no longer active.

---

## 3. Cardinality Legend

The following notation is used throughout this document.

- 1 → 1: one record is associated with exactly one related record
- 1 → N: one record is associated with many related records
- N → 1: many records may relate to one parent record
- Optional: the relationship may exist without a populated reference
- Required: the relationship must be populated for the child record to remain valid

---

## 4. Entity Relationships

The following relationships define the logical association between all entities described in the database design document.

### User

Implementation note: The User entity extends the authenticated identity managed by Supabase Auth. The primary key is synchronized with the identity maintained by auth.users, while the application stores additional profile information in its own User entity for HealthGuard-specific personalization and ownership.

#### Relationship: User to Health Profile
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: A health profile is a direct extension of the user account and cannot exist independently.

#### Relationship: User to Goal
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Goals are personal coaching records owned by the user and should be removed with the user context.

#### Relationship: User to Favorite Food
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Favorite food preferences are user-specific and should not outlive the owning account.

#### Relationship: User to Meal Plan
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Meal plans are created for a specific user and are not meaningful outside that ownership context.

#### Relationship: User to Food Log
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Food logs represent the user’s recorded activity and should remain tied to the user account.

#### Relationship: User to Activity Log
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Activity logs are personal behavior records and belong to the user.

#### Relationship: User to Blood Sugar Log
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Blood sugar logs are user-reported tracking records and should remain attached to the user.

#### Relationship: User to Weight Log
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Weight logs are personal progress records and are not meaningful outside the owning user context.

#### Relationship: User to Reminder
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Reminders are personal coaching prompts that should be removed when their user context is removed.

#### Relationship: User to Notification
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Notifications are user-facing delivery events and belong to the user record.

#### Relationship: User to AI Insight
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: AI insights are generated for and retained with the user’s coaching history.

#### Relationship: User to Weekly Report
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Weekly reports summarize a user’s progress and should be removed when the user context is removed.

#### Relationship: User to Achievement
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Achievements reflect the user’s progress and are tied to the user’s lifecycle.

#### Relationship: User to Streak
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Streaks are derived from the user’s repeated engagement and should be removed with the user account.

#### Relationship: User to Device
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Devices are associated with a specific user account and should not survive the user context.

### Health Profile

#### Relationship: Health Profile to User
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Each user owns exactly one health profile that stores the user's baseline health information. The profile cannot exist independently and should not be duplicated for the same user.

#### Business Rules
- Each user may own only one active health profile.
- The health profile is created during onboarding.
- Future updates modify the existing profile instead of creating a new record.

### Goal

#### Relationship: Goal to User
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Goals are personal user records and remain dependent on the owning user.

#### Relationship: Goal to AI Insight
- Foreign Key: goal_id
- Required or Optional: Optional
- On Delete Rule: ON DELETE SET NULL
- Reason: An AI insight may be relevant to a goal, but it should not be invalidated if the goal is no longer active.

#### Relationship: Goal to Weekly Report
- Foreign Key: goal_id
- Required or Optional: Optional
- On Delete Rule: ON DELETE SET NULL
- Reason: A weekly report may reference a goal context when relevant, but that reference should not force the report to be deleted.

### Favorite Food

#### Relationship: Favorite Food to User
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Favorite food entries are personal preference records tied directly to the user.

### Meal Plan

#### Relationship: Meal Plan to User
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Meal plans are generated for a specific user and should not exist outside that ownership scope.

#### Relationship: Meal Plan to Meal Item
- Foreign Key: meal_plan_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Meal items are part of the meal plan and cannot exist independently.

### Meal Item

#### Relationship: Meal Item to Meal Plan
- Foreign Key: meal_plan_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Each meal item belongs to a meal plan and should be removed with that plan.

### Food Alternative

#### Relationship: Food Alternative to User
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Food alternatives are user-specific recommendation outcomes.

#### Relationship: Meal Item to Food Alternative
- Foreign Key: meal_item_id
- Required or Optional: Optional
- On Delete Rule: ON DELETE SET NULL
- Reason: A meal item may have one or more food alternatives. Food alternative records reference the meal item but remain valid even if the original meal item is removed.

### Food Log

#### Relationship: Food Log to User
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Food logs are personal nutrition records owned by the user.

#### Relationship: Meal Item to Food Log
- Foreign Key: meal_item_id
- Required or Optional: Optional
- On Delete Rule: ON DELETE SET NULL
- Reason: Food log records may reference a planned meal item but should remain valid even if the associated meal item is removed.

### Activity Log

#### Relationship: Activity Log to User
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Activity logs are personal behavioral records tied to the user account.

### Blood Sugar Log

#### Relationship: Blood Sugar Log to User
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Blood sugar logs are self-reported health records owned by the user.

### Weight Log

#### Relationship: Weight Log to User
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Weight logs are personal progress records and should remain tied to the user.

### Reminder

#### Relationship: Reminder to User
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Reminders are user-specific coaching prompts.

### Notification

#### Relationship: Notification to User
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Notifications are user-associated communication records.

#### Relationship: Notification to Reminder
- Foreign Key: reminder_id
- Required or Optional: Optional
- On Delete Rule: ON DELETE SET NULL
- Reason: A notification may be linked to a reminder when relevant, but it should not be invalidated if the reminder is removed.

### AI Insight

#### Relationship: AI Insight to User
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: AI insights are retained as part of the user’s coaching history and may be generated from food logs, activity logs, blood sugar logs, weight logs, and broader monitoring history.

#### Relationship: AI Insight to Goal
- Foreign Key: goal_id
- Required or Optional: Optional
- On Delete Rule: ON DELETE SET NULL
- Reason: An insight may reflect a goal context, but the insight should remain valid even if the goal is no longer active. The optional goal relationship represents one possible context rather than a required dependency.

### Weekly Report

#### Relationship: Weekly Report to User
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Weekly reports are generated for a specific user and should not survive the user context.

#### Relationship: Weekly Report to Goal
- Foreign Key: goal_id
- Required or Optional: Optional
- On Delete Rule: ON DELETE SET NULL
- Reason: Weekly reports summarize multiple sources of user progress, including goals, food logs, activity logs, weight logs, blood sugar logs, and other monitoring records. The optional goal relationship represents one possible context rather than the sole basis of the report.

### Achievement

#### Relationship: Achievement to User
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Achievements are personal milestones and belong to the user.

#### Business Rules
- Achievements may be generated from completed goals, maintained streaks, consistent healthy behavior, and meaningful coaching milestones.
- Achievement records should represent genuine progress and should remain consistent with the user’s observed behavior and coaching context.

### Streak

#### Relationship: Streak to User
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Streaks are derived from repeated completion of supported user activities such as logging meals, exercising, or completing coaching actions, and they remain tied to the user account.

### Device

#### Relationship: Device to User
- Foreign Key: user_id
- Required or Optional: Required
- On Delete Rule: ON DELETE CASCADE
- Reason: Device records are scoped to a user account and should be removed as part of account lifecycle cleanup.

---

## 5. Relationship Matrix

The following matrix summarizes the logical relationship structure for the HealthGuard domain model in the same domain order as the database architecture document.

### Identity

The User entity serves as the root owner of the HealthGuard data model. The ownership relationships are represented in the appropriate domain sections below.

### Health

| Parent Entity | Child Entity | Cardinality | Foreign Key | Required | On Delete |
| --- | --- | --- | --- | --- | --- |
| User | Health Profile | 1 → 1 | user_id | Required | CASCADE |

### Nutrition

| Parent Entity | Child Entity | Cardinality | Foreign Key | Required | On Delete |
| --- | --- | --- | --- | --- | --- |
| User | Favorite Food | 1 → N | user_id | Required | CASCADE |
| User | Meal Plan | 1 → N | user_id | Required | CASCADE |
| User | Food Alternative | 1 → N | user_id | Required | CASCADE |
| Meal Plan | Meal Item | 1 → N | meal_plan_id | Required | CASCADE |
| Meal Item | Food Alternative | 1 → N | meal_item_id | Optional | SET NULL |
| Meal Item | Food Log | 1 → N | meal_item_id | Optional | SET NULL |

### Activity

| Parent Entity | Child Entity | Cardinality | Foreign Key | Required | On Delete |
| --- | --- | --- | --- | --- | --- |
| User | Food Log | 1 → N | user_id | Required | CASCADE |
| User | Activity Log | 1 → N | user_id | Required | CASCADE |
| User | Blood Sugar Log | 1 → N | user_id | Required | CASCADE |
| User | Weight Log | 1 → N | user_id | Required | CASCADE |

### Coaching

| Parent Entity | Child Entity | Cardinality | Foreign Key | Required | On Delete |
| --- | --- | --- | --- | --- | --- |
| User | Goal | 1 → N | user_id | Required | CASCADE |
| User | Reminder | 1 → N | user_id | Required | CASCADE |
| User | Achievement | 1 → N | user_id | Required | CASCADE |
| User | Streak | 1 → N | user_id | Required | CASCADE |

### AI

| Parent Entity | Child Entity | Cardinality | Foreign Key | Required | On Delete |
| --- | --- | --- | --- | --- | --- |
| User | AI Insight | 1 → N | user_id | Required | CASCADE |
| Goal | AI Insight | 1 → N | goal_id | Optional | SET NULL |

### Reporting

| Parent Entity | Child Entity | Cardinality | Foreign Key | Required | On Delete |
| --- | --- | --- | --- | --- | --- |
| User | Weekly Report | 1 → N | user_id | Required | CASCADE |
| Goal | Weekly Report | 1 → N | goal_id | Optional | SET NULL |

### System

| Parent Entity | Child Entity | Cardinality | Foreign Key | Required | On Delete |
| --- | --- | --- | --- | --- | --- |
| User | Notification | 1 → N | user_id | Required | CASCADE |
| Reminder | Notification | 1 → N | reminder_id | Optional | SET NULL |
| User | Device | 1 → N | user_id | Required | CASCADE |

---

## 6. Referential Integrity Rules

The following rules define the expected consistency behavior of the logical model.

- Every child record that is owned by a user must reference a valid user record.
- A relationship marked as required must not be left unresolved once the child record exists.
- A relationship marked as optional may be null when the related context is not available.
- A record should not be allowed to reference a parent record from another user context.
- A child record should not exist in a state that contradicts its business ownership model.
- Optional references should preserve the child record even when the parent context is no longer available.

---

## 7. Soft Delete Rules

The database model should preserve logical deletion behavior rather than relying on destructive removal for core records.

- Records that are no longer active should be transitioned to an inactive or archived state rather than being hard deleted.
- Soft-deleted parent records should cause dependent records to become inactive or non-current in accordance with the ownership model.
- Historical records should remain available for review, reporting, and accountability.
- User-owned records such as goals, reminders, meal plans, reports, and insights should remain traceable even if they are no longer active.
- Optional references should not cause the loss of historical context when a related parent becomes inactive.

---

## 8. Physical Naming Convention

The logical model should be translated into a physical naming convention that is consistent, readable, and suitable for future database modeling.

- Use lowercase snake_case for all table and column names.
- Use singular entity names for logical concepts and plural table names for physical storage where appropriate.
- Use foreign keys in the form parent_table_id, such as user_id, goal_id, meal_plan_id, reminder_id.
- Use primary keys as id for each entity.
- Use timestamp fields in the form created_at, updated_at, archived_at, and deleted_at where applicable.
- Use descriptive status fields in lowercase snake_case, such as status, connection_status, decision_status, and read_status.
- Preserve the logical relationship names in the conceptual model so that future DBML generation remains semantically clear.

---

## 9. Design Assumptions

- The model assumes that all user-facing records are associated with an authenticated user identity and that the user remains the primary owner of personal health, coaching, and progress data.
- The model assumes that onboarding establishes the initial health profile, early goals, and initial preference context for the user experience.
- The model assumes that ownership is maintained through clear parent-to-child relationships so that child records remain associated with their originating user context.
- The model assumes that historical data remains valuable for reflection, reporting, continuity, and auditability, even when records are no longer active.
- The model assumes that AI-generated entities such as insights and reports are persisted as meaningful business artifacts rather than transient execution output.
- The model assumes that the logical structure remains extensible for future integrations, additional health context, and broader coaching capabilities.

---

## 10. Summary

This specification defines the logical relationship framework for HealthGuard v2.0 before physical database implementation. It preserves the ownership model established in the database design document, keeps relationships explicit and understandable, and supports future ERD or DBML generation without introducing implementation-specific detail.

The model remains centered on the User as the root owner of personal records, while allowing optional references where business context may be relevant but not mandatory. The result is a relationship structure that is consistent, extensible, and suitable for future database implementation work.

---

## 11. Implementation Notes

- UUID values should be generated in a consistent and stable manner for persistent identity across workflows and future integrations.
- Audit timestamps such as created_at and updated_at should be preserved to support traceability, lifecycle review, and future reporting requirements.
- PostgreSQL best practices should be followed for referential integrity, naming consistency, and predictable schema evolution.
- The logical model remains compatible with Supabase-based application architectures and future service-layer integration.
- The logical model is compatible with PostgreSQL Row Level Security for future user-level data isolation.
- The design remains migration-ready and suitable for future schema refinement, PostgreSQL implementation, Supabase deployment, and API development.

---

## 12. ERD Readiness

This document is ready to support future DBML generation, PostgreSQL schema design, migration planning, Supabase implementation, Row Level Security policy creation, and API development. The logical model remains consistent with the existing HealthGuard business scope while providing a clear foundation for future implementation and governance work.
