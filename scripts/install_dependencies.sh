#!/usr/bin/bash
cd ./frontend && npm install
echo "Frontend dependecies installed"
cd ..
cd ./backend && npm install
echo "Backend dependecies installed"