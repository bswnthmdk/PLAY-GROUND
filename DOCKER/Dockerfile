FROM node:22

WORKDIR /docker

COPY package*.json ./

RUN npm install

COPY . .

ENV MONGO_DB_USERNAME=biswanath
ENV MONGO_DB_PWD=password

EXPOSE 5000

CMD ["node", "server.js"]