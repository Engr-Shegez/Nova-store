import React from "react";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  discount: number;
  description?: string;
  status?: string;
  variant?: string;
  isFeatured?: boolean;
  stock?: number;
  // images?: SanityImageSource[];
  images?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
    };
    media?: unknown;
    _type: "image";
    _key: string;
  }>;
}

interface ProductsProps {
  product: Product[];
}

const Products = ({ product }: ProductsProps) => {
  return (
    <>
      {product.map(({ _id, images, slug, price, name }) => (
        <div key={_id}>
          <Link href={`/products/${slug.current}`}>
            <div className="product-card">
              <picture>
                <img
                  src={
                    images?.[0] ? urlFor(images[0]).url() : "/placeholder.jpg"
                  }
                  width={250}
                  height={250}
                  className="product-image"
                  alt="product-image"
                />
              </picture>

              <p className="product-name">{name}</p>
              <p className="product-price">${price}</p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Products;
