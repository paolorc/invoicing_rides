FROM node:14.18.0-alpine AS development

# move to directory, create if not exists
RUN mkdir /usr/src/app -p
WORKDIR /usr/src/app

# install and cache app dependencies
# a wildcard is used to the package.json and package-lock.json
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "start" ]