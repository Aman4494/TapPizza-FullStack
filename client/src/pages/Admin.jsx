import {
  Navigate
} from "react-router-dom";

import {
  motion
} from "framer-motion";

import {
  useEffect,
  useState
} from "react";

function Admin() {

  // ADMIN CHECK

  const admin =
    JSON.parse(
      localStorage.getItem(
        "tapPizzaAdmin"
      )
    );

  // BLOCK ACCESS

  if (!admin) {

    return (
      <Navigate to="/login" />
    );
  }

  // STATES

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH ORDERS

  useEffect(() => {

    const fetchOrders =
      async () => {

        try {

          const response =
            await fetch(
              "http://localhost:5000/api/orders/all"
            );

          const data =
            await response.json();

          if (response.ok) {

            setOrders(data);

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

  // REVENUE

  const revenue =
    orders.reduce(
      (acc, order) =>
        acc +
        order.totalAmount,
      0
    );

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white relative overflow-hidden px-6 py-12">

      {/* BLOBS */}

      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-orange-500/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-red-500/10 blur-[140px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-16">

          <div>

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
              Admin Dashboard 🍕
            </motion.h1>

            <p className="text-gray-400 text-xl">
              Live TapPizza analytics.
            </p>

          </div>

          <div className="bg-green-500/20 border border-green-500/30 text-green-400 px-6 py-3 rounded-2xl font-bold w-fit">
            Admin Active
          </div>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-8 mb-16">

          <motion.div
            whileHover={{
              y: -8
            }}
            className="bg-white/5 border border-white/10 rounded-[36px] p-8 backdrop-blur-xl"
          >

            <p className="text-gray-400 mb-4">
              Total Orders
            </p>

            <h2 className="text-6xl font-black text-orange-400">
              {orders.length}
            </h2>

          </motion.div>

          <motion.div
            whileHover={{
              y: -8
            }}
            className="bg-white/5 border border-white/10 rounded-[36px] p-8 backdrop-blur-xl"
          >

            <p className="text-gray-400 mb-4">
              Revenue
            </p>

            <h2 className="text-6xl font-black text-orange-400">
              ₹{revenue}
            </h2>

          </motion.div>

          <motion.div
            whileHover={{
              y: -8
            }}
            className="bg-white/5 border border-white/10 rounded-[36px] p-8 backdrop-blur-xl"
          >

            <p className="text-gray-400 mb-4">
              Customers
            </p>

            <h2 className="text-6xl font-black text-orange-400">
              {orders.length}
            </h2>

          </motion.div>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="text-center text-3xl font-bold">
            Loading Orders...
          </div>

        ) : orders.length === 0 ? (

          <div className="bg-white/5 border border-white/10 rounded-[36px] p-16 text-center">

            <h2 className="text-4xl font-black mb-4">
              No Orders Yet
            </h2>

            <p className="text-gray-400">
              Orders will appear here 🍕
            </p>

          </div>

        ) : (

          <div className="space-y-8">

            {orders.map(
              (order, index) => (

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
                  className="bg-white/5 border border-white/10 rounded-[36px] p-8 backdrop-blur-xl"
                >

                  {/* TOP */}

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

                    <div>

                      <h2 className="text-4xl font-black mb-2">
                        Order #{index + 1}
                      </h2>

                      <p className="text-gray-400">
                        {new Date(
                          order.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>

                    <div className="bg-green-500/20 border border-green-500/30 text-green-400 px-5 py-2 rounded-2xl font-bold w-fit">
                      Paid
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
                          className="bg-black/20 border border-white/5 rounded-[28px] p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
                        >

                          <div>

                            <h3 className="text-3xl font-bold mb-3">
                              {item.name}
                            </h3>

                            <div className="space-y-1 text-gray-400">

                              <p>
                                Quantity:
                                {" "}
                                {
                                  item.quantity
                                }
                              </p>

                              {item.size && (
                                <p>
                                  Size:
                                  {" "}
                                  {
                                    item.size
                                  }
                                </p>
                              )}

                              {item.crust && (
                                <p>
                                  Crust:
                                  {" "}
                                  {
                                    item.crust
                                  }
                                </p>
                              )}

                            </div>

                          </div>

                          <h2 className="text-5xl font-black text-orange-400">
                            ₹
                            {item.total *
                              item.quantity}
                          </h2>

                        </div>
                      )
                    )}

                  </div>

                  {/* FOOTER */}

                  <div className="border-t border-white/10 mt-10 pt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    <div>

                      <p className="text-gray-400 mb-2">
                        Payment Status
                      </p>

                      <h3 className="text-2xl font-bold">
                        Successful
                      </h3>

                    </div>

                    <div className="text-left lg:text-right">

                      <p className="text-gray-400 mb-2">
                        Total Amount
                      </p>

                      <h2 className="text-6xl font-black text-orange-400">
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

export default Admin;