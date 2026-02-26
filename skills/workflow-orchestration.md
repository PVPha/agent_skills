# Workflow Orchestration Skill

## Overview

Coordinate multi-step engineering work across planning, execution, verification, and handoff without losing dependency state.

## Purpose

Reduce delivery risk in complex tasks by making dependencies explicit, enforcing stage gates, and keeping progress visible.

## Scope Boundaries

- Use this skill for orchestration: sequencing, dependency control, stage transitions, and handoffs
- For detailed task execution loops, use `task-management.md`
- For code quality and elegance standards, use `clean-code.md`
- For review depth and approval standards, use `code-review.md`

## Workflow Orchestration Directives

### 1. Plan Mode Default

- Enter plan mode for any non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, stop and re-plan immediately
- Use plan mode for verification sequencing, not only implementation sequencing
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy

- Use subagents when available to keep the main context window focused
- Offload research, exploration, and isolated parallel analysis to subagents
- For complex problems, increase analysis parallelism via subagents
- Keep one task per subagent for focused execution

### 3. Self-Improvement Loop

- After any user correction, update `tasks/lessons.md` with the pattern
- Write explicit rules that prevent repeating the same mistake
- Iterate on lessons until mistake rate drops
- Review relevant lessons before planning the next non-trivial change

### 4. Verification Before Done

- Never mark a task complete without evidence it works
- Diff behavior between main and current changes when relevant
- Run tests/checks and inspect logs when relevant
- Record objective evidence in the workflow state or handoff notes

### 5. Demand Elegance (Balanced)

- For non-trivial changes, pause and ask: "Is there a simpler design with lower risk?"
- If a fix feels hacky, prefer the clean solution you can justify now
- Skip over-engineering for simple fixes
- Document the chosen tradeoff when multiple reasonable designs exist

### 6. Autonomous Bug Fixing

- When given a bug report, move directly to diagnosis and fix
- Start from logs, errors, and failing tests, then resolve root cause
- Minimize context switching required from the user
- Resolve failing CI tests proactively when scope is clear

## Orchestration Principles

### Orchestrate Outcomes, Not Activities

- Define workflow around user/system outcomes
- Keep each stage tied to a measurable done condition
- Avoid steps that do not change delivery confidence

### Keep Dependencies Explicit

- Mark hard dependencies before execution
- Track blocked, ready, and done states explicitly
- Re-plan sequence when dependency assumptions change

### Gate Progress with Evidence

- Move to next stage only when current exit criteria pass
- Require verification artifacts (tests, logs, screenshots, or metrics)
- Record deviations and compensating controls

### Prefer Short Feedback Loops

- Run workflows in small checkpoints instead of one long run
- Detect drift early and correct before downstream work piles up
- Surface blockers immediately with next action

## Standard Orchestration Workflow

1. Intake and objective alignment
2. Workflow design and dependency mapping
3. Execution by stage
4. Verification and quality gates
5. Release/handoff
6. Retrospective improvements

## Stage Definitions

### Stage 1: Intake and Objective Alignment

Capture:

- Goal (single sentence)
- Scope in/out
- Constraints (time, platform, compliance, dependencies)
- Success metric
- Required evidence for done

Output template:

```md
Goal:
In scope:
Out of scope:
Constraints:
Success metric:
Done evidence:
Owner:
Deadline:
```

### Stage 2: Workflow Design and Dependency Mapping

For each unit of work define:

- Task ID and outcome
- Inputs required
- Dependencies
- Owner
- Exit criteria
- Evidence to capture

Use this template:

```md
ID: WF-<n>
Outcome:
Inputs:
Depends on:
Owner:
Exit criteria:
Evidence:
```

Dependency rules:

- Start with dependency-free tasks first
- Parallelize only tasks with no shared write/conflict risk
- Keep one critical path list visible at all times

### Stage 3: Execution by Stage

Execution loop per work item:

1. Confirm inputs are ready
2. Execute smallest complete change
3. Run nearest validation
4. Capture evidence
5. Set status: done, blocked, or rework
6. Trigger dependents only after exit criteria pass

Status model:

- `ready`: all dependencies satisfied
- `in-progress`: active execution
- `blocked`: missing dependency or unresolved failure
- `done`: exit criteria satisfied

### Stage 4: Verification and Quality Gates

Before progressing to release/handoff:

- Validate functional behavior against acceptance criteria
- Validate non-functional checks (performance, security, reliability) when applicable
- Confirm no known blocker remains on critical path

Gate checklist:

- [ ] Acceptance criteria met
- [ ] Tests/checks executed and reviewed
- [ ] Evidence captured in workflow notes
- [ ] Rollback or mitigation path defined
- [ ] Risks documented

### Stage 5: Release and Handoff

Create a concise handoff packet:

- What changed
- Verification evidence
- Known risks
- Follow-up tasks
- Ownership after handoff

Handoff template:

```md
Release summary:
Verification:
Risks:
Follow-ups:
Owner handoff:
```

### Stage 6: Retrospective Improvements

Capture:

- What caused delay or rework
- Which gate caught (or missed) risk
- One orchestration rule to change next run

## Orchestration Templates

### Session Files

- `tasks/todo.md`: workflow state, stage gates, and review notes
- `tasks/lessons.md`: correction patterns and prevention rules

### Kanban Snapshot

```md
Ready:
- WF-1 ...

In Progress:
- WF-2 ...

Blocked:
- WF-3 ... (blocked by WF-1 output)

Done:
- WF-0 ...
```

### Critical Path Log

```md
[time] WF-1 completed, unblocked WF-2
[time] WF-2 blocked by missing API contract update
[time] WF-2 resumed after contract merge
```

### Stage Gate Record

```md
Gate: Stage 4 -> Stage 5
Date:
Decision: pass | fail
Evidence:
- test:
- logs:
- diff/demo:
Risks accepted:
Owner:
```

## Failure Handling Rules

- If blocked for more than 20 minutes, escalate with evidence and next proposed action
- If a gate fails twice, switch to root-cause mode before more execution
- If scope changes, re-baseline dependencies and success metric before continuing

## Anti-Patterns to Avoid

- Starting execution before dependency mapping
- Moving tasks to done without evidence
- Running many parallel tasks with shared ownership bottlenecks
- Hiding blockers to keep workflow "green"
- Changing scope without re-planning gates and timeline
