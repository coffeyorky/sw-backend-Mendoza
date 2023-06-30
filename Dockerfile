FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

#npm start
CMD [ "npm", "start" ]