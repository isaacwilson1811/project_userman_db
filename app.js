// required modules
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

// env vars
const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_URI || 'mongodb://localhost:27017/';
const myDataBase = process.env.DB_NAME || 'isaacs_project_db';
const myCollection = process.env.DB_COLLECTION || 'users_collection';

// mongoose client and socket connection
mongoose.connect( DB_HOST+myDataBase, {useNewUrlParser:true, useUnifiedTopology:true} );
const mongoClient = mongoose.connection;
mongoClient.on('error', console.error.bind(console, 'moongoose connection error:'));
mongoClient.once('open', () => {
  console.log('connected to mongoose client.');
});

// mongoose schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  age: Number
});
const UserModel = mongoose.model('User', userSchema, myCollection);

// express app and use middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// start server listening
app.listen(PORT, () => {
  console.log(`Express HTTP server listening on port ${PORT}`);
});

// express http request and response

// FIND FIRST NAME
app.post('/findfname', (req, res) => {
  let { firstName } = req.body;
  UserModel.find({'firstName': firstName},(err, data) => {
    if (data.length === 1){
      res.render('userlist', {users: data});
    } else {
      res.render('userlist', {users: data});
    }
  });
});

// FIND LAST NAME
app.post('/findlname', (req, res) => {
  let { lastName } = req.body;
  UserModel.find({'lastName': lastName},(err, data) => {
    if (data.length === 1){
      console.log(data);
      res.render('userlist', {users: data});
    } else {
      res.render('userlist', {users: data});
    }
  });
});

// GET READ ALL USERS
app.get('/users/all', (req, res) => {
  UserModel.find({},(err, data) => {
    res.render('userlist', {users: data});
  });
});

// GET EDIT USER FORM
app.get('/edituser/:id', (req, res) => {
  let query = {"_id":ObjectId(req.params.id)};
  UserModel.find(query,(err,data) => {
    res.render('edituserform', data[0]);
  });
});

// POST UPDATE USER FORM
app.post('/updateuser/:id', (req, res) => {
  let {firstName, lastName, email, age} = req.body;
  let query = {"_id":ObjectId(req.params.id)};
  UserModel.updateOne(query,{
    'firstName': firstName,
    'lastName': lastName,
    'email': email,
    'age': age
  }, (err,data) => {
    res.redirect('/users/all');
  });
});

// INSERT NEW USER
app.post('/adduser', (req, res) => {
  let {firstName, lastName, email, age} = req.body;
  UserModel.create({
    'firstName': firstName,
    'lastName': lastName,
    'email': email,
    'age': age
  }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/users/all');
    }
  });
});

// GET DELETE USER
app.get('/deleteuser/:id', (req, res) => {
  let query = {"_id":ObjectId(req.params.id)};
  UserModel.deleteOne(query,(err,data) => {
    res.redirect('/users/all');
  });
});

// SORTING FIRST NAME ASC
app.get('/users/sort/fname/asc', (req,res) => {
  UserModel.find({}, (err,data) => {
    res.render('userlist', {users: data});
  }).sort({firstName: -1});
});

// SORTING FIRST NAME DSC
app.get('/users/sort/fname/dsc', (req,res) => {
  UserModel.find({}, (err,data) => {
    res.render('userlist', {users: data});
  }).sort({firstName: 1});
});

// SORTING LAST NAME ASC
app.get('/users/sort/lname/asc', (req,res) => {
  UserModel.find({}, (err,data) => {
    res.render('userlist', {users: data});
  }).sort({lastName: -1});
});

// SORTING LAST NAME DSC
app.get('/users/sort/lname/dsc', (req,res) => {
  UserModel.find({}, (err,data) => {
    res.render('userlist', {users: data});
  }).sort({lastName: 1});
});

// SORTING LAST AGE ASC
app.get('/users/sort/age/asc', (req,res) => {
  UserModel.find({}, (err,data) => {
    res.render('userlist', {users: data});
  }).sort({age: 1});
});

// SORTING LAST AGE DSC
app.get('/users/sort/age/dsc', (req,res) => {
  UserModel.find({}, (err,data) => {
    res.render('userlist', {users: data});
  }).sort({age: -1});
});


// everything CRUD seems to work
// just make some nice rendered responses to know what happened instead of redirect to root
// nice work

