This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## DataBases

Uses Redis as a cache, start redis: `redis-server /usr/local/etc/redis.conf`

## 🧩 Function Overview

This table outlines each server-side function or route in the app, where it's triggered from, and the recommended implementation pattern based on Next.js App Router best practices.

| **Function Name** | **What It Does**                                          | **Trigger Location**      | **Recommended Implementation**           | **Reasoning**                                                                |
| ----------------- | --------------------------------------------------------- | ------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------- |
| `check-for-user`  | Checks if username exists in MongoDB                      | Client Component          | ✅ Server Action using a server function | Simple validation, better colocated with form logic                          |
| `get-plan`        | Gathers info, sends to OpenAI, returns a generated plan   | Server Component          | ✅ Server Function                       | Called during render, no client-side fetch needed                            |
| `get-redis`       | Retrieves cached UI state from Redis                      | Server Component          | ✅ Server Function                       | Internal-only lookup, no need for API overhead                               |
| `retrieve-plan`   | Authenticated lookup using username/password from MongoDB | Server Component          | ✅ Server Function                       | Private server-only logic, can use cookies or session securely               |
| `save-plan`       | Saves user info to MongoDB                                | Client Component (form)   | ✅ Server Action using a server function | Mutation triggered via form — co-locate with UI logic                        |
| `set-redis`       | Writes state to Redis from Redux middleware               | Redux Middleware (client) | ✅ Keep as API Route                     | Must be fetchable from client/Redux — server functions don’t work in browser |
