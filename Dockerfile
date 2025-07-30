# 1. Base Image: Use Node.js version 20
FROM node:20-alpine AS base

# 2. Set Working Directory
WORKDIR /app

# 3. Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# 4. Copy the rest of the application code
COPY . .

# 5. Build the Next.js application
RUN npm run build

# 6. Production Image: Create a smaller image for production
FROM node:20-alpine
WORKDIR /app

# Copy built app from the 'base' stage
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./package.json

# Expose port 3000
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
