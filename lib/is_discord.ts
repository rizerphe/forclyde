import { NextRequest, userAgent } from "next/server";
import dns from "dns";

const getIp = (request: NextRequest) => {
  const forwards = request.headers.get("x-forwarded-for") || "";
  const split_forwards = forwards.split(",");
  const clientIp = split_forwards[split_forwards.length - 1] || "";
  if (!clientIp) {
    return request.ip;
  }
  if (clientIp.startsWith("::ffff:")) {
    return clientIp.slice(7);
  }
  return clientIp;
};

const getHost = async (request: NextRequest) => {
  const clientIp = getIp(request);
  if (!clientIp) {
    return "";
  }
  try {
    return (await dns.promises.reverse(clientIp))[0];
  } catch (e) {
    return "";
  }
};

const originated_from_discord = async (request: NextRequest) => {
  const host = await getHost(request);
  const discord_host_regexp =
    /crawl-(\d+)-(\d+)-(\d+)-(\d+)\.ptr\.discord\.com/;
  return discord_host_regexp.test(host);
};

const discord_user_agent = (request: NextRequest) => {
  const user_agent = userAgent(request);
  if (!user_agent.isBot) {
    return false;
  }
  if (
    user_agent.ua !==
    "Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)"
  ) {
    return false;
  }
  return true;
};

export default async function is_discord(request: NextRequest) {
  return (
    (await originated_from_discord(request)) && discord_user_agent(request)
  );
}
