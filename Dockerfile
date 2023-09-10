# Build
FROM node:18 as builder
ENV NG_CLI_ANALYTICS=false
WORKDIR /app
COPY * .
COPY frontend ./frontend
COPY backend ./backend

RUN npm ci

# Create smaller image for deploy
FROM alpine:3.18
RUN apk add --no-cache nodejs=~18

WORKDIR /app
COPY --from=builder /app/frontend/dist /app/frontend/dist
COPY --from=builder /app/backend/dist /app/backend/dist


CMD [ "node", "--enable-source-maps", "backend/dist/www.mjs" ]
