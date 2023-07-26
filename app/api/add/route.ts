import { NextRequest, NextResponse } from "next/server";
import { DocumentSchema } from "@/lib/document";
import { addDocument } from "@/lib/server_db";
import { verify } from "@/lib/server_auth";
import { z } from "zod";

const DocumentCreationSchema = z.object({
  token: z.string(),
  document: DocumentSchema.omit({
    author: true,
  }),
});

export async function POST(request: NextRequest) {
  const params = DocumentCreationSchema.parse(await request.json());
  const uid = await verify(params.token);
  const document = addDocument({
    ...params.document,
    author: uid,
  });
  return NextResponse.json({
    id: document,
  });
}
