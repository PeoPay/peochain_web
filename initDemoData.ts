import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import * as schema from "./shared/schema";

// Needed for neon serverless driver to work
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

async function main() {
  console.log("Creating database connection...");
  let pool;
  let db;

  try {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema });
    console.log("Database connection established successfully");
  } catch (error) {
    console.error("Failed to establish database connection:", error);
    process.exit(1);
  }

  console.log("Adding demo waitlist entries...");

  // Create some waitlist entries
  const waitlistEntries = [
    {
      fullName: "John Smith",
      email: "john.smith@example.com",
      referralCode: "JOIN-JOHN-1234",
      referralCount: 5,
      createdAt: new Date("2024-03-01"),
    },
    {
      fullName: "Alice Johnson",
      email: "alice.johnson@example.com",
      referralCode: "JOIN-ALICE-5678",
      referralCount: 8,
      createdAt: new Date("2024-03-02"),
    },
    {
      fullName: "Bob Williams",
      email: "bob.williams@example.com",
      referralCode: "JOIN-BOB-9012",
      referralCount: 3,
      createdAt: new Date("2024-03-03"),
    },
    {
      fullName: "Emma Brown",
      email: "emma.brown@example.com",
      referralCode: "JOIN-EMMA-3456",
      referralCount: 7,
      createdAt: new Date("2024-03-04"),
    },
    {
      fullName: "Michael Davis",
      email: "michael.davis@example.com",
      referralCode: "JOIN-MICHAEL-7890",
      referralCount: 2,
      createdAt: new Date("2024-03-05"),
    },
  ];

  for (const entry of waitlistEntries) {
    try {
      await db
        .insert(schema.waitlistEntries)
        .values(entry)
        .onConflictDoNothing();
    } catch (error) {
      console.error(
        `Error inserting waitlist entry for ${entry.email}:`,
        error,
      );
    }
  }

  console.log("Adding daily waitlist stats...");

  // Create daily stats for the last 14 days
  const today = new Date();
  const dailyStats = [];

  for (let i = 13; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    dailyStats.push({
      date: date,
      signupCount: Math.floor(Math.random() * 10) + 5, // 5-15 signups per day
      totalReferrals: Math.floor(Math.random() * 15) + 2, // 2-17 referrals per day
      conversionRate: Math.floor(Math.random() * 25) + 10, // 10-35% conversion rate
    });
  }

  for (const stat of dailyStats) {
    try {
      await db
        .insert(schema.dailyWaitlistStats)
        .values(stat)
        .onConflictDoNothing();
    } catch (error) {
      console.error(`Error inserting daily stat for ${stat.date}:`, error);
    }
  }

  console.log("Adding geographic stats...");

  // Create geographic stats
  const regions = [
    { region: "North America", userCount: 250, engagementScore: 85 },
    { region: "Europe", userCount: 180, engagementScore: 78 },
    { region: "Asia", userCount: 220, engagementScore: 82 },
    { region: "South America", userCount: 120, engagementScore: 75 },
    { region: "Africa", userCount: 90, engagementScore: 70 },
    { region: "Oceania", userCount: 60, engagementScore: 80 },
  ];

  for (const regionData of regions) {
    try {
      await db
        .insert(schema.geographicStats)
        .values(regionData)
        .onConflictDoNothing();
    } catch (error) {
      console.error(
        `Error inserting geographic stat for ${regionData.region}:`,
        error,
      );
    }
  }

  console.log("Adding referral channels...");

  // Create referral channels
  const channels = [
    { channelName: "Social Media", referralCount: 120, conversionRate: 35 },
    { channelName: "Email", referralCount: 85, conversionRate: 42 },
    { channelName: "Direct", referralCount: 65, conversionRate: 28 },
    { channelName: "Partner Sites", referralCount: 45, conversionRate: 30 },
    { channelName: "Crypto Forums", referralCount: 30, conversionRate: 25 },
  ];

  for (const channel of channels) {
    try {
      await db
        .insert(schema.referralChannels)
        .values(channel)
        .onConflictDoNothing();
    } catch (error) {
      console.error(
        `Error inserting referral channel for ${channel.channelName}:`,
        error,
      );
    }
  }

  console.log("Demo data inserted successfully!");
  await pool.end();
}

main().catch((e) => {
  console.error("Error inserting demo data:", e);
  // Add more detailed error information
  if (e.code === "ECONNREFUSED") {
    console.error(
      "Could not connect to database. Please check your DATABASE_URL and ensure the database server is running.",
    );
  } else if (e.code === "ETIMEDOUT") {
    console.error(
      "Connection to database timed out. Please check your network connection or database server status.",
    );
  } else if (e.code === "42P01") {
    console.error(
      "Relation does not exist. Database schema might not be initialized.",
    );
  }
  process.exit(1);
});
