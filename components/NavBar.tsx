"use client";
import React from "react";
import Link from "next/link";
import { AiOutlineShopping, AiOutlineShoppingCart } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "@/context/StateContext";

const NavBar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <span>
        <AiOutlineShoppingCart />
        <span className="logo">
          <Link href="/">NovaStore Gadgets</Link>
        </span>
      </span>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default NavBar;
