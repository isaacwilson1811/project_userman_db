// required modules
require('dotenv').config();
const { MongoClient } = require('mongodb');
const createCollection = require('./create_collection');

// env vars
const uri = process.env.DB_URI;
const myDataBase = process.env.DB_NAME;
const myCollection = process.env.DB_COLLECTION;

// generate a collection of documents data (array of objects)
const numberOfDocs = 20; // number of documents wanted in the collection
console.log(`Generating ${numberOfDocs} randomized user profiles...`);
const DOCS = createCollection(numberOfDocs);
console.log(`DONE: array of (${DOCS.length}) objects ready to insert.\n`);

// connect to database and insert the documents
seedDB();

// the connect/insert function
async function seedDB() {
  const client = new MongoClient(uri,{useNewUrlParser: true, useUnifiedTopology: true});
  try {
    console.log('Attempting connection to database server...');
    await client.connect();
    const database = client.db(myDataBase);
    const collection = database.collection(myCollection);
    console.log(`Connected to ${uri}`);
    console.log(`using ${database.databaseName}/${collection.collectionName}\n`);
    const insertManyresult = await collection.insertMany(DOCS);
    console.log(`${insertManyresult.insertedCount} documents were sucessfully inserted.\n`);
  }
  catch (err) {
    console.error(err);
    return err;
  }
  finally {
    client.close();
    console.log('Connection closed.');
    console.log(`DONE: seeding ${myDataBase} complete.`)
  }
};

