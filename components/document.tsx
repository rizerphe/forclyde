"use client";
import { Document } from "@/lib/document";
import { readDocument } from "@/lib/client_db";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { DocumentPanel } from "./DocumentPanel";
import { DocumentContent } from "./DocumentContent";
import { InfoPage } from "./InfoPage";
import { ErrorPage } from "./ErrorPage";
import { Section } from "./Section";

export default function Document({ id }: { id: string }) {
  const [doc, setDoc] = useState<Document | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentContent, setCurrentContent] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const user = useAuthState(auth)[0];

  useEffect(() => {
    setLoading(true);
    setError(null);
    readDocument(id)
      .then((doc) => {
        setDoc(doc);
        setCurrentContent(doc && doc.content);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [id, user]);

  return (
    <SessionProvider>
      <Section>
        {loading ? (
          <>
            <InfoPage>Loading...</InfoPage>
          </>
        ) : error ? (
          <ErrorPage
            title="Could not load"
            messages={[
              error,
              "Make sure the owner has given you access, you are logged in and have the correct URL.",
            ]}
          />
        ) : (
          <>
            <DocumentPanel
              admin={doc?.author === user?.uid}
              id={id!}
              doc={doc!}
              setDoc={setDoc}
              currentContent={currentContent}
              setCurrentContent={setCurrentContent}
              previewMode={previewMode}
              setPreviewMode={setPreviewMode}
            />
            <DocumentContent
              doc={doc!}
              currentContent={currentContent}
              setCurrentContent={setCurrentContent}
              previewMode={previewMode}
              is_admin={doc?.author === user?.uid}
            />
          </>
        )}
      </Section>
    </SessionProvider>
  );
}
