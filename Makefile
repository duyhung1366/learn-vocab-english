# VocabPractice Docker Build and Deploy Makefile

# Configuration
REGISTRY = registry.gitlab.com
PROJECT = duyhungfa102/learn-vocab-english
IMAGE_NAME = $(REGISTRY)/$(PROJECT)

# Version management
VERSION ?= latest
TAG ?= $(VERSION)
COMMIT_HASH = $(shell git rev-parse --short HEAD 2>/dev/null || echo "unknown")
BUILD_DATE = $(shell date -u +"%Y-%m-%dT%H:%M:%SZ")
GIT_BRANCH = $(shell git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")

# Docker Compose files
COMPOSE_FILE = docker-compose.yml
COMPOSE_PROD_FILE = docker-compose.prod.yml

# Version validation
SEMVER_REGEX = ^v?([0-9]+)\.([0-9]+)\.([0-9]+)(-[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?(\+[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?$$

.PHONY: help build push build-push test clean login dev prod stop logs version-build version-push release tag-version list-tags validate-version push-latest push-commit push-version-only release-version-only release-with-latest

# Default target
help: ## Show this help message
	@echo "VocabPractice Docker Commands"
	@echo "============================="
	@echo ""
	@echo "Current Configuration:"
	@echo "  Registry: $(REGISTRY)"
	@echo "  Project:  $(PROJECT)"
	@echo "  Version:  $(VERSION)"
	@echo "  Tag:      $(TAG)"
	@echo "  Commit:   $(COMMIT_HASH)"
	@echo "  Branch:   $(GIT_BRANCH)"
	@echo ""
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

validate-version: ## Validate version format (semantic versioning)
	@if [ "$(VERSION)" != "latest" ] && ! echo "$(VERSION)" | grep -qE "$(SEMVER_REGEX)"; then \
		echo "❌ Invalid version format: $(VERSION)"; \
		echo "   Expected format: v1.2.3, 1.2.3, v1.2.3-alpha, v1.2.3-beta.1, etc."; \
		exit 1; \
	fi
	@echo "✅ Version format is valid: $(VERSION)"

build: validate-version ## Build Docker image using Docker Compose
	@echo "🔨 Building Docker image with version: $(VERSION)"
	@echo "📋 Build info:"
	@echo "   Image: $(IMAGE_NAME):$(TAG)"
	@echo "   Commit: $(COMMIT_HASH)"
	@echo "   Date: $(BUILD_DATE)"
	@echo "   Branch: $(GIT_BRANCH)"
	@echo ""
	docker-compose -f $(COMPOSE_FILE) build --no-cache vocab-practice
	@if [ "$(VERSION)" != "latest" ]; then \
		docker tag $(IMAGE_NAME):latest $(IMAGE_NAME):$(VERSION); \
		echo "🏷️  Tagged as: $(IMAGE_NAME):$(VERSION)"; \
	fi
	@docker tag $(IMAGE_NAME):latest $(IMAGE_NAME):$(COMMIT_HASH)
	@echo "🏷️  Tagged as: $(IMAGE_NAME):$(COMMIT_HASH)"
	@echo "✅ Build completed!"

push: ## Push all Docker image tags to GitLab Registry (latest, version, commit)
	@echo "📤 Pushing ALL Docker image tags to registry..."
	@echo "⚠️  Make sure you're logged in: make login"
	@echo ""
	@echo "Pushing tags:"
	@echo "  - latest"
	docker push $(IMAGE_NAME):latest
	@if [ "$(VERSION)" != "latest" ]; then \
		echo "  - $(VERSION)"; \
		docker push $(IMAGE_NAME):$(VERSION); \
	fi
	@if [ "$(COMMIT_HASH)" != "unknown" ]; then \
		echo "  - $(COMMIT_HASH)"; \
		docker push $(IMAGE_NAME):$(COMMIT_HASH); \
	fi
	@echo "✅ All tags pushed!"

push-latest: ## Push only the 'latest' tag to registry
	@echo "📤 Pushing ONLY 'latest' tag to registry..."
	@echo "⚠️  Make sure you're logged in: make login"
	docker push $(IMAGE_NAME):latest
	@echo "✅ Latest tag pushed!"

push-commit: ## Push only the commit hash tag to registry
	@if [ "$(COMMIT_HASH)" = "unknown" ]; then \
		echo "❌ No git commit hash available"; \
		exit 1; \
	fi
	@echo "📤 Pushing ONLY commit hash tag to registry..."
	@echo "⚠️  Make sure you're logged in: make login"
	docker push $(IMAGE_NAME):$(COMMIT_HASH)
	@echo "✅ Commit hash tag $(COMMIT_HASH) pushed!"

push-version-only: ## Push ONLY the specific version tag (usage: make push-version-only VERSION=v1.1.0)
	@if [ "$(VERSION)" = "latest" ]; then \
		echo "❌ Please specify a version: make push-version-only VERSION=v1.1.0"; \
		exit 1; \
	fi
	@echo "📤 Pushing ONLY version tag $(VERSION) to registry..."
	@echo "⚠️  Make sure you're logged in: make login"
	@echo "⚠️  This will NOT update 'latest' or commit hash tags"
	@echo ""
	docker push $(IMAGE_NAME):$(VERSION)
	@echo "✅ Version tag $(VERSION) pushed!"

version-build: ## Build Docker image with specific version (usage: make version-build VERSION=v1.0.0)
	@if [ "$(VERSION)" = "latest" ]; then \
		echo "❌ Please specify a version: make version-build VERSION=v1.0.0"; \
		exit 1; \
	fi
	@$(MAKE) build VERSION=$(VERSION)

version-push: ## Push specific version + latest + commit (usage: make version-push VERSION=v1.0.0)
	@if [ "$(VERSION)" = "latest" ]; then \
		echo "❌ Please specify a version: make version-push VERSION=v1.0.0"; \
		exit 1; \
	fi
	@$(MAKE) push VERSION=$(VERSION)

release: ## Build and push a versioned release with ALL tags (usage: make release VERSION=v1.0.0)
	@if [ "$(VERSION)" = "latest" ]; then \
		echo "❌ Please specify a version: make release VERSION=v1.0.0"; \
		exit 1; \
	fi
	@echo "🚀 Creating FULL release $(VERSION) (pushes all tags)..."
	@$(MAKE) version-build VERSION=$(VERSION)
	@$(MAKE) test VERSION=$(VERSION)
	@$(MAKE) version-push VERSION=$(VERSION)
	@echo "✅ Full release $(VERSION) completed!"

release-version-only: ## Build and push ONLY the version tag (usage: make release-version-only VERSION=v1.1.0)
	@if [ "$(VERSION)" = "latest" ]; then \
		echo "❌ Please specify a version: make release-version-only VERSION=v1.1.0"; \
		exit 1; \
	fi
	@echo "🚀 Creating VERSION-ONLY release $(VERSION)..."
	@echo "⚠️  This will NOT update 'latest' tag in registry"
	@$(MAKE) version-build VERSION=$(VERSION)
	@$(MAKE) test VERSION=$(VERSION)
	@$(MAKE) push-version-only VERSION=$(VERSION)
	@echo "✅ Version-only release $(VERSION) completed!"

release-with-latest: ## Build, push version tag, and update latest (usage: make release-with-latest VERSION=v1.1.0)
	@if [ "$(VERSION)" = "latest" ]; then \
		echo "❌ Please specify a version: make release-with-latest VERSION=v1.1.0"; \
		exit 1; \
	fi
	@echo "🚀 Creating release $(VERSION) with latest update..."
	@$(MAKE) version-build VERSION=$(VERSION)
	@$(MAKE) test VERSION=$(VERSION)
	@$(MAKE) push-version-only VERSION=$(VERSION)
	@$(MAKE) push-latest
	@echo "✅ Release $(VERSION) with latest update completed!"

build-push: build push ## Build and push Docker image

test: ## Test the built Docker image locally
	@echo "🧪 Testing Docker image: $(IMAGE_NAME):$(TAG)"
	docker run -d --name vocab-test -p 3001:3000 $(IMAGE_NAME):$(TAG)
	@echo "⏳ Waiting for container to start..."
	@sleep 10
	@echo "🔍 Testing health endpoint..."
	@curl -f http://localhost:3001/api/health || (echo "❌ Health check failed" && exit 1)
	@echo ""
	@echo "✅ Container is healthy!"
	@docker stop vocab-test && docker rm vocab-test
	@echo "🧹 Test container cleaned up"

tag-version: ## Create and push a git tag for the version (usage: make tag-version VERSION=v1.0.0)
	@if [ "$(VERSION)" = "latest" ]; then \
		echo "❌ Please specify a version: make tag-version VERSION=v1.0.0"; \
		exit 1; \
	fi
	@echo "🏷️  Creating git tag: $(VERSION)"
	git tag -a $(VERSION) -m "Release $(VERSION)"
	git push origin $(VERSION)
	@echo "✅ Git tag $(VERSION) created and pushed"

list-tags: ## List all available Docker image tags
	@echo "🏷️  Available Docker tags:"
	@docker images $(IMAGE_NAME) --format "table {{.Tag}}\t{{.Size}}\t{{.CreatedAt}}" || echo "No images found"
	@echo ""
	@echo "🏷️  Available Git tags:"
	@git tag -l | sort -V | tail -10 || echo "No git tags found"

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
	@echo "Version: $(VERSION)"
	@echo "Tag: $(TAG)"
	@echo "Commit: $(COMMIT_HASH)"
	@echo "Branch: $(GIT_BRANCH)"
	@echo "Build Date: $(BUILD_DATE)"
	@echo ""
	@echo "Available local images:"
	@docker images $(IMAGE_NAME) --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}" || echo "No images found"

verify-push: ## Verify that the version was pushed to registry
	@if [ "$(VERSION)" = "latest" ]; then \
		echo "❌ Please specify a version: make verify-push VERSION=v1.0.0"; \
		exit 1; \
	fi
	@echo "🔍 Verifying push for version: $(VERSION)"
	@echo "Checking registry for tags..."
	@docker pull $(IMAGE_NAME):$(VERSION) && echo "✅ Version $(VERSION) found in registry" || echo "❌ Version $(VERSION) not found in registry"
	@docker pull $(IMAGE_NAME):latest && echo "✅ Latest tag found in registry" || echo "❌ Latest tag not found in registry"

# Version shortcuts
v1.0.0: ## Quick build and push v1.0.0
	@$(MAKE) release VERSION=v1.0.0

v1.0.1: ## Quick build and push v1.0.1
	@$(MAKE) release VERSION=v1.0.1

v1.1.0: ## Quick build and push v1.1.0
	@$(MAKE) release VERSION=v1.1.0

# Quick commands and aliases
up: dev ## Alias for dev
down: stop ## Alias for stop
bp: build-push ## Alias for build-push

# Version-specific aliases
push-only: push-version-only ## Alias for push-version-only
release-only: release-version-only ## Alias for release-version-only
single-tag: push-version-only ## Alias for push-version-only
