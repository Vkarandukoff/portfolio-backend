FROM node:19-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

CMD [ "npm", "run", "docker:start" ]

