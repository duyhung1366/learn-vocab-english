#!/bin/bash

# Build and Push Script for VocabPractice Docker Image
# Usage: ./build-and-push.sh [tag]

set -e

# Configuration
REGISTRY="registry.gitlab.com"
PROJECT="duyhungfa102/learn-vocab-english"
DEFAULT_TAG="latest"

# Get tag from argument or use default
TAG=${1:-$DEFAULT_TAG}
FULL_IMAGE_NAME="${REGISTRY}/${PROJECT}:${TAG}"

echo "🚀 Building and pushing VocabPractice Docker image..."
echo "📦 Image: ${FULL_IMAGE_NAME}"
echo ""

# Step 1: Build the image using Docker Compose
echo "🔨 Step 1: Building Docker image..."
docker-compose build --no-cache vocab-practice

# Step 2: Tag the image with additional tags if needed
echo "🏷️  Step 2: Tagging image..."
if [ "$TAG" != "latest" ]; then
    docker tag "${REGISTRY}/${PROJECT}:latest" "${FULL_IMAGE_NAME}"
fi

# Add commit hash tag if in git repository
if git rev-parse --git-dir > /dev/null 2>&1; then
    COMMIT_HASH=$(git rev-parse --short HEAD)
    COMMIT_TAG="${REGISTRY}/${PROJECT}:${COMMIT_HASH}"
    docker tag "${REGISTRY}/${PROJECT}:latest" "${COMMIT_TAG}"
    echo "📝 Tagged with commit hash: ${COMMIT_TAG}"
fi

# Step 3: Push to registry
echo "📤 Step 3: Pushing to GitLab Registry..."
echo "⚠️  Make sure you're logged in to GitLab Registry:"
echo "   docker login registry.gitlab.com"
echo ""

# Push latest tag
echo "Pushing latest tag..."
docker push "${REGISTRY}/${PROJECT}:latest"

# Push specific tag if different from latest
if [ "$TAG" != "latest" ]; then
    echo "Pushing ${TAG} tag..."
    docker push "${FULL_IMAGE_NAME}"
fi

# Push commit hash tag if available
if [ -n "$COMMIT_HASH" ]; then
    echo "Pushing commit hash tag..."
    docker push "${COMMIT_TAG}"
fi

echo ""
echo "✅ Build and push completed successfully!"
echo "🐳 Image available at: ${FULL_IMAGE_NAME}"
echo ""
echo "🚀 To run the image:"
echo "   docker run -d -p 3000:3000 ${FULL_IMAGE_NAME}"
echo ""
echo "📋 To deploy with Docker Compose:"
echo "   docker-compose up -d"
echo ""
echo "🔍 To check image details:"
echo "   docker images | grep learn-vocab-english"
echo ""

# Optional: Show image size
echo "📊 Image information:"
docker images "${REGISTRY}/${PROJECT}" --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"
