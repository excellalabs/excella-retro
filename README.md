# Excella Retrospective :) [ ![Codeship Status for excellaco/remote-retro-hapi](https://codeship.io/projects/842944b0-1444-0132-37bd-02b0a67a5018/status)](https://codeship.io/projects/33454)

A remote retrospective tool for Scrum Masters to hold a sprint retrospective to include remote members of the team. 

## Pre-requisites
1. Python 2.x
  * Latest version Python 2.x is required for node-gyp (Node 0.12 aims to remove this requirement). Make sure to select 'Add python.exe to Path' during installation.
1. Git
  * Make sure git cmd and bin folders are in your path.

## Setup
npm install

## Run
npm start

## Quickstart with Docker

You can also run this project using [Docker](https://www.docker.com/).

### Trying it out

If you just want to try this project without cloning this repository or installing any dependencies, run this command:

```
docker run -p 3000:3000 excellaco/remote-retro-hapi
```

Docker will pull down the latest image of this application and start a container from it, mapped to port 3000 on your host.

If you are using Docker on Mac or Windows, you would access the app at the IP address provided by the ``boot2docker ip`` command - likely http://192.168.59.103:3000/. If you are using Linux, you can go straight to [http://localhost:3000/](http://localhost:3000/).

### Developing with Docker

This repo is also configured to use [docker-compose](https://docs.docker.com/compose/) to make local development with Docker easier.

It uses Docker volumes to share your source code's directory with your container, so you don't need to rebuild your Docker image every time you have a code change.

To use Docker to run this project in development:

1. Install [docker-compose](https://docs.docker.com/compose/install/)
1. Clone this repository
1. Run ``docker-compose run web npm install`` and ``docker-compose run web bower install`` to install the dependencies
1. Run ``docker-compose up -d`` in your clone's directory

Docker-compose will build a new Docker image from the source code in your directory and then start a new container from that image.

At that point, the app should be accessible at [http://localhost:3000](http://localhost:3000) (or your ``boot2docker ip`` if on Mac/Windows). You can view the logs with ``docker-compose logs web``.

*Note that performance using VirtualBox with boot2docker for local development may be slow because your development directory will have lots of files. [This issue will hopefully be resolved in the near future](https://github.com/boot2docker/boot2docker/issues/64).*

## Tech Stack
* Node
* Angular
* Hapi LEBRON (LevelDB, Browserify, npm)
* Gulp

