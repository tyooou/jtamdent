import { CollectionConfig } from "payload";

const Profile: CollectionConfig = {
  slug: "profile",
  upload: {
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  access: {
    read: () => true,
  },
};

export default Profile;
