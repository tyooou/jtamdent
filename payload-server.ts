import { postgresAdapter } from "@payloadcms/db-postgres";

export default {
  serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
  collections: [
    {
      slug: "profiles",
      fields: [
        { name: "username", type: "text" },
        { name: "email", type: "email" },
      ],
    },
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    },
  }),
};
