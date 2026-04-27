"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AdminShell from "@/components/admin/AdminShell";
import { TextField, TextareaField, ArrayField, ColorField, SaveBar } from "@/components/admin/Field";

interface Social { linkedin?: string; github?: string; email?: string }
interface Member {
  id: string; name: string; role: string; department: string;
  departmentColor: string; bio: string; skills: string[];
  avatarFrom: string; avatarTo: string; initials: string;
  photo: string; showPhoto: boolean;
  tier: "leadership" | "staff";
  social: Social;
}

const BLANK_MEMBER: Member = {
  id: "", name: "", role: "", department: "", departmentColor: "#60A5FA",
  bio: "", skills: [], avatarFrom: "#1A4F8A", avatarTo: "#2563EB",
  initials: "", photo: "", showPhoto: false,
  tier: "staff",
  social: { linkedin: "", github: "", email: "" },
};

export default function TeamEditor() {
  const [data, setData] = useState<Member[] | null>(null);
  const [original, setOriginal] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(0);
  const [uploading, setUploading] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string>("");
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    fetch("/api/content/team").then(r => r.json()).then(d => {
      setData(d); setOriginal(JSON.stringify(d));
    });
  }, []);

  const dirty = data ? JSON.stringify(data) !== original : false;

  const update = <K extends keyof Member>(i: number, key: K, val: Member[K]) => {
    if (!data) return;
    const next = [...data];
    next[i] = { ...next[i], [key]: val };
    setData(next); setSaved(false);
  };

  const updateSocial = (i: number, key: keyof Social, val: string) => {
    if (!data) return;
    const next = [...data];
    next[i] = { ...next[i], social: { ...next[i].social, [key]: val } };
    setData(next); setSaved(false);
  };

  const addMember = () => {
    if (!data) return;
    const newId = String(data.length + 1);
    setData([...data, { ...BLANK_MEMBER, id: newId }]);
    setExpanded(data.length);
    setSaved(false);
  };

  const removeMember = async (i: number) => {
    if (!data) return;
    const member = data[i];
    if (member.photo) {
      await fetch("/api/content/team-photo", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: member.id }),
      });
    }
    setData(data.filter((_, j) => j !== i));
    setExpanded(null);
    setSaved(false);
  };

  const handleUpload = async (i: number, file: File) => {
    if (!data) return;
    setUploading(i); setUploadError("");
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("memberId", data[i].id);
      const res = await fetch("/api/content/team-photo", { method: "POST", body: form });
      let body: Record<string, string> = {};
      try { body = await res.json(); } catch { /* non-JSON response */ }
      if (res.ok) {
        update(i, "photo", body.path ?? "");
        update(i, "showPhoto", true);
      } else {
        setUploadError(body.error ?? `Upload failed (${res.status})`);
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(null);
    }
  };

  const handleRemovePhoto = async (i: number) => {
    if (!data) return;
    await fetch("/api/content/team-photo", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberId: data[i].id }),
    });
    update(i, "photo", "");
    update(i, "showPhoto", false);
  };

  const save = async () => {
    if (!data) return; setSaving(true);
    await fetch("/api/content/team", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
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
            <h1 className="text-xl font-extrabold text-[#E6EDF3]">Team</h1>
            <p className="text-sm text-[#8B949E] mt-1">{data.length} member{data.length !== 1 ? "s" : ""} · profiles, bios, skills, and photos.</p>
          </div>
          <button
            onClick={addMember}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2563EB]/40
                       text-sm text-[#60A5FA] hover:bg-[#2563EB]/10 transition-all"
          >
            + Add member
          </button>
        </div>

        {data.length === 0 && (
          <div className="text-center py-12 rounded-xl border border-dashed border-[#30363D] text-[#8B949E] text-sm">
            No team members yet. Click &ldquo;Add member&rdquo; to create one.
          </div>
        )}

        {data.map((member, i) => (
          <section key={i} className="rounded-xl border border-[#21262D] bg-[#161B22] overflow-hidden">
            <div className="flex items-center">
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="flex-1 flex items-center justify-between px-6 py-4 text-left hover:bg-[#21262D]/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 relative">
                    {member.showPhoto && member.photo ? (
                      <Image src={member.photo} alt={member.name} fill className="object-cover" sizes="32px" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: `linear-gradient(135deg, ${member.avatarFrom}, ${member.avatarTo})` }}>
                        {member.initials || "?"}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#E6EDF3]">{member.name || `Member ${i + 1}`}</p>
                    <p className="text-xs text-[#8B949E]">{member.role}</p>
                  </div>
                </div>
                <span className="text-[#8B949E] text-xs select-none">{expanded === i ? "▲" : "▼"}</span>
              </button>
              <button
                onClick={() => removeMember(i)}
                className="px-4 py-4 text-[#8B949E] hover:text-[#F87171] hover:bg-[#F87171]/10 transition-colors text-sm border-l border-[#21262D]"
                title="Remove member"
              >
                ✕
              </button>
            </div>

            {expanded === i && (
              <div className="px-6 pb-6 space-y-5 border-t border-[#21262D]">

                {/* ── Profile photo ── */}
                <div className="pt-5">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#8B949E] mb-3">
                    Profile photo
                  </label>
                  <div className="flex items-start gap-4">
                    {/* Preview */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-[#30363D] relative bg-[#0D1117]">
                      {member.showPhoto && member.photo ? (
                        <Image src={member.photo} alt={member.name} fill className="object-cover" sizes="80px" unoptimized />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl font-extrabold text-white"
                          style={{ background: `linear-gradient(135deg, ${member.avatarFrom}, ${member.avatarTo})` }}>
                          {member.initials}
                        </div>
                      )}
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col gap-2 flex-1">
                      {/* Upload button */}
                      <input
                        ref={el => { fileRefs.current[i] = el; }}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) handleUpload(i, file);
                          e.target.value = "";
                        }}
                      />
                      <button
                        onClick={() => fileRefs.current[i]?.click()}
                        disabled={uploading === i}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#30363D]
                                   text-sm text-[#E6EDF3] hover:border-[#2563EB]/60 hover:bg-[#2563EB]/10
                                   disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        {uploading === i ? (
                          <><span className="w-3.5 h-3.5 rounded-full border-2 border-[#2563EB] border-t-transparent animate-spin" />Uploading…</>
                        ) : (
                          <>{member.photo ? "Replace photo" : "Upload photo"}</>
                        )}
                      </button>

                      {/* Remove */}
                      {member.photo && (
                        <button
                          onClick={() => handleRemovePhoto(i)}
                          className="text-xs text-[#8B949E] hover:text-[#F87171] transition-colors text-left"
                        >
                          Remove photo
                        </button>
                      )}

                      {/* Show/hide toggle */}
                      <label className="flex items-center gap-2.5 cursor-pointer mt-1 select-none">
                        <div
                          onClick={() => member.photo && update(i, "showPhoto", !member.showPhoto)}
                          className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
                            member.showPhoto && member.photo ? "bg-[#2563EB]" : "bg-[#30363D]"
                          } ${!member.photo ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                        >
                          <span
                            className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
                            style={{ transform: member.showPhoto && member.photo ? "translateX(16px)" : "translateX(0)" }}
                          />
                        </div>
                        <span className="text-xs text-[#8B949E]">
                          {member.showPhoto && member.photo ? "Showing photo on site" : "Showing initials on site"}
                        </span>
                      </label>

                      {uploadError && <p className="text-xs text-[#F87171]">{uploadError}</p>}
                      <p className="text-xs text-[#8B949E]/50">JPG, PNG or WebP · max 5 MB</p>
                    </div>
                  </div>
                </div>

                {/* ── Fields ── */}
                <div className="grid grid-cols-2 gap-4">
                  <TextField label="Full name" value={member.name} onChange={v => update(i, "name", v)} />
                  <TextField label="Initials" value={member.initials} onChange={v => update(i, "initials", v)} />
                </div>
                <TextField label="Role / title" value={member.role} onChange={v => update(i, "role", v)} />
                <div className="grid grid-cols-2 gap-4">
                  <TextField label="Department" value={member.department} onChange={v => update(i, "department", v)} />
                  <ColorField label="Department color" value={member.departmentColor} onChange={v => update(i, "departmentColor", v)} />
                </div>

                {/* Tier selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#8B949E] mb-2">
                    Member tier
                  </label>
                  <div className="flex gap-3">
                    {(["leadership", "staff"] as const).map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => update(i, "tier", t)}
                        className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-all capitalize ${
                          (member.tier ?? "staff") === t
                            ? "border-[#2563EB] bg-[#2563EB]/15 text-[#60A5FA]"
                            : "border-[#30363D] text-[#8B949E] hover:border-[#2563EB]/40 hover:text-[#E6EDF3]"
                        }`}
                      >
                        {t === "leadership" ? "Leadership (wide card)" : "Staff (grid card)"}
                      </button>
                    ))}
                  </div>
                  {(member.tier ?? "staff") === "leadership" && (
                    <p className="text-xs text-[#8B949E]/70 mt-1.5">
                      Leadership members appear as full-width cards above the team grid.
                    </p>
                  )}
                </div>

                <TextareaField label="Bio" value={member.bio} onChange={v => update(i, "bio", v)} rows={3} />

                <div className="grid grid-cols-2 gap-4">
                  <ColorField label="Avatar gradient — from" value={member.avatarFrom} onChange={v => update(i, "avatarFrom", v)} />
                  <ColorField label="Avatar gradient — to" value={member.avatarTo} onChange={v => update(i, "avatarTo", v)} />
                </div>

                <ArrayField
                  label="Skills"
                  items={member.skills}
                  onChange={items => update(i, "skills", items)}
                  placeholder="Skill or technology…"
                />

                <div className="space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#8B949E]">
                    Social links
                  </label>
                  <TextField label="LinkedIn URL" value={member.social.linkedin ?? ""} onChange={v => updateSocial(i, "linkedin", v)} />
                  <TextField label="GitHub URL" value={member.social.github ?? ""} onChange={v => updateSocial(i, "github", v)} />
                  <TextField label="Email" value={member.social.email ?? ""} onChange={v => updateSocial(i, "email", v)} />
                </div>
              </div>
            )}
          </section>
        ))}
      </div>
      <SaveBar dirty={dirty} saving={saving} saved={saved} onSave={save}
        onDiscard={() => { setData(JSON.parse(original)); setSaved(false); }} />
    </AdminShell>
  );
}
