#########################
# PRODUCTION DOCKERFILE #
#########################
FROM node:10.15.0-alpine

RUN mkdir /app
WORKDIR /app
COPY . .

RUN npm i --loglevel error
RUN npm run build

RUN find . -maxdepth 1\
 -not -name ".next"\
 -not -name "node_modules"\
 -not -name "package*" | grep -v -E "^(\.|\.\.)$" | xargs rm -rf

CMD ["npm", "run", "start"]
