"use client";
import { useState } from "react";
import { MdContentCopy, MdCheckCircleOutline } from "react-icons/md";

export function CopyableFieldAccent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <span className="text-gray-800 dark:text-gray-200">{children}</span>;
}

export function CopyableField({
  children,
  clipboardText,
}: {
  children: React.ReactNode;
  clipboardText: string;
}) {
  const [recentlyCopied, setRecentlyCopied] = useState(false);

  return (
    <span className="flex flex-row w-full rounded-md text-sm bg-gray-200 dark:bg-gray-800 p-2 text-gray-600 dark:text-gray-400 justify-between items-center gap-2">
      <span>{children}</span>
      {recentlyCopied ? (
        <MdCheckCircleOutline className="cursor-pointer text-gray-600 dark:text-gray-400" />
      ) : (
        <MdContentCopy
          className="cursor-pointer text-green-600 dark:text-green-400"
          onClick={() => {
            window.navigator.clipboard.writeText(clipboardText);
            setRecentlyCopied(true);
            setTimeout(() => setRecentlyCopied(false), 1000);
          }}
        />
      )}
    </span>
  );
}
