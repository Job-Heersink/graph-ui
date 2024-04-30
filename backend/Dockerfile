FROM node:slim

WORKDIR /backend
COPY . .

RUN npm install

CMD [ "node", "app.js" ]

EXPOSE 5000