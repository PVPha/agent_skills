---
name: security
description: Apply secure-by-default engineering practices for input validation, authz, secrets, dependencies, and hardening. Use when designing, implementing, or reviewing security-sensitive code.
---

# Security Skill

## Overview

Design, implement, and review code with secure-by-default practices that reduce exploitable risk in application and infrastructure code.

## Core Principles

### Validate All Untrusted Input

- Treat all external input as untrusted: HTTP params, headers, files, DB records, queues, and third-party APIs
- Enforce schema validation at boundaries
- Reject invalid input early with clear, non-sensitive errors

```typescript
import { z } from "zod";

const CreateUserSchema = z.object({
  email: z.string().email(),
  age: z.number().int().min(13).max(120),
});

function parseCreateUserInput(input: unknown) {
  return CreateUserSchema.parse(input);
}
```

### Enforce Least Privilege

- Grant the minimum required permissions for users, services, and tokens
- Separate read/write/admin capabilities
- Use short-lived credentials where possible

### Fail Securely

- Deny by default for authorization checks
- Avoid leaking stack traces, secrets, or internal IDs in production errors
- Prefer explicit allowlists over broad blocklists

## Authentication and Authorization

- Use proven auth providers/libraries instead of custom crypto/auth logic
- Hash passwords with adaptive algorithms (`argon2`, `bcrypt`)
- Require server-side authorization checks for every sensitive action
- Do not rely on client-side role checks

```typescript
function requireRole(user: User, allowed: Role[]) {
  if (!user || !allowed.includes(user.role)) {
    throw new ForbiddenError("Not authorized");
  }
}
```

## Secrets and Configuration

- Never hardcode secrets in source code
- Load secrets from environment variables or a secrets manager
- Rotate credentials regularly
- Redact secrets from logs, errors, and telemetry

```typescript
const apiKey = process.env.PAYMENT_API_KEY;
if (!apiKey) throw new Error("PAYMENT_API_KEY is required");
```

## Data Protection

- Encrypt data in transit (TLS) and at rest when handling sensitive data
- Minimize stored sensitive data (collect only what is required)
- Define retention and deletion policies
- Avoid logging PII unless strictly necessary

## Injection Defense

- Use parameterized queries for SQL/NoSQL
- Escape or sanitize output for the destination context (HTML, shell, templates)
- Never build shell commands with raw user input

```typescript
// Safe SQL pattern
await db.query("SELECT * FROM users WHERE id = $1", [userId]);
```

## Dependency and Supply Chain Hygiene

- Pin dependency versions when feasible
- Run dependency vulnerability scans in CI
- Update vulnerable packages with priority based on exploitability
- Remove unused dependencies

## HTTP and Browser Security

- Enable CSRF protection for cookie-based sessions
- Set secure cookie flags: `HttpOnly`, `Secure`, `SameSite`
- Apply security headers (`CSP`, `X-Content-Type-Options`, `X-Frame-Options`)
- Rate-limit authentication and high-risk endpoints

## Logging and Monitoring

- Log security-relevant events: auth failures, permission denials, token misuse
- Use structured logs for easier alerting and incident response
- Alert on anomalous activity patterns
- Keep audit trails immutable where required

## Secure Code Review Checklist

- Are all inputs validated at boundaries?
- Are authz checks present server-side for protected operations?
- Are secrets excluded from code/logs/errors?
- Are DB and command execution paths injection-safe?
- Are dependencies free of known critical vulnerabilities?
- Are failure paths non-leaky and safe by default?

## Common Anti-Patterns to Reject

- Building SQL with string concatenation
- Writing custom encryption or password hashing
- Trusting client-provided roles/permissions
- Returning verbose production errors with internals
- Committing `.env` files or private keys
