SHELL := /bin/bash
.PHONY: docs

## Docker images tools...
build-dev:
	echo "Building dev image as askproject:dev..."
	docker build -t askproject:dev . --build-arg env=dev

build-prod:
	echo "Building prod image as askproject:prod..."
	docker build -t askproject:prod . --build-arg env=prod

cleanup-images:
	docker image rm $$(docker images -f "label=project=taisr" -q)