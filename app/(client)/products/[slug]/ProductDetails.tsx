"use client";

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { useStateContext } from "@/context/StateContext";

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  discount: number;
  description?: string;
  details?: string;
  status?: string;
  variant?: string;
  isFeatured?: boolean;
  stock?: number;
  images?: string[];
}

const ProductDetails = ({ product }: { product: Product }) => {
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd } = useStateContext();

  return (
    <div className="product-detail-container">
      <div>
        <div className="image-container">
          {product.images && product.images.length > 0 && (
            <picture>
              <img
                src={product.images[index]}
                alt={product.name}
                className="product-detail-image"
              />
            </picture>
          )}
        </div>
        <div className="small-images-container">
          {product.images?.map((item, i) => (
            <Image
              key={i}
              src={item}
              alt={`${product.name} - Image ${i + 1}`}
              width={100}
              height={100}
              className={
                i === index ? "small-image selected-image" : "small-image"
              }
              onMouseEnter={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
      <div className="product-detail-desc">
        <h1> {product.name}</h1>
        <div className="reviews">
          <div>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>
          <p>(20)</p>
        </div>
        <h4>Details: </h4>
        <p>{product.details}</p>
        <p className="price">${product.price}</p>
        <div className="quantity">
          <h3>Quantity:</h3>
          <p className="quantity-desc">
            <span className="minus" onClick={decQty}>
              <AiOutlineMinus />
            </span>
            <span className="num">{qty}</span>
            <span className="plus" onClick={incQty}>
              <AiOutlinePlus />
            </span>
          </p>
        </div>
        <div className="buttons">
          <button
            type="button"
            className="add-to-cart"
            onClick={() => onAdd(product, qty)}
          >
            Add to Cart
          </button>
          <button type="button" className="buy-now">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
