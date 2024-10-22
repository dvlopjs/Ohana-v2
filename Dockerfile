# Dockerfile
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port 3000 (default React dev server port)
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]