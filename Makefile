# Makefile
include .env

define-environment:
	@echo "Using ${DOCKER_COMPOSE_FILE} file"

# SERVICE_NAMES := $(shell grep -v '^#' .env | sed '/^[[:space:]]*$$/d' | grep '^DOCKER_SERVICE_' | cut -d '=' -f 2- | tr '\n' ' ')
SERVICE_NAMES := node

build:
	make define-environment
	@docker compose -f ${DOCKER_COMPOSE_FILE} build $(SERVICE_NAMES)

up:
	make define-environment
	@docker compose -f ${DOCKER_COMPOSE_FILE} up -d $(SERVICE_NAMES)

down:
	make define-environment
	@docker compose -f ${DOCKER_COMPOSE_FILE} down

in:
	@bash .docker/scripts/in.sh

install:
	make build
	make up