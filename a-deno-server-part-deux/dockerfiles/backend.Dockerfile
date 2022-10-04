FROM denoland/deno:alpine

USER deno

EXPOSE $PORT

WORKDIR /app
COPY /src .
RUN deno cache redis.ts server.ts main.ts 
# Line above caches in ADVANCE
CMD ["run", "--allow-net", "--allow-env", "main.ts"]
