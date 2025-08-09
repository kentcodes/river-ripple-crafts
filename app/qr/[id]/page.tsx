export default function QRPage({ params }: { params: { id: string } }) {
  return (
    <div className="card text-center">
      <h1 className="text-2xl font-semibold mb-2">Scan to Pay</h1>
      <p className="mb-4">Reference: <code>{params.id}</code></p>
      <div className="mx-auto w-56 h-56 bg-gray-200 rounded-xl flex items-center justify-center">QR IMAGE</div>
      <p className="mt-4 text-sm text-gray-600">Open your BPI/UnionBank/GCash/Maya app and scan. After payment, you&apos;ll receive an email confirmation.</p>
    </div>
  );
}
