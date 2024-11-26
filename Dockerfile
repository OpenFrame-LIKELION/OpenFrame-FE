# Base image for building
FROM node:18-alpine AS base

# Install dependencies
WORKDIR /app
COPY package.json package-lock.json* ./

RUN npm ci # package 설치

# Copy source code and set environment variables
COPY . .

# Build the Vite application
RUN npm run build # npm run build 명령어로 vite 실행

# Nginx server to serve static files
FROM nginx:stable-alpine AS runner

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy built files to Nginx for serving
COPY --from=base /app/dist /usr/share/nginx/html/page

# Expose port 3000 for Nginx
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
