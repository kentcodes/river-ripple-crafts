import { prisma } from "@/lib/db";
import { decryptJSON } from "@/lib/crypto";

type IntentInput = {
  orderId: string;
  amountCents: number;
  currency: string;
  provider: string; // gcash|maya|bpi|unionbank|paypal|manual
  connectorId?: string;
};

export async function createPaymentIntent(input: IntentInput) {
  // Fetch connector based on provider or explicit connectorId
  const connector = input.connectorId
    ? await prisma.paymentConnector.findUnique({ where: { id: input.connectorId } })
    : await prisma.paymentConnector.findFirst({ where: { enabled: true, provider: { contains: input.provider } } });

  if (!connector) {
    // Manual fallback: create reference and fake QR URL
    const reference = `MANUAL-${Date.now()}`;
    const payment = await prisma.payment.create({
      data: {
        orderId: input.orderId,
        provider: input.provider,
        method: "qr",
        reference,
        amountCents: input.amountCents,
        status: "pending",
        raw: { info: "manual-fallback" }
      }
    });
    return { ok: true, mode: "manual", reference, qrUrl: `/qr/${payment.id}` };
  }

  const cfg = decryptJSON(Buffer.from(connector.configEnc));
  // NOTE: In this starter, we only simulate gateway intents.
  // Replace with real PayMongo/Xendit/PayPal calls and store their payloads.
  const reference = `${connector.provider.toUpperCase()}-${Date.now()}`;
  await prisma.payment.create({
    data: {
      orderId: input.orderId,
      provider: connector.provider,
      method: "qr",
      reference,
      amountCents: input.amountCents,
      status: "pending",
      raw: { connector: connector.label, mode: connector.mode, cfg: { ...cfg, redacted: true } }
    }
  });
  return { ok: true, mode: connector.mode, reference, qrUrl: `/qr/${reference}` };
}
