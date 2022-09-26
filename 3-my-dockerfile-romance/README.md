# My first Dockerfile

For this example, you can find inside the `pkg` folder a super simple Go application. The idea here is to build that application and run it inside a container. In layman's terms, a Dockerfile is a file that describes how to build an image.
Some instructions are understood as a layer of a Docker image, for the resulting image of:

````dockerfile
FROM ubuntu:22.04
RUN apt install build-essentials git
CMD bash
````

It would have three layers, them being the delta of the changes of the previous layer. All these layers are read only, so even if you do some changes on a running container like reading/writing or deleting are made to a separate layer that is completely separate from the image.

-----

**Treat the image as always being readonly!**

We have our own Dockerfile right [here](./Dockerfile), which we will go through now. We can build it with `docker build -t my-go-image .` and run it with `docker run --rm my-go-image`
