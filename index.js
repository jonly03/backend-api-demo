// import my destination DB
let { destinations } = require("./db");

// import (require) express function
const express = require("express");

const { uid, name } = require("./services");

// call the express function to create our HTTP server
// => the created server is "deaf"
const app = express();

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
// {name, location, photo?, description?}
// name and location are required
app.post("/destinations", (req, res) => {
  const { name, location, photo, description } = req.body;
  // const userData = req.body
  // const name = userData.name
  // const location = userData.location
  // const photo = userData.photo
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

  // add the user data in my db
  destinations.push({
    id: uid(),
    name: name,
    location: location,
    photo: photo ? photo : "",
    description: description ? description : "",
  });

  res.send({ status: "success" });
});

// DELETE /destination/:uid
// app.delete("/destination/:id", (req, res) => {
//   const { id } = req.params;

//   const filtered = destinations.filter((dest) => {
//     if (dest.id !== id) {
//       return true;
//     }
//   });

//   destinations = filtered;

//   res.send({ status: "success" });
// });
