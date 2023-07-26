"use client";
import { useSession, SessionProvider, signIn, signOut } from "next-auth/react";
import { firebaseSignIn, firebaseSignOut } from "@/lib/client_auth";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CreateNote } from "./CreateNote";
import Image from "next/image";

function useOnClickOutside(
  ref: React.MutableRefObject<any>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

function AccountButtonWithAuth() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (session) {
      firebaseSignIn((session?.user as any)?.firebase_token);
    } else {
      firebaseSignOut();
    }
  }, [session]);

  useOnClickOutside(ref, () => setDropdownOpen(false));

  return session ? (
    <div className="flex flex-row items-center relative" ref={ref}>
      <Image
        width={32}
        height={32}
        src={session.user?.image || undefined}
        alt="profile"
        className="w-8 h-8 rounded-full mr-2"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      />
      <span
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="text-2xl font-bold"
      >
        {session.user?.name}
      </span>
      {dropdownOpen && (
        <div className="absolute top-full right-0 min-w-fit w-full mt-2 bg-white dark:bg-gray-800 rounded-md shadow-md flex flex-col z-10 overflow-hidden">
          <CreateNote className="cursor-pointer px-4 py-1 hover:bg-gray-200 dark:hover:bg-gray-700">
            New Note
          </CreateNote>
          <Link
            className="cursor-pointer px-4 py-1 hover:bg-gray-200 dark:hover:bg-gray-700"
            href="/account"
          >
            Account
          </Link>
          <span
            className="cursor-pointer px-4 py-1 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => signOut()}
          >
            Log out
          </span>
        </div>
      )}
    </div>
  ) : (
    <span className="text-2xl font-bold" onClick={() => signIn("discord")}>
      Log in
    </span>
  );
}

export default function AccountButton() {
  return (
    <SessionProvider>
      <AccountButtonWithAuth />
    </SessionProvider>
  );
}
