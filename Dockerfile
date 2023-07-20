# Start your image with a node base image
FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "node", "server" ]