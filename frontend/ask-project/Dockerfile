FROM node:12-buster AS buster
LABEL project=askproject:front
WORKDIR /app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./
COPY package-lock.json ./
## install only the packages defined in the package-lock.json (faster than the normal npm install)
RUN npm install --save
# Copy the contents of the project to the image
COPY . ./
# Run 'npm start' when the container starts.
CMD ["npm", "run", "start"]