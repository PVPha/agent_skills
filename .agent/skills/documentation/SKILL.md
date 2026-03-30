---
name: documentation
description: Produce developer documentation including comments, READMEs, API docs, and decision records. Use when documenting code, features, setup, operations, or design decisions.
---

# Documentation Skill

## Overview

Good documentation helps others (and future you) understand, use, and maintain code. Write documentation that answers questions before they're asked.

## Documentation Types

### Code Comments

Explain **why**, not **what** (the code shows what).

```javascript
// ❌ Bad: Explains what (obvious from code)
// Increment counter by 1
counter++;

// ❌ Bad: Outdated comment (worse than no comment)
// Calculate tax at 5%
const tax = subtotal * 0.07; // Rate changed but comment wasn't

// ✅ Good: Explains why
// Use requestAnimationFrame to batch DOM updates and prevent layout thrashing
requestAnimationFrame(() => updateDOM(changes));

// ✅ Good: Explains business logic
// Orders over $100 qualify for free shipping per marketing policy Q1-2024
if (orderTotal > 100) {
  shippingCost = 0;
}

// ✅ Good: Warns about non-obvious behavior
// IMPORTANT: This must run before initAuth() or tokens will be invalid
initSession();
```

### Function/Method Documentation

```javascript
/**
 * Calculates the total price including discounts and tax.
 *
 * @param {CartItem[]} items - Array of items in the cart
 * @param {string} [couponCode] - Optional promotional coupon code
 * @param {string} taxRegion - Region code for tax calculation (e.g., 'US-CA')
 * @returns {PriceBreakdown} Object containing subtotal, discount, tax, and total
 * @throws {InvalidCouponError} When coupon code is invalid or expired
 * @throws {InvalidRegionError} When tax region is not supported
 *
 * @example
 * const price = calculateTotal(
 *   [{ id: '123', quantity: 2, unitPrice: 19.99 }],
 *   'SAVE20',
 *   'US-CA'
 * );
 * // Returns: { subtotal: 39.98, discount: 7.99, tax: 2.56, total: 34.55 }
 */
function calculateTotal(items, couponCode, taxRegion) {
  // implementation
}
```

### Python Docstrings

```python
def calculate_total(items: list[CartItem], coupon_code: str | None = None, tax_region: str) -> PriceBreakdown:
    """
    Calculate the total price including discounts and tax.

    Args:
        items: Array of items in the cart
        coupon_code: Optional promotional coupon code
        tax_region: Region code for tax calculation (e.g., 'US-CA')

    Returns:
        PriceBreakdown containing subtotal, discount, tax, and total

    Raises:
        InvalidCouponError: When coupon code is invalid or expired
        InvalidRegionError: When tax region is not supported

    Example:
        >>> price = calculate_total(
        ...     [CartItem(id='123', quantity=2, unit_price=19.99)],
        ...     'SAVE20',
        ...     'US-CA'
        ... )
        >>> price.total
        34.55
    """
```

## README Structure

### Project README Template

````markdown
# Project Name

Brief description of what this project does and why it exists.

## Features

- Feature 1: Brief description
- Feature 2: Brief description
- Feature 3: Brief description

## Quick Start

### Prerequisites

- Node.js >= 18
- PostgreSQL >= 14

### Installation

```bash
git clone https://github.com/org/project
cd project
npm install
cp .env.example .env
npm run db:migrate
```
````

### Running

```bash
# Development
npm run dev

# Production
npm run build && npm start
```

## Configuration

| Variable       | Description                  | Default |
| -------------- | ---------------------------- | ------- |
| `PORT`         | Server port                  | `3000`  |
| `DATABASE_URL` | PostgreSQL connection string | -       |
| `JWT_SECRET`   | Secret for JWT signing       | -       |

## Usage

### Basic Example

```javascript
import { Client } from "project-name";

const client = new Client({ apiKey: "your-key" });
const result = await client.doSomething();
```

### API Reference

See [API Documentation](./docs/api.md)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

