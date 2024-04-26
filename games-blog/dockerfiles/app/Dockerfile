FROM node:latest

WORKDIR /vite-project

COPY package*.json ./

RUN npm install

COPY ./src ./src

RUN npm install express cors crypto-js mysql2 dotenv jsonwebtoken

CMD ["npm", "start"]
