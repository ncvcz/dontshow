import { SiChromewebstore, SiFirefoxbrowser } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="bg-primary text-primary-content py-2">
        <div className="container mx-auto flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icon.png"
              alt="Don't Show"
              className="bg-base-100 rounded-full p-1"
              width={32}
              height={32}
            />
            <h1 className="text-2xl font-bold">Don't Show</h1>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <SiChromewebstore className="h-5 w-5" />
              Chrome Web Store
            </Link>
            <Link
              href="https://addons.mozilla.org"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <SiFirefoxbrowser className="h-5 w-5" />
              Firefox Add-ons
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto max-w-prose">
        <div className="flex flex-col gap-4 py-10">
          <div className="prose dark:prose-invert">{children}</div>
        </div>
      </div>
    </>
  );
}
