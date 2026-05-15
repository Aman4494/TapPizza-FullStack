import { Link, useLocation } from "react-router-dom";

function Navbar() {

  const location = useLocation();

  // CHECK LOGIN
  const user =
    localStorage.getItem("tapPizzaUser");

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem(
      "tapPizzaUser"
    );

    alert("Logged Out");

    window.location.reload();
  };

  const navLink = (path) => {

    return location.pathname === path
      ? "text-orange-400"
      : "text-gray-300 hover:text-white";
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* LOGO */}

        <Link to="/">

          <h1 className="text-3xl font-black tracking-tight text-white">
            TapPizza
          </h1>

        </Link>

        {/* NAV LINKS */}

        <div className="hidden md:flex items-center gap-10">

          <Link
            to="/"
            className={`${navLink("/")} transition font-medium`}
          >
            Home
          </Link>

          <Link
            to="/build"
            className={`${navLink("/build")} transition font-medium`}
          >
            Build Pizza
          </Link>

          <Link
            to="/cart"
            className={`${navLink("/cart")} transition font-medium`}
          >
            Cart
          </Link>

          <Link
            to="/myorders"
            className={`${navLink("/myorders")} transition font-medium`}
          >
            My Orders
          </Link>

        </div>

        {/* AUTH */}

        <div className="flex items-center gap-4">

          {!user ? (

            <>
              {/* LOGIN */}

              <Link
                to="/login"
                className="px-5 py-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                Login
              </Link>

              {/* REGISTER */}

              <Link
                to="/register"
                className="px-5 py-2 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 font-semibold hover:scale-105 transition"
              >
                Register
              </Link>
            </>

          ) : (

            <>
              <div className="hidden md:block text-sm text-gray-400">
                Welcome Back 🍕
              </div>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;