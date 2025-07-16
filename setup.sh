#!/bin/bash

echo "🚗 Car Rental System Setup"
echo "=========================="

# Install root dependencies
echo "📦 Installing backend dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created! Please update it with your MongoDB URI and JWT secret."
else
    echo "✅ .env file already exists."
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update the .env file with your MongoDB URI and JWT secret"
echo "2. Start the development server with: npm run dev"
echo "3. Open http://localhost:5173 in your browser"
echo ""
echo "Happy coding! 🚀"