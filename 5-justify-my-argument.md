
# Arguments

**Disclaimer**, never used arguments for build time so bear with me.

Arguments are known as build-time variables, and cannot be used at all during the container runtime or either on `CMD` or `ENTRYPOINT` commands.

If you fail to provide defaults for ARGs in your Dockerfile, and you don't provide them when building, the build will fail.

Take also note that the ARGs provided during build time can be inspected by `docker history`, so **NEVER** provide secrets via arguments.

Let's add below the `FROM` command the following code on the Dockerfile on the `a-deno-server` folder.

````dockerfile
ARG TEAM=team-budgie
LABEL CONTRIBUTERS=${TEAM}
````

The `LABEL` command is just metadata for the image, so let's add some contributers to it.

Let's run `docker image inspect my-deno-webserver`, on our current image. We'll find on the resulting JSON:

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

# Environment

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
