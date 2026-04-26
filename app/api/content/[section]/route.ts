import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

const ALLOWED = new Set([
  "hero",
  "company",
  "services",
  "pricing",
  "team",
  "why-us",
  "sections",
]);

export async function GET(
  _request: NextRequest,
  { params }: { params: { section: string } }
) {
  const { section } = params;
  if (!ALLOWED.has(section)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const filePath = path.join(CONTENT_DIR, `${section}.json`);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return NextResponse.json(data);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { section: string } }
) {
  // Auth check
  const cookieHeader = request.headers.get("cookie") ?? "";
  if (!cookieHeader.includes("admin-session=authenticated")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { section } = params;
  if (!ALLOWED.has(section)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const filePath = path.join(CONTENT_DIR, `${section}.json`);
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(body, null, 2), "utf-8");
  return NextResponse.json({ ok: true });
}
