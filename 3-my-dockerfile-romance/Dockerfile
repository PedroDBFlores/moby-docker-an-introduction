# The image to use for building our app, in this case an Alpine image with Go support builtin
FROM golang:1.19-alpine as builder

# Setting the working directory
WORKDIR /usr/src/my-go-app
# Using the context that we've provided in the `docker build` command, let's
# copy the pkg folder to our working directory
COPY pkg/ .
# Runs go build at our current directory
RUN go build

# The image to use for running our app, in this case an Alpine image 
FROM alpine:latest as runner
# Setting the working directory again
WORKDIR /usr/app/my-go-app
# In this case, we're copying from the previous step the compiled file
# to this step
COPY --from=builder /usr/src/my-go-app/my-go-app .
# Setting the default instruction when the image is run
CMD [ "./my-go-app" ]