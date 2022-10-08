# Running built images

For an experiment, let's go with a simple image
that's already built in [Docker Hub](https://hub.docker.com/). On Docker Hub we can find a multitude of images, from databases to web servers to compilers, just peruse at your heart's desire.

````bash
docker pull busybox
````

 This will download an busybox Docker image to your machine. For those that don't know that busybox is, it's a set of POSIX utilites that exist in single binary file.

 POSIX stands for Portable Operating System Interface and is an IEEE standard. It's a set of interfaces and applications that must be common on POSIX certified operating systems, and if compiled and run on one of these systems it should behave equally in all adhering operating systems.

This alone doesn't do much, let's **actually** use the image that we've downloaded.

````bash
docker run --rm busybox ls -la
````



So running the `busybox` image and then the command to be run in that image is `ls -la`, which will list the / directory, long listed and not ignoring entries starting with a dot.

However there's small detail here. Every time you run an image on Docker it will create a container that will be lying there, unless you provide the `--rm` flag.

## Being interactive

We can run more than one command, let's open an **in**teractive session:

````bash
docker run -it busybox sh
````

We've now opened an TTY terminal to a busybox container. Just run whatever you feel like, you can even run `rm -rf /bin` and exit the container. When you run it again, a fresh container is recreated and thus it's like nothing happened.

After playing you can delete them manually with `docker rm CONTAINER_ID`
or with `$ docker rm $(docker ps -a -q -f status=exited)` (of course beware of the second one if you have already additional containers created!)
