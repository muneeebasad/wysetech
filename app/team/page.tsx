import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import TeamPageClient from "./TeamPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Team — Wysetech Technologies",
  description:
    "Meet the engineers and security professionals behind Wysetech Technologies. A team built on deep technical expertise, enterprise tooling, and a security-first mindset.",
};

function readJson(file: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "content", file), "utf-8"));
}

export default function TeamPage() {
  const sections = readJson("sections.json");
  const team     = readJson("team.json");
  const company  = readJson("company.json");
  return <TeamPageClient sections={sections} team={team} company={company} />;
}
