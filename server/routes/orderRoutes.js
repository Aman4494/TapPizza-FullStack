const express =
  require("express");

const Order =
  require("../models/Order");

const jwt =
  require("jsonwebtoken");

const router =
  express.Router();

const SECRET =
  "tap_pizza_secret";

//
// CREATE ORDER
//

router.post(
  "/",

  async (req, res) => {

    try {

      const authHeader =
        req.headers.authorization;

      // CHECK TOKEN

      if (!authHeader) {

        return res.status(401).json({

          error:
            "No token provided"
        });
      }

      // EXTRACT TOKEN

      const token =
        authHeader.split(" ")[1];

      // VERIFY TOKEN

      const decoded =
        jwt.verify(
          token,
          SECRET
        );

      // CREATE ORDER

      const order =
        new Order({

          userId:
            decoded.id,

          items:
            req.body.items,

          totalAmount:
            req.body.totalAmount,

          paymentId:
            req.body.paymentId,

          createdAt:
            new Date()
        });

      // SAVE

      await order.save();

      // RESPONSE

      res.json({

        message:
          "Order saved successfully 🍕"
      });

    } catch (err) {

      console.log(
        "ORDER SAVE ERROR:",
        err
      );

      res.status(500).json({

        error:
          "Server Error ❌"
      });
    }
  }
);

//
// GET MY ORDERS
//

router.get(
  "/my-orders",

  async (req, res) => {

    try {

      const authHeader =
        req.headers.authorization;

      if (!authHeader) {

        return res.status(401).json({

          error:
            "No token"
        });
      }

      const token =
        authHeader.split(" ")[1];

      const decoded =
        jwt.verify(
          token,
          SECRET
        );

      const orders =
        await Order.find({

          userId:
            decoded.id
        }).sort({

          createdAt: -1
        });

      res.json(orders);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error:
          "Server Error ❌"
      });
    }
  }
);

module.exports =
  router;