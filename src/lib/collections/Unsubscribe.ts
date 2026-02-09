import type { CollectionConfig } from "payload";

const Unsubscribe: CollectionConfig = {
  slug: "unsubscribe",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "createdAt"],
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  timestamps: true,
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      label: "Email Address",
    },
    {
      name: "reason",
      type: "textarea",
      label: "Reason for Unsubscribing (Optional)",
    },
  ],
};

export default Unsubscribe;
