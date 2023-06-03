const express = require("express");
const { UserModel } = require("../Models/User.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const userRouter = express.Router();

// signup route

userRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashed_password = bcrypt.hashSync(password, 5);
    const user = new UserModel({
      email,
      password: hashed_password,
    });
    await user.save();

    res.status(201).send({ msg: "User registered successfully." });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Something went wrong.", error: error.message });
  }
});

// login route
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Finding user by username

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.send({ msg: "Invalid username or password" });
    }

    // comparing password

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.send({ msg: "Invalid username or password." });
    }

    // creating token

    const token = jwt.sign({ userId: user._id }, process.env.NORMAL_TOKEN);

    res.status(201).send({ msg: "Login Successful", token: token });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Something went wrong.", error: error.message });
  }
});

module.exports = { userRouter };
