import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(request: NextRequest) {
  try {
    const { email, reason } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config });

    // Check if email is already unsubscribed
    try {
      const existingUnsubscribe = await payload.find({
        collection: "unsubscribe",
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (existingUnsubscribe.docs.length > 0) {
        return NextResponse.json(
          { error: "This email is already unsubscribed." },
          { status: 400 }
        );
      }
    } catch (findError) {
      console.error("Error checking existing unsubscribe:", findError);
      // Continue to create even if find fails
    }

    // Create unsubscribe record
    const result = await payload.create({
      collection: "unsubscribe",
      data: {
        email,
        reason: reason || "",
      },
    });

    return NextResponse.json(
      { message: "Successfully unsubscribed", id: result.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { error: "Failed to unsubscribe. Please try again later." },
      { status: 500 }
    );
  }
}
