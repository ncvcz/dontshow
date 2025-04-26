import { SiChromewebstore, SiFirefoxbrowser } from "@icons-pack/react-simple-icons";
import { Cog, Filter, Globe, Hash, ShieldCheck, UploadCloud, Zap } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="bg-base-100 text-base-content min-h-screen">
      <div>
        <p className="bg-yellow-300 p-2 text-center font-semibold text-black">
          Don't Show is currently in Beta. Join our{" "}
          <Link href={"https://discord.gg/FYSXzthyd4"} className="underline">
            Discord
          </Link>{" "}
          to help us test and improve.
        </p>
      </div>
      {/* Hero Section */}
      <section className="from-primary to-primary-focus text-primary-content bg-gradient-to-b py-16 md:py-20 lg:py-32">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 text-center sm:px-6 lg:flex-row lg:space-x-12 lg:px-8 lg:text-left">
          <div className="w-full space-y-6 lg:w-1/2 lg:max-w-2xl">
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Don't Want to Show It? Hide It. Instantly.
            </h1>
            <p className="text-lg font-medium opacity-90 sm:text-xl lg:text-2xl">
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
            <p className="pt-2 text-sm opacity-80">Free and Easy Installation</p>
          </div>

          {/* Before/After Demo - Reverted to personal data example */}
          <div className="mt-12 w-full max-w-sm lg:mt-0 lg:w-1/3 lg:max-w-md">
            <div className="flex flex-col gap-4">
              <div className="card bg-base-100 border-base-300 text-base-content transform border shadow-xl transition duration-300 hover:scale-105">
                <div className="card-body p-5">
                  <h3 className="card-title mb-2 text-lg font-semibold">
                    Sensitive Info Exposed (Before)
                  </h3>
                  {/* Reverted Example Content to Personal Data */}
                  <div className="bg-base-200 space-y-1 rounded p-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="bg-error text-error-content flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
                        JD
                      </div>
                      <span className="font-medium">Jane Doe</span>
                    </div>
                    <p className="pl-8">jane.doe@email-provider.com</p>
                    <p className="pl-8">123 Secret Street, Anytown</p>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 border-base-300 text-base-content transform border shadow-xl transition duration-300 hover:scale-105">
                <div className="card-body p-5">
                  <h3 className="card-title text-secondary mb-2 text-lg font-semibold">
                    Sensitive Info Hidden (With Don't Show)
                  </h3>
                  {/* Updated Masked Content for Personal Data */}
                  <div className="bg-base-200 space-y-1 rounded p-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="bg-secondary text-secondary-content flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
                        JD
                      </div>
                      <span className="text-secondary font-bold">********</span>
                    </div>
                    <p className="text-secondary pl-8 font-bold">***************************</p>
                    <p className="text-secondary pl-8 font-bold">*****************************</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section - Adjusted padding */}
      <section className="bg-base-200 py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Simple Steps to Privacy
          </h2>
          <p className="text-base-content/80 mx-auto mb-12 max-w-3xl text-lg sm:text-xl">
            Getting started is quick and intuitive. Install the extension, define what you want to
            hide, and browse securely.
          </p>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <div className="card bg-base-100 border-base-300 border shadow-lg transition-shadow hover:shadow-xl">
              <div className="card-body items-center p-6 text-center md:p-8">
                <div className="bg-primary ring-primary/30 mb-4 flex h-16 w-16 items-center justify-center rounded-full ring-4">
                  <UploadCloud className="text-primary-content h-8 w-8" />
                </div>
                <h3 className="card-title text-xl font-semibold">1. Install the Extension</h3>
                <p className="text-base-content/80">
                  Get Don't Show from the Chrome Web Store or Firefox Add-ons in seconds.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 border-base-300 border shadow-lg transition-shadow hover:shadow-xl">
              <div className="card-body items-center p-6 text-center md:p-8">
                <div className="bg-primary ring-primary/30 mb-4 flex h-16 w-16 items-center justify-center rounded-full ring-4">
                  <Cog className="text-primary-content h-8 w-8" />
                </div>
                <h3 className="card-title text-xl font-semibold">2. Create Your Filters</h3>
                <p className="text-base-content/80">
                  Easily add keywords, names, emails, or use regular expressions for complex
                  patterns.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 border-base-300 border shadow-lg transition-shadow hover:shadow-xl md:col-span-1">
              <div className="card-body items-center p-6 text-center md:p-8">
                <div className="bg-primary ring-primary/30 mb-4 flex h-16 w-16 items-center justify-center rounded-full ring-4">
                  <ShieldCheck className="text-primary-content h-8 w-8" />
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
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">Powerful Features</h2>
          <p className="text-base-content/80 mx-auto mb-12 max-w-3xl text-lg sm:text-xl">
            Fine-grained control and robust tools designed for maximum privacy and ease of use.
          </p>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="card bg-base-200 border-base-300 border shadow-md transition-shadow hover:shadow-lg">
              <div className="card-body p-6">
                <div className="mb-2 flex items-center gap-3">
                  <Filter className="text-primary h-6 w-6 flex-shrink-0" />
                  <h3 className="card-title text-xl font-semibold">Custom Text Filters</h3>
                </div>
                <p className="text-base-content/80 text-left">
                  Hide any content matching your specific keywords or phrases. You decide exactly
                  what disappears.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 border-base-300 border shadow-md transition-shadow hover:shadow-lg">
              <div className="card-body p-6">
                <div className="mb-2 flex items-center gap-3">
                  <Hash className="text-primary h-6 w-6 flex-shrink-0" />
                  <h3 className="card-title text-xl font-semibold">Regex Support</h3>
                </div>
                <p className="text-base-content/80 text-left">
                  Utilize the power of regular expressions for advanced pattern matching—perfect for
                  dynamic data or complex rules.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 border-base-300 border shadow-md transition-shadow hover:shadow-lg">
              <div className="card-body p-6">
                <div className="mb-2 flex items-center gap-3">
                  <Globe className="text-primary h-6 w-6 flex-shrink-0" />
                  <h3 className="card-title text-xl font-semibold">Per-Website Control</h3>
                </div>
                <p className="text-base-content/80 text-left">
                  Apply different sets of filters to different websites. Tailor your privacy rules
                  for each domain.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 border-base-300 border shadow-md transition-shadow hover:shadow-lg">
              <div className="card-body p-6">
                <div className="mb-2 flex items-center gap-3">
                  <Zap className="text-primary h-6 w-6 flex-shrink-0" />
                  <h3 className="card-title text-xl font-semibold">Fast & Offline</h3>
                </div>
                <p className="text-base-content/80 text-left">
                  All processing happens locally in your browser. Lightning-fast performance with
                  zero data sent externally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-neutral text-neutral-content flex flex-col p-6 md:flex-row md:items-start md:justify-between md:p-10">
        <aside className="items-center text-center md:items-start md:text-left">
          <p className="text-lg font-bold">Don't Show</p>
          <p>Copyright {new Date().getFullYear()} - All rights reserved</p>
          <p>Built by Produsse</p>
        </aside>
        <div className="flex flex-col items-center gap-4 md:items-end">
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <Link
              href="https://chromewebstore.google.com/detail/dont-show/gdebfgieajfdgdcdmpnbakflnkoaankk"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm w-full sm:w-auto"
            >
              <SiChromewebstore className="h-5 w-5" />
              Chrome Web Store
            </Link>
            <Link
              href="https://addons.mozilla.org/it/firefox/addon/dontshow/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm w-full sm:w-auto"
            >
              <SiFirefoxbrowser className="h-5 w-5" />
              Firefox Add-ons
            </Link>
          </div>
          <nav className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <Link href="/privacy" className="link link-hover">
              Privacy Policy
            </Link>
            <Link href="/terms" className="link link-hover">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
