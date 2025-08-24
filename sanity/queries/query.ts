import { defineQuery } from "next-sanity";

const BANNER_QUERY = defineQuery(
  `*[_type == "banner"] | order(publishedAt desc) {
    _id,
    saleTime,
    buttonText,
    product,
    description,
    SmallText,
    MidText,
    LargeText,
    LargeText2,
    discountAmount,
    "image": image.asset->url
  }`
);

const PRODUCT_QUERY = defineQuery(
  `*[_type == "product" ] | order(publishedAt desc) {
    _id,
    name,
    slug,
    price,
    discount,
    description,
    status,
    variant,
    isFeatured,
    stock,
    "images": images[].asset->url
  }`
);

const PRODUCT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug] | order(name asc) [0]{
    _id,
    name,
    slug,
    price,
    discount,
    description,
    details,
    status,
    variant,
    isFeatured,
    stock,
    "images": images[].asset->url
  }`
);

export { BANNER_QUERY, PRODUCT_QUERY, PRODUCT_BY_SLUG_QUERY };
