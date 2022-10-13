# Executing on a container

What's radically different here is that you cannot `exec` your way into an image, it needs to be a running container.

Let's setup one with the image that we've downloaded previously.

````bash
docker run --name busybox-with-container --rm -dit busybox sh
````

Being:

- --rm : Removing the container after it exited
- -d : Detached mode, exits when the daemon exits
- -i : Keep STDIN open even it not attached
- -t : Allocate a pseudo-TTY
  
This will create a running busybox container listening with `sh` on STDIN.

It will be open in your terminal. Now to test this, open two terminals and run:

````bash
docker exec -it busybox-with-container sh
````

Do the following:

- Create a new folder somewhere on the second terminal
- Go back to the first terminal
- Check for existence of said folder
- ???
- PROFIT
