# Data migration

Data migration solution made with (mongo-migrate-ts)[https://www.npmjs.com/package/mongo-migrate-].

## Usage

- add your MongoDB connection url to the .env file. Example: `MONGO_URI=mongodb://localhost:27017`
- install dependencies `npm i` (make sure you are in /migrate folder)
- compile `tsc`
- to migrate up `node build/index.js up`
- to migrate down last `node build/index.js down -l`
