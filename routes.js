"use strict";
const express = require("express");
const routes = express.Router();

// Each movie has a unique "id" 
// This is a list of movies that will power our API
const movies = [{
        id: 1,
        title: "2001: A Space Odyssey",
        year: 1968,
        animated: false
    },
    {
        id: 2,
        title: "The Godfather",
        year: 1972,
        animated: false
    },
    {
        id: 3,
        title: "The Lion King",
        year: 1994,
        animated: true
    },
    {
        id: 4,
        title: "Black Panther",
        year: 2018,
        animated: false
    }
];
let nextId = 5;
// id generator -- counter?

// Once we have the list above, we can start building out our endpoints 

// GET "method" /movies "path" - respond with a JSON array of movies
routes.get("/movies", (req, res) => {
    // response.json --> pass it our array of "movies"
    res.json(movies);
});
// This is the outline for every single route is going to look like
// First "routes.", then method "get" (path "/movies") --> rest is an arrow function with two parameters "req" (short for request) and "res" (short for response)

// ":id" is NEW - a PATH PARAMETER
// special syntax you can use inside your path string 
// PATH PARAMETER - a variable portion of the URI path
// you can put ANYTHING there in the URL and it will still run!
// Additionally, we can find out what was in the part of the URI using the given name
routes.get("/movies/:id", (req, res) => {
    // create a variable to track the id
    const id = parseInt(req.params.id);
    // where .id is HAS TO MATCH PATH PARAMETER
    const movie = movies.find(movie => movie.id === id);
    // find the moive that has that id
    if (movie) {
        res.json(movie);
        // found the movie, send it back
    } else {
        // if movie does not exist, display 404 and...
        res.status(404);
        res.send(`No movie with id ${id} exists.`);
        // ...send back the message above
    }
});
// the PATH PARAMTER will always come back a string, and we need a number, so using PARSEINT!
// otherwise, "===" will not work!

routes.post("/movies", (req, res) => {
    // new movie data from body of the request, take in the json body from the request and turn it into a JS object and store it into a variable
    const movie = req.body;
    movie.id = nextId++;
    // everytime I add a movie or ID it keeps going up and up with "++"
    movies.push(movie);

    res.status(201);
    res.json(movie);
    // the create method sends back the data in json format of data about the new object that was added
});

routes.delete("/movies/:id", (req, res) => {
    // access the id -- parseInt rounds integer so we have a whole number
    const id = parseInt(req.params.id);
    const index = movies.findIndex(movie => movie.id === id);
    // search through our array of movies and delete the one we want it to
    if (index !== 1) {
        movies.splice(index, 1);
    }
    res.status(200);
    res.send();
});

// export routes for use in server.js
module.exports = routes;