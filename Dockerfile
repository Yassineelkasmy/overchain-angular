# Building our Angular app :

FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Serving Angular app based on Nginx server :

FROM nginx:alpine
COPY --from=node /app/dist/demo-app /usr/share/nginx/html
