const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// DB
mongoose.connect("mongodb://127.0.0.1:27017/tappizza")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("TapPizza API Running 🚀");
});

app.listen(5000, () => console.log("Server running on port 5000"));