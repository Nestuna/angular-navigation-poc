FROM archlinux

RUN pacman -Syu --noconfirm

RUN pacman -Sy --noconfirm --needed base-devel npm nodejs chromium

ENV CHROME_BIN /usr/bin/chromium

RUN npm install -g n
RUN n stable && node -v
RUN npm install -g npm

WORKDIR /ui

EXPOSE 8000