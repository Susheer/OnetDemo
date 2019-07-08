var config = {
  db_host: "mongodb://localhost:27017/",
  db_name: "Onet",
  api_port: "4000",
  shard_db: false,
  base_url: "/api",
  secretKey: "sudheerOnet",
  option: {
    useNewUrlParser: true
  }
  //Log config
};

module.exports = config;
