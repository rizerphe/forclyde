import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "For Clyde",
  description:
    "Write notes for discord's Clyde bot that only it can read (almost).",
  openGraph: {
    type: "website",
    title: "For Clyde",
    description:
      "Write notes for discord's Clyde bot that only it can read (almost).",
    url: "https://forclyde.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col w-full h-full min-h-screen justify-start items-center">
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}
