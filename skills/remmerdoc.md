# Remmerdoc Skill

## Overview

Write a short "remmerdoc" immediately after finishing a task so future work is easier to resume, review, and hand off.

## Purpose

Capture what was done, why it was done, and what still needs attention while context is fresh.

## When to Write

- Right after code/testing is complete
- Before switching to a new task
- Before ending a coding session

## Remmerdoc Template

Use this template for every finished task:

```md
# Remmerdoc: <task title>

## Summary
<1-3 sentences of what changed>

## Why
<problem or goal this task addressed>

## Files Changed
- <path>: <what changed>
- <path>: <what changed>

## Verification
- Tests: <what was run + result>
- Manual checks: <what was verified>

## Decisions
- <important decision + reason>

## Follow-ups
- [ ] <next task>
- [ ] <known improvement>

## Risks / Notes
- <edge case, limitation, or warning>
```

## Writing Rules

- Keep it short and specific
- Prefer bullet points over long paragraphs
- Record facts, not guesses
- Include exact file paths when possible
- List unresolved items explicitly

## Quality Checklist

Before marking remmerdoc complete:

- [ ] Clear summary of delivered outcome
- [ ] Verification result included
- [ ] Follow-up items captured
- [ ] Risks or limitations documented

## Example

```md
# Remmerdoc: Add retry for checkout timeout

## Summary
Added API timeout and retry behavior for checkout requests.
Mapped timeout failures to a user-friendly error state.

## Why
Checkout failed silently on slow networks and users retried manually.

## Files Changed
- src/api/checkout.ts: added timeout + retry wrapper
- src/ui/CheckoutError.tsx: added timeout error message
- tests/checkout.timeout.test.ts: added retry-path coverage

## Verification
- Tests: checkout timeout tests passing
- Manual checks: simulated slow network, retry flow works

## Decisions
- Retry count fixed at 2 to avoid duplicate charge risk.

## Follow-ups
- [ ] Make retry count configurable
- [ ] Add telemetry for timeout frequency

## Risks / Notes
- Very slow networks may still fail after retries.
```

