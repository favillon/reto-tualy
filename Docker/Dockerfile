FROM node:16.9.1

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

COPY . /usr/src/app

RUN npm install -g nodemon

EXPOSE 3000
EXPOSE 587
EXPOSE 443
EXPOSE 25

CMD [ "npm", "run", "start" ]