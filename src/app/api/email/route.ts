import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ message: "Email is required." }, { status: 400 });
    }
    const payload = await getPayload({ config });
    const existing = await payload.find({
      collection: "emails",
      where: {
        email: {
          equals: email,
        },
      },
      limit: 1,
    });

    if (!existing.docs.length) {
      await payload.create({
        collection: "emails",
        data: { email },
      });
    }

    // Send notification email
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: "info@jtamdent.com.au",
          subject: `New Brochure Sign-Up`,
          text: `${email} has signed up for the pricing brochure.`,
          replyTo: email,
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error("Error sending notification email:", emailError);
        // Don't fail the request if notification fails
      }
    }

    return NextResponse.json({ message: "Email saved successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error saving email to Payload:", error);
    return NextResponse.json({ message: "Failed to save email." }, { status: 500 });
  }
}
