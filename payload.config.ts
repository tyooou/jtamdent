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
import Unsubscribe from "@/lib/collections/Unsubscribe";
import Profile from "@/lib/collections/Profile";
import LandingVideo from "@/lib/collections/LandingVideo";
import RecentWorks from "@/lib/collections/RecentWorks";
import About from "@/lib/collections/About";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  editor: lexicalEditor({}),
  collections: [Photos, Videos, Emails, Unsubscribe, Profile, LandingVideo, RecentWorks, About],
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
        profile: true,
        'recent-works': true,
        'landing-videos': true,
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
