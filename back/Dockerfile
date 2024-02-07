FROM node:18.16.1

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "start:dev"]