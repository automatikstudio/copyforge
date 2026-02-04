import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Ensure product is set to copyforge
    const payload = {
      ...body,
      product: "copyforge",
      timestamp: new Date().toISOString(),
    };

    // Log for now (could forward to external tracking server)
    console.log("[track]", JSON.stringify(payload));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
