"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Globe, MapPin, Send, CheckCircle2 } from "lucide-react";

const serviceOptions = [
  "Remote Helpdesk Support",
  "Device Monitoring & Patch Management",
  "Network Monitoring (NMS)",
  "Antivirus & Endpoint Security",
  "SIEM Solution",
  "DevOps & Infrastructure Automation",
  "Email Server",
  "Backup & Disaster Recovery",
  "IT & Cybersecurity Consultation",
  "Policy Management",
];

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  services: string[];
  message: string;
}

const INPUT_CLASS =
  "w-full px-4 py-2.5 rounded-lg border border-[#21262D] bg-[#0D1117] " +
  "text-[#E6EDF3] text-sm placeholder-[#8B949E]/45 " +
  "focus:outline-none focus:border-[#1A4F8A] transition-colors duration-200";

const LABEL_CLASS =
  "block text-[11px] font-semibold uppercase tracking-widest text-[#8B949E] mb-1.5";

interface Company { formspreeId: string; email: string; website: string; location: string; responseTime: string; }

export default function ContactSection({ company }: { company: Company }) {
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    services: [],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleService = (svc: string) =>
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(svc)
        ? prev.services.filter((s) => s !== svc)
        : [...prev.services, svc],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Replace YOUR_FORM_ID with your actual Formspree form ID
      const res = await fetch(`https://formspree.io/f/${company.formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...form,
          services: form.services.join(", ") || "Not specified",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      // Mailto fallback
      const subject = encodeURIComponent(
        `MSP Inquiry${form.company ? ` from ${form.company}` : ""}`
      );
      const body = encodeURIComponent(
        `Name: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\nServices: ${form.services.join(", ")}\n\n${form.message}`
      );
      window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 bg-[#161B22] relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(26,79,138,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.span
            className="inline-block text-sm font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(26,79,138,0.18), rgba(15,110,86,0.12))",
              border: "1px solid rgba(37,99,235,0.25)",
              color: "#60A5FA",
            }}
          >
            Get In Touch
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">
            <span
              style={{
                background: "linear-gradient(135deg, #E6EDF3 0%, #93C5FD 50%, #34D399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Start Your MSP Journey
            </span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-[2px] mx-auto mb-5"
            style={{ background: "linear-gradient(90deg, #1A4F8A, #0F6E56)" }}
          />

          <p className="text-[#8B949E] max-w-2xl mx-auto text-[15px] leading-relaxed">
            Tell us about your business and we&apos;ll design a managed service
            package that fits your needs and budget.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-[#E6EDF3] mb-5">
                Contact Information
              </h3>
              <div className="space-y-4">
                {[
                  {
                    Icon: Mail,
                    label: "Email",
                    value: company.email,
                    href: `mailto:${company.email}`,
                  },
                  {
                    Icon: Globe,
                    label: "Website",
                    value: company.website,
                    href: `https://${company.website}`,
                  },
                  {
                    Icon: MapPin,
                    label: "Location",
                    value: company.location,
                    href: null,
                  },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div
                      className="p-2 rounded-lg shrink-0"
                      style={{
                        backgroundColor: "#1A4F8A18",
                        border: "1px solid #1A4F8A28",
                      }}
                    >
                      <Icon size={15} className="text-brand-blue" />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#8B949E] mb-0.5 uppercase tracking-wider">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm text-[#C9D1D9] hover:text-[#E6EDF3] transition-colors"
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-[#C9D1D9]">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response time note */}
            <div className="p-5 rounded-xl border border-[#21262D] bg-[#161B22]">
              <p className="text-sm font-semibold text-[#E6EDF3] mb-1.5">
                Response Time
              </p>
              <p className="text-sm text-[#8B949E] leading-relaxed">
                We typically respond within{" "}
                <span className="text-accent-teal font-medium">
                  {company.responseTime}
                </span>
                . For urgent matters, include &ldquo;URGENT&rdquo; in your message.
              </p>
            </div>

            {/* Security note */}
            <div className="p-5 rounded-xl border border-[#21262D] bg-[#161B22]">
              <p className="text-sm font-semibold text-[#E6EDF3] mb-1.5">
                Confidentiality
              </p>
              <p className="text-sm text-[#8B949E] leading-relaxed">
                All enquiries are treated with strict confidentiality. We never
                share your information with third parties.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center
                           p-12 rounded-xl border border-[#0F6E56]/30 bg-[#0F6E56]/5"
              >
                <CheckCircle2
                  size={48}
                  className="text-accent-teal mb-4"
                />
                <h3 className="text-xl font-bold text-[#E6EDF3] mb-2">
                  Message Sent!
                </h3>
                <p className="text-[#8B949E]">
                  We&apos;ll get back to you within 4 business hours.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-6 sm:p-8 rounded-xl border border-[#21262D] bg-[#161B22]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={LABEL_CLASS}>Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      className={INPUT_CLASS}
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLASS}>Company</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => set("company", e.target.value)}
                      className={INPUT_CLASS}
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={LABEL_CLASS}>Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      className={INPUT_CLASS}
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLASS}>Phone (optional)</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className={INPUT_CLASS}
                      placeholder="+92 300 0000000"
                    />
                  </div>
                </div>

                {/* Services multi-select */}
                <div>
                  <label className={LABEL_CLASS}>
                    Services of Interest
                  </label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {serviceOptions.map((svc) => {
                      const active = form.services.includes(svc);
                      return (
                        <button
                          key={svc}
                          type="button"
                          onClick={() => toggleService(svc)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
                            active
                              ? "bg-[#1A4F8A] border-[#1A4F8A] text-white"
                              : "border-[#21262D] text-[#8B949E] hover:border-[#1A4F8A]/50 hover:text-[#C9D1D9]"
                          }`}
                        >
                          {svc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className={LABEL_CLASS}>Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    className={`${INPUT_CLASS} resize-none`}
                    placeholder="Tell us about your IT environment, current challenges, and what you're looking to achieve..."
                  />
                </div>

                {error && (
                  <p className="text-sm text-danger-red">{error}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center gap-2 px-7 py-3.5 rounded-xl
                             text-white font-bold text-sm relative overflow-hidden
                             disabled:opacity-60 disabled:cursor-not-allowed
                             ${!loading ? "btn-shimmer" : "bg-[#1A4F8A]"}`}
                  style={
                    !loading
                      ? { boxShadow: "0 4px 24px rgba(37,99,235,0.45)" }
                      : {}
                  }
                  whileHover={{ scale: loading ? 1 : 1.03, boxShadow: "0 6px 32px rgba(37,99,235,0.6)" }}
                  whileTap={{ scale: loading ? 1 : 0.97 }}
                >
                  <Send size={15} />
                  {loading ? "Sending…" : "Send Message"}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
