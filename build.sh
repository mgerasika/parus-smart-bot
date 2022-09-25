#for local testing/or local docker container
image=docker-parus-smart-bot
container=docker-parus-smart-bot
port=3135

docker stop $container
docker image rm $image
docker rm $container
docker build -t $image -f Dockerfile . --build-arg PORT=$port
docker run --restart=always --env PORT=$port -d -p $port:3135 --env-file=.env --env DATABASE_HOST=222 --name $container $image