# A-deno-server

Let's just not print something on STDOUT since it's not that useful, but hosting a webserver might be a little bit better. Let's write something with the Deno runtime.

We have our Dockerfile right [here](./a-deno-server/Dockerfile), which we will go through now. Let's build it with `docker build -t my-deno-webserver:latest .`

## Exposé... actually EXPOSE

Run `docker run --rm -p 12000:12000 my-deno-webserver`. What's up with the `-p 12000:12000` part?

By default all containers are blocked from exposing their ports to the outside (host machine). In order for this to happen we need to be explicit about which ports we allow through from the container, in this case the port argument reads like `-p HOST_PORT:CONTAINER_PORT`, they don't need to be the same and there can be multiple `-p` arguments.

Let's try it like this: `docker run --rm my-deno-webserver`. What happens to the Postman call?

````dockerfile
EXPOSE 12000
````

Let's put it on our Dockerfile. This might seem that it will autoexpose the port but actually it only serves as metadata for who is running the image, so that the consumer is aware that which ports are intended to be exposed. Then it makes sense to use the `-p 12000:12000` argument since we know what to expose.

If you're feeling lucky, you can use the `-P` argument to randomly expose the port mentioned in the Dockerfile, it might or not match the one on the Dockerfile, you can check which port is assigned by running `docker ps`.

For most images, running without any method of configuring them would be insane.