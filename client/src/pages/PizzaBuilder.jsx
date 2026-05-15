import { useState } from "react";

import { motion } from "framer-motion";

import {
  FaHeart,
  FaRegHeart
} from "react-icons/fa";

import { useCart } from "../context/CartContext";

// PIZZA CARDS
import margherita from "../assets/margherita.jpg";
import farmhouse from "../assets/farmhouse.jpg";
import veggie from "../assets/veggie.jpg";
import paneer from "../assets/paneer.jpg";

// CRUSTS
import thin from "../assets/thin.jpg";
import cheeseburst from "../assets/cheeseburst.jpg";
import pan from "../assets/pan.jpg";

// SAUCES
import tomato from "../assets/tomato.jpg";
import bbq from "../assets/bbq.jpg";
import peri from "../assets/peri.jpg";

// TOPPINGS
import olives from "../assets/olives.png";
import mushroom from "../assets/mushroom.png";
import paneercubes from "../assets/paneercubes.png";
import corn from "../assets/corn.png";
import jalapeno from "../assets/jalapeno.png";

// PREVIEW STATES
import previewDefault from "../assets/preview-default.png";
import previewVeggie from "../assets/preview-veggie.png";
import previewPaneer from "../assets/preview-paneer.png";
import previewCheeseburst from "../assets/preview-cheeseburst.png";
import previewSpicy from "../assets/preview-spicy.png";

