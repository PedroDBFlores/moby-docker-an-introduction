# Volumes

Unlike a measurement in three dimensional space, volumes in Docker are the preferred way to persist data generated and used by Docker containers.

Let's create one by running `docker volume create my-volume` That's really all there is to it. Despite the obvious:

````bash
docker volume ls # List all volumes
docker volume inspect my-volume # Inspect a named volume
docker volume rm my-volume # Remove a specific volume
````

Let's try it out, let's create a volume and bind it to a container.

`docker run -d -i -t --name busybox-with-container --mount source=my-volume,target=/vol busybox`

If you run `docker inspect busybox-with-container` you will see it in the `mounts` section.

Let's check what's inside:

````bash
docker exec -it busybox-with-volume sh
ls -la /vol
# Let's write something there
echo "Hello from the other side" > /vol/my-file.txt`
cat /vol/my-file.txt
````

Now let's stop the container and restart it to see that our file didn't disappear.

````bash
docker restart busybox-with-volume
docker exec -it busybox-with-volume sh
cat /vol/my-file.txt
````

To prove that it can attach to whatever we want, let's run: `docker run --mount source=my-volume,target=/vol alpine:latest cat /vol/my-file.txt`

And you can also mount it as readonly and try to read it:

`dockerfiles docker run --mount source=my-volume,target=/vol,readonly alpine:latest cat /vol/my-file.txt`

But it should fail writing to it:

`dockerfiles docker run --mount source=my-volume,target=/vol,readonly alpine:latest sh -c 'echo Cannot touch this >> /vol/my-file.txt'`

## What about the compose thing you showed previously?

This also applies to docker-compose:

````yaml
services:
  backend:
    image: denoland/deno
    volumes:
      - src:/home/src
volumes:
  src:
````

On first invocation will create a `src` container that will be reused for the following invocations.

-----

But running:

````yaml
services:
  backend:
    image: denoland/deno
    volumes:
      - src:/home/src
volumes:
  src:
    external:true
````

Will **not** create a volume, it will expect one to be created already.
