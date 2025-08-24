import { type SchemaTypeDefinition } from "sanity";
import { productType } from "./ProductType";
import { bannerType } from "./bannerType";
import { categoryType } from "./categoryType";
import { brandType } from "./brandType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, bannerType, categoryType, brandType],
};
