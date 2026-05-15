import { useState } from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import { motion } from "framer-motion";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    const user = {
      name,
      email,
      password
    };

    try {

      const response =
        await fetch(
          "http://localhost:5000/api/auth/register",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              user
            ),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        alert(
          data.message ||
            "Signup Failed ❌"
        );

        return;
      }

      // SAVE USER SESSION

      localStorage.setItem(
        "tapPizzaRegisteredUser",
        JSON.stringify(user)
      );

      alert(
        "Account Created Successfully 🍕"
      );

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(
        "Server Error ❌"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-6 relative overflow-hidden">

      {/* BACKGROUND BLOBS */}

      <div className="absolute top-[-150px] left-[-150px] w-[350px] h-[350px] bg-orange-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] bg-red-500/10 blur-[120px] rounded-full"></div>

      {/* CARD */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 rounded-[36px] p-10 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
      >

        {/* HEADER */}

        <div className="text-center mb-10">

          <h1 className="text-5xl font-black text-white mb-4">
            Join TapPizza 🍕
          </h1>

          <p className="text-gray-400">
            Create your premium pizza account.
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={
            handleSignup
          }
          className="space-y-6"
        >

          {/* NAME */}

          <div>

            <label className="block text-sm text-gray-400 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-orange-500 transition"
              required
            />

          </div>

          {/* EMAIL */}

          <div>

            <label className="block text-sm text-gray-400 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-orange-500 transition"
              required
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="block text-sm text-gray-400 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-orange-500 transition"
              required
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 py-4 rounded-2xl text-lg font-bold hover:scale-[1.02] transition"
          >
            Create Account
          </button>

        </form>

        {/* FOOTER */}

        <div className="mt-8 text-center text-gray-400">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-orange-400 hover:text-orange-300 transition"
          >
            Login
          </Link>

        </div>

      </motion.div>

    </div>
  );
}

export default Signup;