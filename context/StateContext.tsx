"use client";
import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  price: number;
  images?: string[];
  // image: { asset: { _ref: string } }[];
}

interface CartItem extends Product {
  quantity: number;
}

interface ContextType {
  showCart: boolean;
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantities: number;

  qty: number;
  incQty: () => void;
  decQty: () => void;
  onRemove: (product: CartItem) => void;
  onAdd: (product: Product, quantity: number) => void;
  setShowCart: (show: boolean) => void;
  setCartItems: (items: CartItem[]) => void;
  setTotalPrice: (price: number) => void;
  setTotalQuantities: (quantities: number) => void;
  setQty: (qty: number) => void;
  toggleCartItemQuantity: (id: string, value: "inc" | "dec") => void;
}

const Context = createContext<ContextType | undefined>(undefined);

export const StateContext = ({ children }: { children: ReactNode }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  //add product to cart
  const onAdd = (product: Product, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice((prevTotal) => prevTotal + product.price * quantity);
    setTotalQuantities((prevTotal) => prevTotal + quantity);

    if (checkProductInCart) {
      const updatedCart = cartItems.map((cartProduct) =>
        cartProduct._id === product._id
          ? { ...cartProduct, quantity: cartProduct.quantity + quantity }
          : cartProduct
      );
      setCartItems(updatedCart);
    } else {
      // product.quantity = quantity;
      setCartItems([...cartItems, { ...product, quantity }]);
    }

    toast.success(`${quantity} ${product.name} added to the cart.`);
  };

  const toggleCartItemQuantity = (id: string, value: "inc" | "dec") => {
    const foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    if (!foundProduct) return;

    if (value === "inc") {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotal) => prevTotal + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotal) => prevTotal - 1);
      }
    }
  };

  const onRemove = (product: CartItem) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item._id !== product._id)
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice - product.price * product.quantity
    );
    setTotalQuantities((prevTotal) => prevTotal - product.quantity);
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        onAdd,
        onRemove,
        incQty,
        decQty,
        toggleCartItemQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useStateContext must be used within a StateContext");
  }
  return context;
};
