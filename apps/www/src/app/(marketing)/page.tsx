import { SiChromewebstore, SiFirefoxbrowser } from "@icons-pack/react-simple-icons";
import { Cog, Filter, Globe, Hash, ShieldCheck, UploadCloud, Zap } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="bg-base-100 text-base-content min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary to-primary-focus text-primary-content py-16 md:py-20 lg:py-32">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center lg:flex-row lg:space-x-12 lg:text-left">
          <div className="w-full space-y-6 lg:w-1/2 lg:max-w-2xl">
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Don't Want to Show It? Hide It. Instantly.
            </h1>
            <p className="text-lg font-medium sm:text-xl lg:text-2xl opacity-90">
              Define custom filters – text, names, emails, even complex patterns with Regex – and
              Don't Show automatically hides matching content on any website. Perfect for privacy
              during screen shares, recordings, or focused work.
            </p>

            <div className="mx-auto flex w-full flex-col gap-3 pt-6 sm:w-auto sm:flex-row lg:mx-0">
              <Link
                href="https://chromewebstore.google.com/detail/dont-show/gdebfgieajfdgdcdmpnbakflnkoaankk"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg w-full sm:w-auto"
              >
                <SiChromewebstore className="h-5 w-5" />
                Install for Chrome
              </Link>
              <Link
                href="https://addons.mozilla.org/it/firefox/addon/dontshow/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent btn-lg w-full sm:w-auto"
              >
                <SiFirefoxbrowser className="h-5 w-5" />
                Install for Firefox
              </Link>
            </div>
            <p className="text-sm opacity-80 pt-2">Free and Easy Installation</p>
          </div>

          {/* Before/After Demo - Reverted to personal data example */}
          <div className="mt-12 w-full max-w-sm lg:mt-0 lg:w-1/3 lg:max-w-md">
            <div className="flex flex-col gap-4">
              <div className="card bg-base-100 border-base-300 text-base-content border shadow-xl transform transition duration-300 hover:scale-105">
                <div className="card-body p-5">
                  <h3 className="card-title text-lg font-semibold mb-2">
                    Sensitive Info Exposed (Before)
                  </h3>
                  {/* Reverted Example Content to Personal Data */}
                  <div className="bg-base-200 rounded p-3 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="bg-error flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-error-content">
                        JD
                      </div>
                      <span className="font-medium">Jane Doe</span>
                    </div>
                    <p className="pl-8">jane.doe@email-provider.com</p>
                    <p className="pl-8">123 Secret Street, Anytown</p>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 border-base-300 text-base-content border shadow-xl transform transition duration-300 hover:scale-105">
                <div className="card-body p-5">
                  <h3 className="card-title text-lg font-semibold text-secondary mb-2">
                    Sensitive Info Hidden (With Don't Show)
                  </h3>
                  {/* Updated Masked Content for Personal Data */}
                  <div className="bg-base-200 rounded p-3 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="bg-secondary flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-secondary-content">
                        JD
                      </div>
                      <span className="font-bold text-secondary">********</span>
                    </div>
                    <p className="pl-8 font-bold text-secondary">***************************</p>
                    <p className="pl-8 font-bold text-secondary">*****************************</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section - Adjusted padding */}
      <section className="bg-base-200 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl mb-4">Simple Steps to Privacy</h2>
          <p className="mb-12 text-lg sm:text-xl text-base-content/80 max-w-3xl mx-auto">
            Getting started is quick and intuitive. Install the extension, define what you want to
            hide, and browse securely.
          </p>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <div className="card bg-base-100 border-base-300 border shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body items-center text-center p-6 md:p-8">
                <div className="bg-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full ring-4 ring-primary/30">
                  <UploadCloud className="h-8 w-8 text-primary-content" />
                </div>
                <h3 className="card-title text-xl font-semibold">1. Install the Extension</h3>
                <p className="text-base-content/80">
                  Get Don't Show from the Chrome Web Store or Firefox Add-ons in seconds.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 border-base-300 border shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body items-center text-center p-6 md:p-8">
                <div className="bg-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full ring-4 ring-primary/30">
                  <Cog className="h-8 w-8 text-primary-content" />
                </div>
                <h3 className="card-title text-xl font-semibold">2. Create Your Filters</h3>
                <p className="text-base-content/80">
                  Easily add keywords, names, emails, or use regular expressions for complex
                  patterns.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 border-base-300 border shadow-lg hover:shadow-xl transition-shadow md:col-span-1">
              <div className="card-body items-center text-center p-6 md:p-8">
                <div className="bg-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full ring-4 ring-primary/30">
                  <ShieldCheck className="h-8 w-8 text-primary-content" />
                </div>
                <h3 className="card-title text-xl font-semibold">3. Browse Confidently</h3>
                <p className="text-base-content/80">
                  Sensitive information is automatically masked, keeping your screen private during
                  calls or recordings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Adjusted padding */}
      <section className="bg-base-100 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl mb-4">Powerful Features</h2>
          <p className="mb-12 text-lg sm:text-xl text-base-content/80 max-w-3xl mx-auto">
            Fine-grained control and robust tools designed for maximum privacy and ease of use.
          </p>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="card bg-base-200 border-base-300 border shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Filter className="text-primary h-6 w-6 flex-shrink-0" />
                  <h3 className="card-title text-xl font-semibold">Custom Text Filters</h3>
                </div>
                <p className="text-left text-base-content/80">
                  Hide any content matching your specific keywords or phrases. You decide exactly
                  what disappears.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 border-base-300 border shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Hash className="text-primary h-6 w-6 flex-shrink-0" />
                  <h3 className="card-title text-xl font-semibold">Regex Support</h3>
                </div>
                <p className="text-left text-base-content/80">
                  Utilize the power of regular expressions for advanced pattern matching—perfect
                  for dynamic data or complex rules.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 border-base-300 border shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="text-primary h-6 w-6 flex-shrink-0" />
                  <h3 className="card-title text-xl font-semibold">Per-Website Control</h3>
                </div>
                <p className="text-left text-base-content/80">
                  Apply different sets of filters to different websites. Tailor your privacy rules
                  for each domain.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 border-base-300 border shadow-md hover:shadow-lg transition-shadow">
              <div className="card-body p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="text-primary h-6 w-6 flex-shrink-0" />
                  <h3 className="card-title text-xl font-semibold">Fast & Offline</h3>
                </div>
                <p className="text-left text-base-content/80">
                  All processing happens locally in your browser. Lightning-fast performance with
                  zero data sent externally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center bg-neutral text-neutral-content p-10">
        <aside>
          <p className="font-bold text-lg">Don't Show</p>
          <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
          <p>Built by Produsse</p> {/* Optional: Add credit */}
        </aside>
        <div className="flex items-center gap-2">
          <Link
            href="https://chromewebstore.google.com/detail/dont-show/gdebfgieajfdgdcdmpnbakflnkoaankk"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm"
          >
            <SiChromewebstore className="h-5 w-5" />
            Chrome Web Store
          </Link>
          <Link
            href="https://addons.mozilla.org/it/firefox/addon/dontshow/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm"
          >
            <SiFirefoxbrowser className="h-5 w-5" />
            Firefox Add-ons
          </Link>
        </div>
        <nav className="grid grid-flow-col gap-4">
          <Link href="/privacy" className="link link-hover">
            Privacy Policy
          </Link>
          <Link href="/terms" className="link link-hover">
            Terms of Service
          </Link>
        </nav>
      </footer>
    </main>
  );
}
