"use client";
import { useEffect, useState } from "react";
import { Document, renderDocument } from "@/lib/document";
import MarkdownPreview from "@uiw/react-markdown-preview";

export function RawDocumentPreview({
  document,
  content,
}: {
  document: Document;
  content: string | null;
}) {
  const [rendered, setRendered] = useState<string | null>(null);

  useEffect(() => {
    renderDocument({ ...document, content: content ?? "" })
      .then((rendered) => setRendered(rendered))
      .catch((e) => console.error(e));
  }, [document, content]);

  return rendered !== null ? (
    <MarkdownPreview
      source={rendered ?? ""}
      className="grow-[64] min-w-[512px] rounded-md p-4 overflow-hidden"
      style={{ background: "rgb(40, 42, 54)", minHeight: "512px" }}
      wrapperElement={{
        "data-color-mode": "dark",
      }}
    />
  ) : (
    <div
      className="grow-[64] min-w-[512px] rounded-md p-4 overflow-hidden"
      style={{ minHeight: "512px" }}
    >
      Loading...
    </div>
  );
}
