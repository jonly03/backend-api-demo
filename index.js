// import my destination DB
let { destinations } = require("./db");

// import (require) express function
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const { uid } = require("./services");

// call the express function to create our HTTP server
// => the created server is "deaf"
const app = express();
app.use(cors());
app.use(express.json());

// make the server listen to HTTP calls (HTTP requests) from clients
// => give it a door (i.e a PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started and listening on port: ${PORT}`);
});

// DATA Brainstorming

// Req: GET /destinations
// Res: a list (array) of destinations
// destination {name, location, photo, description}
app.get("/destinations", (req, res) => {
  res.send(destinations);
});

// POST => CREATE
// Expect the client to send us an object
// {name, location, , description?}
// name and location are required
app.post("/destinations", (req, res) => {
  const { name, location, description } = req.body;
  // const userData = req.body
  // const name = userData.name
  // const location = userData.location

  // const description = userData.description

  // validate that we have a name and a location
  if (
    name === undefined ||
    name.length === 0 ||
    location === undefined ||
    location.length === 0
  ) {
    return res.status(400).send({ error: "name and location are required" });
  }

  // Get a photo using the name and location from Unsplash
  // => make an API request to Unsplash to search for photos related to our name and location
  // URL
  const URL = `https://api.unsplash.com/search/photos/?client_id=${process.env.API_KEY}&query=${name} ${location}`;

  fetch(URL)
    .then((response) => response.json())
    .then((photos) => {
      // do something with the photos
      const array = photos.results;

      // pick a random photo from my array
      const randIdx = Math.floor(Math.random() * array.length);
      const photo = array[randIdx].urls.small;

      // add the user data in my db
      destinations.push({
        id: uid(),
        name: name,
        location: location,
        photo: photo,
        description: description ? description : "",
      });

      res.send({ status: "success" });
    });
});

// DELETE /destination/:id
app.delete("/destination/:id", (req, res) => {
  const { id } = req.params;

  const filtered = destinations.filter((dest) => {
    if (dest.id !== id) {
      return true;
    }
  });

  destinations = filtered;

  res.send({ status: "success" });
});

// PUT /destination/:id
app.put("/destination/:id", (req, res) => {
  const { id } = req.params;

  const { name, location, photo, description } = req.body;

  if (!name && !location && !photo && !description) {
    return res.status(400).json({ status: "no data to update" });
  }

  for (let dest of destinations) {
    if (dest.id === id) {
      // if (name !== undefined || name.length !== 0){
      //   dest.name = name
      // }
      dest.name = name ? name : dest.name;
      dest.location = location ? location : dest.location;
      dest.photo = photo ? photo : dest.photo;
      dest.description = description ? description : dest.description;
      break;
    }
  }

  res.send({ status: "success" });
});
