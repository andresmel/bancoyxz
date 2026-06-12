# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server on port 3000
npm test           # Run tests in watch mode (use CI=true npm test for single run)
npm run build      # Production build
```

Run a single test file:
```bash
CI=true npm test -- --testPathPattern="src/hooks/auth/useUserAuth"
```

## Architecture Overview

BancoXYZ is a Create React App + TypeScript banking app with three main features: onboarding, balance, and transfers. It uses React Context for state, a custom service layer for API calls, and custom hooks to bridge the two.

### Data flow

```
Component → custom hook → service → axios instance → API (via dev proxy)
                ↓
           Context (+ localStorage)
```

- **Services** (`src/services/`) make raw API calls and return data.
- **Hooks** (`src/hooks/`) call services, update context, and handle side effects (toast notifications, navigation).
- **Components/Pages** only call hooks — never services or context directly (except reading context state).

### State persistence

Both contexts persist to `localStorage` with the prefix `bancoxyz_`:
- `bancoxyz_user` — user object (managed by `AuthUserContext`)
- `bancoxyz_token` — JWT token (managed by the login flow, read by axios interceptor)
- `bancoxyz_balance` — account balance (managed by `ProductContext`)

### Routing

Routes are defined in `src/routes/AppRoutes.tsx`. Public routes use `PublicLayout`; authenticated routes use `PrivateLayout` and are wrapped in `ProtectedRoute` which redirects to `/login` if `isAuthenticated` is false.

Sidebar links in the private layout point to two unimplemented routes:
- `/dashboard/scheduled-transfers`
- `/dashboard/transfer-history`

### API proxy (dev only)

`src/setupProxy.js` proxies three paths to AWS API Gateway during development. No `.env` vars are needed for local development. The axios instance in `src/api/axiosConfig.ts` automatically injects `Bearer <token>` headers for all non-public routes and clears auth state on 401.

### Page structure

Each page lives in `src/pages/<PageName>/index.tsx` and organizes its sub-components under a `ui/` subfolder. Shared layout components (headers, sidebar, logo, loading spinner) live in `src/components/`.

### Models

All TypeScript interfaces are in `src/models/models.ts` — add new interfaces there rather than co-locating them.

### Styling

Tailwind CSS only — no CSS modules or component-level `.css` files. Use utility classes directly on JSX elements.

### Testing patterns

Tests use `@testing-library/react` and Jest (via CRA). Test files sit alongside the source file they test (`*.test.ts` / `*.test.tsx`). Context tests mock `localStorage`; hook tests wrap the component in the relevant Provider.
