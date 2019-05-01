
# Docker Express

Develop your next Express app easily and without worrying about your machine setup.

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