MIT - see [LICENSE](./LICENSE)

````

## API Documentation

### Endpoint Documentation Template
```markdown
## Create User

Creates a new user account.

### Request

`POST /api/users`

#### Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes | Bearer token |
| `Content-Type` | Yes | `application/json` |

#### Body

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "role": "member"
}
````

| Field   | Type   | Required | Description                                   |
| ------- | ------ | -------- | --------------------------------------------- |
| `email` | string | Yes      | Valid email address                           |
| `name`  | string | Yes      | 2-100 characters                              |
| `role`  | string | No       | `admin`, `member`, `guest`. Default: `member` |

### Response

#### Success (201 Created)

```json
{
  "id": "usr_abc123",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "member",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Errors

| Code  | Description              |
| ----- | ------------------------ |
| `400` | Invalid request body     |
| `401` | Missing or invalid token |
| `409` | Email already exists     |

### Example

```bash
curl -X POST https://api.example.com/users \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "name": "John Doe"}'
```

````

## Architecture Documentation

### Architecture Decision Records (ADRs)
```markdown
# ADR-001: Use PostgreSQL for Primary Database

## Status
Accepted

## Context
We need to choose a primary database for the application.
Requirements include:
- ACID compliance for financial transactions
- Complex query support
- Scalability to 10M+ records
- Team expertise

## Decision
We will use PostgreSQL as our primary database.

## Consequences

### Positive
- Strong ACID compliance
- Excellent query performance with proper indexing
- Rich ecosystem and tooling
- Team has existing expertise

### Negative
- More complex horizontal scaling vs NoSQL
- Requires schema migrations for changes

### Neutral
- Need to manage connection pooling

## Alternatives Considered
- MySQL: Less feature-rich for our use case
- MongoDB: ACID limitations for transactions
````

## Code Documentation Best Practices

### What to Document

- **Public APIs**: All parameters, return values, exceptions
- **Complex algorithms**: Step-by-step explanation
- **Business rules**: Why this logic exists
- **Workarounds**: Link to issue, explain why needed
- **Configuration**: What each option does

### What NOT to Document

- Obvious code (`i++` doesn't need "increment i")
- Implementation details that change frequently
- Anything the code already clearly shows

### Keep Documentation Updated

```javascript
// ✅ Good: Link to where business logic is defined
// Free shipping threshold defined in config/pricing.js
if (orderTotal > PRICING.FREE_SHIPPING_THRESHOLD) {

// ✅ Good: TODO with context
// TODO(#234): Remove this workaround after API v2 migration
```

## Inline Documentation Patterns

### Complex Logic

```javascript
function calculateShippingDate(order) {
  // Shipping timeline:
  // 1. Standard orders: 5-7 business days
  // 2. Express: 2-3 business days
  // 3. Same-day: If ordered before 2pm local time
  //
  // We add 1 day buffer for payment processing
  // and exclude weekends/holidays from all calculations
}
```

### Non-Obvious Behavior

```javascript
// The API returns dates in UTC but without timezone indicator.
// We explicitly treat them as UTC here, not local time.
const eventDate = new Date(response.date + "Z");
```

### Type Documentation (TypeScript/JSDoc)

```typescript
interface OrderOptions {
  /** Customer ID from auth service */
  customerId: string;

  /** Items to order. Must have at least one item. */
  items: OrderItem[];

  /**
   * Shipping priority level.
   * @default 'standard'
   */
  priority?: "standard" | "express" | "same-day";

  /**
   * Apply coupon code to order.
   * Validated against promotion service.
   */
  couponCode?: string;
}
```

## Documentation Maintenance

### Keep It Close to Code

- Prefer inline comments and JSDoc over external docs
- README in each directory for module-specific info
- API docs auto-generated from code when possible

### Review Documentation

Include documentation in code reviews:

- Is new code documented appropriately?
- Are existing docs still accurate after changes?
- Is the README up to date?

### Documentation Debt

```javascript
// FIXME: This documentation is outdated, see #456
// TODO: Add examples for edge cases
```
