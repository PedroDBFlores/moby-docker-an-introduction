# Architecture woes

For a while we might have teams with different machine architectures (AMD64 and ARM64) on MacOs. You can "fix it" on the ARM Macs by specifying (for example):

````dockerfile
FROM --platform=linux/amd64 alpine:latest
````

So that Docker uses Rosetta 2 for emulating the AMD64 platform, and your team is happy :)

## Multistage builds

````dockerfile
FROM golang:alpine as prepare
RUN git clone some_resource
....
FROM golang:alpine as build
COPY --from=prepare /resource .
RUN go get ./...
RUN go build ./... -o /dist/app
....
FROM alpine:latest as execute
COPY --from=build /dist/app .
CMD "./app"

````

From every `FROM` statement forward every command will be run with a container based on that image, step upon step. However only starting from the last `FROM` statement until the end of the Dockerfile will be present in the resulting image.

With this information in hand, look at the dockerfile above. Notice how the only thing that we're doing there is getting the compiled binary from a previous step and making it the default command.

So the resulting image of that Dockerfile would be the Alpine Linux image + the Go Application binary.

## .dockerignore

Like Git, you should create a `.dockerignore` on your project directories in order to exclude files and folders from the `COPY` command (node_modules I'm looking at you!)

## Dockerfile step caching

Which will have the best cache?

This?

````dockerfile
FROM node:latest
COPY node_project/ .
RUN npm ci
RUN npm run build
````

Or this?

````dockerfile
FROM node:latest
COPY node_project/package.json .
COPY node_project/package-lock.json .
RUN npm ci
COPY node_project/src .
RUN npm run build
````

For this example to work imagine that we have a folder with a Node project, with a package.json (and lock) and a src folder.

Docker performs on every step an hash of itself and caches that output, so if nothing changes between runs the cache will be reused instead of reexecuting the step.

In the first example we're copying all the files and then installing and building our project. This implies that every single change on our project will break the cache, and execute anew, fetching the dependencies even if they didn't change, and afterwards still building.

The second example though makes it better, first copies over only the package file that are required to actually fetch the dependencies, and afterwards copy the source folder and then building. This ensures that the installing dependencies step only executes when they actually change between runs.
