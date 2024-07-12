FROM node:18
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends texlive-latex-recommended texlive-latex-extra texlive-fonts-recommended texlive-fonts-extra texlive-lang-all

COPY package*.json /usr/src/app
COPY tsconfig.json /usr/src/app
COPY tsoa.json /usr/src/app
COPY src /usr/src/app/src
COPY templates /usr/src/app/templates

RUN yarn install
RUN yarn global add pm2

ENV NODE_ENV production

RUN mkdir /usr/src/app/tmp

RUN yarn run generate:middleware && yarn run build
EXPOSE 3001

CMD ["pm2-runtime","/usr/src/app/build/index.js"]
