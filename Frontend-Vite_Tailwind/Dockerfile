# FROM registry.access.redhat.com/ubi8/nodejs-18:1-81@sha256:8a634a49c4e8d1753cddd3c047a4324d405fd2f6723f67b7ac274bb5fe72ff44 AS deps
FROM nexus.mcs-devops.gsb.or.th/registry.access.redhat.com/ubi8/nodejs-18:1-122 AS deps

WORKDIR ${APP_ROOT}
COPY package.json ./
RUN npm cache clean --force
RUN npm config set registry http://nexus.mcs-devops.gsb.or.th:8081/repository/npm-public
RUN npm install


COPY ./ ./

#Setting env variable
ARG VITE_PORT
ENV VITE_PORT=$VITE_PORT
RUN echo "VITE_PORT is $VITE_PORT"

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
RUN echo "VITE_BACKEND_URL is $VITE_BACKEND_URL"

ARG VITE_BACKEND_APPROVE_URL
ENV VITE_BACKEND_APPROVE_URL=$VITE_BACKEND_APPROVE_URL
RUN echo "VITE_BACKEND_APPROVE_URL is $VITE_BACKEND_APPROVE_URL"

ARG VITE_WARNING_LIST_URL
ENV VITE_WARNING_LIST_URL=$VITE_WARNING_LIST_URL
RUN echo "VITE_WARNING_LIST_URL is $VITE_WARNING_LIST_URL"

ARG VITE_WARNING_LIST_KEY
ENV VITE_WARNING_LIST_KEY=$VITE_WARNING_LIST_KEY
RUN echo "VITE_WARNING_LIST_KEY is $VITE_WARNING_LIST_KEY"

ARG VITE_CLIENT_ID
ENV VITE_CLIENT_ID=$VITE_CLIENT_ID
RUN echo "VITE_CLIENT_ID is $VITE_CLIENT_ID"

ARG VITE_CLIENT_SECRET
ENV VITE_CLIENT_SECRET=$VITE_CLIENT_SECRET
RUN echo "VITE_CLIENT_SECRET is $VITE_CLIENT_SECRET"

#Running the build
RUN npm run build

ENV NODE_ENV=production

# # Creating the Cache && Vite directory and setting permissions
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
RUN mkdir -p node_modules/.vite && chmod -R 777 node_modules/.vite

USER 1001

EXPOSE 8080
#ENV PORT 8080              


CMD [ "npm", "run", "start" ]
