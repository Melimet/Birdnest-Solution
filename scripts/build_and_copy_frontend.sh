#!/usr/bin/bash

cd ./frontend 
npm run build 
echo "Frontend build complete"
cd .. 
echo "Copying frontend build to backend..."
cp -r ./frontend/dist ./backend/frontend-build
echo "Frontend build copied to backend"