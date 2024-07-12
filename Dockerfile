FROM node:slim

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install csv-parser

COPY . .

EXPOSE 6001

CMD ["node", "app2.js"]
