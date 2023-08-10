"use client";
import { SessionProvider } from "next-auth/react";
import { CreateNote } from "./CreateNote";

export default function CTA() {
  return (
    <div className="text-center flex flex-col items-center gap-4">
      <SessionProvider>
        <CreateNote className="bg-blue-500 text-white font-bold text-xl p-2 rounded-lg cursor-pointer">
          Create a Secret Note
        </CreateNote>
      </SessionProvider>
    </div>
  );
}
