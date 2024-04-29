FROM node:20

WORKDIR /plate-mobile

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start", "--port", "8080"]