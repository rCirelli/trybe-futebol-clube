FROM node:16.14-alpine
WORKDIR /app-backend

EXPOSE 3001

COPY package.json .

RUN ["npm", "install"]

COPY . .

RUN ["npm", "run", "build"]

CMD ["npm", "start"]