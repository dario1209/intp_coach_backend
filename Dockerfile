FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=build /app/dist ./dist
COPY prisma ./prisma

RUN npx prisma generate

EXPOSE 4000

CMD ["node", "dist/index.js"]
