const express =
  require("express");

const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

const User =
  require("../models/User");

const router =
  express.Router();

const SECRET =
  "tap_pizza_secret";

//
// SIGNUP
//

router.post(
  "/signup",

  async (req, res) => {

    try {

      const {
        name,
        email,
        password
      } = req.body;

      // CHECK EXISTING USER

      const existingUser =
        await User.findOne({
          email
        });

      if (existingUser) {

        return res.status(400).json({

          message:
            "User already exists"
        });
      }

      // HASH PASSWORD

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // CREATE USER

      const user =
        new User({

          name,

          email,

          password:
            hashedPassword
        });

      // SAVE USER

      await user.save();

      // RESPONSE

      res.json({

        message:
          "Signup successful 🍕",

        _id:
          user._id,

        name:
          user.name,

        email:
          user.email
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Server Error ❌"
      });
    }
  }
);

//
// REGISTER
// (FOR OLD FRONTEND CACHE)
//

router.post(
  "/register",

  async (req, res) => {

    try {

      const {
        name,
        email,
        password
      } = req.body;

      // CHECK EXISTING USER

      const existingUser =
        await User.findOne({
          email
        });

      if (existingUser) {

        return res.status(400).json({

          message:
            "User already exists"
        });
      }

      // HASH PASSWORD

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // CREATE USER

      const user =
        new User({

          name,

          email,

          password:
            hashedPassword
        });

      // SAVE USER

      await user.save();

      // RESPONSE

      res.json({

        message:
          "Register successful 🍕",

        _id:
          user._id,

        name:
          user.name,

        email:
          user.email
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Server Error ❌"
      });
    }
  }
);

//
// LOGIN
//

router.post(
  "/login",

  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;

      // FIND USER

      const user =
        await User.findOne({
          email
        });

      // USER NOT FOUND

      if (!user) {

        return res.status(400).json({

          message:
            "User not found ❌"
        });
      }

      // CHECK PASSWORD

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      // WRONG PASSWORD

      if (!isMatch) {

        return res.status(400).json({

          message:
            "Wrong password ❌"
        });
      }

      // CREATE TOKEN

      const token =
        jwt.sign(

          {
            id:
              user._id,

            isAdmin:
              user.isAdmin
          },

          SECRET
        );

      // RESPONSE

      res.json({

        token,

        _id:
          user._id,

        name:
          user.name,

        email:
          user.email,

        isAdmin:
          user.isAdmin
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Server Error ❌"
      });
    }
  }
);

module.exports =
  router;