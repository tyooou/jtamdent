import { CollectionConfig } from "payload";

const Photos: CollectionConfig = {
  slug: "photos",
  upload: {
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
        { label: "Commercial", value: "commercial" },
        { label: "Product", value: "product" },
      ],
      required: true,
      defaultValue: "commercial",
    },
  ],
  access: {
    read: () => true,
  },
};

export default Photos;
