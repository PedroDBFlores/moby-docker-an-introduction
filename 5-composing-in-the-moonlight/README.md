# Composing in the moonlight

Docker is also able to compose, and when I mean compose I mean setup some kind of infrastructure on which your containers run. 

Welcome to `docker-compose`, that allows you to define a Docker application running one or more containers.

Let's run `docker-compose -p compose-moonlight up -d --build`

# One more thing

Notice how we have `REDIS_HOSTNAME: redis-db` as a hostname on our docker-compose file. The container name is also able to be resolved as a hostname for the service, thus we can use it to reach our service from another container, provided that it's on the same network though.

When accessing on this way though, remember that you should **always** use the internal port, not the exposed port. Don't be like me wasting one hour of your life in this...