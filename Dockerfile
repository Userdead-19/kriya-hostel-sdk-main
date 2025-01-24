FROM node:latest

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./tailwind.css ./src/styles/tailwind.css

RUN npx tailwindcss -i ./src/styles/tailwind.css -o ./src/styles/tailwind.output.css --minify

COPY . .


EXPOSE 3000

CMD ["npm", "start"]