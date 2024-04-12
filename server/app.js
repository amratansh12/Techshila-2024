const express = require("express");
const cors = require("cors");
const authRouter = require("./Routes/authRoutes");
const storeRouter = require("./Routes/storeRoutes");
const inventoryRouter = require("./Routes/inventoryRoutes");
const paymentRouter = require("./Routes/payRoutes");

const app = express();

app.use(cors());

app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/store", storeRouter);
app.use("/api/v1/inventory", inventoryRouter);
app.use("/api/v1/pay", paymentRouter);

module.exports = app;
