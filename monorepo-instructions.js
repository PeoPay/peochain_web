/**
 * PeoChain Monorepo Migration
 * 
 * This file contains information about the monorepo migration and
 * instructions for running the project with the new structure.
 * 
 * Directory Structure:
 * 
 * ├── apps
 * │   ├── client (React frontend)
 * │   ├── server (Express backend)
 * ├── packages
 * │   ├── types (Shared types and schemas)
 * │   ├── utils (Shared utility functions)
 * 
 * Old Files Removed:
 * - client/
 * - server/
 * - shared/
 * 
 * To run the project, use one of these methods:
 * 
 * Method 1: Using the provided script
 * $ ./run-monorepo.sh
 * 
 * Method 2: Manual start (if the script doesn't work)
 * $ cd apps/server && npm run dev & cd apps/client && npm run dev
 * 
 * To build the project for production:
 * $ cd apps/server && npm run build & cd apps/client && npm run build
 * 
 * To push schema changes to the database:
 * $ cd apps/server && npm run db:push
 * 
 * Migration Tasks Completed:
 * - Created workspace configuration (pnpm-workspace.yaml)
 * - Set up directory structure (apps/client, apps/server, packages/types, packages/utils)
 * - Migrated database schema code to packages/types
 * - Migrated server routes and API implementation to apps/server
 * - Created TypeScript configurations for each package
 * - Set up package.json files for all workspaces
 */

console.log("PeoChain Monorepo Migration");
console.log("---------------------------");
console.log("The project has been migrated to a monorepo structure.");
console.log("To run the application, use: ./run-monorepo.sh");
console.log("For more details, see the comments in this file.");