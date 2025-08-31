import { buildConfig } from "payload/config";

export default buildConfig({
  serverURL: "http://localhost:3001",
  admin: {
    user: "admin",
  },
  collections: [
    {
      slug: "pages",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "slug", type: "text", required: true },
        { name: "content", type: "textarea" },
      ],
    },
  ],
});
