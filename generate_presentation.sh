#!/bin/zsh

pandoc -t beamer -s README.md \
1-running-up-that-hill/README.md \
2-i-want-to-exec-free/README.md \
3-my-dockerfile-romance/README.md \
4-server-room-sound/README.md \
5-composing-in-the-moonlight/README.md \
6-i-like-big-volumes-and-i-cannot-lie/README.md \
7-binding-lights/README.md \
8-tips-and-tricks/README.md \
-d $PWD/pandoc-config \
-o presentation.pdf
