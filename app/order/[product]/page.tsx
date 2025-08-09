import CropperClient from "@/components/CropperClient";
import Link from "next/link";

export default function OrderProduct({ params }: { params: { product: string } }) {
  const isMagnet = params.product === "magnet";
  return (
    <div className="card space-y-6">
      <h1 className="text-2xl font-semibold">{isMagnet ? "Magnet 2×2 in" : "Circle Button Badge"}</h1>
      <CropperClient aspect={isMagnet ? 1 : 1} shape={isMagnet ? 'rect' : 'round'} />
      <div className="flex gap-3">
        <Link href="/checkout" className="btn btn-primary">Add to Cart & Checkout</Link>
        <Link href="/" className="btn btn-outline">Order More</Link>
      </div>
    </div>
  );
}
