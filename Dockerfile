FROM node:16.15.1 as build
WORKDIR /frontend-patient-data-tool

COPY package*.json .
RUN npm install -f
COPY . .

RUN npm run build
FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /frontend-patient-data-tool/build /usr/share/nginx/html