FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV REACT_APP_API_URL=http://backend:8000

RUN npm run build

CMD ["npm", "start"]

#FROM node:18-alpine

#WORKDIR /app

#COPY package.json package-lock.json ./
#RUN npm install --frozen-lockfile  # Bloquea las versiones exactas

#COPY . .

#ENV REACT_APP_API_URL=http://backend:8000

#RUN npm run build

#CMD ["npm", "start"]