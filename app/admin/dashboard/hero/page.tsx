"use client";

import { useState, useEffect, useCallback } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { TextField, TextareaField, SaveBar } from "@/components/admin/Field";

interface Stat { value: string; label: string; color: string }
interface Hero {
  badge: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: Stat[];
}

const SECTION = "hero";

export default function HeroEditor() {
  const [data, setData] = useState<Hero | null>(null);
  const [original, setOriginal] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/content/${SECTION}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setOriginal(JSON.stringify(d)); });
  }, []);

  const dirty = data ? JSON.stringify(data) !== original : false;

  const set = useCallback(<K extends keyof Hero>(key: K, val: Hero[K]) => {
    setData((prev) => prev ? { ...prev, [key]: val } : prev);
    setSaved(false);
  }, []);

  const setStat = (i: number, field: keyof Stat, val: string) => {
    if (!data) return;
    const stats = [...data.stats];
    stats[i] = { ...stats[i], [field]: val };
    set("stats", stats);
  };

  const save = async () => {
    if (!data) return;
    setSaving(true);
    await fetch(`/api/content/${SECTION}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setOriginal(JSON.stringify(data));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const discard = () => {
    if (original) setData(JSON.parse(original));
    setSaved(false);
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
      <div className="max-w-2xl space-y-8 pb-28">
        <div>
          <h1 className="text-xl font-extrabold text-[#E6EDF3]">Hero Section</h1>
          <p className="text-sm text-[#8B949E] mt-1">The first thing visitors see above the fold.</p>
        </div>

        <section className="rounded-xl border border-[#21262D] bg-[#161B22] p-6 space-y-5">
          <h2 className="text-sm font-bold text-[#E6EDF3]">Content</h2>
          <TextField label="Badge text" value={data.badge} onChange={(v) => set("badge", v)}
            hint="Shown in the pill above the headline" />
          <TextareaField label="Sub-headline" value={data.subheadline} onChange={(v) => set("subheadline", v)}
            rows={3} />
          <div className="grid grid-cols-2 gap-4">
            <TextField label="Primary CTA" value={data.ctaPrimary} onChange={(v) => set("ctaPrimary", v)} />
            <TextField label="Secondary CTA" value={data.ctaSecondary} onChange={(v) => set("ctaSecondary", v)} />
          </div>
        </section>

        <section className="rounded-xl border border-[#21262D] bg-[#161B22] p-6 space-y-5">
          <h2 className="text-sm font-bold text-[#E6EDF3]">Stats Row</h2>
          {data.stats.map((stat, i) => (
            <div key={i} className="grid grid-cols-3 gap-3 items-end p-4 rounded-lg bg-[#0D1117] border border-[#21262D]">
              <TextField label="Value" value={stat.value} onChange={(v) => setStat(i, "value", v)} />
              <TextField label="Label" value={stat.label} onChange={(v) => setStat(i, "label", v)} />
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#8B949E] mb-1.5">Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={stat.color} onChange={(e) => setStat(i, "color", e.target.value)}
                    className="w-9 h-9 rounded-lg border border-[#30363D] bg-[#0D1117] p-1 cursor-pointer" />
                  <input type="text" value={stat.color} onChange={(e) => setStat(i, "color", e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-[#30363D] bg-[#0D1117] text-[#E6EDF3] text-sm focus:outline-none focus:border-[#2563EB]" />
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      <SaveBar dirty={dirty} saving={saving} saved={saved} onSave={save} onDiscard={discard} />
    </AdminShell>
  );
}
