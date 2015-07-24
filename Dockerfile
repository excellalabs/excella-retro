# Dockerfile for remote-retro-hapi project

# Use the official Node base image
FROM node:0.10

# Create a directory for our source code
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Bower
RUN npm install -g gulp bower && npm cache clear

# Install package dependencies
COPY package.json /usr/src/app/
RUN npm install

# Install bower dependencies
COPY bower.json .bowerrc /usr/src/app/
RUN bower install --config.interactive=false

# Add source code to image
COPY . /usr/src/app

# Set the HOST environment variable to accept requests from all hosts
# (since we're inside the container)
ENV HOST "0.0.0.0"

# Expose port 3000 by default
EXPOSE 3000

# Use 'npm start' as default command
CMD [ "npm", "start" ]
