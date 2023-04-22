# Personal Assignment

This is an assignment given for the Web Services class I took in Spring 2023. In this assignment, we were to go out and learn about how to create our own Node project, add dependencies like nodemon and express, and use express' built in routes to send data to our page.

## Reflections

Below are some of the things I would like to keep note of in the future

### Node.js
- Create a node project by running `npm init -y`(the y answers yes to all the questions and quickly creates the project)
- Add express to your project by running `npm install --save express`
- Add nodemon for development purposes by running `npm install --save-dev nodemon`
- After adding dependencies, run `npm install` to create the package-lock.json fall
- Create a server.js file and make sure that your server.js file matches the name of `main` in your package.json file

### Server.js
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
- Needs to be completed