FROM node:18-alpine AS build_stage

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build


FROM nginx:alpine

COPY cert.pem key.pem cloudflare.crt /etc/ssl/

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build_stage /app/dist .

EXPOSE 80 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]
