import { NextRequest, NextResponse } from "next/server";
import { verify } from "@/lib/server_auth";
import { z } from "zod";
import { userDocuments } from "@/lib/server_db";

const DocumentRetrievalRequestSchema = z.object({
  token: z.string(),
});

export async function POST(request: NextRequest) {
  const params = DocumentRetrievalRequestSchema.parse(await request.json());
  const uid = await verify(params.token);
  const documents = await userDocuments(uid);
  return NextResponse.json(documents);
}
