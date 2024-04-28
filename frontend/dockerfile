# Use official Node.js image as base
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install axios

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application (not necessary if using 'npm start')
# RUN npm run build

# Expose port 3000
EXPOSE 3000

# Command to start serving the React application
CMD ["npm", "start"]
