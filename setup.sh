#!/bin/bash

# Get project name from folder name
PROJECT_NAME=$(basename "$PWD")
USERNAME="ScaxCodes"

# Replace placeholders in package.json
sed -i '' "s/__PROJECT_NAME__/$PROJECT_NAME/g" package.json
sed -i '' "s/__USERNAME__/$USERNAME/g" package.json

# Overwrite README.md with only the project name
echo "# $PROJECT_NAME" > README.md

# Create .env file with PORT=8000
echo "PORT=8000" > .env

echo "✅ Setup complete! Run 'npm install' to install dependencies."
