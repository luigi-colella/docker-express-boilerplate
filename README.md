
# Docker Express

Develop your next Express app easily and without worrying about your machine setup.

# Summary
- [Main commands](#main-commands)
- [Troubleshooting](#troubleshooting)

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