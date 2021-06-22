const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/';

// connect();

async function connect(){
  const client = new MongoClient(uri,{useNewUrlParser: true, useUnifiedTopology: true});
  try {
    await client.connect();
    const db = client.db('isaacs_db');
    const users = db.collection('users');
    console.log(`Connected to ${db.databaseName}/${users.collectionName}`);
    const searchCursor = await users.find().toArray();
    console.table(searchCursor);
  }
  catch (err) {
    console.error(err);
    return err;
  }
  finally {
    client.close();
  }
}

module.exports = connect;