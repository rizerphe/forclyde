export function Input({
  value,
  onChange,
  placeholder,
  editable = true,
}: {
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editable?: boolean;
}) {
  return (
    <input
      type="text"
      className="w-full bg-white dark:bg-black rounded-md border-2 border-gray-200 dark:border-gray-800 p-2 font-bold text-black dark:text-white"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={!editable}
    />
  );
}
