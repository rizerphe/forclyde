import { Document } from "@/lib/document";
import { RawDocumentPreview } from "./DocumentPreview";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { dracula } from "@uiw/codemirror-theme-dracula";

export function DocumentContent({
  doc,
  currentContent,
  setCurrentContent = () => {},
  previewMode = true,
  is_admin,
}: {
  doc: Document | null;
  currentContent: string | null;
  setCurrentContent?: (content: string | null) => void;
  previewMode?: boolean;
  is_admin?: boolean;
}) {
  return is_admin && !previewMode ? (
    <CodeMirror
      value={currentContent ?? ""}
      onChange={setCurrentContent}
      height="512px"
      className="grow-[64] min-w-[512px] min-h-[512px] rounded-md overflow-hidden"
      style={{ background: "#282a36" }}
      theme={dracula}
      extensions={[
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
        }),
      ]}
    />
  ) : (
    <RawDocumentPreview document={doc!} content={currentContent} />
  );
}
