# Build
FROM node:18 as builder
ENV NG_CLI_ANALYTICS=false
WORKDIR /app
COPY package* .
COPY frontend ./frontend
COPY backend ./backend

RUN npm ci --workspaces
RUN npm run build --workspaces

# Create smaller image for deploy
FROM alpine:3.18
RUN apk add --no-cache nodejs=~18

WORKDIR /app
COPY package* .
COPY backend/package* ./backend/
COPY frontend/package* ./frontend/

RUN apk add --no-cache npm~9 && npm ci --workspace=backend --omit=dev && apk del npm
COPY --from=builder /app/frontend/dist /app/frontend/dist
COPY --from=builder /app/backend/dist /app/backend/dist

CMD [ "node", "--enable-source-maps", "backend/dist/www.js" ]
