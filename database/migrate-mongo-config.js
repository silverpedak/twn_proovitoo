const MONGO_URL = "mongodb://localhost:27017";

const config = {
  mongodb: {
    url: MONGO_URL,
    databaseName: "resident-register",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: "commonjs",
};

module.exports = config;
