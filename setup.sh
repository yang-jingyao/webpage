#!/bin/bash

echo "Setting up Flosendo Website..."
echo

echo "Installing root dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Error installing root dependencies. Please make sure Node.js is installed."
    exit 1
fi

echo
echo "Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing backend dependencies."
    exit 1
fi
cd ..

echo
echo "Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing frontend dependencies."
    exit 1
fi
cd ..

echo
echo "Setup complete! You can now run:"
echo "  npm run dev    - Start development server"
echo "  npm start      - Start production server"
echo
