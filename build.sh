#for local testing/or local docker container
image=docker-parus-smart-bot
container=docker-parus-smart-bot
port=3136

docker stop $container
docker image rm $image
docker rm $container
docker build -t $image -f Dockerfile . --build-arg PORT=$port
docker run --restart=always --env PORT=80 -d -p $port:80 --env-file=.env --name $container $image