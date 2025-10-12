import { NextRequest, NextResponse } from "next/server";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email address is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email addres s" },
        { status: 400 }
      );
    }

    const payload = await getPayloadHMR({ config });

    // Check if email already exists
    const existingEmail = await payload.find({
      collection: "emails",
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (existingEmail.docs.length > 0) {
      return NextResponse.json({ status: 409 });
    }

    // Create new email entry
    await payload.create({
      collection: "emails",
      data: {
        email,
      },
    });

    return NextResponse.json(
      { message: "Email successfully added" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving email:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
