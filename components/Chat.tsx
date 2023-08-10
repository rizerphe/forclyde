import Image from "next/image";

export function DiscordMessage({
  username,
  avatar,
  timestamp,
  is_ai = false,
  children,
}: {
  username: string;
  avatar: string;
  timestamp: string;
  is_ai?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row w-full gap-4 items-center text-white bg-[#313338] hover:bg-[#2e3035] p-4 font-sans">
      <Image
        className="rounded-full w-12 h-12"
        src={avatar}
        alt={`${username}'s avatar`}
        width={48}
        height={48}
      />
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2">
          <span className="font-bold">{username}</span>
          {is_ai && (
            <span className="bg-[#2dc770] px-1 text-xs font-bold rounded-sm">
              ✓ AI
            </span>
          )}
          <span className="text-gray-400 text-sm">{timestamp}</span>
        </div>
        <div className="flex flex-row">
          <p className="text-white">{children}</p>
        </div>
      </div>
    </div>
  );
}

export function ClydeMessage({
  timestamp,
  children,
}: {
  timestamp: string;
  children: React.ReactNode;
}) {
  return (
    <DiscordMessage
      username="Clyde"
      avatar="https://discord.com/assets/6024f311af925206143919b880e34a30.png"
      timestamp={timestamp}
      is_ai
    >
      {children}
    </DiscordMessage>
  );
}

export function DiscordChat({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full p-8 items-stretch">
      <div className="flex flex-col w-full rounded-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
}
