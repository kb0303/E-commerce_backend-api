FROM node:20

COPY package*.json ./

WORKDIR /

COPY . .

RUN npm install
EXPOSE 8080
CMD [ "node", "server.js" ]