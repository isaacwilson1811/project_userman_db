# Simple User Manager Express App Using Mongo DB - Written by Isaac Wilson.

## Instructions for my instructor:

## Step 0.
### Start your local mongod server if you haven't already. Note the host path/port if needed.
### For me, running mongod as a background service from my brew installation works.
`brew services start mongodb-community`
### If you want a manually started terminal process
`mongod --config /usr/local/etc/mongod.conf`

## Step 1.
### Clone this repo somewhere.
### Change working directory to the project folder.
### Install required node modules.

`git clone https://github.com/isaacwilson1811/project_userman_db.git`
`cd project_userman_db`
`npm install`

## Step 2.
### Create .env file with these variables. Edit DB_URI if needed.

`cat >> .env <<EOL`
`DB_URI=mongodb://localhost:27017/`
`DB_NAME=isaacs_project_db`
`DB_COLLECTION=users_collection`
`EOL`

## Step 3.
### Run this script to create the database and collection to be seeded with sample data

`npm run seed`

## Step 4.
### Run this script to start up the express app / front end http server

` `

## Step 5.
### In a web browser, navigate to http://localhost:3000
### Test out the features of the app.

` `

## Step 6.
### When you are done testing, run this cleanup script to drop the database.

`npm run cleanup`

## Optional. Close Mongo Server.
### If you started mongod as a service and are done, this will shut it down.
`brew services stop mongodb-community`
### If you started a manual process. This will end it.
`mongo admin --eval "db.shutdownServer()"`