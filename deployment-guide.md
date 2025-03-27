# PeoChain Deployment Guide

This guide provides instructions for deploying the PeoChain application to production environments.

## Pre-Deployment Setup

Before deploying, ensure that:

1. All necessary environment variables are properly configured
2. The database is properly initialized with required schema
3. The production build is tested locally

## Deployment Process

### Option 1: Using Replit Deployment

To deploy using Replit's built-in deployment system:

1. Update the `.replit` file with the following configuration:

```
[deployment]
deploymentTarget = "cloudrun"
run = ["sh", "-c", "NODE_ENV=production node dist/index.js"]
build = ["sh", "-c", "node build.js"]
```

2. Use the "Deploy" button in the Replit interface to deploy the application.

### Option 2: Manual Deployment

For manual deployment:

1. Build the application using the custom build script:

```
node build.js
```

2. Start the production server:

```
NODE_ENV=production PORT=5000 node dist/index.js
```

## Environment Variables

The following environment variables should be set in production:

| Variable | Description | Required |
|----------|-------------|----------|
| DATABASE_URL | PostgreSQL connection string | Yes |
| PORT | Server port (default: 5000) | No |
| NODE_ENV | Node environment (set to "production") | Yes |

## Troubleshooting

If you encounter issues with deployment:

1. Check that the build process completed successfully
2. Verify the Node.js version (required: v16+)
3. Ensure database connection is properly established
4. Check server logs for detailed error messages

For persistent issues, try running the application in development mode first to identify any configuration problems:

```
npm run dev
```

## Post-Deployment Verification

After deployment, verify that:

1. The application is accessible via the provided URL
2. API endpoints are functioning correctly
3. Client-side routing works as expected
4. Database interactions are successful