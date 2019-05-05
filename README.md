
# Docker Express

Develop your next Express app easily and without worrying about your machine setup.

# Summary
- [Stack](#stack)
- [Requirements](#requirements)
- [Main commands](#main-commands)
- [Troubleshooting](#troubleshooting)

# Stack

![Docker](https://github.com/lgcolella/docker-express/raw/master/repository/docker.png "Docker")
![Express](https://github.com/lgcolella/docker-express/raw/master/repository/express.png "Express")
![MongoDB](https://github.com/lgcolella/docker-express/raw/master/repository/mongo.png "MongoDB")
![Redis](https://github.com/lgcolella/docker-express/raw/master/repository/redis.png "Redis")
![MochaJS](https://github.com/lgcolella/docker-express/raw/master/repository/mocha.png "MochaJS")
![Yarn](https://github.com/lgcolella/docker-express/raw/master/repository/yarn.png "Yarn")

# Requirements

To use this development environment and add the services that you prefer, you only need Docker and Docker Compose installed on your pc.
If you are on Windows or OS X, Docker Compose is already included in the installation of Docker, while if you are on Linux, you need to install Docker Compose after Docker.
- [Install Docker](https://docs.docker.com/install/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

# Main commands

```sh
# Start the development environment
docker-compose up -d

# Access to the filesystem of the app's container
docker-compose exec app bash

# Stop the development environment
docker-compose stop

# Rebuild container's images
docker-compose build

# Stop services' containers without removing them
docker-compose down

# Stop and remove services' containers, volumes, images and network related to the development environment
docker-compose down --remove-orphans -v --rmi=all
```
When you've launched the services' container, log into app's container shell:
```sh
docker-compose exec app bash
```
Once you are logged into the container, start the app using one of the following commands:
```sh
# Start application in production mode
yarn start
# Start application in development mode
yarn dev
# Start application in debug mode
yarn debug
# Launch tests
yarn test
```
You can also launching commands from host, for example:
```sh
# Launch tests
docker-compose exec app yarn test
```

# Troubleshooting

## Why use `nodemon --legacy-watch` on Windows hosts ?

If you note, in `./app/package.json`, the [nodemon](https://github.com/remy/nodemon) utility is used with the flag `--legacy-watch`. As default Nodemon uses the filesystem events to know when a file is being modified in order to restart the app. Due to a limit of vboxsf (Virtual Box Share Folders), these events may not be triggered if you change your files from a Window's host and your app may not be restarted properly. This flag allows Nodemon to use a different method to know when a file is being modified which works better with Windows hosts.

For further details:
- https://stackoverflow.com/questions/39239686/nodemon-doesnt-restart-in-windows-docker-environment/39239884#39239884
- https://github.com/remy/nodemon#application-isnt-restarting
- https://www.virtualbox.org/ticket/10660?cversion=0&cnum_hist=1

## NPM throws `An unexpected error occurred: "EPROTO: protocol error` during a package installation on Windows hosts

When NPM (or Yarn) adds a new package in the `node_modules` folder, it tries to create a symlink to the binary of the package in `node_modules/.bin`. Since Linux symlinks are different from the Windows ones, this action may create issues when performed on a folder of a shared volume (in this case the `node_modules` folder) and throws errors like the above one.

To avoid the problem you can install the packages avoiding the symlinks creation by using the option `--no-bin-links`
```sh
# Install dependencies from package.json
npm install --no-bin-links
yarn --no-bin-links
# Add a new dependency
npm install underscore --no-bin-links
yarn add --no-bin-links
```

## Mongodb container exits with error code 14 on Windows or OS X hosts

If you try to share on these host the folder where MongoDB stores data, the container will exit with an error 14. In fact MongoDB uses the memory mapped files which are not suitable for the way used by VirtualBox to share the folders across the container and one of the those hosts. If you want your MongoDB database to persist, use other options offered by Docker like anonymous volumes or named volumes.

For further details:
- https://github.com/docker-library/docs/blob/b78d49c9dffe5dd8b3ffd1db338c62b9e1fc3db8/mongo/content.md#where-to-store-data