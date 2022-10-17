FROM denoland/deno:alpine

USER deno

ENV PORT=12000
EXPOSE $PORT

WORKDIR /app
COPY . .
RUN deno cache redis.ts server.ts main.ts 
# Line above caches in ADVANCE
CMD ["run", "--allow-net", "--allow-env", "main.ts"]
