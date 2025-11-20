# for running docker

docker compose up -d
or
docker compose up -d --remove-orphans

# for laravel bash

cp .env.test .env
php artisan key:gen
composer install

# remove images

docker image prune -a

# remove containers

docker ps -a # See all containers
docker stop CONTAINER_ID
docker rm CONTAINER_ID

# remove all containers and images

docker container stop $(docker container ls -aq)
docker container rm $(docker container ls -aq)
docker image rm $(docker image ls -aq)

docker-compose down --rmi all --volumes --remove-orphans
