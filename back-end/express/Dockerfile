FROM node:current-alpine

# Create directory in container image for app code
RUN mkdir -p /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Set working directory context
WORKDIR /usr/src/app

# Install dependencies from packages.json
RUN npm install

# Bundle app source
COPY . .

EXPOSE 4242

CMD [ "node", "Express.js" ]