// required modules
const { MongoClient } = require('mongodb');

// env vars
const uri = process.env.DB_URI || 'mongodb://localhost:27017/';
const myDataBase = process.env.DB_NAME || 'isaacs_project_db';

// connect to database server and then drop the database
deleteDB();

// the function
async function deleteDB() {
  const client = new MongoClient(uri,{useNewUrlParser: true, useUnifiedTopology: true});
  try {
    console.log('Attempting connection to database server...');
    await client.connect();
    const database = client.db(myDataBase);
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