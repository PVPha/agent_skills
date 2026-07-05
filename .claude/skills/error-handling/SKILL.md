---
name: error-handling
description: Design robust error handling with clear user feedback, actionable logs, and safe recovery paths. Use when implementing exceptions, retries, validation, or failure handling.
---

# Error Handling Skill

## Overview

Robust error handling makes applications reliable and debuggable. Handle errors gracefully, provide useful feedback, and log context for debugging.

## Error Handling Principles

### Fail Fast

Detect and report errors as early as possible.

```javascript
// ✅ Validate early
function processOrder(order) {
  if (!order) throw new ValidationError("Order is required");
  if (!order.items?.length) throw new ValidationError("Order must have items");
  if (!order.customerId) throw new ValidationError("Customer ID is required");

  // Safe to proceed
  return doProcessing(order);
}
```

### Fail Gracefully

When errors occur, handle them without crashing.

```javascript
// ✅ Graceful degradation
async function loadUserProfile(userId) {
  try {
    return await userService.getProfile(userId);
  } catch (error) {
    logger.warn("Failed to load profile, using cached data", { userId, error });
    return getCachedProfile(userId) ?? getDefaultProfile();
  }
}
```

### Be Specific

Use specific error types and messages.

```javascript
// ❌ Bad: Generic errors
throw new Error("Error");
throw new Error("Invalid");

// ✅ Good: Specific errors
throw new ValidationError("Email format is invalid: must contain @");
throw new NotFoundError(`User with ID ${userId} not found`);
throw new AuthenticationError("Token has expired");
```

## Error Types and Classes

### Creating Custom Errors

```javascript
// Base application error
class AppError extends Error {
  constructor(message, code, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific error types
class ValidationError extends AppError {
  constructor(message, field = null) {
    super(message, "VALIDATION_ERROR", 400);
    this.field = field;
  }
}

class NotFoundError extends AppError {
  constructor(resource, identifier) {
    super(`${resource} not found: ${identifier}`, "NOT_FOUND", 404);
    this.resource = resource;
    this.identifier = identifier;
  }
}

class AuthenticationError extends AppError {
  constructor(message = "Authentication required") {
    super(message, "AUTHENTICATION_ERROR", 401);
  }
}

class AuthorizationError extends AppError {
  constructor(message = "Permission denied") {
    super(message, "AUTHORIZATION_ERROR", 403);
  }
}

class ConflictError extends AppError {
  constructor(message) {
    super(message, "CONFLICT", 409);
  }
}
```

### Python Custom Exceptions

```python
class AppError(Exception):
    """Base application exception"""
    def __init__(self, message: str, code: str, status_code: int = 500):
        super().__init__(message)
        self.message = message
        self.code = code
        self.status_code = status_code

class ValidationError(AppError):
    def __init__(self, message: str, field: str | None = None):
        super().__init__(message, 'VALIDATION_ERROR', 400)
        self.field = field

class NotFoundError(AppError):
    def __init__(self, resource: str, identifier: str):
        message = f"{resource} not found: {identifier}"
        super().__init__(message, 'NOT_FOUND', 404)
        self.resource = resource
        self.identifier = identifier
```

## Try-Catch Patterns

### Basic Pattern

```javascript
try {
  const result = riskyOperation();
  return processResult(result);
} catch (error) {
  // Handle or rethrow
  if (error instanceof ValidationError) {
    return { success: false, message: error.message };
  }
  throw error; // Rethrow unexpected errors
} finally {
  // Cleanup (always runs)
  closeConnection();
}
```

### Async Error Handling

```javascript
// Async/await
async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new ApiError(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new NetworkError("Network request failed");
    }
    throw error;
  }
}

// Promise chains (when needed)
fetch(url)
  .then((response) => response.json())
  .then((data) => processData(data))
  .catch((error) => handleError(error));
```

### Don't Swallow Errors

```javascript
// ❌ Bad: Silent failure
try {
  doSomething();
} catch (error) {
  // Swallowed - no logging, no handling
}

// ❌ Bad: Log but don't handle
try {
  doSomething();
} catch (error) {
  console.log(error); // What happens next?
}

// ✅ Good: Handle appropriately
try {
  doSomething();
} catch (error) {
  logger.error("Failed to do something", { error });
  throw new ProcessingError("Unable to complete operation");
}
```

## Error Context and Logging

### Include Useful Context

```javascript
// ❌ Bad: No context
logger.error("Failed");
logger.error(error.message);

// ✅ Good: Rich context
logger.error("Failed to process payment", {
  orderId: order.id,
  customerId: order.customerId,
  amount: order.total,
  paymentMethod: order.paymentMethod,
  error: {
    message: error.message,
    code: error.code,
    stack: error.stack,
  },
});
```

