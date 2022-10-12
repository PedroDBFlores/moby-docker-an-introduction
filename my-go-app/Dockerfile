FROM golang:1.19-alpine as builder
WORKDIR /usr/src/my-go-app
COPY pkg/ .
RUN go build

FROM alpine:latest as runner
WORKDIR /usr/app/my-go-app
COPY --from=builder /usr/src/my-go-app/my-go-app .
CMD [ "./my-go-app" ]