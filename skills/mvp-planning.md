# MVP Planning Skill

## Overview

Turn a project idea into a focused MVP plan, break scope into clear user stories, and decompose each story into executable engineering tasks.

## Mode

This is a planning-only skill.

- Do not implement code, run implementation checks, or execute fix loops while using this skill.
- Produce planning artifacts only (project spec, scope, stories, tasks, sequencing, checkpoints).
- If implementation is requested, finish this planning output first, then ask for confirmation before switching to an implementation workflow.

## Purpose

Reduce scope creep and delivery risk by forcing clear outcomes, measurable acceptance criteria, and small tasks that can be implemented and verified quickly.

## Workflow

1. Run project setup questions
2. Clarify product outcome
3. Define strict MVP scope
4. Write user stories
5. Refine and split stories
6. Break stories into tasks
7. Order by dependency and value
8. Define delivery checkpoints

## Step 0: Project Setup Questions

When starting a new project, ask these questions first and fill the project spec document before MVP breakdown.

Project spec template:

- `docs/project-specs-mobile-app-template.md`

Kickoff questions:

1. What is the app name, primary platform (iOS/Android/both), and owner/team?
2. What user problem are you solving and which user segment is the top priority?
3. What are the top 3 goals for the first release, and what is explicitly out of scope?
4. Which core user flows must work in MVP (for example onboarding, main task, notifications, settings)?
5. What metrics define launch success (acquisition, retention, crash-free sessions, business target)?
6. What constraints exist (deadline, budget, team size, required integrations, compliance)?
7. What technical direction is preferred (native or cross-platform, minimum OS versions, backend dependencies)?
8. What rollout strategy is expected (beta group size, phased rollout, rollback plan)?

Output rule:

- After answers are collected, generate a filled project spec using `docs/project-specs-mobile-app-template.md`.
- Then continue with the MVP planning workflow using the same scope and success metrics, starting at **Step 1: Clarify Product Outcome**.
- Do not jump to coding, implementation checks, testing, or bug-fix actions in this skill.
- Transition gate after Q&A:
  1. Output `Project Spec (Filled)`.
  2. Output `Step 1` through `Step 7` sections in order.
  3. End with `Planning complete. Ready to implement if you want to proceed.`

## Step 1: Clarify Product Outcome

Capture in 3-5 lines:

- Target user
- Core problem
- MVP success signal (one metric)
- Time constraint (target release date or sprint count)

Template:

```md
Product: <name>
Target user: <who>
Problem: <pain point>
MVP success metric: <single measurable metric>
Delivery window: <date or number of sprints>
```

## Step 2: Define Strict MVP Scope

Create two lists:

- In scope: must exist for the MVP to deliver core value
- Out of scope: explicitly deferred to post-MVP

Rules:

- Keep only features needed for first usable value
- Defer optimization, customization, and edge integrations
- If a feature does not directly support the success metric, cut it

## Step 3: Write User Stories

Use this format:

```md
As a <user>, I want <capability>, so that <outcome>.
```

Add acceptance criteria per story:

```md
- Given <context>, when <action>, then <expected result>
```

Keep each story vertical (UI + backend + data if needed) and independently testable.

## Step 4: Refine and Split Stories

Use these quality rules:

- Keep each story independently testable
- Keep each story focused on one user outcome
- Remove stories that are technical tasks disguised as user value
- Split stories that are too broad for a single sprint slice

Story refinement checks:

- Is the user and outcome explicit?
- Are acceptance criteria measurable?
- Is it possible to demo this story alone?
- Does it avoid bundling multiple flows in one story?

## Step 5: Break Stories Into Tasks

For each story, create tasks sized to 2-8 hours.

Task categories:

- API/data
- Business logic
- UI/UX
- Tests
- Observability/docs/release notes

Task template:

```md
Task: <verb + concrete deliverable>
Owner: <name or role>
Estimate: <hours>
Dependencies: <task IDs or none>
Done when:

- <objective check>
```

## Step 6: Prioritize and Sequence

Priority order:

1. Foundation blockers (auth, schema, core APIs)
2. Core user value flow
3. Reliability and edge-case handling
4. Nice-to-have polish

Build a dependency map and identify critical path tasks.

## Step 7: Delivery Checkpoints

Define:

- Sprint goal
- Mid-sprint demo checkpoint
- End-sprint acceptance checkpoint

At each checkpoint verify:

- Story acceptance criteria status
- Test coverage for changed behavior
- Scope changes and impact on timeline

## Story Splitting Patterns

If a story is too broad, split by:

- User journey step (create, edit, view)
- Data complexity (basic fields first, advanced later)
- Integration depth (mock provider first, real provider next)
- Risk (spike task first, delivery story after)

## Planning Output Template

```md
# MVP Plan: <project>

## Outcome

- Target user:
- Problem:
- MVP success metric:
- Delivery window:

## Scope

### In

-

### Out

-

## Stories

1. Story: <...>
   Acceptance:
   - Given/When/Then...

2. Story: <...>
   Acceptance:
   - Given/When/Then...

## Tasks

- T1: <task>
  Story: <story #>
  Estimate: <hours>
  Dependencies: <none/Tx>

- T2: <task>
  Story: <story #>
  Estimate: <hours>
  Dependencies: <none/Tx>

## Sprint Plan

- Sprint goal:
- Critical path:
- Risks:
```

## Quality Checklist

Before finalizing plan:

- [ ] MVP outcome is measurable
- [ ] Non-MVP scope is explicitly excluded
- [ ] Every story has acceptance criteria
- [ ] Every story is decomposed into concrete tasks
- [ ] Dependencies and critical path are visible
- [ ] Risks and assumptions are documented

## Example (Mini)

```md
Outcome

- Target user: freelance designers
- Problem: lose client requests in email threads
- MVP success metric: 60% of active users create 1 request board in first week

Story 1
As a designer, I want to create a request board, so that I can track client asks.
Acceptance:

- Given I am logged in, when I submit a valid board name, then a new board is created and listed.

Tasks

- T1: Create board schema and migration (2h)
- T2: Build POST /boards endpoint + validation (3h)
- T3: Add board creation UI form and success state (3h)
- T4: Add unit + integration tests for create flow (2h)
```
