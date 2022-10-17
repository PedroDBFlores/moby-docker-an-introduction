# Docker Cheat Sheet

## Running containers

````bash
# Start a container from an image
docker run IMAGE_NAME

# Start a container from an image giving it a name
docker run --name PREFERRED_NAME IMAGE_NAME

# Start a container with a different command
docker run IMAGE_NAME DIFFERENT_COMMAND

# Start a container with a different entrypoint
docker run --entrypoint NEW_ENTRYPOINT IMAGE_NAME

# Start a container with ports available to the host
docker run -p HOST_PORT:CONTAINER_PORT IMAGE_NAME

# Start a container in the background (daemon)
docker run -d IMAGE_NAME

# Mount a volume
docker run --mount source=my-volume,target=/vol IMAGE_NAME

# Bind a host folder 
docker run --mount type=bind,source="$HOME",target=/vol IMAGE_NAME

# Check the container's logs
docker logs CONTAINER_NAME
````

## Manage containers

````bash
# Show running containers
docker ps

# Show all containers, regardless of state
docker ps -a

# Delete a container
docker rm CONTAINER_NAME

# Force delete a container (if it's running for example)
docker rm -f CONTAINER_NAME

# Delete all stopped containers
docker container prune

# Stop, start, restart a container
docker (stop|start|restart) CONTAINER_NAME

# Kill a container (not graceful stop at all)
docker kill CONTAINER_NAME

# Pause or unpause a container
docker (pause|unpause) CONTAINER_NAME

# Execute a command on a running container
docker exec -it CONTAINER_NAME COMMAND

# Attach to a running container
docker attach CONTAINER_NAME

# Copy a file from container to host
docker cp CONTAINER_NAME:SOURCE_FILE HOST_TARGET

# Copy a file from host to container
docker cp SOURCE_FILE CONTAINER:CONTAINER_TARGET

# Rename a container
docker rename OLD_NAME NEW_NAME

# Show low-level container info
docker inspect CONTAINER_NAME

# Show stats of running containers
docker stats

# Show mapped ports of a container
docker port CONTAINER_NAME
````

## Manage images

````bash
# List local images
docker images

# Show the image history
docker history IMAGE_NAME

# Show low-level image info
docker inspect IMAGE_NAME

# Remove an image
docker rmi IMAGE_NAME

# Tag an image
docker tag IMAGE_NAME TAG

# Pull an image
# docker info | grep Registry will give you the current registry where
# the image will be searched
docker pull IMAGE_NAME[:tag]

# Push an image
# docker info | grep Registry will give you the current registry where
# the image will be pushed to
docker push IMAGE_NAME[:tag]

# Search an image on the registry
docker search text
````

## Dockerfile

````Dockerfile
FROM IMAGE # Base image for the subsequent commands

COPY /from /to # Copy from the host to a container directory

ADD /from /to # Same as copy but unzips files and accepts HTTP urls.

RUN args.. # Runs a command inside the container during build time

USER name # Sets the default user name

WORKDIR DIR # Sets the default working directory for commands

CMD args.. # Sets the default command for the container

ARG ARG_NAME=DEFAULT_VALUE # Sets an argument available during build time

ENV ARG_NAME=DEFAULT_VALUE # Sets an environment variable, available during build and runtime

EXPOSE ports.. # Sets metadata to tell which ports should be exposed when running the container, or when running with -P argument will be automatically exposed.

````

If you want to build an image from scratch, see [here](https://docs.docker.com/develop/develop-images/baseimages/#creating-a-simple-parent-image-using-scratch).
