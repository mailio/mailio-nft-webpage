.PHONY: build-staging
build-staging: ## Build the staging docker image.
	docker compose -f docker/staging/docker-compose.yml build

.PHONY: start-staging
start-staging: ## Start the staging docker container.
	docker compose -f docker/staging/docker-compose.yml up -d

.PHONY: stop-staging
stop-staging: ## Stop the staging docker container.
	docker compose -f docker/staging/docker-compose.yml down

.PHONY: build-prod
build-prod: ## Build the staging docker image.
	docker compose -f docker/production/docker-compose.yml build

.PHONY: start-prod
start-prod: ## Start the staging docker container.
	docker compose -f docker/production/docker-compose.yml up -d

.PHONY: stop-prod
stop-prod: ## Stop the staging docker container.
	docker compose -f docker/production/docker-compose.yml down