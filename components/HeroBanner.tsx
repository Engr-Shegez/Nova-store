import Link from "next/link";
import React from "react";
import { urlFor } from "@/sanity/lib/image";

interface HeroBannerProps {
  heroBanner: {
    _id?: string;
    saleTime?: string;
    buttonText?: string;
    product?: string;
    description?: string;
    SmallText?: string;
    MidText?: string;
    LargeText?: string;
    LargeText2?: string;
    discountAmount?: number;
    image?: string;
  } | null;
}

function HeroBanner({ heroBanner }: HeroBannerProps) {
  if (!heroBanner) {
    return (
      <div className="hero-banner-container">
        <div>
          <p className="beats-solo">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.SmallText}</p>
        <h3>{heroBanner.MidText}</h3>
        <h1>{heroBanner.LargeText}</h1>
        <picture>
          <img
            src={urlFor(heroBanner.image!).url()}
            alt="banner"
            className="hero-banner-image"
          />
        </picture>
        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.description || "Amazing deals on our products"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
