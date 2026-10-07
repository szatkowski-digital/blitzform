import { sendEmail, SendEmailParams } from "@/features/contact/sendEmail";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: SendEmailParams = await req.json();
    const {
      name,
      organization,
      email,
      phone,
      message,
      mainCategory,
      selectedBoxPackage,
      honeypot,
    } = body;

    if (!name?.trim() || !organization?.trim() || !email?.trim()) {
      return NextResponse.json(
        { errorCode: "requiredFields" },
        { status: 400 }
      );
    }

    const result = await sendEmail({
      name,
      organization,
      email,
      phone,
      message,
      mainCategory,
      selectedBoxPackage,
      honeypot,
    });

    if (!result.success) {
      return NextResponse.json(
        { errorCode: "sendFailed", message: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Mailer Error:", error);
    return NextResponse.json({ errorCode: "sendFailed" }, { status: 500 });
  }
}
