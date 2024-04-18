FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package.json ./

COPY . .

RUN npm install

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "preview"]