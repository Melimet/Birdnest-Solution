FROM node:lts-alpine as builder

WORKDIR /usr/src/app

COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
COPY scripts/*.sh ./scripts/

RUN chmod +x ./scripts/*.sh
RUN sh scripts/install_dependencies.sh

COPY ./frontend ./frontend

RUN sh scripts/build_and_copy_frontend.sh

COPY ./backend ./backend

RUN cd ./backend && npm run build

FROM node:lts-slim

WORKDIR /usr/src/app

COPY backend/package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /usr/src/app/backend/frontend-build ./frontend-build
COPY --from=builder /usr/src/app/backend/dist ./dist

EXPOSE 3001 
CMD [ "node", "dist/index.js" ]