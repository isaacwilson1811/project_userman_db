// required modules
require('dotenv').config();
const { MongoClient } = require('mongodb');

// env vars
const uri = process.env.DB_URI;
const myDataBase = process.env.DB_NAME;
// const myCollection = process.env.DB_COLLECTION;

// connect to database and insert the documents
deleteDB();

// the connect/insert function
async function deleteDB() {
  const client = new MongoClient(uri,{useNewUrlParser: true, useUnifiedTopology: true});
  try {
    console.log('Attempting connection to database server...');
    await client.connect();
    const database = client.db(myDataBase);
    // const collection = database.collection(myCollection);
    console.log(`Connected to ${uri}`);
    console.log(`dropping ${database.databaseName}\n`);
    const result = await database.dropDatabase();
    console.log(result);
  }
  catch (err) {
    console.error(err);
    return err;
  }
  finally {
    client.close();
    console.log('Connection closed.');
    console.log(`DONE: drop ${myDataBase} complete.`)
  }
};