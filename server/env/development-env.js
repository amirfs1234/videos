process.env.SECRET_SESSION_KEY = process.env.SECRET_SESSION_KEY  || 'mysecretkey_chromecast';
process.env.CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://amir:chromecast@cluster0-shard-00-00-fqmns.mongodb.net:27017,cluster0-shard-00-01-fqmns.mongodb.net:27017,cluster0-shard-00-02-fqmns.mongodb.net:27017/videos?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
process.env.DEVPORT = '1337';


