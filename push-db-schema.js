import pkg from 'pg';
const { Pool } = pkg;

// This script will migrate the database schema automatically without interactive prompts

async function main() {
  console.log('Starting database migration...');
  
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL not found. Ensure the database is provisioned.");
    }
    
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    
    // Drop tables if they exist to avoid conflicts
    console.log('Dropping existing tables if they exist...');
    try {
      await pool.query('DROP TABLE IF EXISTS waitlist_entries CASCADE');
      console.log('Dropped waitlist_entries table');
    } catch (err) {
      console.error('Error dropping tables:', err);
    }
    
    // Create tables with proper schema
    console.log('Creating tables from schema definition...');
    
    // Create waitlist_entries table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS waitlist_entries (
        id SERIAL PRIMARY KEY,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        referral_code TEXT NOT NULL UNIQUE,
        referred_by TEXT,
        referral_count INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      )
    `);
    
    console.log('Database migration completed successfully');
    
    await pool.end();
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

main();