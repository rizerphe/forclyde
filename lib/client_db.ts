import { database } from "./firebase";
import { ref, get, set } from "firebase/database";
import { Document, DocumentSchema } from "./document";
import { z } from "zod";

const addDocument = async (
  token: string,
  document: Omit<Document, "author">
) => {
  const result = await fetch("/api/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      document: document,
    }),
  });
  return await result.json();
};

const readDocument = async (id: string) => {
  const documentRef = ref(database, `/documents/${id}`);
  const documentSnapshot = await get(documentRef);
  if (documentSnapshot.exists()) {
    return DocumentSchema.parse(documentSnapshot.val());
  } else {
    return null;
  }
};

const updateDocument = async (id: string, document: Document) => {
  const documentRef = ref(database, `documents/${id}`);
  await set(documentRef, document);
};

const myDocuments = async (token: string) => {
  const result = await fetch("/api/documents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  }).then((res) => res.json());
  return z
    .array(
      z.object({
        id: z.string(),
        document: DocumentSchema,
      })
    )
    .parse(result);
};

const deleteDocument = async (id: string) => {
  const documentRef = ref(database, `documents/${id}`);
  await set(documentRef, null);
};

export {
  addDocument,
  readDocument,
  updateDocument,
  myDocuments,
  deleteDocument,
};
