# Install dependencies only when needed
FROM registry.access.redhat.com/ubi8/nodejs-18@sha256:8a634a49c4e8d1753cddd3c047a4324d405fd2f6723f67b7ac274bb5fe72ff44 AS deps


WORKDIR ${APP_ROOT}
COPY package.json ./
RUN npm cache clean --force
RUN npm config set registry http://nexus.mcs-devops.gsb.or.th:8081/repository/npm-public
RUN npm install

COPY ./ ./

COPY ./.env ./.env


#Setting env variable
ARG DANGEROUSLY_DISABLE_HOST_CHECK
ENV DANGEROUSLY_DISABLE_HOST_CHECK=$DANGEROUSLY_DISABLE_HOST_CHECK

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

ARG REACT_APP_API_KEY
ENV REACT_APP_API_KEY=$REACT_APP_API_KEY

ARG PORT
ENV PORT=$PORT

ARG GENERATE_SOURCEMAP
ENV GENERATE_SOURCEMAP=$GENERATE_SOURCEMAP

RUN echo 'REACT_APP_API_URL=$REACT_APP_API_URL'
RUN echo 'REACT_APP_API_KEY=$REACT_APP_API_KEY'



#Running the build
RUN npm run build

ENV NODE_ENV=production





# # Copying the code to the final builder image along with node module. 
# COPY --from=builder ${APP_ROOT}/public ./public
# COPY --from=builder ${APP_ROOT}/src ./src
# COPY --from=builder ${APP_ROOT}/.env ./.env
# COPY --from=builder ${APP_ROOT}/config-overrides.js ./config-overrides.js
# COPY --from=builder --chown=1001:1001 ${APP_ROOT}/node_modules ./node_modules
# COPY --from=builder ${APP_ROOT}/package.json ./package.json

# # Creating the Cache directory and setting permissions
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache



USER 1001

EXPOSE 8080

#ENV PORT 8080              



CMD ["npm", "run", "start"]
