export function Code({
  children,
  value,
}: {
  children?: React.ReactNode;
  value?: string;
}) {
  return (
    <span className="bg-gray-200 dark:bg-gray-800 rounded-md text-gray-800 dark:text-gray-200 p-0.5">
      {children ?? value}
    </span>
  );
}
