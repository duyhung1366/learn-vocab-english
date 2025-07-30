# VocabPractice Docker Build and Deploy Makefile

# Configuration
REGISTRY = registry.gitlab.com
PROJECT = duyhungfa102/learn-vocab-english
IMAGE_NAME = $(REGISTRY)/$(PROJECT)
TAG ?= latest
COMMIT_HASH = $(shell git rev-parse --short HEAD 2>/dev/null || echo "unknown")

# Docker Compose files
COMPOSE_FILE = docker-compose.yml
COMPOSE_PROD_FILE = docker-compose.prod.yml

.PHONY: help build push build-push test clean login dev prod stop logs

# Default target
help: ## Show this help message
	@echo "VocabPractice Docker Commands"
	@echo "============================="
	@echo ""
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build Docker image using Docker Compose
	@echo "🔨 Building Docker image..."
	docker-compose -f $(COMPOSE_FILE) build --no-cache vocab-practice
	@echo "✅ Build completed!"

push: ## Push Docker image to GitLab Registry
	@echo "📤 Pushing Docker image to registry..."
	@echo "⚠️  Make sure you're logged in: make login"
	docker push $(IMAGE_NAME):latest
	@if [ "$(TAG)" != "latest" ]; then \
		docker tag $(IMAGE_NAME):latest $(IMAGE_NAME):$(TAG) && \
		docker push $(IMAGE_NAME):$(TAG); \
	fi
	@if [ "$(COMMIT_HASH)" != "unknown" ]; then \
		docker tag $(IMAGE_NAME):latest $(IMAGE_NAME):$(COMMIT_HASH) && \
		docker push $(IMAGE_NAME):$(COMMIT_HASH); \
	fi
	@echo "✅ Push completed!"

build-push: build push ## Build and push Docker image

test: ## Test the built Docker image locally
	@echo "🧪 Testing Docker image..."
	docker run -d --name vocab-test -p 3001:3000 $(IMAGE_NAME):latest
	@echo "⏳ Waiting for container to start..."
	@sleep 10
	@echo "🔍 Testing health endpoint..."
	@curl -f http://localhost:3001/api/health || (echo "❌ Health check failed" && exit 1)
	@echo ""
	@echo "✅ Container is healthy!"
	@docker stop vocab-test && docker rm vocab-test
	@echo "🧹 Test container cleaned up"

login: ## Login to GitLab Registry
	@echo "🔐 Logging into GitLab Registry..."
	@echo "Please enter your GitLab username and password/token"
	docker login $(REGISTRY)

dev: ## Start development environment
	@echo "🚀 Starting development environment..."
	docker-compose -f $(COMPOSE_FILE) up -d
	@echo "✅ Development environment started!"
	@echo "🌐 Application: http://localhost:3002"
	@echo "❤️  Health check: http://localhost:3002/api/health"

prod: ## Start production environment
	@echo "🚀 Starting production environment..."
	docker-compose -f $(COMPOSE_PROD_FILE) up -d
	@echo "✅ Production environment started!"

stop: ## Stop all containers
	@echo "🛑 Stopping containers..."
	docker-compose -f $(COMPOSE_FILE) down || true
	docker-compose -f $(COMPOSE_PROD_FILE) down || true
	@echo "✅ Containers stopped!"

logs: ## Show container logs
	docker-compose -f $(COMPOSE_FILE) logs -f vocab-practice

clean: ## Clean up Docker images and containers
	@echo "🧹 Cleaning up..."
	docker-compose -f $(COMPOSE_FILE) down --rmi all --volumes --remove-orphans || true
	docker system prune -f
	@echo "✅ Cleanup completed!"

info: ## Show image information
	@echo "📊 Docker Image Information"
	@echo "=========================="
	@echo "Registry: $(REGISTRY)"
	@echo "Project: $(PROJECT)"
	@echo "Image: $(IMAGE_NAME)"
	@echo "Tag: $(TAG)"
	@echo "Commit: $(COMMIT_HASH)"
	@echo ""
	@echo "Available images:"
	@docker images $(IMAGE_NAME) --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}" || echo "No images found"

# Quick commands
up: dev ## Alias for dev
down: stop ## Alias for stop
bp: build-push ## Alias for build-push
