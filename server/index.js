const express = require("express");
const { createServer } = require("http");

const app = express();
const server = createServer(app);

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

server.listen(3000, () => {
  console.log("Server is running");
});
