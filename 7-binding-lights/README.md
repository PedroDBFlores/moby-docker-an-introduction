# Bind mounts

One small thing that might be relevant (mostly) during your local development is bind mounts. With bind mounts you can expose part of your host's filesystem.

Let's try to see my `.zshenv`, which only has Cargo stuff.

`docker run --mount type=bind,source="$HOME",target=/bind alpine:latest sh -c 'cat /bind/.zshenv'`

And of course, trying to write will fail with `readonly`

`docker run --mount type=bind,source="$HOME",target=/bind,readonly alpine:latest sh -c 'echo Cannot touch this >> /bind/.zshenv'`

-----

# How about in Docker compose?

You can do it like this:

````yaml
volumes:
      - $HOME/.aws/credentials:/root/.aws/credentials:ro
````

An equivalent form is:

````yaml
volumes:
    - type: bind
      source: $HOME/.aws/credentials
      target: /root/.aws/credentials
      read_only: true
````