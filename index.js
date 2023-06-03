const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./Routes/User.Routes");
const { productRouter } = require("./Routes/Product.Routes");

const app = express();

app.use(cors());

require("dotenv").config();

app.use(express.json());

app.use("/user", userRouter);
app.use("/product", productRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB.");
  } catch (error) {
    console.log("Error connecting to DB");
  }

  console.log(`Server runnung on PORT ${process.env.PORT}`);
});
