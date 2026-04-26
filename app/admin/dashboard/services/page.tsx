"use client";

import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { TextField, TextareaField, ArrayField, ColorField, SaveBar } from "@/components/admin/Field";

interface Tool { name: string; url: string }
interface Service {
  id: string; slug: string; color: string; title: string; sub: string;
  icon: string; items: string[]; tools: Tool[];
}

const BLANK_SERVICE: Service = {
  id: "", slug: "", color: "#2563EB", title: "", sub: "",
  icon: "Wrench", items: [], tools: [],
};

export default function ServicesEditor() {
  const [data, setData] = useState<Service[] | null>(null);
  const [original, setOriginal] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/content/services").then(r => r.json()).then(d => {
      setData(d); setOriginal(JSON.stringify(d));
    });
  }, []);

  const dirty = data ? JSON.stringify(data) !== original : false;

  const update = <K extends keyof Service>(i: number, key: K, val: Service[K]) => {
    if (!data) return;
    const next = [...data];
    next[i] = { ...next[i], [key]: val };
    setData(next); setSaved(false);
  };

  const addService = () => {
    if (!data) return;
    const newId = String(data.length + 1).padStart(2, "0");
    const newService = { ...BLANK_SERVICE, id: newId };
    setData([...data, newService]);
    setExpanded(data.length);
    setSaved(false);
  };

  const removeService = (i: number) => {
    if (!data) return;
    const next = data.filter((_, j) => j !== i);
    setData(next);
    setExpanded(null);
    setSaved(false);
  };

  const updateTool = (si: number, ti: number, field: keyof Tool, val: string) => {
    if (!data) return;
    const next = [...data];
    const tools = [...next[si].tools];
    tools[ti] = { ...tools[ti], [field]: val };
    next[si] = { ...next[si], tools };
    setData(next); setSaved(false);
  };

  const addTool = (si: number) => {
    if (!data) return;
    const next = [...data];
    next[si] = { ...next[si], tools: [...next[si].tools, { name: "", url: "" }] };
    setData(next); setSaved(false);
  };

  const removeTool = (si: number, ti: number) => {
    if (!data) return;
    const next = [...data];
    next[si] = { ...next[si], tools: next[si].tools.filter((_, j) => j !== ti) };
    setData(next); setSaved(false);
  };

  const save = async () => {
    if (!data) return; setSaving(true);
    await fetch("/api/content/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
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
      <div className="max-w-2xl space-y-4 pb-28">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-[#E6EDF3]">Services</h1>
            <p className="text-sm text-[#8B949E] mt-1">{data.length} service{data.length !== 1 ? "s" : ""} · edit cards, bullets, and tool chips.</p>
          </div>
          <button
            onClick={addService}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2563EB]/40
                       text-sm text-[#60A5FA] hover:bg-[#2563EB]/10 transition-all"
          >
            + Add service
          </button>
        </div>

        {data.length === 0 && (
          <div className="text-center py-12 rounded-xl border border-dashed border-[#30363D] text-[#8B949E] text-sm">
            No services yet. Click &ldquo;Add service&rdquo; to create one.
          </div>
        )}

        {data.map((svc, i) => (
          <section key={i} className="rounded-xl border border-[#21262D] bg-[#161B22] overflow-hidden">
            <div className="flex items-center">
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="flex-1 flex items-center justify-between px-6 py-4 text-left hover:bg-[#21262D]/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md text-white"
                    style={{ background: svc.color || "#2563EB" }}>
                    {svc.id || String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold text-[#E6EDF3]">{svc.title || `Service ${i + 1}`}</span>
                </div>
                <span className="text-[#8B949E] text-xs select-none">{expanded === i ? "▲" : "▼"}</span>
              </button>
              <button
                onClick={() => removeService(i)}
                className="px-4 py-4 text-[#8B949E] hover:text-[#F87171] hover:bg-[#F87171]/10 transition-colors text-sm border-l border-[#21262D]"
                title="Remove service"
              >
                ✕
              </button>
            </div>

            {expanded === i && (
              <div className="px-6 pb-6 space-y-5 border-t border-[#21262D]">
                <div className="pt-4 grid grid-cols-2 gap-4">
                  <TextField label="Title" value={svc.title} onChange={v => update(i, "title", v)} />
                  <TextField label="Slug" value={svc.slug} onChange={v => update(i, "slug", v)} />
                </div>
                <TextareaField label="Sub-headline" value={svc.sub} onChange={v => update(i, "sub", v)} rows={2} />
                <div className="grid grid-cols-2 gap-4">
                  <TextField label="Icon name" value={svc.icon} onChange={v => update(i, "icon", v)}
                    hint="Lucide React icon name (e.g. Headphones, Monitor)" />
                  <ColorField label="Accent color" value={svc.color} onChange={v => update(i, "color", v)} />
                </div>
                <TextField label="ID" value={svc.id} onChange={v => update(i, "id", v)}
                  hint="Short display ID shown on the card (e.g. 01, 02)" />

                <ArrayField
                  label="Feature bullets"
                  items={svc.items}
                  onChange={items => update(i, "items", items)}
                  placeholder="Feature description…"
                />

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#8B949E] mb-3">
                    Tool chips
                  </label>
                  <div className="space-y-2">
                    {svc.tools.map((tool, ti) => (
                      <div key={ti} className="flex items-center gap-2">
                        <input
                          value={tool.name}
                          onChange={e => updateTool(i, ti, "name", e.target.value)}
                          placeholder="Tool name"
                          className="flex-1 px-3 py-2 rounded-xl border border-[#30363D] bg-[#0D1117] text-[#E6EDF3] text-sm focus:outline-none focus:border-[#2563EB]"
                        />
                        <input
                          value={tool.url}
                          onChange={e => updateTool(i, ti, "url", e.target.value)}
                          placeholder="URL (leave blank if none)"
                          className="flex-1 px-3 py-2 rounded-xl border border-[#30363D] bg-[#0D1117] text-[#E6EDF3] text-sm focus:outline-none focus:border-[#2563EB]"
                        />
                        <button
                          onClick={() => removeTool(i, ti)}
                          className="px-2 py-2 rounded-lg text-[#8B949E] hover:text-[#F87171] hover:bg-[#F87171]/10 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addTool(i)}
                      className="text-xs text-[#2563EB] hover:text-[#60A5FA] transition-colors mt-1"
                    >
                      + Add tool
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        ))}
      </div>
      <SaveBar dirty={dirty} saving={saving} saved={saved} onSave={save}
        onDiscard={() => { setData(JSON.parse(original)); setSaved(false); setExpanded(null); }} />
    </AdminShell>
  );
}
