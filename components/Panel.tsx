export function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col grow-[1] justify-start items-stretch gap-4 p-4">
      {children}
    </div>
  );
}

export function PanelChoices({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-row w-full rounded-md overflow-hidden justify-center items-center gap-0 ${className}`}
    >
      {children}
    </div>
  );
}

export function PanelChoice({
  children,
  className,
  onClick,
  enabled = true,
  active = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  enabled?: boolean;
  active?: boolean;
}) {
  return (
    <span
      className={`flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-2 ${
        active
          ? "cursor-not-allowed border-black dark:border-gray-400"
          : "cursor-pointer border-transparent"
      } ${enabled ? "" : "opacity-50 cursor-not-allowed"} ${className}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
