## 🛡️ Error Handling & Response Flow

This project uses a unified, structured **response and error handling system** across the **entire stack** — from server-only functions to server actions and client components.

### ✅ Overview

All logic returns a consistent `ResponseObj`:

```ts
type ResponseObj = {
  message?: string;
  softError?: boolean;
  redirect?: boolean;
  isError?: boolean;
};
```

---

### 🧠 Server Logic (`response()` Utility)

All server functions use the `response()` utility to standardize error and success messages:

```ts
response(message: string, action?: ResponseType, isError?: boolean, isServerAction = false)
```

- **Throws** custom `AppError` if `isServerAction` is `false`
- **Returns** structured response if `isServerAction` is `true` (for server actions)

Example:

```ts
return response("Something went wrong", ResponseType.redirect, true, true);
```

---

### 📦 Server Actions / RSCs

Server actions **never throw** errors. Instead, they return a structured object like:

```ts
{ message: "Missing user", redirect: true }
```

These are passed to `redirectOnError()` on the server side:

```ts
await redirectOnError(result);
```

Which:

- Logs the error
- Triggers a server-side redirect (via `next/navigation`)

---

### 🌐 Client-side Hooks

Hooks or components using actions handle errors via:

```ts
const redirectClientError = useRedirectOnError();
```

This uses `router.replace()` to redirect and logs the message to the server:

```ts
redirectClientError({ message, redirect: true });
```

---

### 🧪 Soft Errors (Validation or UI Notices)

If the server returns `{ softError: true }`, it's handled in the UI without redirecting:

```ts
if (response.softError) {
  setFormError(response.message);
}
```

---

### ✅ Benefits

- No unhandled `throw`s in server actions (avoids Next.js `digest` errors)
- One format for client/server responses
- Centralized logging + redirect logic
- Easily testable and extensible

