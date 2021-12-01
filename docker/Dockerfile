FROM node:lts

RUN apt update
RUN apt install -yq chromium

ENV CHROME_BIN /usr/bin/chromium
ENV PATH /ui/node_modules/.bin:$PATH

WORKDIR /ui

COPY . /ui
RUN npm install
RUN npm install -g @angular/cli
