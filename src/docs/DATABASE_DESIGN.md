# HealthGuard v2.0 — Database Design

This document describes the persistent entities used by HealthGuard v2.0. It is intended to be the reference design for future database work and remains fully consistent with the workflow, memory, prompt, module, and architecture documents.

This document does not define SQL, migrations, or implementation details. It focuses only on the business meaning of each persistent entity.

---

# User

## Purpose

The User entity represents the individual account that owns the HealthGuard experience. It is the root of the user-specific data model and the point of ownership for all personal records.

## Owned By

- Account creation flow
- Onboarding Workflow

## Relationships

User (1) → Health Profile (1)

User (1) → Goal (N)

User (1) → Favorite Food (N)

User (1) → Meal Plan (N)

User (1) → Reminder (N)

User (1) → Notification (N)

User (1) → AI Insight (N)

User (1) → Weekly Report (N)

## Primary Key

- id (UUID)

## Foreign Keys

- None

## Important Fields

- id
- email
- display_name
- status
- created_at
- updated_at

## Business Rules

- Each User is the owner of their own health, nutrition, and coaching records.
- The User record remains the central identity for all personalized data.
- The User experience should remain consistent across onboarding, daily coaching, monitoring, and reminders.

## Validation Rules

- A User must be identifiable before any personal records can be created.
- Personal records should not exist without a User owner.

## Future Extensions

- Family account support is a future scope only.
- Shared care-team access is a future scope only.

---

# Health Profile

## Purpose

The Health Profile entity captures the user’s baseline self-reported health context used to personalize onboarding and coaching. It supports the Health Persona and the initial health-oriented guidance that the AI provides.

## Owned By

- Onboarding Workflow
- Assessment AI

## Relationships

User (1) → Health Profile (1)

Health Profile (1) supports many coaching decisions

## Primary Key

- id (UUID)

## Foreign Keys

- user_id → User.id

## Important Fields

- id
- height_cm
- weight_kg
- activity_level
- lifestyle_summary
- dietary_preferences
- created_at
- updated_at

## Business Rules

- Only one active Health Profile should exist per User.
- The Health Profile is created during onboarding and updated only when the user changes relevant health context.
- The Health Profile is self-reported and non-diagnostic.

## Validation Rules

- Health Profile data should be meaningful and non-empty where the user has provided it.
- Health Profile updates should not introduce medical diagnosis content.

## Future Extensions

- Integration with external health data sources is a future scope only.
- Broader clinical profile support is a future scope only.

---

# Favorite Food

## Purpose

The Favorite Food entity stores foods that the user prefers, which the AI uses to make meal plans and coaching recommendations more relevant.

## Owned By

- Onboarding Workflow
- Meal Planner AI
- Coach AI

## Relationships

User (1) → Favorite Food (N)

Favorite Food (N) supports meal planning and recommendation logic

## Primary Key

- id (UUID)

## Foreign Keys

- user_id → User.id

## Important Fields

- id
- food_name
- category
- preference_source
- created_at

## Business Rules

- Favorite Foods represent user preference and should be treated as long-term preference memory when confirmed.
- The AI may update these preferences over time based on repeated user behavior and explicit user input.

## Validation Rules

- A favorite food entry should have a meaningful food name.
- Preference entries should not be created from empty or unsupported values.

## Future Extensions

- Barcode-based food recognition is a future scope only.
- Nutrition score enrichment is a future scope only.

---

# Goal

## Purpose

The Goal entity stores the user’s personal health and lifestyle goals and their current status. It provides the foundation for daily coaching and progress monitoring.

## Owned By

- Onboarding Workflow
- Monitoring AI
- Coach AI

## Relationships

User (1) → Goal (N)

Goal (1) ← AI Insight (N, optional)

Goal (1) ← Weekly Report (N, optional)

## Primary Key

- id (UUID)

## Foreign Keys

- user_id → User.id

## Important Fields

- id
- title
- description
- status
- target_value
- current_value
- start_date
- end_date
- created_at
- updated_at

## Business Rules

- Goals should remain aligned with the user’s stated objectives and current coaching context.
- Goals may be active, completed, or archived.
- Goals influence meal planning, reminders, and weekly progress review.

## Validation Rules

- A Goal should have a clear status and meaningful description.
- A Goal should not be considered complete without a meaningful completion state.

