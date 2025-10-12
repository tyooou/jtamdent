import path from "path";
import { fileURLToPath } from "url";

import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";

import Photos from "@/lib/collections/Photos";
import Videos from "@/lib/collections/Videos";
import Emails from "@/lib/collections/Emails";
import Profile from "@/lib/collections/Profile";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  editor: lexicalEditor({}),
  collections: [Photos, Videos, Emails, Profile],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.SUPABASE_DATABASE_URL || "",
    },
  }),
  plugins: [
    s3Storage({
      collections: {
        photos: true,
        videos: true,
        profile: true,
      },
      bucket: process.env.SUPABASE_STORAGE_BUCKET || "",
      config: {
        endpoint: `https://bilxtwjbsoytjxqwgbmk.storage.supabase.co/storage/v1/s3`,
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.SUPABASE_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.SUPABASE_SECRET_ACCESS_KEY || "",
        },
        region: "ap-southeast-2",
      },
    }),
  ],
});
