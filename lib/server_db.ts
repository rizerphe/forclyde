import { database } from "./firebase_admin";
import { Document, DocumentSchema } from "./document";

const addDocument = (document: Document) => {
  const ref = database.ref("documents");
  const newDocumentRef = ref.push();
  newDocumentRef.set(document);
  return newDocumentRef.key;
};

const readDocument = async (id: string): Promise<Document | null> => {
  const documentRef = database.ref(`documents/${id}`);
  const documentSnapshot = await documentRef.get();
  if (documentSnapshot.exists()) {
    return documentSnapshot.val();
  } else {
    return null;
  }
};

const userDocuments = async (
  uid: string
): Promise<{ id: string; document: Document }[]> => {
  const documentsRef = database.ref("documents");
  const documentsSnapshot = await documentsRef
    .orderByChild("author")
    .equalTo(uid)
    .get();
  if (documentsSnapshot.exists()) {
    const documents = documentsSnapshot.val();
    return Object.keys(documents).map((id) => ({
      id,
      document: DocumentSchema.parse(documents[id]),
    }));
  } else {
    return [];
  }
};

export { addDocument, readDocument, userDocuments };
