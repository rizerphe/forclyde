import Link from "next/link";
import Image from "next/image";
import AccountButton from "./NavBarAccountButton";

export default function NavBar() {
  return (
    <div className="w-full flex flex-row justify-between items-center p-4">
      <Link
        href="/"
        className="flex flex-row items-center justify-center gap-2"
      >
        <Image src="/icon.png" alt="logo" width={50} height={50} />
        <span className="text-2xl font-bold">For Clyde</span>
      </Link>
      <AccountButton />
    </div>
  );
}
