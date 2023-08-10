"use client";
import Documents from "@/components/Documents";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function HidingDocuments() {
  const user = useAuthState(auth)[0];

  return user ? (
    <div className="w-full p-8 flex flex-col items-stretch gap-2">
      <span className="text-2xl font-bold">My Notes</span>
      <Documents />
    </div>
  ) : null;
}
