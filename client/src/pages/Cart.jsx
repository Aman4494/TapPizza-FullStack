import { motion } from "framer-motion";

import { useCart } from "../context/CartContext";

function Cart() {

  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart
  } = useCart();

  // TOTAL PRICE

  const totalPrice = cart.reduce(
    (acc, item) =>
      acc +
      item.total *
        item.quantity,
    0
  );

  // PAYMENT

  const handlePayment =
    async () => {

      if (cart.length === 0) {

        alert(
          "Cart is empty 🍕"
        );

        return;
      }

      const options = {

        key: "rzp_test_SlYh4huJfewKYU",

        amount:
          totalPrice * 100,

        currency: "INR",

        name: "TapPizza",

        description:
          "Premium Pizza Order",

        image:
          "https://cdn-icons-png.flaticon.com/512/3595/3595455.png",

        handler:
          async function (
            response
          ) {

            try {

              // GET USER

              const user =
                JSON.parse(
                  localStorage.getItem(
                    "tapPizzaUser"
                  )
                );

              // CHECK LOGIN

              if (
                !user?.token
              ) {

                alert(
                  "Please login first 🍕"
                );

                return;
              }

              // SAVE ORDER

              const saveResponse =
                await fetch(
                  "http://localhost:5000/api/orders",
                  {
                    method:
                      "POST",

                    headers:
                      {

                        "Content-Type":
                          "application/json",

                        Authorization:
                          `Bearer ${user.token}`,
                      },

                    body: JSON.stringify({

                      items:
                        cart,

                      totalAmount:
                        totalPrice
                    }),
                  }
                );

              const data =
                await saveResponse.json();

              // ERROR

              if (
                !saveResponse.ok
              ) {

                alert(
                  data.error ||
                    "Order Saving Failed ❌"
                );

                return;
              }

              // SUCCESS

              alert(
                "Payment Successful & Order Saved 🍕"
              );

              // CLEAR CART

              clearCart();

            } catch (error) {

              console.log(
                error
              );

              alert(
                "Server Error ❌"
              );
            }
          },

        prefill: {

          name:
            "TapPizza User",

          email:
            "test@example.com",

          contact:
            "9999999999",
        },

        theme: {

          color: "#f97316",
        },
      };

      const razor =
        new window.Razorpay(
          options
        );

      razor.open();
    };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-12 relative overflow-hidden">

      {/* BLOBS */}

      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-orange-500/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-red-500/10 blur-[140px] rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADER */}

        <div className="mb-14">

          <h1 className="text-6xl font-black mb-3">
            Your Cart 🍕
          </h1>

          <p className="text-gray-400 text-lg">
            Premium handcrafted orders.
          </p>

        </div>

        {/* EMPTY */}

        {cart.length === 0 ? (

          <div className="bg-white/5 border border-white/10 rounded-[36px] p-14 text-center backdrop-blur-xl">

            <h2 className="text-3xl font-bold mb-4">
              Your cart is empty
            </h2>

            <p className="text-gray-400">
              Add some luxury pizzas 🍕
            </p>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 gap-8">

            {/* ITEMS */}

            <div className="lg:col-span-2 space-y-6">

              {cart.map(
                (
                  item,
                  index
                ) => (

                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 20
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-xl"
                  >

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                      {/* LEFT */}

                      <div>

                        <h2 className="text-3xl font-bold mb-2">
                          {
                            item.name
                          }
                        </h2>

                        {item.size && (
                          <p className="text-gray-400">
                            Size:{" "}
                            {
                              item.size
                            }
                          </p>
                        )}

                        {item.crust && (
                          <p className="text-gray-400">
                            Crust:{" "}
                            {
                              item.crust
                            }
                          </p>
                        )}

                        {item.sauce && (
                          <p className="text-gray-400">
                            Sauce:{" "}
                            {
                              item.sauce
                            }
                          </p>
                        )}

                        {item.toppings &&
                          item
                            .toppings
                            .length >
                            0 && (
                            <p className="text-gray-400">
                              Toppings:{" "}
                              {item.toppings.join(
                                ", "
                              )}
                            </p>
                          )}

                      </div>

                      {/* RIGHT */}

                      <div className="flex flex-col items-start md:items-end gap-5">

                        {/* PRICE */}

                        <h2 className="text-4xl font-black text-orange-400">
                          ₹
                          {item.total *
                            item.quantity}
                        </h2>

                        {/* QUANTITY */}

                        <div className="flex items-center gap-4">

                          <button
                            onClick={() =>
                              decreaseQty(
                                index
                              )
                            }
                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition text-xl"
                          >
                            -
                          </button>

                          <span className="text-2xl font-bold">
                            {
                              item.quantity
                            }
                          </span>

                          <button
                            onClick={() =>
                              increaseQty(
                                index
                              )
                            }
                            className="w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-400 transition text-xl"
                          >
                            +
                          </button>

                        </div>

                        {/* REMOVE */}

                        <button
                          onClick={() =>
                            removeFromCart(
                              index
                            )
                          }
                          className="text-red-400 hover:text-red-300 transition"
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  </motion.div>
                )
              )}

            </div>

            {/* SUMMARY */}

            <div>

              <div className="sticky top-28 bg-white/5 border border-white/10 rounded-[36px] p-8 backdrop-blur-xl">

                <h2 className="text-4xl font-black mb-10">
                  Summary
                </h2>

                <div className="space-y-5 mb-10">

                  <div className="flex justify-between text-gray-400">

                    <span>
                      Items
                    </span>

                    <span>
                      {
                        cart.length
                      }
                    </span>

                  </div>

                  <div className="flex justify-between text-gray-400">

                    <span>
                      Delivery
                    </span>

                    <span>
                      Free
                    </span>

                  </div>

                  <div className="border-t border-white/10 pt-5 flex justify-between items-center">

                    <span className="text-2xl font-bold">
                      Total
                    </span>

                    <span className="text-5xl font-black text-orange-400">
                      ₹
                      {totalPrice}
                    </span>

                  </div>

                </div>

                {/* PAYMENT BUTTON */}

                <button
                  onClick={
                    handlePayment
                  }
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 py-5 rounded-2xl text-xl font-bold hover:scale-[1.02] transition"
                >
                  Proceed To Payment
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Cart;