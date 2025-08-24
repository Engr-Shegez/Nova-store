import { getProductSlug, getProduct } from "@/sanity/queries";
// import { client, urlFor } from "@/sanity/lib/image";
import React from "react";
import { Products } from "@/components";
import ProductDetails from "./ProductDetails";

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

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductSlug(slug);
  const allProducts = (await getProduct()) || [];
  const relatedProducts = allProducts.filter(
    (p: Product) => p.slug?.current !== product?.slug?.current
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <ProductDetails product={product} />
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            <Products product={relatedProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
