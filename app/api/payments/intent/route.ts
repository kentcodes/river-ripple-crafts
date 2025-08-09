import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createPaymentIntent } from "@/server/payments/connectors";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { orderId, provider } = body;
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return NextResponse.json({ ok: false, error: "Order not found" }, { status: 404 });
  const res = await createPaymentIntent({
    orderId,
    amountCents: order.totalCents,
    currency: order.currency,
    provider
  });
  return NextResponse.json(res);
}
