#!/bin/bash

# Core-Zodiac Development Setup Script
# This script sets up the development environment

set -e

echo "🚀 Setting up Core-Zodiac development environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version must be 18 or higher. Current: $(node -v)${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js version: $(node -v)${NC}"

# Install root dependencies
echo -e "${YELLOW}📦 Installing root dependencies...${NC}"
npm install

# Install backend dependencies
echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
cd backend
npm install

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 Creating backend .env file...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ Created backend/.env - Please configure it with your settings${NC}"
fi

# Install frontend dependencies
echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
cd ../frontend
npm install

# Copy environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}📝 Creating frontend .env.local file...${NC}"
    cp .env.local.example .env.local
    echo -e "${GREEN}✓ Created frontend/.env.local${NC}"
fi

cd ..

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Configure backend/.env with your database and API keys"
echo "2. Set up the database:"
echo "   cd backend"
echo "   npx prisma migrate dev"
echo "3. Start the development servers:"
echo "   npm run dev"
echo ""
echo "For more information, see QUICKSTART.md"
