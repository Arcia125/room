FROM node:10

# create app directory
WORKDIR /usr/src/room

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# In production, this line should be:
# RUN npm ci --only=production

COPY . .

EXPOSE 9001


# build frontend DCACHEBUST
ARG DCACHEBUST=0
RUN npm run build:frontend

# run server
CMD [ "npm", "run", "start" ]