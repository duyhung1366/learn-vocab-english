# Docker Tag Push Strategy Guide

## 🏷️ Tag Push Commands Overview

### Single Tag Push Commands
| Command | What it pushes | Use case |
|---------|---------------|----------|
| `make push-version-only VERSION=v1.1.0` | Only `v1.1.0` | Specific version without affecting latest |
| `make push-latest` | Only `latest` | Update latest pointer |
| `make push-commit` | Only commit hash | Push commit-specific build |

### Multi Tag Push Commands
| Command | What it pushes | Use case |
|---------|---------------|----------|
| `make push` | `latest` + `VERSION` + `commit` | Full deployment |
| `make version-push VERSION=v1.1.0` | `latest` + `v1.1.0` + `commit` | Complete version release |

## 🎯 Specific Use Cases

### 1. Push Only v1.1.0 (Your Request)
```bash
# Build the version first
make version-build VERSION=v1.1.0

# Push ONLY the v1.1.0 tag
make push-version-only VERSION=v1.1.0

# Or use the alias
make push-only VERSION=v1.1.0
```

**Result:** Only `registry.gitlab.com/duyhungfa102/learn-vocab-english:v1.1.0` is pushed.

### 2. Complete Version-Only Release
```bash
# Build + Test + Push only the version tag
make release-version-only VERSION=v1.1.0

# Or use the alias
make release-only VERSION=v1.1.0
```

**Result:** Builds, tests, and pushes only `v1.1.0` tag.

## 🔄 Multi-Tag vs Single-Tag Push Differences

### Multi-Tag Push (Traditional)
```bash
make version-push VERSION=v1.1.0
```
**Pushes:**
- ✅ `latest` → Points to v1.1.0
- ✅ `v1.1.0` → Your specific version
- ✅ `6045e68` → Commit-specific tag

**Impact:**
- Updates the `latest` tag in registry
- Other users pulling `latest` get v1.1.0
- Full traceability with commit hash

### Single-Tag Push (New Feature)
```bash
make push-version-only VERSION=v1.1.0
```
**Pushes:**
- ❌ `latest` → Unchanged in registry
- ✅ `v1.1.0` → Your specific version
- ❌ `6045e68` → Not pushed

**Impact:**
- `latest` tag remains unchanged
- Users can pull specific version
- No impact on default deployments

## 📋 Best Practices

### When to Use Single-Tag Push

#### 1. **Hotfix Releases**
```bash
# Push hotfix without affecting latest
make push-version-only VERSION=v1.0.1
```
**Why:** Latest might be v1.1.0, hotfix is for v1.0.x branch.

#### 2. **Pre-release Versions**
```bash
# Push beta without affecting production latest
make push-version-only VERSION=v1.2.0-beta.1
```
**Why:** Don't want beta versions to become the default.

#### 3. **Parallel Development**
```bash
# Team A pushes feature branch version
make push-version-only VERSION=v1.1.0-feature-auth

# Team B pushes different feature
make push-version-only VERSION=v1.1.0-feature-ui
```
**Why:** Multiple teams working on different features.

#### 4. **Rollback Scenarios**
```bash
# Push previous stable version without updating latest
make push-version-only VERSION=v1.0.5
```
**Why:** Emergency rollback without changing latest pointer.

### When to Use Multi-Tag Push

#### 1. **Production Releases**
```bash
# New stable release becomes latest
make version-push VERSION=v1.2.0
```
**Why:** This version should be the new default.

#### 2. **Major Releases**
```bash
# Major version becomes new latest
make version-push VERSION=v2.0.0
```
**Why:** Breaking changes, new default version.

#### 3. **Stable Updates**
```bash
# Minor/patch updates
make version-push VERSION=v1.1.1
```
**Why:** Backward compatible, safe to be latest.

## 🚀 Complete Workflow Examples

### Scenario 1: Feature Release (Don't Update Latest)
```bash
# 1. Build feature version
make version-build VERSION=v1.2.0-feature-search

# 2. Test it
make test VERSION=v1.2.0-feature-search

# 3. Push only this version
make push-version-only VERSION=v1.2.0-feature-search

# 4. Deploy for testing
docker run -d -p 3000:3000 registry.gitlab.com/duyhungfa102/learn-vocab-english:v1.2.0-feature-search
```

### Scenario 2: Production Release (Update Latest)
```bash
# 1. Complete release with all tags
make release VERSION=v1.2.0

# 2. Create git tag
make tag-version VERSION=v1.2.0

# 3. Verify
make verify-push VERSION=v1.2.0
```

### Scenario 3: Hotfix (Selective Update)
```bash
# 1. Build hotfix
make version-build VERSION=v1.1.1

# 2. Push only hotfix version
make push-version-only VERSION=v1.1.1

# 3. Later, if hotfix is stable, update latest
make push-latest  # This pushes the current latest tag
```

### Scenario 4: Gradual Rollout
```bash
# 1. Push new version without updating latest
make push-version-only VERSION=v1.3.0

# 2. Test in staging
docker run -d registry.gitlab.com/duyhungfa102/learn-vocab-english:v1.3.0

# 3. If stable, update latest separately
make push-latest  # After tagging latest locally to v1.3.0
```

## 🔍 Verification Commands

### Check What's in Registry
```bash
# List all local tags
make list-tags

# Verify specific version exists
make verify-push VERSION=v1.1.0

# Check what latest points to
docker pull registry.gitlab.com/duyhungfa102/learn-vocab-english:latest
docker inspect registry.gitlab.com/duyhungfa102/learn-vocab-english:latest
```

### Compare Tags
```bash
# See all available versions
docker images registry.gitlab.com/duyhungfa102/learn-vocab-english

# Pull and compare
docker pull registry.gitlab.com/duyhungfa102/learn-vocab-english:latest
docker pull registry.gitlab.com/duyhungfa102/learn-vocab-english:v1.1.0
```

## 🎯 Summary

**Use `push-version-only`** when:
- Testing new features
- Hotfixes for older versions
- Pre-release versions
- Parallel development
- You don't want to change the default version

**Use `version-push`** when:
- Stable production releases
- New version should become default
- Complete deployment workflow
- Major/minor releases ready for general use
