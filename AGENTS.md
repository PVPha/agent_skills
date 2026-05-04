## Mandatory Skill Gate (blocking)

Before any analysis, plan, tool call, or code edit, the agent must:

1. Read skills only from `.agent/skills/` (no skill discovery scan).
2. Select matching skill(s) from the user request using the table below.
3. Open each selected `SKILL.md`.
4. Announce: `Using skill(s): <names> | source=.agent/skills/`

If step 1-4 is not completed, the agent must stop and do it first.
If no skill matches, announce: `Using skill(s): none | source=.agent/skills/`

## Output Contract (first line required)

`SKILL_GATE: PASS | skills=<...>`

If this line is missing, treat the run as invalid and retry.

## New Project Planning Gate (blocking)

When the user asks to build a new project, provides a new project description, or approves an implementation plan by saying "proceed" or equivalent:

1. Load `mvp-planning`, `workflow-orchestration`, `task-management`, and `rememberDoc` before implementation skills.
2. Treat `docs/mvp-plan.md` and `tasks/todo.md` as the durable planning source of truth.
3. Before asking for or accepting implementation approval, write the filled project spec, MVP scope, stories, tasks, dependencies, and sprint plan into `docs/mvp-plan.md`.
4. Before asking for or accepting implementation approval, write the session goal, active first implementation task, queue, done criteria, and story-to-task mapping into `tasks/todo.md`.
5. If an `implementation_plan.md` or chat-only implementation plan is created, treat it as a review artifact only. It must not replace `docs/mvp-plan.md` or `tasks/todo.md`.
6. On "proceed", first verify that `docs/mvp-plan.md` and `tasks/todo.md` contain project-specific, non-placeholder content for the approved project. If either file is empty, stale, generic, or missing the approved scope, stop and update those files before creating or editing the codebase.
7. Only after the durable planning files are current may the agent switch from planning to implementation.

## Commit Gate Contract (required after every task closure)

After every task closure (commit + amend), output this line before proceeding:

`COMMIT_GATE: PASS | hash=<amended sha> | task=<task title> | rememberDoc=<path>`

- Hash must be the real SHA from `git commit --amend` output — no placeholders
- RememberDoc path must point to the file written before the commit
- The amend flow: `git add -A && git commit` → write hash into rememberDoc `## Commit` → `git add <rememberDoc> && git commit --amend --no-edit`
- If commit was skipped: `COMMIT_GATE: SKIP | reason=<why>` (only valid when `git status` is clean)
- If commit cannot run: `COMMIT_GATE: FAIL | reason=<why>` — do not advance to the next task
- A response naming the next task while missing `COMMIT_GATE: PASS` is an invalid transition

---

## Skill Selection Guide

Use this table to select skills from the user request. When multiple rows match, load all relevant skills.

| Trigger / Request Type                                      | Load These Skills                                                      |
| ----------------------------------------------------------- | ---------------------------------------------------------------------- |
| New feature, product, or project scoping                    | `mvp-planning`                                                         |
| Multi-step work with dependencies or stages                 | `workflow-orchestration`, `task-management`, `rememberDoc`             |
| Any code implementation or editing                          | `coding-standards`, `clean-code`                                       |
| Naming variables, functions, files, or APIs                 | `naming-conventions`                                                   |
| Handling errors, retries, or failure paths                  | `error-handling`                                                       |
| Authentication, authorization, secrets, input validation, security-sensitive commands, or terminal scripts | `security`                                                             |
| Writing or running tests                                    | `testing`                                                              |
| Reviewing a pull request or diff                            | `code-review`                                                          |
| Writing commits                                             | `commit-messages`                                                      |
| Writing docs, READMEs, comments, or ADRs                    | `documentation`                                                        |
| Finishing a task or switching to the next task              | `rememberDoc`, `task-management`                                       |
| Refactoring or improving existing code                      | `clean-code`, `coding-standards`, `code-review`                        |

### Default co-loading rules

These skill combinations must always be loaded together:

- `workflow-orchestration` → always co-load `task-management` + `rememberDoc`
- `task-management` → always co-load `rememberDoc`
- Any code change → always co-load `coding-standards` + `clean-code`
- Closing a task → always co-load `rememberDoc` + `task-management`

### Quick examples

- "Build a login feature" → `mvp-planning`, `workflow-orchestration`, `task-management`, `rememberDoc`, `coding-standards`, `clean-code`, `security`
- "Run this setup script" → inspect the script and load `security` before execution
- "Refactor the payment module" → `clean-code`, `coding-standards`, `code-review`, `task-management`, `rememberDoc`
- "Review this PR" → `code-review`
- "Write a commit message" → `commit-messages`
- "Fix this bug" → `clean-code`, `error-handling`, `task-management`, `rememberDoc`

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
