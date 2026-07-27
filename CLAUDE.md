# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

TPS-FE ("elstar") is a React 19 + TypeScript admin portal built on the Elstar admin template. It serves two user roles from one app: **entrepreneur** (vehicle/permit/route-estimation requests) and **staff** (approval, tracking, user management). Role-based access is enforced via route `authority` (`USER` vs `ADMIN`).

## Commands

```bash
npm run start          # vite dev server
npm run start:host      # vite dev server, exposed on network
npm run build            # production build -> ./build
npm run preview           # preview production build

npm run lint              # eslint src (.ts/.tsx)
npm run lint:fix
npm run prettier          # check formatting under src
npm run prettier:fix
npm run format             # prettier:fix then lint:fix

npm run test               # vitest run (writes JSON/HTML reports to ./claude-capture)
npm run test:watch          # vitest watch mode
npm run test:coverage        # vitest run with v8 coverage (./claude-capture/coverage)

./run_tsc.bat              # standalone `tsc --noEmit` type check (Windows batch script)
```

Run a single test file: `npx vitest run src/test/utils/shadeColor.test.ts`
Run tests matching a name: `npx vitest run -t "setDirection"`

There is no `typecheck` npm script — use `run_tsc.bat` (or `npx tsc --noEmit` directly) to type-check.

Test output (JSON/HTML/coverage) is written to `./claude-capture/`, which is gitignored/untracked — treat it as disposable build output, not source.

## Architecture

### views/ vs features/ split

This is the most important structural convention in the codebase. Each screen is split across two parallel trees:

- **`src/views/<role>/<module>/...`** — the routed entry point (what `routes.config.ts` lazy-imports). Thin wrapper: sets up `ConfigProvider`/theme, dispatches initial data-loading thunks (e.g. master data lookups), then renders the real screen from `features/`.
- **`src/features/<role>/<module>/screen/`** and **`.../components/`** — the actual screen implementation and its child components.

When asked to modify a "page", check both `views/.../index.tsx` (wiring/initial dispatches) and `features/.../screen/index.tsx` (actual UI/logic) — the feature is usually where the real work happens.

### Routing

- `src/configs/routes.config/routes.config.ts` is the single source of truth for all routes: `publicRoutes` (auth pages) and `protectedRoutes` (everything else), each entry `{ key, path, component: lazy(...), authority: ['USER'|'ADMIN'], meta? }`.
- `src/components/route/ProtectedRoute.tsx` gates on authentication (`useAuth`), redirecting to `unAuthenticatedEntryPath` (from `configs/app.config.ts`) when not logged in.
- `src/components/route/AuthorityGuard.tsx` gates on role (`useAuthority`), redirecting to `/access-denied` on mismatch.
- `src/components/route/AppRoute.tsx` wraps each routed component to sync the active layout type into the theme store per-route.
- Routes currently mix `authority: ['USER']` (entrepreneur) and `['ADMIN']` (staff) — some entrepreneur routes are temporarily reachable under `USER` pending a separate staff-login rollout (see comments in `routes.config.ts`).

### State management

- Redux Toolkit store (`src/store/`), persisted via `redux-persist` (localStorage), but **only `auth` and `locale` slices are whitelisted for persistence** (`storeSetup.ts`) — don't assume other slices survive a refresh.
- `rootReducer.ts` combines slices per domain: `auth`, `base`, `locale`, `theme`, `master`, `entrepreneur`, `layout`, `staff`, `routeDirection`, `tracking`, plus the RTK Query reducer.
- Slices are organized by domain under `src/store/slices/<domain>/`, each with an `index.ts` barrel export and often a `constants.ts`.
- Two parallel API patterns exist:
  - **Axios + thunks** (`src/services/ApiService.ts` → `BaseService.ts` axios instance) — most domain services (`services/entrepreneur/*`, `services/staff/*`, `services/master/*`) and slices use this, wiring results through `createAsyncThunk`.
  - **RTK Query** (`src/services/RtkQueryService.ts`) — an axios-based `baseQuery` wrapping the same `BaseService` instance; `rootReducer` mounts it at `RtkQueryService.reducerPath`. New endpoints should inject into this API rather than adding another axios thunk if RTK Query's caching is useful.
- `BaseService.ts` (axios instance) attaches the auth token from persisted storage (falling back to live store state) and an optional `VITE_API_KEY` header, and force-signs-out on any `401` response — auth failures anywhere in the app funnel through this interceptor.

### Path alias

`@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.json`) — always use `@/...` imports, not relative paths across feature/view boundaries.

### Mock API

`src/mock/` uses MirageJS (`mock/mock.ts`, `mock/fakeApi/`) and is only started when `appConfig.enableMock` is `true` (`configs/app.config.ts`) and `NODE_ENV !== 'production'` (wired in `src/App.tsx`). It's currently disabled by default — real requests go through the `/api/v1` proxy defined in `vite.config.ts` (proxied to `REACT_APP_API_HOST_BACKEND`).

### Layouts and theming

Multiple selectable layouts live in `src/components/layouts/` (Classic, Modern, Decked, StackedSide, Simple, Blank) and are switched via the `theme` slice's `layout.type`; `components/template/` holds the shared chrome (Header, SideNav, ThemeConfigurator, etc.) reused across layouts. Styling is Tailwind CSS v4 (`tailwind.config.cjs`, dark mode via `class`) layered with Ant Design components (`antd`, patched for React 19 via `@ant-design/v5-patch-for-react-19`) and DaisyUI.

### i18n

`src/locales/` with `i18next`/`react-i18next`; default locale is `th` (Thai) per `configs/app.config.ts`. UI font defaults to "Noto Sans Thai".

## Testing

- Vitest + `@testing-library/react`, jsdom environment, setup file `src/test/setup.ts` (imports `@testing-library/jest-dom`).
- Existing tests live under `src/test/` (not colocated with source), split into `test/store/` (slice reducer tests) and `test/utils/` (pure utility tests) — follow this location convention for new tests rather than colocating `*.test.ts` next to source files.
- Coverage is scoped to `src/utils/**`, `src/store/slices/**`, `src/lib/**` (see `vitest.config.ts`) — other directories are excluded from coverage reporting by design.
- Slice tests mock `@/configs/theme.config` and `@/constants/theme.constant` rather than importing real config, to isolate reducer logic (see `test/store/themeSlice.test.ts` for the pattern).

## Git workflow (from README)

- `main` — merge target only, don't work directly on it.
- `develop` — primary working branch.
- `features/...` — feature/module branches, merged into `develop`.
- `hotfixes/...` — targeted fixes for a specific feature/module.
- Commit prefixes: `feat:` (new files/functionality), `fix:` (fixes), `build:` (new/updated dependencies).