## Future Extensions

- Goal milestones and streak-linked goals are future scope only.
- Family goal sharing is a future scope only.

---

# Meal Plan

## Purpose

The Meal Plan entity records the meal plan generated for a user for a specific period or day. It supports the Daily Workflow and the Meal Planner Workflow.

## Owned By

- Daily Workflow
- Meal Planner AI

## Relationships

User (1) → Meal Plan (N)

Meal Plan (1) → Meal Item (N)

## Primary Key

- id (UUID)

## Foreign Keys

- user_id → User.id

## Important Fields

- id
- plan_name
- start_date
- end_date
- plan_type
- status
- created_at

## Business Rules

- A Meal Plan belongs to one User.
- A Meal Plan should reflect the user’s preferences and current goals when available.
- Meal Plans are used for the current day or a defined time range and may be archived when no longer active.

## Validation Rules

- A Meal Plan should have a clear period or day context.
- Meal Plans should not be created without a User owner.

## Future Extensions

- Grocery list generation is a future scope only.
- Multi-week meal planning is a future scope only.

---

# Meal Item

## Purpose

The Meal Item entity represents each planned food item inside a Meal Plan. It captures the content of the plan at a granular level.

## Owned By

- Meal Planner AI
- Daily Workflow

## Relationships

Meal Plan (1) → Meal Item (N)

Meal Item (N) belongs to one Meal Plan

## Primary Key

- id (UUID)

## Foreign Keys

- meal_plan_id → MealPlan.id

## Important Fields

- id
- meal_slot
- dish_name
- rationale
- planned_for_date
- created_at

## Business Rules

- A Meal Item must belong to one Meal Plan.
- Meal Items should reflect the current coaching goal and user preferences wherever relevant.
- Meal Items should remain understandable as part of the broader Meal Plan.

## Validation Rules

- A Meal Item should have a clear meal slot and food content.
- Meal Items should not exist without an associated Meal Plan.

## Future Extensions

- Nutrition scoring is a future scope only.
- Barcode-linked meal details are a future scope only.

---

# Food Alternative

## Purpose

The Food Alternative entity stores healthier substitute options that the AI proposes when the user rejects or replaces a suggested food item.

## Owned By

- Food Alternative AI
- Meal Planner AI

## Relationships

User (1) → Food Alternative (N)

Food Alternative (N) supports meal replanning and recommendation behavior

## Primary Key

- id (UUID)

## Foreign Keys

- user_id → User.id
- meal_item_id → MealItem.id (optional)

## Important Fields

- id
- original_food
- replacement_food
- reason
- decision_status
- created_at

## Business Rules

- Food Alternatives should be based on the user’s current meal context and preferences.
- Accepted and rejected alternatives should be distinguishable for future personalization.

## Validation Rules

- A Food Alternative should reference a meaningful original food and a meaningful replacement option.
- The record should remain understandable in the context of the original meal suggestion.

## Future Extensions

- Personalized substitution ranking is a future scope only.
- Nutrition comparison enrichment is a future scope only.

---

# Food Log

## Purpose

The Food Log entity records the foods the user logs as consumed. It supports daily monitoring and progress review.

## Owned By

- Daily Workflow
- Monitoring Workflow

## Relationships

User (1) → Food Log (N)

Food Log (N) contributes to weekly progress and monitoring context

## Primary Key

- id (UUID)

## Foreign Keys

- user_id → User.id
- meal_item_id → MealItem.id (optional)

## Important Fields

- id
- food_name
- meal_type
- logged_at
- portion_context
- created_at

## Business Rules

- Food Logs cannot exist without a User.
- Food Logs should reflect what the user actually logged and should not be inferred without support.
- Food Logs contribute to ongoing monitoring and weekly review.

## Validation Rules

- A Food Log should include meaningful food content.
- A Food Log should have a clear time context.

## Future Extensions

- Image-based food recognition is a future scope only.
- Nutrition detail enrichment is a future scope only.

---

# Activity Log

## Purpose

The Activity Log entity captures user-reported activity data such as walking, exercise, or movement. It supports daily monitoring and progress review.

## Owned By

- Daily Workflow
- Monitoring Workflow

## Relationships

User (1) → Activity Log (N)

Activity Log (N) contributes to weekly progress and coaching context

