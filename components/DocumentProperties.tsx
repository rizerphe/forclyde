"use client";
import { Code } from "./Code";
import { Document } from "@/lib/document";
import { LabeledInput } from "./LabeledInput";
import { updateDocument } from "@/lib/client_db";

function DocumentProperty({
  admin,
  doc,
  setDoc,
  id,
  name,
  children,
  placeholder,
}: {
  admin: boolean;
  doc: Document | null;
  setDoc: (doc: Document) => void;
  id: string;
  name: string;
  children?: React.ReactNode;
  placeholder?: string;
}) {
  return (
    <LabeledInput
      placeholder={placeholder}
      editable={admin}
      value={doc?.properties?.[name] ?? ""}
      onChange={(e) => {
        if (!doc) return;
        setDoc({
          ...doc,
          properties: {
            ...doc.properties,
            [name]: e.target.value,
          },
        });
        updateDocument(id, {
          ...doc,
          properties: {
            ...doc.properties,
            [name]: e.target.value,
          },
        });
      }}
    >
      {children || name}
    </LabeledInput>
  );
}

export function DocumentProperties({
  admin,
  doc,
  setDoc,
  id,
}: {
  admin: boolean;
  doc: Document | null;
  setDoc: (doc: Document) => void;
  id: string;
}) {
  return (
    <>
      {admin && (
        <span className="inline-block w-min min-w-full">
          You can use <Code value="{{datetime}}" />, <Code value="{{date}}" />{" "}
          and <Code value="{{time}}" />; they will be replaced with the current
          date and time according to these settings. The valid styles are{" "}
          <Code>full</Code>, <Code>long</Code>, <Code>medium</Code> and{" "}
          <Code>short</Code>.
        </span>
      )}
      {[
        ["timezone", "GMT"],
        ["locale", "en-US"],
        ["dateStyle", "full"],
        ["timeStyle", "medium"],
      ].map(([name, placeholder]) => (
        <DocumentProperty
          key={name}
          admin={admin}
          doc={doc}
          setDoc={setDoc}
          id={id}
          name={name}
          placeholder={placeholder}
        />
      ))}
    </>
  );
}
