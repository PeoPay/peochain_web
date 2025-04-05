#!/bin/bash

echo "Starting PeoChain Monorepo"
echo "Running the monorepo applications directly"

# Start from the root directory
cd "$(dirname "$0")"

# Start the server
echo "Starting server..."
cd apps/server && npm run dev &
SERVER_PID=$!

# Go back to root, then to client
cd ../..
echo "Starting client..."
cd apps/client && npm run dev &
CLIENT_PID=$!

# Capture ctrl+c to kill both processes
trap "kill $SERVER_PID $CLIENT_PID" EXIT

# Wait for processes to finish
wait