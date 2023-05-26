# Personal Assignment

This is an assignment given for the Web Services class I took in Spring 2023. In this assignment, we were to go out and learn about how to create our own Node project, add dependencies like nodemon, mongodb, and express, and use express' built in routes to send data to our page that we receive from mongodb. We are also expected to self teach by finding resources on the web. Most of what I have learned has come from external resources and I will be documenting it all.

## Reflections

Below are some of the things I would like to keep note of in the future

## Table of Contents

1. [Creating a Project](#creating-a-node-project-with-expressjs-nodemon-dotenv-and-mongodb)
2. [Server.js](#serverjs)
3. [Routes](#routes)
4. [Controllers](#controllers)
5. [Connect file](#connect-file)
6. [MongoDb find()](#mongodb-find)
7. [MongoDb findOne()](#mongodb-findone)
8. [MongoDb insertOne()](#mongodb-insertone)
9. [MongoDb replaceOne()](#mongodb-replaceone)
10. [MongoDb deleteOne()](#mongodb-deleteone)
11. [Adding API Documentation with Swagger](#adding-documentation-with-swagger)
12. [Adding Mongoose, Data Validation, and Error Handling](#adding-mongoose)

---

### Creating a Node project with Express.js Nodemon Dotenv and MongoDb

- Create a node project by running `npm init -y`(the y answers yes to all the questions and quickly creates the project)
- Add express to your project by running `npm install --save express`
- Add dotenv to your project by running `npm install dotenv`
- Add mongodb to your project by running `npm install mongodb`
- If you will be testing a frontend with a backend you will need to run `npm install -dev cors` on your project and add a few lines of code to overwrite the cors policy
- You can shorten your install command by running `npm install express dotenv mongodb`
- Add nodemon for development purposes by running `npm install --save-dev nodemon`
- After adding dependencies, run `npm install` to create the package-lock.json fall
- Create a server.js file and make sure that your server.js file matches the name of `main` in your package.json file

### Serverjs

- The server.js file is the main file and its how we will call our routes and the functions contained within them.
- We start with a code block: `const express = require("express");
const app = express();` This is pretty basic and sets up the express application to require express.
- `app.use()` is how we connect our home route with the routes controller
- `app.listen()` returns what port we are listening to in the console

### Routes

- We create a routes variable that is how we will gain access to GET, POST, UPDATE, and DELETE routes. `const routes = require('express').Routers()`
- We then create a variable that connects to our controllers module
- Using the routes are as simple as calling functions like `routes.get()` with the correct page directory and the data we want to send
- We have to export the routes module at the end

### Controllers

- Controllers are a part of the MVC architecture(Model - View - Controllers)
- Our controllers handle requests from the Views by collecting data from the Model and returning it
- The controllers in our project will contain functions that make calls to the mongodb database and collection and return json data which we will then export to our routes

### Connect File

- Our connect file is what we wil be using to establish a connection with MongoDb
- We need to use a require statement to get MongoClient into our file for later use `const { MongoClient } = require("mongodb");`
- We also require dotenv to use our mongodb URI found in our .env file `require("dotenv").config();`
- We save a variable containing our URI that we get using dotenv `const uri = process.env.MONGODB_URI;`
- Then we create a new MongoDb client and export it throughout our program for accessing the database `const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});`

### MongoDb Find()

- To find all documents in a collection we need to follow a few steps:
  1.  First, we need to make sure our function is asynchronous `async function getContacts(req, res) `
  2.  Make a connection to our database `await client.connect();`
  3.  Declare what database you are connecting to `const db = client.db("contacts");`
  4.  Declare what collection you are pulling documents from `const collection = db.collection("contacts");`
  5.  Call the find method on the collection and make sure to turn it into an array `const contacts = await collection.find().toArray();`
  6.  Send the data you received from the database through the res `res.status(200).send(contacts);`
  7.  Handle erors `catch (err) {
  console.error(err);
  res.status(500).send("Error retrieving contacts");
}`

### MongoDb FindOne()

- Finding one document in a collection follows almost the same ideas as finding all with just a couple changes:
  1.  We need to require `ObjectId` from mongodb. ObjectIds are special autogenerated Ids for a document `const { ObjectId } = require("mongodb");`
  2.  In our asynchronous function we will be receiving an id from the route through the `req`. This id needs to be converted to a ObjectId. `const contactId = new ObjectId(req.params.id);`
  3.  Declare the database and collection as usual
  4.  Call the `findOne` method on our collection and pass the ObjectId as a query parameter `const contact = await collection.findOne({ _id: contactId });`
  5.  Send the data through our `res`
  6.  Handle any potential errors

### MongoDb InsertOne()

- Adding a single focument to the collection follows the same principles in previous sections but with a new function
  1. To be completed

### MongoDb ReplaceOne()

- This is our update in CRUD operations. In order to update a document we will need to:
  1. To be completed

### MongoDb DeleteOne()

- We need to be careful when deleted a document. To do so we will:
  1. To be completed

### Adding Documentation with Swagger

- We are going to need some public documentation for our API and a place to test our routes. For this, we will be using swagger.
- There are some real neat packages that we can use to do this quickly. These packages are [swagger-autogen](https://www.npmjs.com/package/swagger-autogen?activeTab=readme#usage-basic) and [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
- To install and utilize the packages we will:
  1. Run the commands `npm install --save-dev swagger-autogen` and `npm install --save swagger-ui-express`
  2. Create a swagger.js file in the root of your directory. Fill it with the quickstart code found on their documentation page.
  3. Make sure the quickstart code reflects your project. Things like the host and output file name should match what you need.
  4. Create a swagger.js file in your routes directory. Make sure that you import swagger in it. Set it up for /api-docs.
  5. You will need a router.use and router.get call in that file.
  6. Connect your swagger.js route to your index.js route carefully.
  7. Once you are sure your routes are set up and your swagger.js file in your root directory is configured, run the command `node swagger.js` in your terminal.
  8. This should create a new file named whatever you put to be the outputfile name. Start up your server and navigate to [yourhoust]/api-docs. You should have a newly created page with swagger documentation. Congrats.

### Adding Mongoose

- Mongoose is a commonly used Express middleware for MongoDB. It allows us to create Object Models(Schemas) of the data in our database, connect to MongoDB, and perform queries on the data with built-in functions. One of the selling points of mongoose is that it allows for validation of our data before sending it to our database. This also allows for more control of our error handling.
- To install mongoose and get started with it:
  1. Run the command `npm install --save mongoose` in your terminal while in your root directory
  2. Create some new directories. Models & config should be enough. If you end up creating helper functions, you can consider creating a utils directory.
  3. Because we will be working with MongoDB through mongoose, we no longer have need for any of the connection code in our db directory, server.js or controllers. We can remove those because they will all be completely rewritten or ignored.
  4. In our config folder, create a file called `db.config.js`, import dotenv, and lets export our mongodb uri with module.exports.
  5. To be continued...
