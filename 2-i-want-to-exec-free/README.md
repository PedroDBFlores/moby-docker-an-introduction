# Executing on a container

What's radically different here is that you cannot `exec` your way into an image, it needs to be a running container.

Let's setup one with the image that we've downloaded previously.

````bash
docker run --name running_busybox --rm -i -t busybox sh
````

Being:

- --rm : Removing the container after it exited
- -i : Keep STDIN open even it not attached
- -t : Allocate a pseudo-TTY
  
This will create a running busybox container listening with `sh` on STDIN.

-----

It will be open in your terminal. Now to test this, open another terminal and run:

````bash
docker exec -it busybox-with-container sh
````

Go back to the first terminal, and then you can check in the `/tmp` folder that the `my_folder` folder is there.

