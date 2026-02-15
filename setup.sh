#!/bin/bash
# NouNou V2 - Quick Setup Script

echo "🎉 NouNou V2 - React + Vite + Three.js Setup"
echo "=============================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🚀 Starting development server..."
echo "📱 Open your browser at: http://localhost:5173"
echo ""
npm run dev
