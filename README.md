
# Docker Express

Develop your next Express app easily and without worrying about your machine setup.

# Summary
- [Main commands](#main-commands)
- [Notes](#notes)

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

# Stop and remove containers, volumes and network related to the development environment
docker-compose down

# Stop and remove containers, volumes, images and network related to the development environment
docker-compose down --rmi=all
```

# Notes

## Why use `nodemon --legacy-watch` with Windows hosts ?

If you note, in `./app/package.json`, the [nodemon](https://github.com/remy/nodemon) utility is used with the flag `--legacy-watch`. As default Nodemon uses the filesystem events to know when a file is being modified in order to restart the app. Due to a limit of vboxsf (Virtual Box Share Folders), these events may not be triggered if you change your files from a Window's host and your app may not be restarted properly. This flag allows Nodemon to use a different method to know when a file is being modified which works better with Windows hosts.

For further details:
- https://stackoverflow.com/questions/39239686/nodemon-doesnt-restart-in-windows-docker-environment/39239884#39239884
- https://github.com/remy/nodemon#application-isnt-restarting
- https://www.virtualbox.org/ticket/10660?cversion=0&cnum_hist=1