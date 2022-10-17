# Docker Compose Cheat Sheet

Basic syntax example:

````yaml
services:
    web:
        args: # Providing arguments to build time
            MEANING_OF_LIFE: 42
        environment: # Or environment variables to build and runtime
            OICD_URL: https://the-oidc.com/v1/.well-known-configuration 
        context:
        container_name: web-server
        dockerfile: Dockerfile
        ports:
            - "1234:5678" # Exposes container port 5678 and maps it to port 1234 on the host
            - "22000" # Exposes port 22000 only to other services, host cannot access
        depends_on:
            - redis # Waits for redis service to be up first, then starts this service. Useful for dependencies
    redis:
        image: redis
````

When you want to add volumes OR Bind mounts

````yaml
services:
    api:
        image: gradle:latest
        volumes:
            - gradlecache:$HOME/.gradle # Create and mount a volume in the container at $HOME/.gradle
            - $HOME/.aws/credentials:$HOME/.aws/credentials:ro # Bind mount your AWS credentials folder with the container

volumes:
    gradlecache:
````

## Commands

**Note**: For this commands to work you should be in the folder where the file `docker-compose.yml` lives.

````bash
# Start or stop the project's containers
docker compose (start|stop)

# Pause or unpause the project's containers
docker compose (pause|unpause)

# Monitor the project's containers (Uptime, Ports ...)
docker compose ps

# Create the project containers, networks and volumes (the last two if mentioned by the docker-compose.yml) and start them
docker compose up

# Create the project containers, networks and volumes with daemon and start them
docker compose up -d

# Create the project containers, networks and volumes with daemon building/rebuilding first before starting them
docker compose up -d --build

# Destroy the project containers, networks and volumes
docker compose down
````

By default the name of the project that Docker compose will create will be the name of the folder where the `docker-compose.yml` lives. You can override this by using the `-p` flag, for example:

````bash
docker compose -p enrolment up -d --build
````

This ensures that all the containers are under the name `enrolment`, just modify to your needs. All the images built with the command above will have their name prefixed with `enrolment-`.
