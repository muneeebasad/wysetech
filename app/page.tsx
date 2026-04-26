import fs from "fs";
import path from "path";
import HomeClient from "@/components/HomeClient";

export const dynamic = "force-dynamic";

function readJson(file: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "content", file), "utf-8"));
}

export default function Home() {
  const sections = readJson("sections.json");
  const hero     = readJson("hero.json");
  const services = readJson("services.json");
  const pricing  = readJson("pricing.json");
  const whyUs    = readJson("why-us.json");
  const company  = readJson("company.json");

  return (
    <HomeClient
      sections={sections}
      hero={hero}
      services={services}
      pricing={pricing}
      whyUs={whyUs}
      company={company}
    />
  );
}
