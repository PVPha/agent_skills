---
name: task-management
description: Manage coding work in short, outcome-driven loops with clear done criteria, verification, rememberDoc notes, and commit checkpoints. Use when executing development tasks, finishing a task, or switching to the next task.
---

# Task Management Skill

## Overview

Manage coding tasks in short, high-momentum loops without losing direction. This skill owns the full task lifecycle: registration, execution, closure (self-review → verify → rememberDoc → commit), and queue advancement. It is the single source of truth for the task closure sequence and rememberDoc rules.

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
- [ ] RememberDoc created and path recorded

## Queue
1. <next task>
2. <next task>

## Parking Lot
- <idea not for now>
```

## Register New Task

When a new task appears during a session, register it immediately in the session board:

1. If no active task exists, put it in `Active Task`
2. If another task is active, append it to `Queue`
3. If it is useful but not actionable now, add it to `Parking Lot`

For each newly registered task, capture a one-line definition:

```md
Task: <short task title>
Outcome: <what changes>
Constraints: <limits>
Verification: <test/manual/log check>
```

Use `Queue` as the source of truth for upcoming work. Do not create hidden TODO lists outside this board.

For a new project, initialize `tasks/todo.md` before implementation starts:

- Set `Session Goal` from the approved MVP outcome.
- Set `Active Task` to the first dependency-ready implementation task.
- Set `Done Criteria` from the project verification expectations.
- Fill `Queue` with the remaining implementation tasks in dependency order.
- Fill `Story-to-Task Mapping` from `docs/mvp-plan.md`.
- If the user says "proceed" and this board is still placeholder-only or stale, update the board before editing the codebase.

## Update Task

Update task state whenever work status changes, using short factual entries:

1. `Start`: move selected queue item into `Active Task`
2. `Progress`: log notable milestone or scope adjustment
3. `Blocked`: record blocker and either un-block or defer
4. `Done`: run the Task Closure Sequence below, then pull next from `Queue`

Status update template:

```md
[HH:MM] Task: <task title>
Status: Start | Progress | Blocked | Done
Note: <single factual line>
Next: <immediate next action>
```

Treat a user message like "move to next task", "next task", or equivalent as a transition request, not as permission to skip finish steps. Before changing `Active Task`, finish the current task closure sequence unless the user explicitly says to abandon or defer it.

## Task Closure Sequence (canonical)

This is the single canonical closure sequence. Other skills and gates reference it; do not restate it elsewhere. Use this exact order whenever a task is complete or the user asks to move on:

1. Self-review your own diff against `.agents/skills/code-review/SKILL.md` (correctness, regressions, edge cases, missing tests) and fix any issues found
2. Run the nearest verification (test/lint/manual check) and record the result — if verification fails, do not commit; fix or checkpoint separately
3. Write the rememberDoc (rules below) in `docs/rememberDocs/YYYY-MM-DD-task-slug.md`
4. Record the rememberDoc path in `tasks/todo.md`
5. Commit everything in one commit: `git add -A && git commit` — the rememberDoc and board update are part of the task commit
6. Output the `COMMIT_GATE` line (see `AGENTS.md`) with the real SHA printed by `git commit`
7. Only then select the next task

Commit rules:

- One task = one small, single-purpose commit
- Never amend the commit to write its own hash into the rememberDoc — amending changes the SHA, so the recorded hash would be stale; the hash belongs in the `COMMIT_GATE` line and git history only
- Use non-interactive git commands
- Follow `.agents/skills/commit-messages/SKILL.md` for message format:

```bash
git add -A
git commit -m "<type>(<scope>): <subject>" -m "<why this change was needed>"
```

Closure checklist (verify before the commit in step 5):

- [ ] Behavior works for main flow and obvious edge case
- [ ] No debug code/log noise left behind
- [ ] Tests or validation steps run and recorded
- [ ] RememberDoc created and its path recorded in `tasks/todo.md`
- [ ] Commit message explains what changed and why

## RememberDoc Rules

Write a short rememberDoc immediately after finishing a task — before switching tasks, ending a session, or handing off — so future work is easy to resume and review.

- Save one file per task in `docs/rememberDocs/`, named `YYYY-MM-DD-task-slug.md`
- Start from `docs/rememberDocs/_template.md`
- Keep it short, factual, and bulleted — record facts, not guesses
- In `Files Changed`, always use repository-relative paths (`src/App.tsx`); never absolute, `file://`, user-home, or device-specific paths. Absolute paths only for external dependencies outside the repo, with a note why
- List unresolved items explicitly

Template sections: Summary (1-3 sentences), Why, Files Changed, Verification, Decisions, Follow-ups, Risks / Notes.

Quality check before closing: clear summary of the delivered outcome, verification result included, follow-ups captured, risks documented.

Example:

```md
# RememberDoc: Add retry for checkout timeout

## Summary
Added API timeout and retry behavior for checkout requests.

## Why
Checkout failed silently on slow networks and users retried manually.

## Files Changed
- src/api/checkout.ts: added timeout + retry wrapper
- tests/checkout.timeout.test.ts: added retry-path coverage

## Verification
- Tests: checkout timeout tests passing
- Manual checks: simulated slow network, retry flow works

## Decisions
- Retry count fixed at 2 to avoid duplicate charge risk.

## Follow-ups
- [ ] Make retry count configurable

## Risks / Notes
- Very slow networks may still fail after retries.
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

When two tasks compete, choose the one with lower risk, faster validation, and higher user impact.

## Execution Loop

Repeat per task:

1. Clarify task and done criteria in 1-3 lines
2. Implement smallest useful change
3. Run the Task Closure Sequence
4. Update queue and pick next task

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
