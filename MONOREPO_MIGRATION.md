# PeoChain Monorepo Migration

## Overview
The codebase has been migrated from a traditional structure (client, server, shared) to a monorepo structure using workspaces. This document outlines the changes made and how to run the project with the new structure.

## Directory Structure
```
├── apps
│   ├── client (React frontend)
│   ├── server (Express backend)
├── packages
│   ├── types (Shared types and schemas)
│   ├── utils (Shared utility functions)
```

## Old Files Removed
The following directories have been removed as their content has been migrated to the new monorepo structure:
- `client/`
- `server/`
- `shared/`

## Running the Project
The project has been configured to use workspace-aware package management, however, due to limitations in the current environment, you'll need to run the following command to start the development servers:

```bash
# Method 1: Using the provided script
./run-monorepo.sh

# Method 2: Manual start (if the script doesn't work)
cd apps/server && npm run dev & cd apps/client && npm run dev
```

## Build Process
To build the project for production:

```bash
cd apps/server && npm run build & cd apps/client && npm run build
```

## Database Operations
To push schema changes to the database:

```bash
cd apps/server && npm run db:push
```

## Recommendations
1. If possible, install `pnpm` globally to take full advantage of the workspace functionality:
   ```bash
   npm install -g pnpm
   ```

2. Once installed, you can run commands with workspace filtering:
   ```bash
   pnpm --filter @peochain/server dev
   pnpm --filter @peochain/client dev
   ```

## Migration Tasks Completed
- ✅ Created workspace configuration (pnpm-workspace.yaml)
- ✅ Set up directory structure (apps/client, apps/server, packages/types, packages/utils)
- ✅ Migrated database schema code to packages/types
- ✅ Migrated server routes and API implementation to apps/server
- ✅ Created TypeScript configurations for each package
- ✅ Set up package.json files for all workspaces