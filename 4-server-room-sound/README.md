# A-deno-server

Let's just not print something on STDOUT since it's not that useful, but hosting a webserver might be a little bit better. Let's write something in Deno.

We have our Dockerfile right [here](./Dockerfile), which we will go through now. Let's build it with `docker build -t my-deno-webserver:latest .`

# Exposé... actually EXPOSE

Run `docker run --rm -p 12000:12000 my-deno-webserver`. What's up with the `-p 12000:12000` part?

By default all containers are blocked from exposing their ports to the outside (host machine). In order for this to happen we need to be explicit about which ports we allow through from the container, in this case the port argument reads like `-p HOST_PORT:CONTAINER_PORT`, they don't need to be the same and there can be multiple `-p` arguments.

Let's try it like this: `docker run --rm my-deno-webserver`. What happens to the Postman call?

-----

````dockerfile
EXPOSE 12000
````

Let's put it on our Dockerfile. This might seem that it will autoexpose the port but actually it only serves as metadata for who is running the image, so that the consumer is aware that which ports are intended to be exposed. Then it makes sense to use the `-p 12000:12000` argument since we know what to expose.

If you're feeling lucky, you can use the `-P` argument to randomly expose the port mentioned in the Dockerfile, it might or not match the one on the Dockerfile, you can check which port is assigned by running `docker ps`.

For most images, running without any method of configuring them would be insane.

-----

# Arguments to the rescue

**Disclaimer**, never used arguments for build time so bear with me.

Arguments can be used during build-time of an image to configure something during build, let's try it with our server:

````dockerfile
ARG TEAM=team-budgie
LABEL CONTRIBUTERS=${TEAM}
````

The `LABEL` command is just metadata for the image, so let's add some contributers to it.

-----

Building it like we did before, let's run `docker image inspect my-deno-webserver`, we can see on the resulting JSON:

````json
"Labels": {
    "CONTRIBUTERS": "team-budgie"
}
````

But if we run it with `docker build -t my-deno-webserver:latest --build-arg TEAM=team-falcon .`, we get:

````json
"Labels": {
    "CONTRIBUTERS": "team-falcon"
}
````

This is only a simple example, something more concrete would be passing as an arg a version of repo so that a versioned image can be built, like the image would clone a repo and build itself.

**Note**: You cannot use `ARG` in a `CMD` statement without some tricks.

# Save the environment

Unlike `ARG` which works only during build time and is not present anywhere else, `ENV` will work during build and run time.

Let's modify our Dockerfile with:

````dockerfile
ENV PORT=12000
EXPOSE $PORT
....
CMD ["run", "--allow-net", "-allow-env=PORT", "main.ts"]
````

And our `main.ts` file with:

````typescript
const port = Number.parseInt(args[0] 
    ?? Deno.env.get("PORT")!);
````

-----

If we build and run it, it should still work the same. Let's change the port though, run this:

`docker run --rm -p 6565:6565 -e "PORT=6565" my-deno-webserver`

And our port should now be 6565, and using Postman now on that port it should be reachable.
