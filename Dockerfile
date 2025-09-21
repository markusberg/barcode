# Build
FROM node:22 as builder
ENV NG_CLI_ANALYTICS=false
WORKDIR /app
COPY package* .
COPY frontend ./frontend
COPY backend ./backend

RUN npm ci --workspaces
RUN npm run build --workspaces

# Create smaller image for deploy
FROM alpine:3.22
RUN apk add --no-cache nodejs=~22

WORKDIR /app
COPY package* .
COPY backend/package* ./backend/

RUN apk add --no-cache npm~11 && npm ci --workspace=backend --omit=dev && apk del npm
COPY --from=builder /app/frontend/dist /app/frontend/dist
COPY --from=builder /app/backend/dist /app/backend/dist

CMD [ "node", "--enable-source-maps", "backend/dist/www.js" ]
