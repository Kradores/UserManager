FROM node:lts AS development
WORKDIR /ui
COPY ["usermanager.ui/package.json", "./"]
COPY ["usermanager.ui/package-lock.json", "./"]

RUN npm install

COPY ["usermanager.ui/", "./"]

ENV PORT=3000

FROM development AS build

CMD ["npm", "start"]