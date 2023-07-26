"use client";
import { Document } from "@/lib/document";
import { myDocuments } from "@/lib/client_db";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";

export default function Documents() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [documents, setDocuments] = useState<
    { id: string; document: Document }[] | null
  >(null);
  const user = useAuthState(auth)[0];

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError(null);
      myDocuments((await user?.getIdToken()) ?? "")
        .then((documents) => {
          setDocuments(documents);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    };

    if (user) {
      fetchDocuments();
    }
  }, [user]);

  return (
    <SessionProvider>
      <div className="flex flex-col bg-gray-200 dark:bg-gray-800 w-full rounded-md overflow-hidden">
        {loading ? (
          <div className="flex flex-row justify-center items-center p-2 text-gray-500 dark:text-gray-400">
            Loading...
          </div>
        ) : error ? null : (
          <>
            {documents?.map(({ id, document }) => (
              <Link
                key={id}
                className="flex flex-row px-2 py-1 hover:bg-gray-300 dark:hover:bg-gray-700"
                href={`/humans/${id}`}
              >
                {document.name}
              </Link>
            ))}
          </>
        )}
      </div>
    </SessionProvider>
  );
}
