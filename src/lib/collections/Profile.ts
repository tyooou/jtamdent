import { CollectionConfig } from "payload";

const Profile: CollectionConfig = {
  slug: "profile",
  upload: {
    staticDir: "media/profile",
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};

export default Profile;
