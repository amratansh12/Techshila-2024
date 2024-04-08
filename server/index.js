require("dotenv").config();
const express = require("express");
const { createServer } = require("http");

const app = express();
const server = createServer(app);

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on port:-- ${PORT}`);
});
