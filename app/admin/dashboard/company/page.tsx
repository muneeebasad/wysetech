"use client";

import { useState, useEffect, useCallback } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { TextField, TextareaField, SaveBar } from "@/components/admin/Field";

interface Social { linkedin: string; github: string }
interface Company {
  name: string; tagline: string; email: string; website: string;
  location: string; phone: string; formspreeId: string;
  responseTime: string; copyright: string; social: Social;
}

export default function CompanyEditor() {
  const [data, setData] = useState<Company | null>(null);
  const [original, setOriginal] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content/company").then(r => r.json()).then(d => {
      setData(d); setOriginal(JSON.stringify(d));
    });
  }, []);

  const dirty = data ? JSON.stringify(data) !== original : false;
  const set = useCallback(<K extends keyof Company>(key: K, val: Company[K]) => {
    setData(p => p ? { ...p, [key]: val } : p); setSaved(false);
  }, []);

  const save = async () => {
    if (!data) return; setSaving(true);
    await fetch("/api/content/company", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setOriginal(JSON.stringify(data)); setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!data) return <AdminShell><div className="flex items-center justify-center h-64"><div className="w-6 h-6 rounded-full border-2 border-[#2563EB] border-t-transparent animate-spin" /></div></AdminShell>;

  return (
    <AdminShell>
      <div className="max-w-2xl space-y-8 pb-28">
        <div>
          <h1 className="text-xl font-extrabold text-[#E6EDF3]">Company Info</h1>
          <p className="text-sm text-[#8B949E] mt-1">Used across the contact section, footer, and metadata.</p>
        </div>

        <section className="rounded-xl border border-[#21262D] bg-[#161B22] p-6 space-y-5">
          <h2 className="text-sm font-bold text-[#E6EDF3]">Identity</h2>
          <TextField label="Company name" value={data.name} onChange={v => set("name", v)} />
          <TextField label="Tagline" value={data.tagline} onChange={v => set("tagline", v)} />
          <TextField label="Copyright line" value={data.copyright} onChange={v => set("copyright", v)} />
        </section>

        <section className="rounded-xl border border-[#21262D] bg-[#161B22] p-6 space-y-5">
          <h2 className="text-sm font-bold text-[#E6EDF3]">Contact Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <TextField label="Email" value={data.email} onChange={v => set("email", v)} />
            <TextField label="Phone (optional)" value={data.phone} onChange={v => set("phone", v)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TextField label="Website" value={data.website} onChange={v => set("website", v)} />
            <TextField label="Location" value={data.location} onChange={v => set("location", v)} />
          </div>
          <TextField label="Response time" value={data.responseTime} onChange={v => set("responseTime", v)}
            hint="Shown in the contact section response note" />
        </section>

        <section className="rounded-xl border border-[#21262D] bg-[#161B22] p-6 space-y-5">
          <h2 className="text-sm font-bold text-[#E6EDF3]">Integrations</h2>
          <TextField label="Formspree Form ID" value={data.formspreeId} onChange={v => set("formspreeId", v)}
            hint="The ID from formspree.io/f/<ID>" />
        </section>

        <section className="rounded-xl border border-[#21262D] bg-[#161B22] p-6 space-y-5">
          <h2 className="text-sm font-bold text-[#E6EDF3]">Social Links</h2>
          <TextField label="LinkedIn URL" value={data.social.linkedin} onChange={v => set("social", { ...data.social, linkedin: v })} />
          <TextField label="GitHub URL" value={data.social.github} onChange={v => set("social", { ...data.social, github: v })} />
        </section>
      </div>
      <SaveBar dirty={dirty} saving={saving} saved={saved} onSave={save} onDiscard={() => { setData(JSON.parse(original)); setSaved(false); }} />
    </AdminShell>
  );
}
