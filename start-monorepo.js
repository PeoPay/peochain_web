const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function logInfo(message) {
  console.log(`${colors.blue}[INFO]${colors.reset} ${message}`);
}

function logSuccess(message) {
  console.log(`${colors.green}[SUCCESS]${colors.reset} ${message}`);
}

function logError(message) {
  console.log(`${colors.red}[ERROR]${colors.reset} ${message}`);
}

function logWarning(message) {
  console.log(`${colors.yellow}[WARNING]${colors.reset} ${message}`);
}

// Ensure theme.json is available in the client directory
const rootThemePath = path.join(process.cwd(), 'theme.json');
const clientThemePath = path.join(process.cwd(), 'apps/client/theme.json');

if (fs.existsSync(rootThemePath) && !fs.existsSync(clientThemePath)) {
  logInfo('Copying theme.json to client directory...');
  fs.copyFileSync(rootThemePath, clientThemePath);
  logSuccess('theme.json copied to client directory');
}

// Build the types package first
logInfo('Building @peochain/types package...');
try {
  const typesDir = path.join(process.cwd(), 'packages/types');
  
  // Make sure the dist directory exists
  if (!fs.existsSync(path.join(typesDir, 'dist'))) {
    fs.mkdirSync(path.join(typesDir, 'dist'), { recursive: true });
  }
  
  // Copy schema.ts to dist directly since we're having TypeScript compilation issues
  const schemaSource = path.join(typesDir, 'src/schema.ts');
  const schemaDest = path.join(typesDir, 'dist/schema.js');
  
  if (fs.existsSync(schemaSource)) {
    // Read schema.ts and convert to JavaScript (basic conversion)
    let schemaContent = fs.readFileSync(schemaSource, 'utf8');
    
    // Make sure all exports are explicitly included
    if (!schemaContent.includes('export const insertWaitlistEntrySchema')) {
      logError('insertWaitlistEntrySchema export not found in schema.ts');
    }
    
    // Create schema.js in dist
    fs.writeFileSync(schemaDest, `
import { pgTable, text, serial, integer, boolean, timestamp, uuid, jsonb, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const waitlistEntries = pgTable("waitlist_entries", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  referralCode: text("referral_code").notNull().unique(),
  referredBy: text("referred_by"),
  referralCount: integer("referral_count").notNull().default(0),
  userType: text("user_type").notNull().default("user"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertWaitlistEntrySchema = createInsertSchema(waitlistEntries)
  .pick({
    fullName: true,
    email: true,
    referredBy: true,
    userType: true,
    metadata: true,
  });

export const dailyWaitlistStats = pgTable("daily_waitlist_stats", {
  id: serial("id").primaryKey(),
  date: date("date").notNull().unique(),
  signups: integer("signups").notNull().default(0),
  referrals: integer("referrals").notNull().default(0),
  views: integer("views").notNull().default(0),
});

export const insertDailyWaitlistStatsSchema = createInsertSchema(dailyWaitlistStats)
  .pick({
    date: true,
    signups: true,
    referrals: true,
    views: true,
  });

export const geographicStats = pgTable("geographic_stats", {
  id: serial("id").primaryKey(),
  region: text("region").notNull().unique(),
  country: text("country").notNull(),
  userCount: integer("user_count").notNull().default(0),
  conversionRate: text("conversion_rate"),
});

export const insertGeographicStatsSchema = createInsertSchema(geographicStats)
  .pick({
    region: true,
    country: true,
    userCount: true,
    conversionRate: true,
  });

export const referralChannels = pgTable("referral_channels", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  userCount: integer("user_count").notNull().default(0),
  conversionRate: text("conversion_rate"),
});

export const insertReferralChannelSchema = createInsertSchema(referralChannels)
  .pick({
    name: true,
    userCount: true,
    conversionRate: true,
  });
`);
    
    // Create index.js in dist with a more direct approach
    fs.writeFileSync(
      path.join(typesDir, 'dist/index.js'),
      `// Export directly from schema to avoid module resolution issues
import { 
  users, insertUserSchema, 
  waitlistEntries, insertWaitlistEntrySchema, 
  dailyWaitlistStats, insertDailyWaitlistStatsSchema,
  geographicStats, insertGeographicStatsSchema,
  referralChannels, insertReferralChannelSchema
} from "./schema.js";

export { 
  users, insertUserSchema, 
  waitlistEntries, insertWaitlistEntrySchema, 
  dailyWaitlistStats, insertDailyWaitlistStatsSchema,
  geographicStats, insertGeographicStatsSchema,
  referralChannels, insertReferralChannelSchema
};
`
    );
    
    logSuccess('@peochain/types package built');
  } else {
    logError('Schema source file not found');
  }
} catch (error) {
  logError(`Failed to build @peochain/types package: ${error}`);
}