function PizzaBuilder() {

  const { addToCart } = useCart();

  const [favorites, setFavorites] = useState([]);

  const [selectedSize, setSelectedSize] =
    useState("Medium");

  const [selectedCrust, setSelectedCrust] =
    useState("Thin Crust");

  const [selectedSauce, setSelectedSauce] =
    useState("Tomato Basil");

  const [selectedToppings, setSelectedToppings] =
    useState([]);

  // PIZZAS
  const pizzas = [
    {
      name: "Margherita",
      image: margherita,
      price: 199,
      desc: "Classic mozzarella delight"
    },
    {
      name: "Farmhouse",
      image: farmhouse,
      price: 299,
      desc: "Fresh veggie overload"
    },
    {
      name: "Veggie Deluxe",
      image: veggie,
      price: 349,
      desc: "Luxury veggie experience"
    },
    {
      name: "Paneer Blast",
      image: paneer,
      price: 399,
      desc: "Paneer + cheese burst"
    }
  ];

  // CRUSTS
  const crusts = [
    {
      name: "Thin Crust",
      image: thin
    },
    {
      name: "Cheese Burst",
      image: cheeseburst
    },
    {
      name: "Pan Pizza",
      image: pan
    }
  ];

  // SAUCES
  const sauces = [
    {
      name: "Tomato Basil",
      image: tomato
    },
    {
      name: "BBQ",
      image: bbq
    },
    {
      name: "Peri Peri",
      image: peri
    }
  ];

  // TOPPINGS
  const toppings = [
    {
      name: "Olives",
      image: olives
    },
    {
      name: "Mushroom",
      image: mushroom
    },
    {
      name: "Paneer",
      image: paneercubes
    },
    {
      name: "Corn",
      image: corn
    },
    {
      name: "Jalapeno",
      image: jalapeno
    }
  ];

  // FAVORITES
  const toggleFavorite = (pizzaName) => {

    if (favorites.includes(pizzaName)) {

      setFavorites(
        favorites.filter(
          (p) => p !== pizzaName
        )
      );

    } else {

      setFavorites([
        ...favorites,
        pizzaName
      ]);
    }
  };

  // TOPPING TOGGLE
  const toggleTopping = (name) => {

    if (selectedToppings.includes(name)) {

      setSelectedToppings(
        selectedToppings.filter(
          (t) => t !== name
        )
      );

    } else {

      setSelectedToppings([
        ...selectedToppings,
        name
      ]);
    }
  };

  // SMART PREVIEW
  const getPreviewImage = () => {

    if (
      selectedCrust ===
      "Cheese Burst"
    ) {
      return previewCheeseburst;
    }

    if (
      selectedSauce ===
      "Peri Peri"
    ) {
      return previewSpicy;
    }

    if (
      selectedToppings.includes(
        "Paneer"
      )
    ) {
      return previewPaneer;
    }

    if (
      selectedToppings.length >= 2
    ) {
      return previewVeggie;
    }

    return previewDefault;
  };

  // PRICE
  const totalPrice =
    299 +
    selectedToppings.length * 40;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-12 relative overflow-hidden">

      {/* BACKGROUND BLOBS */}

      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-orange-500/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-red-500/10 blur-[140px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HERO */}

        <div className="text-center mb-24">

          <motion.h1
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="text-7xl md:text-8xl font-extrabold tracking-tight mb-6"
          >
            TapPizza
          </motion.h1>

          <p className="text-gray-400 text-xl font-medium">
            Luxury handcrafted pizza experience.
          </p>

        </div>

        {/* PRESET PIZZAS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-28">

          {pizzas.map((pizza) => (

            <motion.div
              key={pizza.name}
              whileHover={{
                y: -10,
                scale: 1.02
              }}
              className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
            >

              <div className="h-56 overflow-hidden">

                <img
                  src={pizza.image}
                  alt={pizza.name}
                  className="w-full h-full object-cover hover:scale-110 transition duration-700"
                />

              </div>

              <div className="p-6">

                <div className="flex justify-between items-start mb-4">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {pizza.name}
                    </h2>

                    <p className="text-gray-400 text-sm">
                      {pizza.desc}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      toggleFavorite(
                        pizza.name
                      )
                    }
                    className="text-2xl"
                  >
                    {favorites.includes(
                      pizza.name
                    ) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>

                </div>

                <div className="flex justify-between items-center">

                  <h2 className="text-3xl font-black text-orange-400">
                    ₹{pizza.price}
                  </h2>

                  <button
                    onClick={() => {

                      addToCart({
                        name: pizza.name,
                        quantity: 1,
                        total: pizza.price
                      });

                      alert(
                        `${pizza.name} added 🍕`
                      );
                    }}
                    className="bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3 rounded-2xl font-bold hover:scale-105 transition"
                  >
                    Order
                  </button>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

        {/* CUSTOM BUILDER */}

        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT */}

          <div>

            <h1 className="text-5xl font-extrabold mb-12 tracking-tight">
              Create Your Own 🍕
            </h1>

            {/* SIZE */}

            <div className="mb-10">

              <h2 className="text-2xl font-bold mb-5">
                Choose Size
              </h2>

              <div className="flex flex-wrap gap-4">

                {[
                  "Small",
                  "Medium",
                  "Large"
                ].map((size) => (

                  <button
                    key={size}
                    onClick={() =>
                      setSelectedSize(size)
                    }
                    className={`px-6 py-3 rounded-2xl border transition ${
                      selectedSize === size
                        ? "bg-orange-500 border-orange-500 text-white"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    {size}
                  </button>

                ))}

              </div>

            </div>

            {/* CRUSTS */}

            <div className="mb-10">

              <h2 className="text-2xl font-bold mb-5">
                Choose Crust
              </h2>

              <div className="grid grid-cols-3 gap-4">

                {crusts.map((crust) => (

                  <motion.div
                    whileHover={{
                      scale: 1.03
                    }}
                    key={crust.name}
                    onClick={() =>
                      setSelectedCrust(
                        crust.name
                      )
                    }
                    className={`cursor-pointer rounded-[28px] overflow-hidden border shadow-sm ${
                      selectedCrust === crust.name
                        ? "border-orange-500"
                        : "border-white/10"
                    }`}
                  >

                    <img
                      src={crust.image}
                      className="h-32 w-full object-cover"
                    />

                    <div className="p-3 text-center font-medium">
                      {crust.name}
                    </div>

                  </motion.div>

                ))}

              </div>

            </div>

            {/* SAUCES */}

            <div className="mb-10">

              <h2 className="text-2xl font-bold mb-5">
                Choose Sauce
              </h2>

              <div className="grid grid-cols-3 gap-4">

                {sauces.map((sauce) => (

                  <motion.div
                    whileHover={{
                      scale: 1.03
                    }}
                    key={sauce.name}
                    onClick={() =>
                      setSelectedSauce(
                        sauce.name
                      )
                    }
                    className={`cursor-pointer rounded-[28px] overflow-hidden border shadow-sm ${
                      selectedSauce === sauce.name
                        ? "border-orange-500"
                        : "border-white/10"
                    }`}
                  >

                    <img
                      src={sauce.image}
                      className="h-28 w-full object-cover"
                    />

                    <div className="p-3 text-center font-medium">
                      {sauce.name}
                    </div>

                  </motion.div>

                ))}

              </div>

            </div>

            {/* TOPPINGS */}

            <div>

              <h2 className="text-2xl font-bold mb-5">
                Toppings
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                {toppings.map((top) => (

                  <motion.div
                    whileHover={{
                      y: -5
                    }}
                    key={top.name}
                    onClick={() =>
                      toggleTopping(top.name)
                    }
                    className={`cursor-pointer rounded-[28px] overflow-hidden border p-4 text-center transition ${
                      selectedToppings.includes(
                        top.name
                      )
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-white/10 bg-white/5"
                    }`}
                  >

                    <img
                      src={top.image}
                      className="h-20 mx-auto object-contain"
                    />

                    <h3 className="mt-3 font-semibold">
                      {top.name}
                    </h3>

                  </motion.div>

                ))}

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="sticky top-28 h-fit">

            <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]">

              <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight">
                Live Preview
              </h1>

              {/* PREVIEW */}

              <motion.div
                key={getPreviewImage()}
                initial={{
                  opacity: 0,
                  scale: 0.95
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                transition={{
                  duration: 0.5
                }}
                className="relative"
              >

                <motion.img
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  src={getPreviewImage()}
                  className="w-full max-w-[420px] mx-auto drop-shadow-[0_0_60px_rgba(255,140,66,0.35)]"
                />

              </motion.div>

              {/* DETAILS */}

              <div className="mt-10 space-y-4 text-gray-300">

                <div className="flex justify-between">
                  <span>Size</span>
                  <span>{selectedSize}</span>
                </div>

                <div className="flex justify-between">
                  <span>Crust</span>
                  <span>{selectedCrust}</span>
                </div>

                <div className="flex justify-between">
                  <span>Sauce</span>
                  <span>{selectedSauce}</span>
                </div>

                <div className="flex justify-between">
                  <span>Toppings</span>

                  <span>
                    {selectedToppings.join(", ") || "None"}
                  </span>
                </div>

              </div>

              {/* TOTAL */}

              <div className="mt-10">

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-2xl font-bold">
                    Total
                  </h2>

                  <h2 className="text-5xl font-black text-orange-400">
                    ₹{totalPrice}
                  </h2>

                </div>

                <button
                  onClick={() => {

                    addToCart({
                      name: "Custom Pizza",
                      quantity: 1,
                      size: selectedSize,
                      crust: selectedCrust,
                      sauce: selectedSauce,
                      toppings:
                        selectedToppings,
                      total: totalPrice
                    });

                    alert(
                      "Custom Pizza Added 🍕"
                    );
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 py-5 rounded-2xl text-xl font-bold hover:scale-[1.02] transition"
                >
                  Add To Cart
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PizzaBuilder;