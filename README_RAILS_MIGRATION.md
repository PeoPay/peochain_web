# PeoChain Rails Migration Guide

This document outlines the migration process from the existing Node.js/Express backend to Ruby on Rails.

## Migration Overview

We're transitioning from a Node.js/Express backend with React frontend to a Ruby on Rails application that serves the same API endpoints and interfaces with the existing React frontend.

### Architecture Changes

1. **Backend Framework**: Express.js → Ruby on Rails
2. **ORM**: Drizzle → Active Record
3. **WebSockets**: Socket.IO → ActionCable
4. **Rate Limiting**: Express Rate Limit → Rack::Attack
5. **Authentication**: Custom middleware → Rails HTTP Basic Auth

## Setup Instructions

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in values
3. Run database migrations: `rails db:create db:migrate`
4. Start the server: `rails server -p 5000 -b 0.0.0.0`

## Database Migration

The database schema has been preserved, with the following tables:

- `users`: User accounts and authentication
- `waitlist_entries`: Waitlist registration and referral tracking
- `daily_waitlist_stats`: Daily signups and referrals data
- `geographic_stats`: Regional user distribution data
- `referral_channels`: Referral source tracking

## API Endpoints

All existing API endpoints have been maintained:

- `POST /api/waitlist`: Register for waitlist
- `GET /api/referral/:code`: Get referral information
- `GET /api/analytics/overview`: Get analytics dashboard overview
- `GET /api/analytics/daily-stats`: Get daily statistics
- `POST /api/analytics/daily-stats`: Create/update daily statistics
- `GET /api/analytics/geographic-stats`: Get geographic statistics
- `POST /api/analytics/geographic-stats`: Create/update geographic statistics
- `GET /api/analytics/referral-channels`: Get referral channel statistics
- `POST /api/analytics/referral-channels`: Create/update referral channel statistics
- `GET /api/analytics/top-referrers`: Get top referrers
- `GET /api/analytics/export`: Export analytics data as ZIP file

## Real-time Updates

WebSocket communication has been implemented via ActionCable with the following events:

- `NEW_SIGNUP`: When a new user joins the waitlist
- `NEW_REFERRAL`: When a referral is credited
- `ANALYTICS_UPDATE`: When analytics data is updated
- `CURRENT_STATS`: Sent upon connection

## Environment Variables

See `.env.example` for required environment variables.

## Frontend Integration

The Rails application serves the same API endpoints as the Express application, so the frontend remains unchanged.

## Analytics Service

InfluxDB integration has been maintained, with the following functions:

- `record_signup`: Record a new signup event
- `record_referral`: Record a new referral event
- `record_event`: Record a custom event
- `get_total_signup_count`: Get total signups
- `get_total_referral_count`: Get total referrals
- `get_referral_count_by_code`: Get referrals by code
- `get_daily_signups`: Get daily signup trends
- `get_top_countries`: Get top countries by user count
- `get_top_referrers`: Get top referrers by referral count