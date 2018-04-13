#!/bin/bash
docker build -t danetheory/asgard .
docker push danetheory/asgard

ssh deploy@$DEPLOY_SERVER << EOF
docker pull danetheory/asgard
docker stop api-boilerplate || true
docker rm api-boilerplate || true
docker rmi danetheory/asgard:current || true
docker tag danetheory/asgard:latest danetheory/asgard:current
docker run -d --restart always --name api-boilerplate -p 3000:3000 danetheory/asgard:current
EOF
