import { ClydeMessage, DiscordChat, DiscordMessage } from "./Chat";

export default function ExampleChat() {
  return (
    <DiscordChat>
      <DiscordMessage
        username="John Doe"
        avatar="https://randomuser.me/api/portraits/men/1.jpg"
        timestamp="Today at 4:20 PM"
      >
        What&apos;s my favorite ice cream flavor according to{" "}
        <a
          href="https://forclyde.vercel.app/-NbUUDmZtV0f9Bk5WNTE"
          className="text-blue-400"
        >
          https://forclyde.vercel.app/-NbUUDmZtV0f9Bk5WNTE
        </a>
        ?
      </DiscordMessage>

      <ClydeMessage timestamp="Today at 4:20 PM">
        Rocky road, of course!
      </ClydeMessage>
    </DiscordChat>
  );
}
