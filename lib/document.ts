import Mustache from "mustache";
import { z } from "zod";

const DocumentSchema = z.object({
  author: z.string(),
  name: z.string().default("Untitled"),
  content: z.string(),
  restricted: z.boolean(),
  properties: z.record(z.string()).default({}),
});

export type Document = z.infer<typeof DocumentSchema>;

const cleanStyle = (
  style: string,
  fallback: "full" | "long" | "medium" | "short"
): "full" | "long" | "medium" | "short" => {
  switch (style) {
    case "full":
      return "full";
    case "long":
      return "long";
    case "medium":
      return "medium";
    case "short":
      return "short";
    default:
      return fallback;
  }
};

const renderDocument = async (document: Document): Promise<string> => {
  const documentTimezone = document?.properties?.timezone || "UTC";
  const documentDateLocale = document?.properties?.locale || "en-US";
  const dateStyle = document?.properties?.dateStyle || "full";
  const timeStyle = document?.properties?.timeStyle || "medium";

  const catchingLocaleError = (fn: () => string) => {
    try {
      return fn();
    } catch (e) {
      return "could not retrieve - invalid locale or timezone";
    }
  };

  Mustache.escape = (text: string) => text;
  return Mustache.render(document.content, {
    datetime: catchingLocaleError(() =>
      new Date().toLocaleString(documentDateLocale, {
        timeZone: documentTimezone,
        dateStyle: cleanStyle(dateStyle, "full"),
        timeStyle: cleanStyle(timeStyle, "medium"),
      })
    ),
    date: catchingLocaleError(() =>
      new Date().toLocaleDateString(documentDateLocale, {
        timeZone: documentTimezone,
        dateStyle: cleanStyle(dateStyle, "full"),
      })
    ),
    time: catchingLocaleError(() =>
      new Date().toLocaleTimeString(documentDateLocale, {
        timeZone: documentTimezone,
        timeStyle: cleanStyle(timeStyle, "medium"),
      })
    ),
  });
};

export { DocumentSchema, renderDocument };