### Structured Logging

```javascript
// Create contextual logger
const logger = createLogger({
  service: "payment-service",
  version: process.env.APP_VERSION,
});

// Add request context
app.use((req, res, next) => {
  req.logger = logger.child({
    requestId: req.id,
    userId: req.user?.id,
    path: req.path,
  });
  next();
});

// Use in handlers
async function handlePayment(req, res) {
  req.logger.info("Processing payment", { orderId: req.body.orderId });

  try {
    const result = await processPayment(req.body);
    req.logger.info("Payment successful", { transactionId: result.id });
    res.json(result);
  } catch (error) {
    req.logger.error("Payment failed", { error });
    throw error;
  }
}
```

## API Error Responses

### Consistent Error Format

```javascript
// Error response structure
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ],
    "requestId": "req_abc123"
  }
}

// Express error handler
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const response = {
    error: {
      code: error.code || 'INTERNAL_ERROR',
      message: error.message || 'An unexpected error occurred',
      requestId: req.id
    }
  };

  // Include validation details
  if (error instanceof ValidationError && error.details) {
    response.error.details = error.details;
  }

  // Log server errors
  if (statusCode >= 500) {
    req.logger.error('Server error', { error, statusCode });
  }

  // Don't leak internal details in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    response.error.message = 'An unexpected error occurred';
  }

  res.status(statusCode).json(response);
});
```

## Error Recovery Patterns

### Retry with Backoff

```javascript
async function fetchWithRetry(url, options = {}) {
  const { maxRetries = 3, baseDelay = 1000 } = options;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetch(url);
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          `Failed after ${maxRetries} attempts: ${error.message}`,
        );
      }

      const delay = baseDelay * Math.pow(2, attempt - 1); // Exponential backoff
      logger.warn(`Attempt ${attempt} failed, retrying in ${delay}ms`, {
        error,
      });
      await sleep(delay);
    }
  }
}
```

### Circuit Breaker

```javascript
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 60000;
    this.failures = 0;
    this.state = "CLOSED";
    this.nextAttempt = null;
  }

  async execute(fn) {
    if (this.state === "OPEN") {
      if (Date.now() < this.nextAttempt) {
        throw new CircuitBreakerOpenError("Circuit breaker is open");
      }
      this.state = "HALF_OPEN";
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failures = 0;
    this.state = "CLOSED";
  }

  onFailure() {
    this.failures++;
    if (this.failures >= this.failureThreshold) {
      this.state = "OPEN";
      this.nextAttempt = Date.now() + this.resetTimeout;
    }
  }
}
```

### Fallback Values

```javascript
async function getUserPreferences(userId) {
  try {
    return await preferencesService.get(userId);
  } catch (error) {
    logger.warn("Failed to load preferences, using defaults", {
      userId,
      error,
    });
    return DEFAULT_PREFERENCES;
  }
}
```

## Input Validation

### Validate Early

```javascript
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.number().min(0).max(150).optional(),
});

function createUser(input) {
  const result = createUserSchema.safeParse(input);

  if (!result.success) {
    throw new ValidationError("Invalid user data", result.error.issues);
  }

  return userRepository.create(result.data);
}
```

### Sanitize Input

```javascript
// Prevent injection
const sanitizedQuery = escapeHtml(userInput);
const sanitizedSql = db.escape(userInput);

// Use parameterized queries
await db.query("SELECT * FROM users WHERE id = $1", [userId]);
```

## Async Error Boundaries

### React Error Boundaries

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logger.error("React error boundary caught error", {
      error,
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### Global Unhandled Rejection Handler

```javascript
// Node.js
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Promise rejection", { reason });
  // Optionally exit process for severe errors
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught exception", { error });
  process.exit(1); // Exit after logging
});
```

## Testing Error Handling

```javascript
describe("UserService", () => {
  it("should throw NotFoundError for non-existent user", async () => {
    await expect(userService.getById("invalid")).rejects.toThrow(NotFoundError);
  });

  it("should include user ID in NotFoundError", async () => {
    try {
      await userService.getById("invalid");
      fail("Expected error");
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.identifier).toBe("invalid");
    }
  });

  it("should retry on temporary failure", async () => {
    mockApi
      .mockRejectedValueOnce(new Error("Timeout"))
      .mockResolvedValueOnce({ data: "success" });

    const result = await serviceWithRetry.fetch();

    expect(result.data).toBe("success");
    expect(mockApi).toHaveBeenCalledTimes(2);
  });
});
```
