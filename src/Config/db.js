const MongoClient = require("mongodb").MongoClient;
const host = process.env.host;
const config = require(`../../config/${host}.json`);
const url =
  "mongodb://" + config.wadia.dbConfig.host + ":" + config.wadia.dbConfig.port;
const dbName = config.wadia.dbConfig.dbName;

const connection_string = url;
const connection_options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const db_name = dbName;

let mongodb = null;

module.exports = async () => {
  if (mongodb && mongodb != null) {
    return mongodb;
  }
  console.log("connecting mongodb ...");
  let client = await MongoClient.connect(connection_string, connection_options);
  console.log("mongodb connected");
  mongodb = client.db(dbName);
  return mongodb;
};
