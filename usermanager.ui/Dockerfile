FROM node:lts AS development
WORKDIR /ui
COPY ["usermanager.ui/package.json", "./"]
COPY ["usermanager.ui/package-lock.json", "./"]
COPY ["usermanager.ui/jsconfig.json", "./"]
COPY ["usermanager.ui/next.config.js", "./"]

RUN npm install

COPY ["usermanager.ui/", "./"]

ENV CI=true
ENV PORT=3000

FROM development AS build

CMD ["npm", "run", "dev"]