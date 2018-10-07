FROM rickydunlop/nodejs-ffmpeg
RUN set -xe \
    && apk add --no-cache \
        ca-certificates \
        openssl \
        python3 \
    && pip3 install youtube-dl
EXPOSE 10010
USER node
WORKDIR /home/node/app
VOLUME /home/node/app
