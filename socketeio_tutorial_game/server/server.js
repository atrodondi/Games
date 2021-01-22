const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

//path to html
const publicPath = path.join(__dirname, "/../public");

const port = process.env.PORT || 3000;

const app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});

//open socket connection
io.on("connection", socket => {
  console.log("A user just connected.");

  // on start game
  socket.on("startGame", () => {
    io.emit("startGame");
  });

  //   crazy button clicked grabs data passed from front end via the 'data' variable and emits it back to everyone
  socket.on("crazyIsClicked", data => {
    console.log("crazy clicked");
    io.emit("crazyIsClicked", data);
  });

  //on user disconnect
  socket.on("disconnect", () => {
    console.log("A user has disconnected.");
  });
});
