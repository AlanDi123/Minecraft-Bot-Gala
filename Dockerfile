# GALA AI V6.1 - Dockerfile
# Bot autónomo de Minecraft

FROM node:18-alpine

# Metadata
LABEL maintainer="Gala AI Development Team"
LABEL description="GALA AI V6.1 OMEGA - Autonomous Minecraft Bot"
LABEL version="6.1.0"

# Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY src/ ./src/

# Copy config files
COPY .gitignore ./

# Create data directory for persistent state
RUN mkdir -p /app/data

# Set environment variables
ENV NODE_ENV=production
ENV LOG_LEVEL=info
ENV BOT_NAME=Gala_Bot

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "const fs=require('fs'); const stat=fs.statSync('./gala_state_v6.json'); const age=Date.now()-stat.mtimeMs; process.exit(age > 300000 ? 1 : 0)" || exit 1

# Expose metrics port (if implemented)
EXPOSE 9090

# Start bot
CMD ["node", "src/index.js"]

# Alternative: Debug mode
# CMD ["node", "--inspect=0.0.0.0:9229", "src/index.js"]
