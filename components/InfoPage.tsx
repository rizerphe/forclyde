export function InfoPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 min-w-fit justify-center items-center gap-4">
      {children}
    </div>
  );
}
