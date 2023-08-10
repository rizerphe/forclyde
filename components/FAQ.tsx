import { CreateNoteWithSession } from "./CreateNote";

function FAQItem({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <details className="flex flex-col gap-2">
      <summary className="flex flex-row items-center gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg">
        <span className="font-bold">{question}</span>
      </summary>
      <span className="p-4">{children}</span>
    </details>
  );
}

export default function FAQ() {
  return (
    <div className="w-full p-8 flex flex-col gap-2 font-sans text-lg">
      <span className="text-2xl font-bold">FAQ</span>
      <FAQItem question="What is this?">
        Discord&apos;s Clyde can open links. <b>For Clyde</b> lets you give
        Clyde context that only it can see. Ask Clyde about your private project
        without boring everyone with the details. Make inside jokes and quests
        more immersive by letting discord&apos;s Clyde hold clues. Or get
        Clyde&apos;s take on your thoughts without oversharing with the whole
        server.
      </FAQItem>
      <FAQItem question="What's Clyde?">
        <a href="https://dis.gd/clyde" className="text-blue-500">
          Clyde
        </a>{" "}
        is <b>Discord&apos;s new AI bot,</b> powered by OpenAI. You can&apos;t
        get access to it yet, you have to get lucky and be invited to the beta.
        You can use it both in discord DMs if either you or the other person has
        access to Clyde, or in servers that have access to Clyde.
      </FAQItem>
      <FAQItem question="How do I create a note?">
        After logging in, click your avatar in the top right corner and click
        &quot;New Note&quot; (or click{" "}
        <CreateNoteWithSession className="text-blue-500 font-bold cursor-pointer">
          here
        </CreateNoteWithSession>
        ), then send the link (copy it from under the note&apos;s title) to
        Clyde.
      </FAQItem>
      <FAQItem question="Who can see my notes?">
        <b>Only you and Clyde</b> can see your notes, unless you set a note to
        public. Clyde will share your notes with other users if you ask him to.
        Others can also ask Clyde to share your notes with them in DMs or in
        servers you don&apos;t share with them; your notes are not secure.
      </FAQItem>
      <FAQItem question="Is this secure?">
        <b>No.</b> The notes aren&apos;t meant to be secure, but they unlock new
        ways to interact and engage your friends. You can direct the
        conversation without handing all the answers to them upfront. It adds a
        dash of mystery and customization to your Clyde bot. We rely on a simple
        user agent check combined with reverse DNS lookup, checking whether this
        is a discord IP, which is not secure.
      </FAQItem>
      <FAQItem question="Is there a limit to how many private notes I can create?">
        <b>No.</b> There is no limit on the number of private notes you can
        create for Clyde. Feel free to make as many as you&apos;d like!
      </FAQItem>
      <FAQItem question="Can I delete or edit a private note after creating it?">
        <b>Yes.</b> You can delete and edit your notes at any time. You can also
        set a note to public or private at any time.
      </FAQItem>
      <FAQItem question="How can I provide Clyde with the link to my note?">
        <b>There are a few ways.</b> You can send the link to Clyde directly in
        the chat, or you can leverage the fact that Clyde can read your about me
        (and pronouns). You include the link to the note in your discord about
        me, and then suggest that Clyde read your about me.
      </FAQItem>
      <FAQItem question="What can I use this for?">
        <b>Anything you want.</b> I created this to more easily be able to share
        things about myself and my projects, but hey, get creative! Find new
        ways to connect with your Discord crew, Clyde&apos;s waiting to be let
        in on the joke!
      </FAQItem>
      <FAQItem question="Where can I find the source code?">
        <b>
          <a href="https://github.com/rizerphe/forclyde">Here</a>
        </b>{" "}
        is the source code for this project. It&apos;s also where you can
        contact me if you have any questions or concerns. Feel free to
        contribute!
      </FAQItem>
      <FAQItem question="How can I support this project?">
        <b>
          <a href="https://www.buymeacoffee.com/rizerphe">Buy me a coffee</a>
        </b>{" "}
        if you&apos;d like to support this project. I&apos;m also open to
        suggestions for new features, so feel free to open an issue on{" "}
        <a href="https://github.com/rizerphe/forclyde">GitHub</a>.
      </FAQItem>
    </div>
  );
}
