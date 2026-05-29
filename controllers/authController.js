const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {

  try {

    const { name, email, password } = req.body;


    if (!name || !email || !password) {

      return res.status(400).json({
        message: "All fields are required",
      });

    }


    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });

    }

    /* Hash Password */

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    /* Create User */

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    /* Success Response */

    res.status(201).json({
      message: "User Registered Successfully",
      user,
    });

  } catch (error) {

    console.log("REGISTER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });

  }

};

/* LOGIN USER */

exports.login = async (req, res) => {

  try {

    if (!req.body) {

      return res.status(400).json({
        message: "Request body missing",
      });

    }

    const { email, password } = req.body;


    if (!email || !password) {

      return res.status(400).json({
        message: "Email and Password required",
      });

    }


    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(400).json({
        message: "Invalid Email",
      });

    }

    /* Compare Password */

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password",
      });

    }

    /* Generate JWT Token */

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    /* Success Response */

    res.status(200).json({
      message: "Login Success",
      token,
      user,
    });

  } catch (error) {

    console.log("LOGIN ERROR:", error);

    res.status(500).json({
      message: error.message,
    });

  }

};