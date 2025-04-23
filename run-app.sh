#!/bin/bash

# This script helps run the PeoChain application

echo "========== PeoChain Application Runner =========="
echo "1. Run Simple Server (recommended)"
echo "2. Run Full Server (may have startup issues)"
echo "3. Run Server in Test Mode"
echo "4. Exit"
echo "=============================================="
echo -n "Enter your choice (1-4): "
read choice

case $choice in
  1)
    echo "Starting Simple Server..."
    node server-simple.js
    ;;
  2)
    echo "Starting Full Server..."
    tsx server/index.ts
    ;;
  3)
    echo "Starting Server in Test Mode..."
    node -e "console.log('Opening port 5000...'); require('http').createServer((req, res) => { res.end('PeoChain Test Server'); }).listen(5000, '0.0.0.0', () => console.log('Test server running on port 5000'));"
    ;;
  4)
    echo "Exiting..."
    exit 0
    ;;
  *)
    echo "Invalid choice. Exiting."
    exit 1
    ;;
esac