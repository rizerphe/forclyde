import { CreateNoteWithSession } from "./CreateNote";

export default function CTA() {
  return (
    <h2 className="text-center flex flex-col items-center gap-4">
      <CreateNoteWithSession className="bg-blue-500 text-white font-bold text-xl p-2 rounded-lg cursor-pointer">
        Create a Secret Note
      </CreateNoteWithSession>
      <noscript>Enable JavaScript to create a note.</noscript>
    </h2>
  );
}
