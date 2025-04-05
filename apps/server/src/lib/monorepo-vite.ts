/**
 * Monorepo Vite Configuration
 * 
 * This module overrides the default Vite configuration to work with
 * the monorepo structure without modifying the root vite.config.ts file.
 */

import path from "path";
import { ViteDevServer } from "vite";
import { log } from "./vite";

export async function setupMonorepoVite(server: ViteDevServer) {
  try {
    log("Applying monorepo-specific Vite configuration overrides");
    
    // Update the Vite server's config.resolve.alias to point to the new monorepo locations
    if (server.config.resolve && server.config.resolve.alias) {
      const rootDir = process.cwd();
      const monorepoRoot = path.resolve(rootDir, "../..");
      
      // Cast to any to allow for modification of the frozen object
      const aliasConfig = server.config.resolve.alias as any;
      
      // Override @ alias to point to apps/client/src
      aliasConfig["@"] = path.resolve(monorepoRoot, "apps/client/src");
      
      // Add aliases for the monorepo packages
      aliasConfig["@peochain/types"] = path.resolve(monorepoRoot, "packages/types/src");
      aliasConfig["@peochain/utils"] = path.resolve(monorepoRoot, "packages/utils/src");
      
      log("Vite configuration updated for monorepo structure");
    }
  } catch (error) {
    log(`Error setting up monorepo Vite configuration: ${error}`, "error");
  }
}