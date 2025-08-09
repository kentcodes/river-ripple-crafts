import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, phone, shipTo, items } = body;
  const subtotal = items.reduce((s: number, it: any) => s + (it.unitPriceCents * it.quantity), 0);
  const shipping = 0;
  const total = subtotal + shipping;
  const order = await prisma.order.create({
    data: {
      email, phone, shipTo,
      subtotalCents: subtotal, shippingCents: shipping, totalCents: total,
      status: "AWAITING_PAYMENT",
      items: { create: items.map((it: any) => ({
        productType: it.productType, quantity: it.quantity, unitPriceCents: it.unitPriceCents,
        originalKey: it.originalKey || "s3://pending", cropData: it.cropData || {}, size: it.size, options: it.options || {}
      }))}
    }
  });
  await prisma.orderEvent.create({ data: { orderId: order.id, type: "CREATED", message: "Order created" } });
  return NextResponse.json({ ok: true, orderId: order.id, totalCents: order.totalCents });
}
