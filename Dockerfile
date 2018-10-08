FROM rickydunlop/nodejs-ffmpeg
RUN set -xe \
    && apk add --no-cache \
        ca-certificates \
        openssl \
        python3 \
    && pip3 install youtube-dl
WORKDIR /home/node/app
ADD Procfile CHECKS app.js api/ config/ package.json package-lock.json swagger-config.yaml /home/node/app/
RUN npm install && ls -la
EXPOSE 10010
USER node
