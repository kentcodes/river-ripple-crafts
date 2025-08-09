'use client';
import { useEffect, useState } from "react";

type Connector = {
  id?: string; provider: string; label: string; mode: 'sandbox'|'live'; enabled: boolean;
  config: Record<string, any>;
};

export default function PaymentsSettingsPage() {
  const [list, setList] = useState<any[]>([]);
  const [form, setForm] = useState<Connector>({ provider: 'paymongo', label: 'Primary', mode: 'sandbox', enabled: true, config: {} });

  useEffect(()=>{ (async ()=>{
    const r = await fetch('/api/admin/connectors').then(r=>r.json());
    setList(r);
  })(); }, []);

  async function save() {
    const r = await fetch('/api/admin/connectors', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(form) }).then(r=>r.json());
    alert('Saved connector ' + r.id);
    const items = await fetch('/api/admin/connectors').then(r=>r.json());
    setList(items);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Payments</h1>
      <div className="card space-y-3">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Provider</label>
            <select className="input" value={form.provider} onChange={e=>setForm(f=>({...f, provider: e.target.value}))}>
              <option value="paymongo">PayMongo</option>
              <option value="xendit">Xendit</option>
              <option value="paypal">PayPal</option>
              <option value="manual">Manual QR</option>
            </select>
          </div>
          <div>
            <label className="label">Label</label>
            <input className="input" value={form.label} onChange={e=>setForm(f=>({...f, label: e.target.value}))} />
          </div>
          <div>
            <label className="label">Mode</label>
            <select className="input" value={form.mode} onChange={e=>setForm(f=>({...f, mode: e.target.value as any}))}>
              <option value="sandbox">Sandbox</option>
              <option value="live">Live</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.enabled} onChange={e=>setForm(f=>({...f, enabled: e.target.checked}))} />
            <span>Enabled</span>
          </div>
        </div>
        <div>
          <label className="label">Config (JSON)</label>
          <textarea className="input h-40 font-mono" value={JSON.stringify(form.config, null, 2)} onChange={e=>{
            try { setForm(f=>({...f, config: JSON.parse(e.target.value)})) } catch {}
          }} />
        </div>
        <button className="btn btn-primary" onClick={save}>Save Connector</button>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-2">Existing Connectors</h2>
        <ul className="space-y-2">
          {list.map((c:any)=>(
            <li key={c.id} className="flex items-center justify-between border rounded-lg p-3">
              <div>
                <div className="font-medium">{c.label} <span className="text-xs uppercase ml-2">{c.mode}</span></div>
                <div className="text-sm text-gray-600">{c.provider} • {c.enabled ? 'enabled' : 'disabled'}</div>
              </div>
              <div className="text-xs text-gray-500">{c.id}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
