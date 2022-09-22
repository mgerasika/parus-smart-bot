# Using Node:10 Image Since it contains all 
# the necessary build tools required for dependencies with native build (node-gyp, python, gcc, g++, make)
# First Stage : to install and build dependences

FROM node:14 AS builder
COPY . /app/

WORKDIR /app
RUN yarn
RUN yarn build
CMD ["yarn", "start"]

# # Second Stage : Setup command to run your app using lightweight node image
# FROM node:14
# WORKDIR /app
# COPY --from=builder /app ./
# CMD ["yarn", "start"]