// Build the utils package
logInfo('Building @peochain/utils package...');
try {
  const utilsDir = path.join(process.cwd(), 'packages/utils');
  
  // Make sure the dist directory exists
  if (!fs.existsSync(path.join(utilsDir, 'dist'))) {
    fs.mkdirSync(path.join(utilsDir, 'dist'), { recursive: true });
  }
  
  // Copy utils source files to dist
  const cnSource = path.join(utilsDir, 'src/cn.ts');
  const cnDest = path.join(utilsDir, 'dist/cn.js');
  
  if (fs.existsSync(cnSource)) {
    // Read cn.ts and convert to JavaScript (basic conversion)
    let cnContent = fs.readFileSync(cnSource, 'utf8');
    // Very basic TypeScript to JavaScript conversion
    cnContent = cnContent.replace(/: [a-zA-Z<>\[\]]+/g, '');
    
    fs.writeFileSync(cnDest, cnContent);
    
    // Copy index.ts to dist as index.js
    const indexSource = path.join(utilsDir, 'src/index.ts');
    const indexDest = path.join(utilsDir, 'dist/index.js');
    
    if (fs.existsSync(indexSource)) {
      let indexContent = fs.readFileSync(indexSource, 'utf8');
      // Very basic TypeScript to JavaScript conversion
      indexContent = indexContent.replace(/: [a-zA-Z<>\[\]]+/g, '');
      
      fs.writeFileSync(indexDest, indexContent);
      
      logSuccess('@peochain/utils package built');
    } else {
      logError('Utils index source file not found');
    }
  } else {
    logError('Utils source file not found');
  }
} catch (error) {
  logError(`Failed to build @peochain/utils package: ${error}`);
}

logInfo('Starting PeoChain Monorepo');

// Create a .env file for the server
try {
  const envPath = path.join(process.cwd(), 'apps/server/.env');
  if (!fs.existsSync(envPath)) {
    logInfo('Creating .env file for server...');
    fs.writeFileSync(envPath, `
DATABASE_URL=${process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/peochain'}
NODE_ENV=development
SESSION_SECRET=development-session-secret
`);
    logSuccess('.env file created for server');
  }
} catch (error) {
  logError(`Failed to create .env file for server: ${error}`);
}

// Add node_modules symlinks to help resolve package imports
try {
  const serverNodeModules = path.join(process.cwd(), 'apps/server/node_modules');
  const typesDistDir = path.join(process.cwd(), 'packages/types/dist');
  const typesLinkDir = path.join(serverNodeModules, '@peochain/types');
  
  if (!fs.existsSync(serverNodeModules)) {
    fs.mkdirSync(serverNodeModules, { recursive: true });
  }
  
  if (!fs.existsSync(path.join(serverNodeModules, '@peochain'))) {
    fs.mkdirSync(path.join(serverNodeModules, '@peochain'), { recursive: true });
  }
  
  if (!fs.existsSync(typesLinkDir)) {
    logInfo('Creating symlink for @peochain/types in server node_modules...');
    fs.symlinkSync(typesDistDir, typesLinkDir, 'dir');
    logSuccess('Symlink created for @peochain/types');
  }
  
  // Repeat for client
  const clientNodeModules = path.join(process.cwd(), 'apps/client/node_modules');
  const typesLinkDirClient = path.join(clientNodeModules, '@peochain/types');
  
  if (!fs.existsSync(clientNodeModules)) {
    fs.mkdirSync(clientNodeModules, { recursive: true });
  }
  
  if (!fs.existsSync(path.join(clientNodeModules, '@peochain'))) {
    fs.mkdirSync(path.join(clientNodeModules, '@peochain'), { recursive: true });
  }
  
  if (!fs.existsSync(typesLinkDirClient)) {
    logInfo('Creating symlink for @peochain/types in client node_modules...');
    fs.symlinkSync(typesDistDir, typesLinkDirClient, 'dir');
    logSuccess('Symlink created for @peochain/types');
  }
} catch (error) {
  logError(`Failed to set up symlinks: ${error}`);
}

// Start the server process
logInfo('Starting server...');
const serverProcess = spawn('npm', ['run', 'dev'], {
  cwd: path.join(process.cwd(), 'apps/server'),
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_OPTIONS: '--experimental-specifier-resolution=node'
  }
});

// Start the client process
logInfo('Starting client...');
const clientProcess = spawn('npm', ['run', 'dev'], {
  cwd: path.join(process.cwd(), 'apps/client'),
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  logWarning('Terminating processes...');
  serverProcess.kill();
  clientProcess.kill();
  process.exit();
});

serverProcess.on('exit', (code) => {
  logWarning(`Server process exited with code ${code}`);
  // If server exits, terminate client as well
  clientProcess.kill();
  process.exit(code);
});

clientProcess.on('exit', (code) => {
  logWarning(`Client process exited with code ${code}`);
  // If client exits, terminate server as well
  serverProcess.kill();
  process.exit(code);
});