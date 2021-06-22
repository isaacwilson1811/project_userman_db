// Module that creates and returns a collection of randomized user documents.

// Required modules
const fs = require('fs');
const path = require('path');

// Paths to txt data files. These files just contain a long line of comma seperated names.
const firstNamesPath = path.join(__dirname,'dataFiles','first_names.txt');
const lastNamesPath = path.join(__dirname,'dataFiles','last_names.txt');

// Utility function that generates a single randomized user document object
// takes in 2 arrays of strings, returns an object
function createRandomUser(firstNameArray,lastNameArray) {
  let rFName = firstNameArray[Math.round(Math.random()*(firstNameArray.length -1))];
  let rLName = lastNameArray[Math.round(Math.random()*(lastNameArray.length -1))];
  let rAge = Math.floor(Math.random() * (60 - 18) + 18);
  let rNum = Math.floor(Math.random() * (999 - 100) + 100);
  let rEmail = `${rFName.toLowerCase().substring(0,4)}.${rLName.toLowerCase().substring(0,4)}${rNum}@email.com`;
  return {
    firstName: rFName,
    lastName: rLName,
    email: rEmail,
    age: rAge
  }
};

// Main function that creates the collection of users
function createCollection(numDocs) {
  // Start with an empty array
  let userCollection = [];
  // Load lists of first and last names from text files into 2 arrays.
  let fNames = fs.readFileSync(firstNamesPath).toString().split(',');
  let lNames = fs.readFileSync(lastNamesPath).toString().split(',');
  // loop once for each document needed (numDocs)
  for (let i = 0; i < numDocs; i++) {
    // pass the arrays of names to the randomizer function
    // grab deconstructed variables out of the returned object
    let {firstName, lastName, email, age} = createRandomUser(fNames,lNames);
    // push a new object literal into userCollection array
    userCollection.push({'firstName':firstName, 'lastName':lastName, 'email':email, 'age':age});
  }
  // return an array of objects (collection of documents)
  return userCollection;
};

// To test: call the function, pass number of documents wanted, log the return value. 
// console.log(createCollection(100));

// export the main function
module.exports = createCollection;