FROM node:slim

WORKDIR /backend
COPY . .

RUN npm install

CMD [ "node", "index.js" ]

EXPOSE 5000