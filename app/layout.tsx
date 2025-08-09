import "./globals.css";
import Link from "next/link";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <div className="container py-4 flex items-center justify-between">
            <Link href="/" className="font-semibold">PicMag</Link>
            <nav className="space-x-4">
              <Link href="/checkout" className="text-sm">Checkout</Link>
              <Link href="/admin/settings/payments" className="text-sm">Admin</Link>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
      </body>
    </html>
  );
}
