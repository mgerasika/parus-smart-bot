#for local testing/or local docker container
image=docker-parus-smart-bot
container=docker-parus-smart-bot
port=3015
ports=443

docker stop $container
docker image rm $image
docker rm $container
docker build -t $image -f Dockerfile . --build-arg PORT=$port --build-arg PORTS=$ports
docker run --restart=always --env PORT=$port --env PORTS=$ports -d -p $port:3139 $ports:3140 --env-file=.env --env DATABASE_HOST=222 --name $container $image