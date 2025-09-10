import type { CollectionConfig } from "payload";

export const Emails: CollectionConfig = {
  slug: "emails",
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
  ],
};
