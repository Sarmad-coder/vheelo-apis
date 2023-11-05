# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to /app
COPY package*.json ./

# Install dependencies
RUN npm install


# Install MySQL client and sequelize dependencies
RUN apk add --no-cache mysql-client && \
    npm install --save mysql2 sequelize

# Copy the rest of the application code to /app
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose port 3002
EXPOSE 3002

# Start the server
CMD ["npm", "run", "serve"]
