import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { cookies } from "next/headers";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const session = cookieStore.get("admin-session");
  if (!session || session.value !== "authenticated")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const memberId = (formData.get("memberId") as string | null)?.replace(/[^a-zA-Z0-9_-]/g, "");

  if (!file || !memberId)
    return NextResponse.json({ error: "Missing file or memberId" }, { status: 400 });

  if (!ALLOWED_TYPES.includes(file.type))
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });

  if (file.size > MAX_BYTES)
    return NextResponse.json({ error: "File too large (max 5 MB)" }, { status: 400 });

  const ext = file.type.split("/")[1].replace("jpeg", "jpg");
  const filename = `member-${memberId}.${ext}`;
  const dir = path.join(process.cwd(), "public", "team");
  const filepath = path.join(dir, filename);

  if (!existsSync(dir)) await mkdir(dir, { recursive: true });

  // Remove any existing photo for this member (different extension)
  for (const e of ["jpg", "png", "webp", "gif"]) {
    const old = path.join(dir, `member-${memberId}.${e}`);
    if (old !== filepath && existsSync(old)) await unlink(old).catch(() => {});
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);

  return NextResponse.json({ path: `/team/${filename}` });
}

export async function DELETE(req: NextRequest) {
  const cookieStore = cookies();
  const session = cookieStore.get("admin-session");
  if (!session || session.value !== "authenticated")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { memberId } = await req.json();
  const safeId = String(memberId).replace(/[^a-zA-Z0-9_-]/g, "");
  const dir = path.join(process.cwd(), "public", "team");

  for (const e of ["jpg", "png", "webp", "gif"]) {
    const p = path.join(dir, `member-${safeId}.${e}`);
    if (existsSync(p)) await unlink(p).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
