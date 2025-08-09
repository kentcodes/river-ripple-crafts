import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { encryptJSON } from "@/lib/crypto";

export async function GET() {
  const items = await prisma.paymentConnector.findMany({ orderBy: { createdAt: "desc" } });
  // Redact config
  const redacted = items.map(i => ({ ...i, configEnc: null }));
  return NextResponse.json(redacted);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, provider, label, mode, enabled, config } = body;
  const blob = encryptJSON(config || {});
  if (id) {
    const item = await prisma.paymentConnector.update({
      where: { id },
      data: { provider, label, mode, enabled, configEnc: blob }
    });
    return NextResponse.json({ ok: true, id: item.id });
  } else {
    const item = await prisma.paymentConnector.create({
      data: { provider, label, mode, enabled: enabled ?? true, configEnc: blob }
    });
    return NextResponse.json({ ok: true, id: item.id });
  }
}
