"use client";

import { Plus, Trash2, GripVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LABEL = "block text-xs font-semibold uppercase tracking-widest text-[#8B949E] mb-1.5";
const INPUT = `w-full px-3.5 py-2.5 rounded-xl border border-[#30363D] bg-[#0D1117]
               text-[#E6EDF3] text-sm placeholder-[#8B949E]/40
               focus:outline-none focus:border-[#2563EB] transition-colors duration-200`;

interface FieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

export function Field({ label, hint, children }: FieldProps) {
  return (
    <div>
      <label className={LABEL}>{label}</label>
      {children}
      {hint && <p className="text-xs text-[#8B949E]/60 mt-1.5">{hint}</p>}
    </div>
  );
}

interface TextProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}

export function TextField({ label, value, onChange, placeholder, hint }: TextProps) {
  return (
    <Field label={label} hint={hint}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={INPUT}
      />
    </Field>
  );
}

interface TextareaProps extends TextProps {
  rows?: number;
}

export function TextareaField({ label, value, onChange, placeholder, hint, rows = 3 }: TextareaProps) {
  return (
    <Field label={label} hint={hint}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`${INPUT} resize-none`}
      />
    </Field>
  );
}

interface ColorProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}

export function ColorField({ label, value, onChange, hint }: ColorProps) {
  return (
    <Field label={label} hint={hint}>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded-lg border border-[#30363D] bg-[#0D1117]
                     cursor-pointer p-1"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#1A4F8A"
          className={`${INPUT} flex-1`}
        />
      </div>
    </Field>
  );
}

interface ArrayProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  hint?: string;
}

export function ArrayField({ label, items, onChange, placeholder, hint }: ArrayProps) {
  const update = (i: number, val: string) => {
    const next = [...items];
    next[i] = val;
    onChange(next);
  };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, ""]);

  return (
    <Field label={label} hint={hint}>
      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <GripVertical size={14} className="text-[#8B949E]/40 shrink-0 cursor-grab" />
              <input
                type="text"
                value={item}
                onChange={(e) => update(i, e.target.value)}
                placeholder={placeholder ?? `Item ${i + 1}`}
                className={`${INPUT} flex-1`}
              />
              <button
                type="button"
                onClick={() => remove(i)}
                className="p-2 rounded-lg text-[#8B949E] hover:text-[#F87171]
                           hover:bg-[#A32D2D]/10 transition-colors shrink-0"
                aria-label="Remove item"
              >
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          type="button"
          onClick={add}
          className="flex items-center gap-2 text-xs font-medium text-[#2563EB]
                     hover:text-[#60A5FA] transition-colors mt-1"
        >
          <Plus size={13} />
          Add item
        </button>
      </div>
    </Field>
  );
}

/* Save bar ─────────────────────────────────────────────── */
interface SaveBarProps {
  dirty: boolean;
  saving: boolean;
  saved: boolean;
  onSave: () => void;
  onDiscard: () => void;
}

export function SaveBar({ dirty, saving, saved, onSave, onDiscard }: SaveBarProps) {
  if (!dirty && !saved) return null;
  return (
    <AnimatePresence>
      {(dirty || saved) && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50
                     flex items-center gap-3 px-5 py-3 rounded-2xl border border-[#30363D]
                     bg-[#161B22]/95 backdrop-blur-md shadow-2xl"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}
        >
          {saved && !dirty ? (
            <span className="text-sm text-[#34D399] font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#34D399] inline-block" />
              Saved successfully
            </span>
          ) : (
            <>
              <span className="text-sm text-[#8B949E]">Unsaved changes</span>
              <button
                onClick={onDiscard}
                className="text-sm text-[#8B949E] hover:text-[#E6EDF3] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#21262D]"
              >
                Discard
              </button>
              <motion.button
                onClick={onSave}
                disabled={saving}
                className="btn-shimmer text-sm text-white font-bold px-5 py-2 rounded-xl
                           disabled:opacity-60"
                style={{ boxShadow: "0 0 20px rgba(37,99,235,0.4)" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {saving ? "Saving…" : "Save Changes"}
              </motion.button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { INPUT, LABEL };
