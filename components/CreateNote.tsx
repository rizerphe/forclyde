"use client";
import { addDocument } from "@/lib/client_db";
import { useSession, signIn } from "next-auth/react";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { z } from "zod";
import { redirect } from "next/navigation";
import { useState } from "react";

export function CreateNote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [redirectURL, setRedirectURL] = useState<string | null>(null);
  const { data: session } = useSession();
  const user = useAuthState(auth)[0];

  if (redirectURL) redirect(redirectURL);

  const createDocument = async () => {
    if (!session) {
      signIn("discord");
      return;
    }
    const doc = z
      .object({
        id: z.optional(z.string()),
      })
      .parse(
        await addDocument((await user?.getIdToken()) ?? "", {
          name: "Untitled",
          content: "",
          restricted: true,
          properties: {},
        })
      );
    if (doc.id) setRedirectURL(`/humans/${doc.id}`);
  };

  return (
    <>
      <span className={`${className}`} onClick={() => createDocument()}>
        {children}
      </span>
    </>
  );
}
