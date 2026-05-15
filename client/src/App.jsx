import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import PizzaBuilder from "./pages/PizzaBuilder";

import Cart from "./pages/Cart";

import MyOrders from "./pages/MyOrders";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import Admin from "./pages/Admin";

function App() {

  return (
    <BrowserRouter>

      {/* NAVBAR */}

      <Navbar />

      {/* ROUTES */}

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* BUILD */}

        <Route
          path="/build"
          element={
            <PizzaBuilder />
          }
        />

        {/* CART */}

        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* ORDERS */}

        <Route
          path="/myorders"
          element={<MyOrders />}
        />

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* SIGNUP */}

        <Route
          path="/register"
          element={<Signup />}
        />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={<Admin />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;