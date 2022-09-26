# Running built images

For an experiment, let's go with a simple image
that's already built in Docker Hub.

````bash
docker pull busybox
````

 This will download an busybox Docker image to your machine. For those that don't know that busybox is, it's a set of POSIX utilites that exist in single binary file.

This alone doesn't do much, let's **actually** use the image that we've downloaded.

````bash
docker run busybox ls -la
````

-----

So running the `busybox` image and then the command to be run in that image is `ls -la`, which will list the / directory, long listed and not ignoring entries starting with a dot.

However there's small detail here. Every time you run an image on Docker like this, it will create a container for this.

If you run `docker ps -a` after you run your image you will something like this:

| CONTAINER ID | IMAGE | COMMAND | CREATED | STATUS | PORTS | NAMES |
|-|-|-|-|-|-|-|
|RANDOM|busybox|"ls-la"|At some point|Exited||the_best_name

# Being interactive

We can run more than one command, let's open an **in**teractive session:

````bash
docker run -it busybox sh
````

Happy? We've now opened an TTY terminal to a busybox container. Just run whatever you feel like, you can even run `rm -rf /bin` and exit the container. When you run it again, a fresh container is recreated and thus it's like nothing happened.

After playing you can delete them manually with `docker rm CONTAINER_ID`
or with `$ docker rm $(docker ps -a -q -f status=exited)` (of course beware of the second one if you have already additional containers created!)
