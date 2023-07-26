"use client";
import Link from "next/link";
import { InfoPage } from "./InfoPage";
import { CreateNote } from "./CreateNote";

export function ErrorPage({
  title,
  messages,
}: {
  title: string;
  messages: string[];
}) {
  return (
    <InfoPage>
      <span className="font-bold text-2xl">{title}</span>
      {messages.map((message) => (
        <span key={message} className="text-gray-400 dark:text-gray-200">
          {message}
        </span>
      ))}
      <div className="flex flex-row gap-4">
        <Link className="underline text-gray-500 cursor-pointer" href="/">
          What is this?
        </Link>
        <CreateNote className="underline text-gray-500 cursor-pointer">
          Write Clyde a note
        </CreateNote>
      </div>
    </InfoPage>
  );
}
