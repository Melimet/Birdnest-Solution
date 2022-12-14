#!/usr/bin/bash
cd ./frontend && npm ci
echo "Frontend dependecies installed"
cd ..
cd ./backend && npm ci
echo "Backend dependecies installed"