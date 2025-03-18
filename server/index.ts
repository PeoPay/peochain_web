import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";

// Initialize Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data with querystring library (extended=false)
app.use(express.urlencoded({ extended: false }));

// Middleware to serve static files located in the 'public' directory
app.use(express.static(path.join(process.cwd(), "public")));

/**
 * Middleware for logging API requests.
 * 
 * - Captures the start time to measure request duration.
 * - Intercepts JSON responses to include response body in logs.
 * - Logs HTTP method, path, status code, duration, and JSON response (truncated at 80 characters for readability).
 * - Only logs requests made to paths starting with "/api".
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const path = req.path;

  // Placeholder to store the JSON response for logging purposes
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  // Override the default res.json method to capture response body
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  // Event listener triggered when response finishes sending
  res.on("finish", () => {
    const duration = Date.now() - start;

    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;

      // Append JSON response to the log line, if available
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      // Truncate log line if it exceeds 80 characters for readability
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

/**
 * Immediately Invoked Async Function Expression (IIAFE)
 * 
 * - Registers all API routes and associated middleware.
 * - Sets up a global error handling middleware to catch and handle errors gracefully.
 * - Initializes Vite in development mode or serves static files in production.
 * - Starts server to listen on a consistent, explicitly defined port (5000).
 */
(async () => {
  // Register API routes and obtain server instance
  const server = await registerRoutes(app);

  /**
   * Global error handling middleware
   * 
   * - Captures errors from previous middleware and routes.
   * - Returns structured JSON error response with appropriate HTTP status.
   * - Throws the error for further logging or handling as required.
   */
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });

    // Propagate error to the higher-level logging/monitoring tools
    throw err;
  });

  /**
   * Environment-specific server setup
   * 
   * - In development mode, configures Vite middleware to enable hot module replacement (HMR) and improved dev experience.
   * - In production mode, serves prebuilt static assets for optimized performance.
   * - Vite is initialized after routes to ensure correct route handling precedence.
   */
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  /**
   * Server configuration
   * 
   * - Explicitly sets the server to listen on port 5000 for both API and client-side requests.
   * - Binds server to all network interfaces ("0.0.0.0") for accessibility.
   * - Enables port reuse to enhance scalability and availability.
   * - Logs confirmation when the server starts successfully.
   */
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
