"use client";
import Documents from "@/components/Documents";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Section } from "./Section";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";

export default function FoldableDocuments() {
  const [show, setShow] = useState<boolean>(false);
  const user = useAuthState(auth)[0];

  return user ? (
    <Section stretch={false}>
      <div
        className="flex flex-row items-center justify-between bg-gray-200 dark:bg-zinc-900 w-full p-2 rounded-md cursor-pointer"
        onClick={() => setShow(!show)}
      >
        My Notes
        {show ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
      </div>
      {show ? <Documents /> : null}
    </Section>
  ) : null;
}
