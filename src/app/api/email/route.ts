import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ message: "Email is required." }, { status: 400 });
    }
    const payload = await getPayload({ config });
    await payload.create({
      collection: "emails",
      data: { email },
    });
    return NextResponse.json({ message: "Email saved successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error saving email to Payload:", error);
    return NextResponse.json({ message: "Failed to save email." }, { status: 500 });
  }
}
