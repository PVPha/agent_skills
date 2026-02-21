# MVP Planning Skill

## Overview

Turn a project idea into a focused MVP plan, break scope into clear user stories, and decompose each story into executable engineering tasks.

## Purpose

Reduce scope creep and delivery risk by forcing clear outcomes, measurable acceptance criteria, and small tasks that can be implemented and verified quickly.

## Workflow

1. Clarify product outcome
2. Define strict MVP scope
3. Write user stories
4. Refine and split stories
5. Break stories into tasks
6. Order by dependency and value
7. Define delivery checkpoints

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
