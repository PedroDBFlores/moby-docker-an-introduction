---
title:
- Moby Docker, an introduction
author:
- Pedro Flores
theme:
- Darmstadt
date:
- 12 October 2022
---

# What's going to happen during this presentation?

- A small introduction about Docker
- Core parts used on our day 2 day during work
- Some tips and tricks on Docker usage
- Questions & Feedback

# What's Docker after all?

A project that automates the deployment of apps by providing a sandbox over the host operating system.

It might seem like a VM, but it makes use of low level techniques present in the Linux kernel that allow for this kind of very lightweight containers.

# What are containers? Is that what they ship overseas?

Yes. But also a way to isolate applications by themselves, with their very specific environment variables and dependencies.

They are portable because they're decoupled from the underlying operating system, which makes it perfect for deploying on your machine for local development, or eventually in another machine or PaaS.

And it helps avoid the **it works on my machine** answer that we sometimes hear.

# What's the aim here?


Learn how to run images, containerize stuff and orchestrate project deployment with `docker-compose`.

````bash
brew install docker
````

That was easy. After installation open it to check that everything is working.

On you local terminal, just try to run:

````bash
docker run hello-world
````

You should see some messages, especially you will see the `Hello from Docker!` message.
