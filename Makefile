SHELL := /bin/bash
.PHONY: docs

## Docker images tools...

run:
	docker-compose up

build-dev:
	echo "Building dev image as askproject:dev..."
	docker build -t askproject:dev . --build-arg env=dev
	make build-front

build-front:
	echo "Building frontend image as askproject:front"
	docker build -t askproject:front frontend/ask-project/

get-openldap-ip: 
	docker inspect ask_ask_phpldapadmin_1 | grep "IPAddress"

cleanup-images:
	docker image rm $$(docker images -f "label=project=askproject" -q)