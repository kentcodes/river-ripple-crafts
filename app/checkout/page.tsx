'use client';
import { useState } from "react";

export default function CheckoutPage() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postal, setPostal] = useState('');
  const [provider, setProvider] = useState('gcash');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const orderRes = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email, phone, shipTo: { name, address, city, province, postal },
        items: [{
          productType: "MAGNET", quantity: 1, unitPriceCents: 15000,
          originalKey: "uploads/mock", cropData: {}, size: "2x2in", options: {}
        }]
      })
    }).then(r=>r.json());
    if (!orderRes.ok) { alert('Order failed'); return; }
    const intent = await fetch('/api/payments/intent', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ orderId: orderRes.orderId, provider })
    }).then(r=>r.json());
    if (intent.qrUrl) window.location.href = intent.qrUrl;
  }

  return (
    <div className="card">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="label">Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="label">Phone</label>
          <input className="input" value={phone} onChange={e=>setPhone(e.target.value)} required />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Full Name</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} required />
          </div>
          <div>
            <label className="label">Address</label>
            <input className="input" value={address} onChange={e=>setAddress(e.target.value)} required />
          </div>
          <div>
            <label className="label">City</label>
            <input className="input" value={city} onChange={e=>setCity(e.target.value)} required />
          </div>
          <div>
            <label className="label">Province</label>
            <input className="input" value={province} onChange={e=>setProvince(e.target.value)} required />
          </div>
          <div>
            <label className="label">Postal</label>
            <input className="input" value={postal} onChange={e=>setPostal(e.target.value)} required />
          </div>
        </div>
        <div>
          <label className="label">Payment Method</label>
          <select className="input" value={provider} onChange={e=>setProvider(e.target.value)}>
            <option value="bpi">BPI (QR)</option>
            <option value="unionbank">UnionBank (QR)</option>
            <option value="gcash">GCash</option>
            <option value="maya">Maya</option>
            <option value="paypal">PayPal</option>
            <option value="manual">Manual QR</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit">Create Payment</button>
      </form>
    </div>
  );
}
