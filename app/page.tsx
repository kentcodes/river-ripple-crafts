import Link from "next/link";
export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h2 className="text-xl font-semibold mb-2">Picture‑Ref Magnet (2×2 in)</h2>
        <p className="mb-4">Upload, crop, and order a fridge magnet.</p>
        <Link className="btn btn-primary" href="/order/magnet">Start Magnet</Link>
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold mb-2">Circle Button Badge</h2>
        <p className="mb-4">Upload or pick a preset, crop in a circle, and order.</p>
        <Link className="btn btn-primary" href="/order/badge">Start Badge</Link>
      </div>
    </div>
  );
}
