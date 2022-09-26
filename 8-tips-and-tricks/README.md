# Extra stuff

You will be amazed!

# Architecture woes

For a while we might have teams with different machine architectures (AMD64 and ARM64) on MacOs. You can "fix it" on the ARM Macs by specifying (for example):

````dockerfile
FROM --platform=linux/amd64 alpine:latest
````

So that Docker uses Rosetta 2 for emulating the AMD64 platform, and your team is happy :)

# Multistage builds

````dockerfile
FROM golang:latest as prepare
RUN git clone some_resource
....
FROM golang:latest as build
COPY --from=prepare /resource .
RUN go get ./...
RUN go build ./... -o /dist/app
....
FROM debian:latest as execute
COPY --from=build /dist/app .
CMD "./app"

````

Will it contain everything that was done on this image?

# .dockerignore

Like Git, you should create a `.dockerignore` on your project directories in order to exclude files and folders from the `COPY` command (node_modules I'm looking at you!)

# Dockerfile step caching

Which will have the best cache?

````dockerfile
FROM node:latest
COPY .
RUN npm ci
RUN npm run build
````

````dockerfile
FROM node:latest
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY /src .
RUN npm run build
````

# Thank you!

Questions?