## Primary Key

- id (UUID)

## Foreign Keys

- user_id → User.id

## Important Fields

- id
- activity_type
- duration_minutes
- intensity
- logged_at
- created_at

## Business Rules

- Activity Logs belong to one User.
- Activity data is used to support progress review and coaching continuity.

## Validation Rules

- An Activity Log should describe a meaningful activity.
- Activity duration and intensity context should be meaningful when present.

## Future Extensions

- Wearable activity integration is a future scope only.
- Automatic activity sync is a future scope only.

---

# Blood Sugar Log

## Purpose

The Blood Sugar Log entity stores the user’s self-reported blood sugar readings when they choose to share them. It supports health tracking and monitoring without introducing clinical diagnosis.

## Owned By

- Monitoring Workflow
- User-reported tracking flow

## Relationships

User (1) → Blood Sugar Log (N)

Blood Sugar Log (N) supports monitoring and progress review

## Primary Key

- id (UUID)

## Foreign Keys

- user_id → User.id

## Important Fields

- id
- reading_value
- measurement_context
- logged_at
- created_at

## Business Rules

- Blood Sugar Logs are self-reported only.
- Blood Sugar Logs are not a medical diagnosis tool.
- Blood Sugar Logs should be interpreted as part of ongoing lifestyle coaching.

## Validation Rules

- Blood Sugar readings should be meaningful and positive.
- Measurement context should be clear when available.

## Future Extensions

- Connected device blood sugar integration is a future scope only.
- Doctor review integration is a future scope only.

---

# Weight Log

## Purpose

The Weight Log entity stores the user’s self-reported weight measurements over time. It supports progress tracking and weekly review.

## Owned By

- Monitoring Workflow
- User-reported tracking flow

## Relationships

User (1) → Weight Log (N)

Weight Log (N) supports progress trend review

## Primary Key

- id (UUID)

## Foreign Keys

- user_id → User.id

## Important Fields

- id
- weight_kg
- logged_at
- created_at

## Business Rules

- Weight Logs belong to one User.
- Weight Logs should be treated as progress records rather than medical data.

## Validation Rules

- Weight values should be positive.
- Weight Logs should remain associated with a clear time context.

## Future Extensions

- Wearable weight sync is a future scope only.
- Trend analysis enhancements are a future scope only.

---

# Reminder

## Purpose

The Reminder entity stores planned reminders that support daily coaching and lightweight re-engagement.

## Owned By

- Reminder Workflow
- Daily Workflow

## Relationships

User (1) → Reminder (N)

Reminder (N) supports daily coaching and follow-up activity

## Primary Key

- id (UUID)

## Foreign Keys

- user_id → User.id

## Important Fields

- id
- message
- scheduled_time
- reminder_type
- status
- created_at

## Business Rules

- Reminder time should follow the user’s existing reminder preferences when available.
- Reminders should remain lightweight and relevant to the current coaching context.

## Validation Rules

- A Reminder should have a meaningful message and a valid reminder time.
- Reminder type should be meaningful and aligned with the workflow context.

## Future Extensions

- Adaptive reminder timing is a future scope only.
- Multi-channel reminder support is a future scope only.

---

# Notification

## Purpose

The Notification entity stores the notifications delivered to the user as part of reminders and coaching touchpoints.

## Owned By

- Reminder Workflow
- Notification delivery flow

## Relationships

User (1) → Notification (N)

Notification (N) reflects reminder and engagement activity

## Primary Key

- id (UUID)

## Foreign Keys

- user_id → User.id
- reminder_id → Reminder.id (optional)

## Important Fields

- id
- title
- body
- delivered_at
- status
- created_at

## Business Rules

- Notifications should represent actual delivery events and not be created without cause.
- Notification status should reflect whether the user has seen the message.

## Validation Rules

- A Notification should have a clear message and delivery context.
- Notification state should remain understandable for follow-up review.

## Future Extensions

- Rich notification content is a future scope only.
- Cross-channel notification support is a future scope only.

---

# AI Insight

## Purpose

The AI Insight entity stores AI-generated interpretations or recommendations that are meaningful for coaching continuity, progress review, or future personalization.

## Owned By

- Assessment AI
- Coach AI
- Monitoring AI
- Risk Detection AI

## Relationships

User (1) → AI Insight (N)

