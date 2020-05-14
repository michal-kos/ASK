SHELL := /bin/bash
.PHONY: docs

## Docker images tools...
build-dev:
	echo "Building dev image as askproject:dev..."
	docker build -t askproject:dev . --build-arg env=dev
	make build-front

build-prod:
	echo "Building prod image as askproject:prod..."
	docker build -t askproject:prod . --build-arg env=prod

build-front:
	echo "Building frontend image as askproject:front"
	docker build -t askproject:front frontend/ask-project/

cleanup-images:
	docker image rm $$(docker images -f "label=project=askproject" -q)