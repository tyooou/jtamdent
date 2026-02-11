import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "about",
      limit: 1,
    });

    if (result.docs && result.docs.length > 0) {
      return NextResponse.json(result.docs[0]);
    }

    return NextResponse.json({ message: "No about content found" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching about content:", error);
    return NextResponse.json({ message: "Failed to fetch about content" }, { status: 500 });
  }
}
