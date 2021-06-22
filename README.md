# Simple User Manager Express App Using Mongo DB
Written in JavaScript for running in Node.JS.  
Uses: mongodb, express, mongoose, and dotenv.

## Instructions for my instructors:

## Step 0. 
> ### Spin up your local mongo db server.
> ### Running mongod as a background service from a brew installation works for me.
> `brew services start mongodb-community`
> ### Or do this if you want a manual process instead.
> `mongod --config /usr/local/etc/mongod.conf`
> ### Your set up might be different... You might already have started mongod. :)

## Step 1.
> ### Clone this repo to your machine.
> `git clone https://github.com/isaacwilson1811/project_userman_db.git`
> ### Change working directory to the project folder.
> `cd project_userman_db`
> ### Install required node modules.
> `npm install`

## Step 2.
> ### Create .env file:
> #### This multiline bash command will do it.
```
cat >> .env <<EOL
DB_URI=mongodb://localhost:27017/
DB_NAME=isaacs_project_db
DB_COLLECTION=users_collection
EOL
```
> ### Modify the value of DB_URI if you need to for some reason.
> `nano .env`

## Step 3.
> ### Run this script to generate and insert a collection of sample data.
> `npm run seed`

## Step 4.
> ### Run this script to start the front end http server
> `npm run start`

## Step 5.
> ### Navigate to http://localhost:3000 in your web browser.
> ### Test out the features of the app.

## Step 6.
> ### When you are done testing... Run this cleanup script to drop the database.
> #### (Check my code if you are worried about this script.)
> `npm run cleanup`

## Step Optional.
> ### ___You Probably Already Know This Stuff___:
> #### This is more for me for my own reference information. I'm learning Markdown syntax btw.
>> ### Kill / Close / End mongod.
>> ### If you started mongod as a background service. This will shut it down.
>> `brew services stop mongodb-community`
>> ### If you started a manual process. This will end it.
>> `mongo admin --eval "db.shutdownServer()"`

# Thank You!
-Isaac.