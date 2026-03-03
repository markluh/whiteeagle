#!/bin/bash

# White Eagle Full Stack Setup Script
# This script sets up both frontend and backend

echo "=========================================="
echo "White Eagle - Full Stack Setup"
echo "=========================================="

# Frontend setup
echo ""
echo "Setting up Frontend..."
npm install

# Create frontend env file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "Creating .env.local for frontend..."
    echo "VITE_API_URL=http://localhost:5000/api" > .env.local
fi

# Backend setup
echo ""
echo "Setting up Backend..."
cd server

npm install

# Create backend env file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "Creating .env.local for backend..."
    cat > .env.local << EOF
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
ADMIN_PASSWORD=admin123
EOF
    echo ""
    echo "⚠️  IMPORTANT: Edit server/.env.local and add your GEMINI_API_KEY"
fi

echo ""
echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd server && npm run dev"
echo ""
echo "Terminal 2 - Frontend:"
echo "  npm run dev"
echo ""
echo "The app will be available at http://localhost:5173"
echo "The API will be at http://localhost:5000/api"
