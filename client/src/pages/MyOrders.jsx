import {
  useEffect,
  useState
} from "react";

import {
  motion
} from "framer-motion";

function MyOrders() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH ORDERS

  useEffect(() => {

    const fetchOrders =
      async () => {

        try {

          // USER

          const user =
            JSON.parse(
              localStorage.getItem(
                "tapPizzaUser"
              )
            );

          // NOT LOGGED IN

          if (!user?.token) {

            setLoading(false);

            return;
          }

          // API CALL

          const response =
            await fetch(
              "http://localhost:5000/api/orders/my-orders",
              {
                method: "GET",

                headers: {

                  "Content-Type":
                    "application/json",

                  Authorization:
                    `Bearer ${user.token}`,
                },
              }
            );

          const data =
            await response.json();

          if (response.ok) {

            // LATEST FIRST

            setOrders(
              data.reverse()
            );

          } else {

            console.log(data);
          }

        } catch (error) {

          console.log(error);
        }

        setLoading(false);
      };

    fetchOrders();

  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-12 relative overflow-hidden">

      {/* BLOBS */}

      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-orange-500/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-red-500/10 blur-[140px] rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADER */}

        <div className="mb-16">

          <motion.h1
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="text-6xl font-black mb-4"
          >
            My Orders 🍕
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.1
            }}
            className="text-gray-400 text-xl"
          >
            Track your premium handcrafted pizzas.
          </motion.p>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="text-center text-3xl font-bold">
            Loading Orders...
          </div>

        ) : orders.length === 0 ? (

          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            className="bg-white/5 border border-white/10 rounded-[36px] p-16 text-center backdrop-blur-xl"
          >

            <h2 className="text-4xl font-black mb-4">
              No Orders Yet
            </h2>

            <p className="text-gray-400 text-lg">
              Your luxury pizza journey starts here 🍕
            </p>

          </motion.div>

        ) : (

          <div className="space-y-8">

            {orders.map(
              (
                order,
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
                  transition={{
                    delay:
                      index * 0.1
                  }}
                  className="bg-white/5 border border-white/10 rounded-[36px] p-8 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
                >

                  {/* TOP */}

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

                    <div>

                      <h2 className="text-4xl font-black mb-3">
                        Order #
                        {orders.length -
                          index}
                      </h2>

                      <p className="text-gray-400">
                        {new Date(
                          order.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>

                    <div className="bg-green-500/20 border border-green-500/30 text-green-400 px-6 py-3 rounded-2xl font-bold w-fit">
                      Order Confirmed
                    </div>

                  </div>

                  {/* ITEMS */}

                  <div className="space-y-6">

                    {order.items?.map(
                      (
                        item,
                        itemIndex
                      ) => (

                        <div
                          key={itemIndex}
                          className="bg-black/20 border border-white/5 rounded-[28px] p-6"
                        >

                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                            {/* LEFT */}

                            <div>

                              <h3 className="text-3xl font-bold mb-2">
                                {
                                  item.name
                                }
                              </h3>

                              {item.size && (

                                <p className="text-gray-400">
                                  Size:
                                  {" "}
                                  {
                                    item.size
                                  }
                                </p>

                              )}

                              {item.crust && (

                                <p className="text-gray-400">
                                  Crust:
                                  {" "}
                                  {
                                    item.crust
                                  }
                                </p>

                              )}

                              {item.sauce && (

                                <p className="text-gray-400">
                                  Sauce:
                                  {" "}
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
                                  Toppings:
                                  {" "}
                                  {item.toppings.join(
                                    ", "
                                  )}
                                </p>

                              )}

                            </div>

                            {/* RIGHT */}

                            <div className="text-left lg:text-right">

                              <h2 className="text-4xl font-black text-orange-400 mb-2">
                                ₹
                                {item.total *
                                  item.quantity}
                              </h2>

                              <p className="text-gray-400">
                                Quantity:
                                {" "}
                                {
                                  item.quantity
                                }
                              </p>

                            </div>

                          </div>

                        </div>
                      )
                    )}

                  </div>

                  {/* FOOTER */}

                  <div className="border-t border-white/10 mt-8 pt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    <div>

                      <p className="text-gray-400 mb-2">
                        Estimated Delivery
                      </p>

                      <h3 className="text-2xl font-bold">
                        25 - 35 mins
                      </h3>

                    </div>

                    <div className="text-left lg:text-right">

                      <p className="text-gray-400 mb-2">
                        Total Paid
                      </p>

                      <h2 className="text-5xl font-black text-orange-400">
                        ₹
                        {
                          order.totalAmount
                        }
                      </h2>

                    </div>

                  </div>

                </motion.div>
              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default MyOrders;