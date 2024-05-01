FROM node:slim

WORKDIR /backend
COPY . .

RUN npm install

CMD [ "node", "src/server.js" ]

EXPOSE 5000