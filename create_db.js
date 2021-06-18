const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017/";

class User {
  constructor(id,firstName,lastName,email,age){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.age = age;
  }
}

const user = new User(1,'Bob','Dobs','bobdobs@email.com',65);

MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
  if (err) throw err;
  const dbo = db.db('isaacs_db');
  dbo.createCollection('users', (err, res) => {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });

  dbo.collection("users").insertOne(user, (err, res) => {
    if (err) throw err;
    console.log("1 Document inserted");
    db.close();
  });
});