FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 3002
CMD ["node", "src/server.js"]