import { CollectionConfig } from "payload";

export const Photos: CollectionConfig = {
  slug: "photos",
  upload: {
    staticDir: "photos",
    imageSizes: [
      {
        name: "thumbnail",
        width: 100,
        height: undefined,
        crop: "center",
      },
      {
        name: "medium",
        width: 500,
        height: undefined,
        crop: "center",
      },
      {
        name: "large",
        width: 1000,
        height: undefined,
        crop: "center",
      },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: false,
    },
    {
      name: "description",
      type: "textarea",
      required: false,
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "People", value: "people" },
        { label: "Product", value: "product" },
        { label: "Design", value: "design" },
      ],
      required: true,
      defaultValue: "people",
    },
  ],
};
