# JS Portfolio

An attempt to create a ascii graphics js framework which can souble as my *portfolio*.

## Setup

You need [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/) installed.

From project root, run:

```bash
$ docker-compose up --build nginx
```

... to install and start the server, and:

```bash
$ docker-compose run closure-compiler
```

... to rebuild js files (while server is running).

## PhpStorm

For **PhpStorm** (or other JetBrains IDEs) there is a run configuration called "Run server" which starts the server, and a file watcher called "Closure Compiler" which rebuilds the js files each they're changed.
