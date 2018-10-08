FROM rickydunlop/nodejs-ffmpeg
RUN set -xe \
    && apk add --no-cache \
        ca-certificates \
        openssl \
        python3 \
    && pip3 install youtube-dl
WORKDIR /home/node/app
ADD CHECKS Procfile app.js package-lock.json package.json swagger-config.yaml /home/node/app/
ADD api/ /home/node/app/api
ADD config/ /home/node/app/config
RUN npm install
EXPOSE 10010
USER node
