## Mandatory Skill Gate

Applies to task-shaped requests: implementing or editing code, planning, refactoring, reviewing, testing, committing, writing docs, or running security-sensitive commands.

1. Select matching skill(s) from the table below and open each selected `SKILL.md` from `.agents/skills/`. Claude Code may load the identical mirrored copies from `.claude/skills/`; treat them as the same source. Native skill auto-loading that opens the same files satisfies this step.
2. Announce: `Using skill(s): <names> | source=.agents/skills/`

For pure questions or requests that match no table row, announce `Using skill(s): none | source=.agents/skills/` — no files need to be opened.

## Output Contract (first line required)

`SKILL_GATE: PASS | skills=<names or none>`

## New Project Planning Gate (blocking)

When the user asks to build a new project, provides a new project description, or approves an implementation plan by saying "proceed" or equivalent:

1. Load `mvp-planning`, `workflow-orchestration`, and `task-management` before implementation skills.
2. Treat `docs/mvp-plan.md` and `tasks/todo.md` as the durable planning source of truth.
3. Before asking for or accepting implementation approval, write the filled project spec, MVP scope, stories, tasks, dependencies, and sprint plan into `docs/mvp-plan.md`.
4. Before asking for or accepting implementation approval, write the session goal, active first implementation task, queue, done criteria, and story-to-task mapping into `tasks/todo.md`.
5. If an `implementation_plan.md` or chat-only implementation plan is created, treat it as a review artifact only. It must not replace `docs/mvp-plan.md` or `tasks/todo.md`.
6. On "proceed", first verify that `docs/mvp-plan.md` and `tasks/todo.md` contain project-specific, non-placeholder content for the approved project. If either file is empty, stale, generic, or missing the approved scope, stop and update those files before creating or editing the codebase.
7. Only after the durable planning files are current may the agent switch from planning to implementation.

## Commit Gate Contract (required after every task closure)

After every task closure, output this line before proceeding:

`COMMIT_GATE: PASS | hash=<commit sha> | task=<task title> | rememberDoc=<path>`

- The canonical closure sequence lives in `task-management` → "Task Closure Sequence". In short: write the rememberDoc first, then commit once with `git add -A && git commit` so the rememberDoc is part of the task commit.
- Do not amend the commit to write its own hash into the rememberDoc — amending changes the SHA, so the recorded hash would always be stale. The hash lives in this gate line and in git history only.
- Hash must be the real SHA printed by `git commit` — no placeholders
- If commit was skipped: `COMMIT_GATE: SKIP | reason=<why>` (only valid when `git status` is clean)
- If commit cannot run: `COMMIT_GATE: FAIL | reason=<why>` — do not advance to the next task
- A response naming the next task while missing `COMMIT_GATE: PASS` is an invalid transition

---

## Skill Selection Guide

Use this table to select skills from the user request. When multiple rows match, load all relevant skills.

| Trigger / Request Type                                      | Load These Skills                                                      |
| ----------------------------------------------------------- | ---------------------------------------------------------------------- |
| New feature, product, or project scoping                    | `mvp-planning`                                                         |
| Multi-step work with dependencies or stages                 | `workflow-orchestration`, `task-management`                            |
| Any code implementation, editing, or naming                 | `coding-standards`                                                     |
| Handling errors, retries, or failure paths                  | `error-handling`                                                       |
| Authentication, authorization, secrets, input validation, security-sensitive commands, or terminal scripts | `security`                                                             |
| Writing or running tests                                    | `testing`                                                              |
| Reviewing a pull request or diff                            | `code-review`                                                          |
| Writing commits                                             | `commit-messages`                                                      |
| Writing docs, READMEs, comments, or ADRs                    | `documentation`                                                        |
| Finishing a task or switching to the next task              | `task-management`                                                      |
| Refactoring or improving existing code                      | `coding-standards`, `code-review`                                      |

### Default co-loading rules

- `workflow-orchestration` → always co-load `task-management` (it owns the task closure sequence and rememberDoc rules)
- Any code change → always load `coding-standards`

### Quick examples

- "Build a login feature" → `mvp-planning`, `workflow-orchestration`, `task-management`, `coding-standards`, `security`
- "Run this setup script" → inspect the script and load `security` before execution
- "Refactor the payment module" → `coding-standards`, `code-review`, `task-management`
- "Review this PR" → `code-review`
- "Write a commit message" → `commit-messages`
- "Fix this bug" → `error-handling`, `coding-standards`, `task-management`

---

## Environment and Tooling

Before executing any task, confirm the following project commands. If not already known, check `package.json`, `Makefile`, or project README.

| Action     | Default command (override per project)  |
| ---------- | --------------------------------------- |
| Run tests  | `pnpm test` / `pytest` / `go test ./...` |
| Lint       | `pnpm lint` / `ruff check .`             |
| Type check | `pnpm typecheck` / `mypy .`              |
| Build      | `pnpm build` / `make build`              |
| Format     | `pnpm format` / `ruff format .`          |

Verification steps in `task-management` and `workflow-orchestration` skills refer to these commands. Always run the nearest applicable check before marking a task done.
For JavaScript/TypeScript setup, install, update, and package-script commands, use `pnpm`. If project docs, scripts, or user instructions mention `npm` or `yarn`, translate them to the equivalent `pnpm` command before running. If the command cannot be translated safely, stop and report the blocker instead of running `npm` or `yarn`.
