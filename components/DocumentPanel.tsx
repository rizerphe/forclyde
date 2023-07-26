"use client";
import { Panel, PanelChoice, PanelChoices } from "./Panel";
import { Input } from "./Input";
import { CopyableField, CopyableFieldAccent } from "./CopyableField";
import { DocumentProperties } from "./DocumentProperties";
import { updateDocument, deleteDocument } from "@/lib/client_db";
import { Document } from "@/lib/document";
import { redirect } from "next/navigation";
import { useState } from "react";

function DocumentDeletion({ id }: { id: string }) {
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [redirecting, setRedirecting] = useState<boolean>(false);

  const deleteDoc = async () => {
    await deleteDocument(id);
    setRedirecting(true);
  };

  if (redirecting) {
    redirect("/");
  }

  return (
    <PanelChoices>
      <PanelChoice
        className="bg-gray-500 hover:bg-gray-700"
        onClick={() => {
          setConfirmation(!confirmation);
        }}
      >
        {confirmation ? "Cancel" : "Delete Note"}
      </PanelChoice>
      {confirmation ? (
        <PanelChoice
          className="bg-red-500 hover:bg-red-700"
          onClick={deleteDoc}
        >
          Confirm
        </PanelChoice>
      ) : null}
    </PanelChoices>
  );
}

export function DocumentPanel({
  admin,
  id,
  doc,
  setDoc,
  currentContent,
  setCurrentContent,
  previewMode,
  setPreviewMode,
}: {
  admin: boolean;
  id: string;
  doc: Document | null;
  setDoc: (doc: Document) => void;
  currentContent: string | null;
  setCurrentContent: (content: string | null) => void;
  previewMode?: boolean;
  setPreviewMode?: (previewMode: boolean) => void;
}) {
  const setDocName = (name: string) => {
    if (!doc) return;
    setDoc({ ...doc, name });
    updateDocument(id, { ...doc, name });
  };
  const setRestricted = (restricted: boolean) => {
    if (!doc) return;
    setDoc({ ...doc, restricted });
    updateDocument(id, { ...doc, restricted });
  };
  const saveDoc = () => {
    if (!doc) return;
    if (currentContent === doc.content) return;
    setDoc({ ...doc, content: currentContent ?? "" });
    updateDocument(id, { ...doc, content: currentContent ?? "" });
  };
  const resetDoc = () => {
    setCurrentContent(doc?.content ?? "");
  };

  return (
    <Panel>
      <Input
        value={doc?.name}
        onChange={(e) => {
          setDocName(e.target.value);
        }}
        editable={admin}
      />
      <CopyableField clipboardText={`${window.location.origin}/${id}`}>
        {window.location.protocol}
        {"//"}
        <CopyableFieldAccent>{window.location.host}</CopyableFieldAccent>/{id}
      </CopyableField>
      <PanelChoices>
        <PanelChoice
          active={!admin || previewMode}
          onClick={() => setPreviewMode?.(true)}
        >
          Preview
        </PanelChoice>
        <PanelChoice
          active={admin && !previewMode}
          enabled={admin}
          onClick={() => setPreviewMode?.(false)}
        >
          Edit
        </PanelChoice>
      </PanelChoices>
      {admin && (
        <PanelChoices>
          <PanelChoice
            className="bg-gray-500 hover:bg-gray-700"
            active={!doc?.restricted}
            onClick={() => setRestricted(false)}
          >
            Public
          </PanelChoice>
          <PanelChoice
            className="bg-gray-500 hover:bg-gray-700"
            active={doc?.restricted}
            onClick={() => setRestricted(true)}
          >
            Just for Clyde
          </PanelChoice>
        </PanelChoices>
      )}
      <DocumentProperties admin={admin} doc={doc} setDoc={setDoc} id={id} />
      {admin && (
        <>
          <PanelChoices className="mt-auto">
            <PanelChoice
              enabled={currentContent !== doc?.content}
              onClick={() => saveDoc()}
            >
              Save
            </PanelChoice>
            <PanelChoice
              className="bg-gray-500 hover:bg-gray-700"
              enabled={currentContent !== doc?.content}
              onClick={() => resetDoc()}
            >
              Reset
            </PanelChoice>
          </PanelChoices>
          <DocumentDeletion id={id} />
        </>
      )}
    </Panel>
  );
}
