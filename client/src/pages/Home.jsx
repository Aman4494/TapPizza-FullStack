import { motion } from "framer-motion";

import heroPizza from "../assets/preview-cheeseburst.png";

function Home() {

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white overflow-hidden relative">

      {/* BLOBS */}

      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-orange-500/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-red-500/10 blur-[140px] rounded-full"></div>

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-6 py-24 relative z-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <motion.p
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className="text-orange-400 font-semibold tracking-[4px] uppercase mb-6"
            >
              Luxury Pizza Experience
            </motion.p>

            <motion.h1
              initial={{
                opacity: 0,
                y: 30
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.1
              }}
              className="text-6xl md:text-8xl font-black leading-[0.95] mb-8"
            >
              TapPizza
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
                delay: 0.2
              }}
              className="text-gray-400 text-xl leading-relaxed max-w-xl mb-10"
            >
              Build handcrafted premium pizzas with cinematic visuals,
              luxury customization and real-time live previews.
            </motion.p>

            {/* BUTTONS */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.3
              }}
              className="flex flex-wrap gap-5"
            >

              <a
                href="/build"
                className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 rounded-2xl text-lg font-bold hover:scale-105 transition"
              >
                Build Your Pizza
              </a>

              <a
                href="/cart"
                className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-white/10 transition"
              >
                View Cart
              </a>

            </motion.div>

            {/* STATS */}

            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 0.5
              }}
              className="flex gap-12 mt-16"
            >

              <div>
                <h2 className="text-4xl font-black text-orange-400">
                  50K+
                </h2>

                <p className="text-gray-400">
                  Happy Customers
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-black text-orange-400">
                  120+
                </h2>

                <p className="text-gray-400">
                  Pizza Variants
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-black text-orange-400">
                  4.9★
                </h2>

                <p className="text-gray-400">
                  Ratings
                </p>
              </div>

            </motion.div>

          </div>

          {/* RIGHT */}

          <div className="relative flex justify-center">

            {/* GLOW */}

            <div className="absolute w-[500px] h-[500px] bg-orange-500/20 blur-[120px] rounded-full"></div>

            {/* PIZZA */}

            <motion.img
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear"
              }}
              src={heroPizza}
              className="relative z-10 w-full max-w-[600px] drop-shadow-[0_0_80px_rgba(255,140,66,0.35)]"
            />

          </div>

        </div>

      </section>

      {/* FEATURE SECTION */}

      <section className="max-w-7xl mx-auto px-6 pb-24 relative z-10">

        <div className="grid md:grid-cols-3 gap-8">

          {/* CARD 1 */}

          <motion.div
            whileHover={{
              y: -10
            }}
            className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl"
          >

            <h2 className="text-3xl font-black mb-4">
              Live Preview
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Watch your pizza transform instantly with
              dynamic premium live visuals.
            </p>

          </motion.div>

          {/* CARD 2 */}

          <motion.div
            whileHover={{
              y: -10
            }}
            className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl"
          >

            <h2 className="text-3xl font-black mb-4">
              Premium Ingredients
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Hand-selected toppings, luxury crusts and
              gourmet sauces crafted to perfection.
            </p>

          </motion.div>

          {/* CARD 3 */}

          <motion.div
            whileHover={{
              y: -10
            }}
            className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl"
          >

            <h2 className="text-3xl font-black mb-4">
              Fast Delivery
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Fresh handcrafted pizzas delivered hot and
              fast directly to your doorstep.
            </p>

          </motion.div>

        </div>

      </section>

    </div>
  );
}

export default Home;