"use client";

import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { TextField, TextareaField, ColorField, SaveBar } from "@/components/admin/Field";

interface Feature {
  icon: string; color: string; glowColor: string; gradient: string;
  title: string; description: string;
}

export default function WhyUsEditor() {
  const [data, setData] = useState<Feature[] | null>(null);
  const [original, setOriginal] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content/why-us").then(r => r.json()).then(d => {
      setData(d); setOriginal(JSON.stringify(d));
    });
  }, []);

  const dirty = data ? JSON.stringify(data) !== original : false;

  const update = (i: number, field: keyof Feature, val: string) => {
    if (!data) return;
    const next = [...data];
    next[i] = { ...next[i], [field]: val };
    setData(next); setSaved(false);
  };

  const save = async () => {
    if (!data) return; setSaving(true);
    await fetch("/api/content/why-us", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setOriginal(JSON.stringify(data)); setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!data) return <AdminShell><div className="flex items-center justify-center h-64"><div className="w-6 h-6 rounded-full border-2 border-[#2563EB] border-t-transparent animate-spin" /></div></AdminShell>;

  return (
    <AdminShell>
      <div className="max-w-2xl space-y-6 pb-28">
        <div>
          <h1 className="text-xl font-extrabold text-[#E6EDF3]">Why Us</h1>
          <p className="text-sm text-[#8B949E] mt-1">The four differentiator pillars on the main page.</p>
        </div>

        {data.map((feature, i) => (
          <section key={i} className="rounded-xl border border-[#21262D] bg-[#161B22] p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                style={{ background: feature.color }}>
                {i + 1}
              </div>
              <h2 className="text-sm font-bold text-[#E6EDF3]">{feature.title || `Feature ${i + 1}`}</h2>
            </div>
            <TextField label="Icon name" value={feature.icon} onChange={v => update(i, "icon", v)}
              hint="Lucide React icon name (e.g. ShieldCheck, Unlock, GitMerge, MapPin)" />
            <TextField label="Title" value={feature.title} onChange={v => update(i, "title", v)} />
            <TextareaField label="Description" value={feature.description} onChange={v => update(i, "description", v)} rows={3} />
            <ColorField label="Accent color" value={feature.color} onChange={v => update(i, "color", v)} />
          </section>
        ))}
      </div>
      <SaveBar dirty={dirty} saving={saving} saved={saved} onSave={save} onDiscard={() => { setData(JSON.parse(original)); setSaved(false); }} />
    </AdminShell>
  );
}
