# Data migration

Data migration solution made with [mongo-migrate-ts](https://www.npmjs.com/package/mongo-migrate-ts)

## Usage

- add your MongoDB connection url to the .env file. Example: `MONGO_URI=mongodb://localhost:27017`
- install dependencies `npm i` (make sure you are in /migrate folder)
- compile `tsc`
- to migrate up `node build/index.js up`
- to migrate down last `node build/index.js down -l`

Usage: node build/index.js [options] [command]

Options:
-h, --help output usage information

Commands:

- init - Creates the migrations directory and configuration file
- new [options] - Create a new migration file under migrations directory
- up - Run all pending migrations
- down [options] - Undo migrations
- status - Show the status of the migrations
