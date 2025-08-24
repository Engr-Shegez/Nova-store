import React from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface FooterBannerProps {
  footerBanner: {
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

function FooterBanner({
  footerBanner: {
    product,
    discountAmount,
    LargeText,
    LargeText2,
    saleTime,
    SmallText,
    MidText,
    buttonText,
    image,
    description,
  },
}: FooterBannerProps) {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discountAmount}% OFF</p>
          <h3>{LargeText}</h3>
          <h3>{LargeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{SmallText}</p>
          <h3>{MidText}</h3>
          <p>{description}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>
        <picture>
          <img
            src={urlFor(image).url()}
            className="footer-banner-image"
            alt="footer-banner"
          />
        </picture>
      </div>
    </div>
  );
}

export default FooterBanner;
