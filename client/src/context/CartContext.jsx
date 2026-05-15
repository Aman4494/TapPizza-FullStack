import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const CartContext =
  createContext();

export function CartProvider({
  children
}) {

  const [cart, setCart] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "tapPizzaCart"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  // SAVE LOCALSTORAGE
  useEffect(() => {

    localStorage.setItem(
      "tapPizzaCart",
      JSON.stringify(cart)
    );

  }, [cart]);

  // ADD
  const addToCart = (item) => {

    setCart((prev) => [
      ...prev,
      {
        ...item,
        quantity: 1
      }
    ]);
  };

  // REMOVE
  const removeFromCart = (
    index
  ) => {

    setCart((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );
  };

  // INCREASE
  const increaseQty = (
    index
  ) => {

    setCart((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity:
                item.quantity + 1
            }
          : item
      )
    );
  };

  // DECREASE
  const decreaseQty = (
    index
  ) => {

    setCart((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1
            }
          : item
      )
    );
  };

  // CLEAR
  const clearCart = () => {

    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () =>
  useContext(CartContext);