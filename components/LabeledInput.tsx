export function LabeledInput({
  children,
  placeholder,
  editable = true,
  value,
  onChange,
}: {
  children?: React.ReactNode;
  placeholder?: string;
  editable?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-row w-full justify-start items-center gap-2">
      <span className="flex-1 font-bold">{children}</span>
      <input
        type="text"
        className="flex-1 bg-white dark:bg-black rounded-md border-2 border-gray-200 dark:border-gray-800 p-1 text-black dark:text-white"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={!editable}
      />
    </div>
  );
}
