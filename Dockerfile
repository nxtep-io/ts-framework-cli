# Build Step
FROM node:10

# Variables
ENV PORT=3000

# Create app directory
WORKDIR /usr/src/ts-framework-cli/

# Copy only the package.json and lock file and install app dependencies
COPY ./package.json ./yarn.lock /usr/src/ts-framework-cli/
RUN yarn install --ignore-engines

# Copy the app source code and compile it
COPY . /usr/src/ts-framework-cli/
RUN yarn build
RUN yarn link

## Expose and startup
EXPOSE ${PORT}
ENTRYPOINT [ "ts-framework" ]
