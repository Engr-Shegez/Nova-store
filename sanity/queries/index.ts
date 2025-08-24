import { sanityFetch } from "../lib/live";
import { BANNER_QUERY, PRODUCT_BY_SLUG_QUERY, PRODUCT_QUERY } from "./query";

const getBanner = async () => {
  try {
    const { data } = await sanityFetch({ query: BANNER_QUERY });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching Banners Data", error);
  }
};

const getProduct = async () => {
  try {
    const { data } = await sanityFetch({ query: PRODUCT_QUERY });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching Product Data", error);
  }
};

const getProductSlug = async (slug: string) => {
  try {
    const products = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });
    return products?.data || null;
  } catch (error) {
    console.error("Error fetching Product by ID", error);
  }
};

export { getBanner, getProduct, getProductSlug };
