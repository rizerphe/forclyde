import { NextRequest, NextResponse } from "next/server";
import is_discord from "@/lib/is_discord";
import { readDocument } from "@/lib/server_db";
import { renderDocument } from "@/lib/document";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  if (!(await is_discord(request))) {
    return NextResponse.redirect(new URL(`/humans/${id}`, request.url));
  }
  const doc = await readDocument(id);
  if (!doc) {
    return new NextResponse("Document not found", { status: 404 });
  }
  const rendered = await renderDocument(doc);
  const headers = new Headers();
  headers.set("content-type", "text/plain");
  return new NextResponse(rendered, { headers });
}
