FROM node:12-buster

EXPOSE 80
LABEL project=askproject
ARG env
COPY . /usr/src/app/
RUN cd /usr/src/app/ && \
    if [ "$env" = "prod" ] ; then \
        echo "Building production env." && \
        export NODE_ENV=production && \
        npm install --only=prod ; \
    else \
        echo "Building dev env." && \
        export NODE_ENV=development && \
        npm install ; \
    fi

ENTRYPOINT ["bash", "-c"]
