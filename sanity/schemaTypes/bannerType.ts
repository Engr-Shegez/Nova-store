// import { TagIcon } from "sanity";
import { defineField, defineType } from "sanity";

export const bannerType = defineType({
  name: "banner",
  title: "Banner",
  type: "document",
  //   icon: TagIcon,
  fields: [
    defineField({
      name: "saleTime",
      title: "SaleTime",
      type: "string",
    }),
    defineField({
      name: "buttonText",
      title: "ButtonText",
      type: "string",
    }),
    defineField({
      name: "product",
      title: "Product",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Sale Description",
      type: "text",
    }),
    defineField({
      name: "SmallText",
      title: "Small Text",
      type: "string",
    }),
    defineField({
      name: "MidText",
      title: "mid Text",
      type: "string",
    }),
    defineField({
      name: "LargeText",
      title: "Large Text",
      type: "string",
    }),
    defineField({
      name: "LargeText2",
      title: "Large Text2",
      type: "string",
    }),
    defineField({
      name: "discountAmount",
      title: "Discount Amount",
      type: "number",
      description: "Amount off in percentage or Fixed",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
    prepare(select) {
      const { title, media } = select;
      return {
        title,
        media,
      };
    },
  },
});
