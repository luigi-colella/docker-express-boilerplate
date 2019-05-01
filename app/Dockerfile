FROM node:8-slim

WORKDIR /app

COPY . /app

RUN yarn install

EXPOSE ${PORT}

CMD [ "yarn", "start" ]