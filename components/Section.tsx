export function Section({
  children,
  stretch = true,
}: {
  children: React.ReactNode;
  stretch?: boolean;
}) {
  return (
    <div
      className={`flex flex-row w-full justify-between content-stretch items-stretch p-4 flex-wrap ${
        stretch ? "flex-grow" : "gap-2"
      }`}
    >
      {children}
    </div>
  );
}
