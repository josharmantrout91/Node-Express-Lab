const express = require("express");

const expressRouter = require("./data/express-router");

const server = express();

server.use(express.json());
server.use("/api/posts", expressRouter);

server.get("/", (req, res) => {
  res.send(`
      <h2>Node Express Lab</h>
      <p>Welcome to Node... Everything is going to be okay...</p>
    `);
});

module.exports = server;
