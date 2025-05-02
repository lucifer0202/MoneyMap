FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build React app
RUN npm run build

EXPOSE 3000
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
