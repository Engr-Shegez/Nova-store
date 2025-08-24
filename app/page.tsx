import React from "react";
import { Products, FooterBanner, HeroBanner, Footer } from "../components";
import { client } from "../sanity/lib/client";
import { BANNER_QUERY, PRODUCT_QUERY } from "../sanity/queries/query";

const page = async () => {
  try {
    // Fetch data from Sanity
    const bannerData = await client.fetch(BANNER_QUERY);
    const products = await client.fetch(PRODUCT_QUERY);

    return (
      <>
        <HeroBanner heroBanner={bannerData.length > 0 ? bannerData[0] : null} />
        <div className="products-heading">
          <h2>Best Selling Products</h2>
          <p>Speakers of many variations</p>
        </div>

        <div className="products-container">
          <Products product={products || []} />
        </div>
        <FooterBanner footerBanner={bannerData && bannerData[0]} />
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div>
        <h1>Error loading data</h1>
        <p>Please check your Sanity configuration and environment variables.</p>
        <p>Error: {error instanceof Error ? error.message : "Unknown error"}</p>
      </div>
    );
  }
};

export default page;