AI Insight (N) may relate to one Goal (optional)

## Primary Key

- id (UUID)

## Foreign Keys

- user_id → User.id
- goal_id → Goal.id (optional)

## Important Fields

- id
- insight_type
- insight_content
- generated_at
- related_goal_id
- created_at

## Business Rules

- AI Insights should remain within the scope of coaching and lifestyle support.
- AI Insights should not contain medical diagnosis content.
- AI Insights may be linked to a Goal when the insight is relevant to that goal.

## Validation Rules

- AI Insights should contain meaningful and actionable content.
- AI Insights should not contradict the HealthGuard AI principles.

## Future Extensions

- More detailed insight categorization is a future scope only.
- Expanded insight linking is a future scope only.

---

# Weekly Report

## Purpose

The Weekly Report entity stores the structured summary of a user’s progress over a week. It supports reflection, progress monitoring, and future coaching.

## Owned By

- Weekly Report AI
- Monitoring Workflow

## Relationships

User (1) → Weekly Report (N)

Weekly Report (N) summarizes many progress records

## Primary Key

- id (UUID)

## Foreign Keys

- user_id → User.id

## Important Fields

- id
- report_date
- summary
- achievements
- improvement_areas
- recommendations
- created_at

## Business Rules

- Weekly Reports are generated from the current week’s progress and should reflect actual available data.
- Weekly Reports should remain reflective and non-diagnostic.
- Weekly Reports should be immutable after generation unless explicitly revised.

## Validation Rules

- A Weekly Report should have a clear week context and a meaningful summary.
- A Weekly Report should not invent progress that was not observed.

## Future Extensions

- Multi-week trend comparison is a future scope only.
- Personalized report templates are a future scope only.

---

# Achievement

## Purpose

The Achievement entity records milestones reached by the user that are meaningful to the coaching experience, such as completing a goal or maintaining consistency.

## Owned By

- Monitoring Workflow
- AI Module layer

## Relationships

User (1) → Achievement (N)

Achievement (N) reflects coaching milestones and progress

## Primary Key

- id (UUID)

## Foreign Keys

- user_id → User.id

## Important Fields

- id
- achievement_name
- description
- achievement_type
- achieved_at
- created_at

## Business Rules

- Achievements should represent meaningful progress or milestone events.
- Achievements should not be created for trivial or unsupported actions.

## Validation Rules

- An Achievement should have a clear name and meaningful context.
- Achievement records should remain consistent with user progress.

## Future Extensions

- Achievement sharing is a future scope only.
- Expanded milestone categories are a future scope only.

---

# Streak

## Purpose

The Streak entity tracks consecutive user activity over time, such as repeated logging or goal consistency. It supports motivation and ongoing engagement.

## Owned By

- Monitoring Workflow
- Daily Workflow

## Relationships

User (1) → Streak (N)

Streak (N) reflects repeated engagement or consistent progress

## Primary Key

- id (UUID)

## Foreign Keys

- user_id → User.id

## Important Fields

- id
- streak_type
- current_count
- longest_count
- last_broken_at
- updated_at

## Business Rules

- Streaks should reflect actual user activity patterns.
- Streaks should be updated based on meaningful repeated behavior rather than isolated events.

## Validation Rules

- A Streak should have a clear type and meaningful count values.
- Streak values should remain consistent with the user’s recorded activity.

## Future Extensions

- Streak-based rewards are a future scope only.
- Family or group streaking is a future scope only.

---

# Device

## Purpose

The Device entity represents a connected or supported device that may contribute to health or activity context in the future.

## Owned By

- System integration layer
- Future integration workflow

## Relationships

User (1) → Device (N)

Device (N) may contribute to activity or health context in future integrations

## Primary Key

- id (UUID)

## Foreign Keys

- user_id → User.id

## Important Fields

- id
- device_name
- device_type
- connection_status
- last_sync_at
- created_at

## MVP Status

Future Scope Only

## Business Rules

- Device records should remain clearly associated with a User.
- Device records support future integration without changing the core workflow model.

## Validation Rules

- A Device should have a meaningful name and type.
- Device connection state should be understandable for future integrations.

## Future Extensions

- Apple Health integration is a future scope only.
- Google Health Connect integration is a future scope only.
- Wearable data integration is a future scope only.

