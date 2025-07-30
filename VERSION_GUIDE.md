# VocabPractice Docker Version Management Guide

## 🏷️ Version Tagging Strategy

### Semantic Versioning (SemVer)
We follow semantic versioning: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes (v1.0.0 → v2.0.0)
- **MINOR**: New features, backward compatible (v1.0.0 → v1.1.0)
- **PATCH**: Bug fixes, backward compatible (v1.0.0 → v1.0.1)

### Supported Version Formats
- `v1.0.0` (recommended)
- `1.0.0`
- `v1.0.0-alpha`
- `v1.0.0-beta.1`
- `v1.0.0-rc.1`

## 🚀 Quick Start Commands

### 1. Build with Version
```bash
# Build with specific version
make version-build VERSION=v1.0.0

# Build and test
make build VERSION=v1.0.0
make test VERSION=v1.0.0
```

### 2. Push with Version
```bash
# Push specific version
make version-push VERSION=v1.0.0

# Or build and push together
make release VERSION=v1.0.0
```

### 3. Quick Version Releases
```bash
# Pre-defined version shortcuts
make v1.0.0    # Builds and pushes v1.0.0
make v1.0.1    # Builds and pushes v1.0.1
make v1.1.0    # Builds and pushes v1.1.0
```

## 📋 Complete Workflow Examples

### Development Release (v1.0.0)
```bash
# 1. Build with version
make version-build VERSION=v1.0.0

# 2. Test the build
make test VERSION=v1.0.0

# 3. Push to registry
make version-push VERSION=v1.0.0

# 4. Create git tag
make tag-version VERSION=v1.0.0

# 5. Verify push
make verify-push VERSION=v1.0.0
```

### Production Release (One Command)
```bash
# Complete release workflow
make release VERSION=v1.0.0

# This does: build → test → push
```

### Hotfix Release
```bash
# Quick patch release
make release VERSION=v1.0.1
make tag-version VERSION=v1.0.1
```

## 🔍 Verification Commands

### Check Available Versions
```bash
# List all local Docker tags
make list-tags

# Show detailed image info
make info VERSION=v1.0.0

# Verify registry push
make verify-push VERSION=v1.0.0
```

### Registry Verification
```bash
# Pull and verify from registry
docker pull registry.gitlab.com/duyhungfa102/learn-vocab-english:v1.0.0
docker pull registry.gitlab.com/duyhungfa102/learn-vocab-english:latest
```

## 🏗️ Tags Created for Each Version

When you build `VERSION=v1.0.0`, these tags are created:
- `registry.gitlab.com/duyhungfa102/learn-vocab-english:latest`
- `registry.gitlab.com/duyhungfa102/learn-vocab-english:v1.0.0`
- `registry.gitlab.com/duyhungfa102/learn-vocab-english:abc1234` (commit hash)

## 🎯 Best Practices

### 1. Version Naming
- Use `v` prefix: `v1.0.0` (recommended)
- Follow semantic versioning
- Use pre-release tags for testing: `v1.0.0-beta`

### 2. Release Process
1. **Development**: `v1.0.0-alpha`, `v1.0.0-beta`
2. **Release Candidate**: `v1.0.0-rc.1`
3. **Production**: `v1.0.0`
4. **Hotfix**: `v1.0.1`

### 3. Git Integration
```bash
# Always tag git after successful release
make release VERSION=v1.0.0
make tag-version VERSION=v1.0.0
```

### 4. Testing Strategy
```bash
# Test before pushing
make version-build VERSION=v1.0.0
make test VERSION=v1.0.0
make version-push VERSION=v1.0.0
```

## 🚨 Troubleshooting

### Invalid Version Format
```bash
# ❌ Invalid
make release VERSION=1.0    # Missing patch version
make release VERSION=v1     # Missing minor and patch

# ✅ Valid
make release VERSION=v1.0.0
make release VERSION=1.0.0
```

### Registry Authentication
```bash
# Login first
make login
# or
docker login registry.gitlab.com
```

### Verify Build Success
```bash
# Check if image exists locally
docker images | grep learn-vocab-english

# Test the specific version
make test VERSION=v1.0.0

# Verify in registry
make verify-push VERSION=v1.0.0
```

## 📊 Monitoring Releases

### View All Versions
```bash
# Local images
make list-tags

# Registry tags (via GitLab UI or API)
curl -H "PRIVATE-TOKEN: your-token" \
  "https://gitlab.com/api/v4/projects/duyhungfa102%2Flearn-vocab-english/registry/repositories/tags"
```

### Deployment Verification
```bash
# Pull and run specific version
docker run -d -p 3000:3000 registry.gitlab.com/duyhungfa102/learn-vocab-english:v1.0.0

# Health check
curl http://localhost:3000/api/health
```
