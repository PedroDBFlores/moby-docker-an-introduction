# My first Dockerfile

I've developed a very simple simple Go application that you can find on the repo, on the folder `my-go-app/pkg` The goal of the demonstration that follows is to perform both build and run steps of an application on a container.

We have our own Dockerfile right [here](./my-go-app/Dockerfile), and respective [code](./my-go-app/pkg).

Quick pass on the Dockerfile:

````dockerfile
# The image to use for building our app, in this case an Alpine image with Go support builtin
# A Dockerfile should always start with a FROM statement
FROM golang:1.19-alpine as builder
# Setting the working directory
WORKDIR /usr/src/my-go-app
# Copy the pkg folder to our working directory
COPY pkg/ .
# Runs go build at our current directory
RUN go build
# The image to use for running our app, in this case an Alpine image 
FROM alpine:latest as runner
# Setting the working directory again
WORKDIR /usr/app/my-go-app
# In this case, we're copying from the previous step the compiled file to this step
COPY --from=builder /usr/src/my-go-app/my-go-app .
# The main purpose of a CMD is to provide defaults for an executing container
CMD [ "./my-go-app" ]
````

We can build it with `docker build -t my-go-image .` and run it with `docker run --rm my-go-image`, where we will expect to see the output `Hello from inside a container`.
