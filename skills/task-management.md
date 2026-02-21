# Task Management Skill

## Overview

Manage coding tasks in short, high-momentum loops without losing direction. This skill is for "vibe coding": moving fast while still finishing work cleanly.

## Core Principles

### Keep One Active Task

- Track exactly one active task at a time
- Keep 2-5 queued tasks max
- Park ideas in a backlog instead of context-switching

### Define "Done" Before Coding

For each task, write:

- Outcome: what changes for the user/system
- Constraints: tech, style, performance, or compatibility limits
- Verification: how to prove it works (tests, manual check, logs)

### Timebox Exploration

- Use a short discovery window (10-20 minutes)
- If blocked, switch to a spike note: what failed, what to try next
- Avoid infinite refactor loops without a concrete acceptance goal

## Session Startup Template

Use this at the start of a coding session:

```md
## Session Goal
<single sentence outcome>

## Active Task
<one task only>

## Done Criteria
- [ ] Code change implemented
- [ ] Tests updated/passing
- [ ] Edge cases considered
- [ ] Docs/changelog updated (if needed)

## Queue
1. <next task>
2. <next task>

## Parking Lot
- <idea not for now>
```

## Task Sizing for Vibe Coding

Split tasks into small units that can finish in 15-60 minutes:

- Good: "Add validation for empty email in signup form"
- Good: "Extract payment retry logic into helper"
- Bad: "Refactor auth system"

Break large work into vertical slices:

1. Happy path first
2. Error path second
3. Cleanup and docs last

## Prioritization Rules

Use this order by default:

1. Broken production/user-impacting issues
2. Work blocking other tasks
3. Core feature progress
4. Quality improvements (tests, refactors, docs)
5. Nice-to-have polish

When two tasks compete, choose the one with:

- Lower risk
- Faster validation
- Higher user impact

## Execution Loop

Repeat this loop per task:

1. Clarify task and done criteria in 1-3 lines
2. Implement smallest useful change
3. Run nearest verification (test/lint/manual check)
4. Commit or checkpoint with a short note
5. Update queue and pick next task

## Progress Logging

Keep a lightweight activity log while coding:

```md
[10:05] Start: add API timeout handling in client
[10:18] Done: timeout + retry added, tests passing
[10:20] Next: map timeout error to user-friendly message
[10:27] Blocked: flaky test in ci-only path, parked for later
```

This helps resume quickly after interruptions.

## Blocker Handling

When blocked for more than 20 minutes:

1. Write the blocker in one sentence
2. Capture evidence (error output, failing test, repro steps)
3. Try one constrained fallback path
4. If still blocked, defer and move to next queued task

Blocker note template:

```md
Blocker: <what is failing>
Tried: <what you attempted>
Evidence: <error/test output summary>
Next attempt: <single next experiment>
```

## Definition of Done Checklist

Before marking a task complete:

- [ ] Behavior works for main flow
- [ ] Obvious edge case handled
- [ ] No debug code/log noise left behind
- [ ] Tests or validation steps run
- [ ] Commit message explains what changed and why

## Anti-Patterns to Avoid

- Starting multiple features before finishing one
- Refactoring unrelated code during a bug fix
- Skipping validation because "it should work"
- Letting TODOs replace real backlog tasks
- Making large commits with mixed concerns

## Example Vibe-Coding Flow

```md
Goal: improve checkout reliability for slow networks

Active:
- Add request timeout + retry for checkout API

Queue:
1. Show clear retry message in UI
2. Add integration test for timeout path
3. Update release notes

Parking Lot:
- Consider circuit breaker for payment provider
```

