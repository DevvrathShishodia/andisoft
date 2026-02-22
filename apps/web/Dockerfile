FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/web/package.json ./apps/web/package.json
RUN npm install
COPY . .
RUN npm run build --workspace=@andisoft/web
CMD ["npm", "run", "start", "--workspace=@andisoft/web"]
