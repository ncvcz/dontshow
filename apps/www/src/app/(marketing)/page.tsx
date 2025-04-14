import { SiChromewebstore, SiFirefoxbrowser } from "@icons-pack/react-simple-icons";
import { Filter, Globe, Hash, Zap } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="bg-primary h-full">
      <div className="container mx-auto flex h-auto flex-col items-center justify-center px-4 py-12 lg:h-screen lg:flex-row lg:space-x-28 lg:py-0">
        <div className="w-full space-y-4 text-center lg:w-1/2 lg:text-left">
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-7xl">
            Hide what you don't want to show
          </h1>
          <p className="text-lg font-semibold sm:text-xl">
            Add custom filters — names, emails, anything — and it'll never appear on screen again.
            Perfect for screen sharing, recording, or just browsing in peace.
          </p>

          <div className="mx-auto flex w-full flex-col gap-2 pt-4 sm:w-1/2 sm:flex-row lg:mx-0">
            <button className="btn w-full">
              <SiChromewebstore />
              Install for Chrome
            </button>
            <button className="btn w-full">
              <SiFirefoxbrowser />
              Install for Firefox
            </button>
          </div>
        </div>

        <div className="mt-12 w-full lg:mt-0 lg:w-1/3">
          <div className="flex flex-col gap-4">
            <div className="card bg-base-100 border-base-200 border shadow-md">
              <div className="card-body p-3">
                <h3 className="card-title text-primary mb-2">Without Don't Show</h3>
                <div className="bg-base-200 rounded p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <div className="bg-primary flex h-6 w-6 items-center justify-center rounded-full text-xs">
                      JD
                    </div>
                    <span className="text-lg">John Doe</span>
                  </div>
                  <p className="pl-8">john.doe@example.com</p>
                  <p className="pl-8">123 Main St, Apt 4B</p>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 border-base-200 border shadow-md">
              <div className="card-body p-3">
                <h3 className="card-title text-secondary mb-2">With Don't Show</h3>
                <div className="bg-base-200 rounded p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <div className="bg-secondary flex h-6 w-6 items-center justify-center rounded-full text-xs">
                      JD
                    </div>
                    <span className="font-medium">**** ***</span>
                  </div>
                  <p className="pl-8">*******************</p>
                  <p className="pl-8">********* **********</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl">How it works</h2>
        <p className="mb-12 text-lg sm:text-xl">
          It's easy to use. Just install the extension and add the filters you want to hide.
        </p>

        <div className="mx-auto mb-20 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="card bg-base-100 border-base-200 border shadow-lg">
            <div className="card-body items-center text-center">
              <div className="bg-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="card-title text-xl">Install the extension</h3>
              <p>
                Download and install the browser extension from the Chrome Web Store or Firefox
                Add-ons.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 border-base-200 border shadow-lg">
            <div className="card-body items-center text-center">
              <div className="bg-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="card-title text-xl">Create your filters</h3>
              <p>Add names, emails, or any text that you want to hide from your screen.</p>
            </div>
          </div>

          <div className="card bg-base-100 border-base-200 border shadow-lg md:col-span-2 lg:col-span-1">
            <div className="card-body items-center text-center">
              <div className="bg-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="card-title text-xl">Browse with privacy</h3>
              <p>
                Your sensitive information will be automatically hidden while browsing or sharing
                your screen.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 text-center lg:py-16">
        <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl">Features</h2>
        <p className="mb-12 text-lg sm:text-xl">
          Powerful tools that give you complete control over what appears on your screen.
        </p>

        <div className="mx-auto mb-20 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          <div className="card bg-base-100 border-base-200 border shadow-lg">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <Filter className="text-primary h-6 w-6" />
                <h3 className="card-title text-xl">Custom text filters</h3>
              </div>
              <p className="text-left">You define what should be hidden</p>
            </div>
          </div>

          <div className="card bg-base-100 border-base-200 border shadow-lg">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <Hash className="text-primary h-6 w-6" />
                <h3 className="card-title text-xl">Regex support</h3>
              </div>
              <p className="text-left">Advanced pattern matching for power users</p>
            </div>
          </div>

          <div className="card bg-base-100 border-base-200 border shadow-lg">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <Globe className="text-primary h-6 w-6" />
                <h3 className="card-title text-xl">Per-website control</h3>
              </div>
              <p className="text-left">Different filters for different domains</p>
            </div>
          </div>

          <div className="card bg-base-100 border-base-200 border shadow-lg">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <Zap className="text-primary h-6 w-6" />
                <h3 className="card-title text-xl">Fast and offline</h3>
              </div>
              <p className="text-left">No data ever leaves your browser</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
        <div>
          <p>Copyright © {new Date().getFullYear()} - All rights reserved by Blurri</p>
        </div>
        <div className="grid grid-flow-col gap-4">
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
        <div className="grid grid-flow-col gap-4">
          <Link href="/privacy" className="link link-hover">
            Privacy Policy
          </Link>
          <Link href="/terms" className="link link-hover">
            Terms of Service
          </Link>
        </div>
      </footer>
    </main>
  );
}
