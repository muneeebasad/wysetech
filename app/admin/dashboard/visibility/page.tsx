"use client";

import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { SaveBar } from "@/components/admin/Field";

interface Sections {
  hero: boolean; services: boolean; pricing: boolean;
  whyUs: boolean; tools: boolean; contact: boolean; team: boolean;
}

const SECTION_META: { key: keyof Sections; label: string; desc: string }[] = [
  { key: "hero",     label: "Hero",          desc: "The full-screen landing section with headline and stats" },
  { key: "services", label: "Services",      desc: "10 service cards with expandable details and tool chips" },
  { key: "pricing",  label: "Pricing",       desc: "3-tier pricing cards (Packages section)" },
  { key: "whyUs",    label: "Why Us",        desc: "The four differentiator pillars" },
  { key: "tools",    label: "Tools Ticker",  desc: "Animated scrolling strip of technology logos" },
  { key: "contact",  label: "Contact",       desc: "Enquiry form and contact information" },
  { key: "team",     label: "Team page",     desc: "The /team page and its nav links across the site" },
];

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
        checked ? "bg-[#2563EB]" : "bg-[#30363D]"
      }`}
    >
      <span
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200"
        style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }}
      />
    </button>
  );
}

export default function VisibilityEditor() {
  const [data, setData] = useState<Sections | null>(null);
  const [original, setOriginal] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content/sections").then(r => r.json()).then(d => {
      setData(d); setOriginal(JSON.stringify(d));
    });
  }, []);

  const dirty = data ? JSON.stringify(data) !== original : false;

  const toggle = (key: keyof Sections) => {
    if (!data) return;
    setData({ ...data, [key]: !data[key] }); setSaved(false);
  };

  const save = async () => {
    if (!data) return; setSaving(true);
    await fetch("/api/content/sections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
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

  const visibleCount = Object.values(data).filter(Boolean).length;

  return (
    <AdminShell>
      <div className="max-w-2xl space-y-6 pb-28">
        <div>
          <h1 className="text-xl font-extrabold text-[#E6EDF3]">Section Visibility</h1>
          <p className="text-sm text-[#8B949E] mt-1">
            Toggle which sections appear on the site. Hidden sections are removed from the page and navigation instantly on save.
          </p>
        </div>

        {/* Status bar */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#21262D] bg-[#161B22]">
          <div className="flex gap-1">
            {SECTION_META.map(s => (
              <div
                key={s.key}
                className="w-2 h-2 rounded-full transition-colors duration-300"
                style={{ background: data[s.key] ? "#34D399" : "#30363D" }}
                title={s.label}
              />
            ))}
          </div>
          <p className="text-xs text-[#8B949E]">
            <span className="text-[#34D399] font-semibold">{visibleCount}</span> of {SECTION_META.length} sections visible
          </p>
        </div>

        <div className="space-y-3">
          {SECTION_META.map(({ key, label, desc }) => (
            <div
              key={key}
              className={`flex items-center justify-between gap-4 p-5 rounded-xl border transition-all duration-200 ${
                data[key]
                  ? "border-[#21262D] bg-[#161B22]"
                  : "border-[#21262D]/50 bg-[#0D1117]/60"
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className={`text-sm font-semibold transition-colors ${data[key] ? "text-[#E6EDF3]" : "text-[#8B949E]"}`}>
                    {label}
                  </p>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors ${
                      data[key]
                        ? "bg-[#34D399]/15 text-[#34D399]"
                        : "bg-[#30363D] text-[#8B949E]"
                    }`}
                  >
                    {data[key] ? "VISIBLE" : "HIDDEN"}
                  </span>
                </div>
                <p className="text-xs text-[#8B949E]/70 truncate">{desc}</p>
              </div>
              <Toggle checked={data[key]} onChange={() => toggle(key)} />
            </div>
          ))}
        </div>

        <p className="text-xs text-[#8B949E]/50 text-center">
          Changes apply immediately in dev mode. Production requires a rebuild.
        </p>
      </div>
      <SaveBar dirty={dirty} saving={saving} saved={saved} onSave={save}
        onDiscard={() => { setData(JSON.parse(original)); setSaved(false); }} />
    </AdminShell>
  );
}
