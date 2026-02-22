FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/package.json
RUN npm install
COPY . .
RUN npm run build --workspace=@andisoft/api
CMD ["npm", "run", "start", "--workspace=@andisoft/api"]
