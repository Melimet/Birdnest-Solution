#!/usr/bin/bash

cd ./frontend && npm run lint
echo "Frontend lint complete"
cd ..
cd ./backend && npm run lint
echo "Backend lint complete"
