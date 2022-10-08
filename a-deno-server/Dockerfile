FROM denoland/deno:alpine

USER deno

WORKDIR /app
COPY /src .
RUN deno cache main.ts dad-jokes.ts 
# Line above caches in ADVANCE
CMD ["run", "--allow-net", "main.ts", "12000"]
