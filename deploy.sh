#!/bin/bash
docker build -t ookok/thales .
docker push ookok/thales

ssh deploy@$DEPLOY_SERVER << EOF
docker pull ookok/thales
docker stop api-boilerplate || true
docker rm api-boilerplate || true
docker rmi ookok/thales:current || true
docker tag ookok/thales:latest ookok/thales:current
docker run -d --restart always --name api-boilerplate -p 3000:3000 ookok/thales:current
EOF
