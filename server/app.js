const express = require("express");
const authRouter = require("./Routes/authRoutes");
const storeRouter = require("./Routes/storeRoutes");

const app = express();

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/store", storeRouter);

module.exports = app;
