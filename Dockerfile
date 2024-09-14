FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS serve

RUN npm install -g serve

WORKDIR /app

COPY --from=build /app/build ./build

COPY package*.json ./
RUN npm install --production

EXPOSE 5050

CMD ["node", "build"]
