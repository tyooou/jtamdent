import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({ collection: "profile", limit: 1 });
    const doc = result?.docs?.[0];

    if (!doc) {
      return NextResponse.json({ message: "Profile image not found" }, { status: 404 });
    }

    const url = doc.url || null;

    return NextResponse.json({
      id: doc.id,
      alt: doc.alt || "profile image",
      filename: doc.filename || null,
      url,
    });
  } catch (err) {
    console.error("GET /api/profile error", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
