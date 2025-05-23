FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./package*.json
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/build .

EXPOSE 3000

CMD ["node", "./index.js"]
