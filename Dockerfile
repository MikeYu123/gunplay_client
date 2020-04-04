FROM node:10.19.0-jessie as build-stage

WORKDIR /scripts

ENV BACKEND_WS 'ws://157.245.70.82:15001'
ENV BACKEND_API 'http://157.245.70.82:15001'

COPY package.json /scripts

RUN npm install

ADD . .

RUN npm run build

FROM nginx

WORKDIR /data

COPY --from=build-stage /scripts/dist /data
COPY nginx.conf /etc/nginx