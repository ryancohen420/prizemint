import { NextRequest, NextResponse } from "next/server";
import { SiweMessage } from "siwe";

export async function POST(req: NextRequest) {
  try {
    const { address, chainId } = await req.json();

    if (!address || !chainId) {
      return NextResponse.json(
        { error: "Missing address or chainId" },
        { status: 400 }
      );
    }

    const domain = req.headers.get("host") || "localhost:3000";
    const uri = req.nextUrl.origin;
    const nonce = Math.random().toString(36).substring(2, 10); // 8-char alphanumeric

    const siweFields = {
      domain,
      address,
      statement: "Sign in with Ethereum to PrizeMint.",
      uri,
      version: "1",
      chainId,
      nonce,
    };

    console.log("✅ Constructing SIWE message with:", siweFields);

    const message = new SiweMessage(siweFields).prepareMessage();


    return NextResponse.json({ message });
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Error generating SIWE message:", errMsg);
    return NextResponse.json(
      {
        error: "Failed to generate SIWE message",
        detail: errMsg,
      },
      { status: 500 }
    );
  }
}
