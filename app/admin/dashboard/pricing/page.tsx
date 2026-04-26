"use client";

import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { TextField, ArrayField, ColorField, SaveBar } from "@/components/admin/Field";

interface Tier {
  name: string; price: string; period: string; bestFor: string;
  accentColor: string; glowColor: string; featured: boolean; services: string[];
}

const BLANK_TIER: Tier = {
  name: "", price: "", period: "user / month", bestFor: "",
  accentColor: "#2563EB", glowColor: "rgba(37,99,235,0.3)",
  featured: false, services: [],
};

export default function PricingEditor() {
  const [data, setData] = useState<Tier[] | null>(null);
  const [original, setOriginal] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content/pricing").then(r => r.json()).then(d => {
      setData(d); setOriginal(JSON.stringify(d));
    });
  }, []);

  const dirty = data ? JSON.stringify(data) !== original : false;

  const update = <K extends keyof Tier>(i: number, key: K, val: Tier[K]) => {
    if (!data) return;
    const next = [...data];
    next[i] = { ...next[i], [key]: val };
    setData(next); setSaved(false);
  };

  const addTier = () => {
    if (!data) return;
    setData([...data, { ...BLANK_TIER }]); setSaved(false);
  };

  const removeTier = (i: number) => {
    if (!data) return;
    setData(data.filter((_, j) => j !== i)); setSaved(false);
  };

  const save = async () => {
    if (!data) return; setSaving(true);
    await fetch("/api/content/pricing", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setOriginal(JSON.stringify(data)); setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!data) return (
    <AdminShell>
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 rounded-full border-2 border-[#2563EB] border-t-transparent animate-spin" />
      </div>
    </AdminShell>
  );

  return (
    <AdminShell>
      <div className="max-w-2xl space-y-6 pb-28">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-[#E6EDF3]">Pricing</h1>
            <p className="text-sm text-[#8B949E] mt-1">{data.length} tier{data.length !== 1 ? "s" : ""} · edit names, prices, and feature lists.</p>
          </div>
          <button
            onClick={addTier}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2563EB]/40
                       text-sm text-[#60A5FA] hover:bg-[#2563EB]/10 transition-all"
          >
            + Add tier
          </button>
        </div>

        {data.length === 0 && (
          <div className="text-center py-12 rounded-xl border border-dashed border-[#30363D] text-[#8B949E] text-sm">
            No tiers yet. Click &ldquo;Add tier&rdquo; to create one.
          </div>
        )}

        {data.map((tier, i) => (
          <section key={i} className="rounded-xl border border-[#21262D] bg-[#161B22] p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-[#E6EDF3]">{tier.name || `Tier ${i + 1}`}</h2>
                {tier.featured && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold text-white"
                    style={{ background: tier.accentColor }}>Most Popular</span>
                )}
              </div>
              <button
                onClick={() => removeTier(i)}
                className="px-2 py-1.5 rounded-lg text-[#8B949E] hover:text-[#F87171] hover:bg-[#F87171]/10 transition-colors text-sm"
                title="Remove tier"
              >
                ✕ Remove
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextField label="Tier name" value={tier.name} onChange={v => update(i, "name", v)} />
              <TextField label="Best for" value={tier.bestFor} onChange={v => update(i, "bestFor", v)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Price" value={tier.price} onChange={v => update(i, "price", v)} placeholder="$90" />
              <TextField label="Period" value={tier.period} onChange={v => update(i, "period", v)} placeholder="user / month" />
            </div>
            <ColorField label="Accent color" value={tier.accentColor} onChange={v => {
              update(i, "accentColor", v);
            }} />

            <div>
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8B949E] cursor-pointer">
                <input type="checkbox" checked={tier.featured} onChange={e => update(i, "featured", e.target.checked)}
                  className="w-4 h-4 rounded accent-[#2563EB]" />
                Mark as featured / most popular
              </label>
            </div>

            <ArrayField label="Features" items={tier.services}
              onChange={items => update(i, "services", items)}
              placeholder="Feature description…" />
          </section>
        ))}
      </div>
      <SaveBar dirty={dirty} saving={saving} saved={saved} onSave={save}
        onDiscard={() => { setData(JSON.parse(original)); setSaved(false); }} />
    </AdminShell>
  );
}
