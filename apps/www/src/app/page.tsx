import { SiChromewebstore, SiFirefoxbrowser } from "@icons-pack/react-simple-icons";
import { Hash, Globe, Zap, Filter } from "lucide-react";

export default async function Home() {
  return (
    <main className="bg-primary h-full">
      <div className="flex space-x-28 items-center justify-center h-screen container mx-auto">
        <div className="w-1/2 space-y-4">
          <h1 className="text-7xl font-extrabold">
            Choose what they see. <br />
            Hide the rest.
          </h1>
          <p className="text-xl font-semibold">
            Add custom filters — names, emails, anything — and it'll never appear on screen again.
            Perfect for screen sharing, recording, or just browsing in peace.
          </p>

          <div className="flex gap-2 w-1/2 pt-4">
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

        <div className="w-1/3">
          <div className="flex flex-col mt-8 gap-4">
            <div className="card shadow-md border bg-base-100 border-base-200">
              <div className="card-body p-3">
                <h3 className="card-title text-primary mb-2">Without Don't Show</h3>
                <div className="bg-base-200 rounded p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs">JD</div>
                    <span className="text-lg">John Doe</span>
                  </div>
                  <p className="pl-8">john.doe@example.com</p>
                  <p className="pl-8">123 Main St, Apt 4B</p>
                </div>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-md border border-base-200">
              <div className="card-body p-3">
                <h3 className="card-title text-secondary mb-2">With Don't Show</h3>
                <div className="bg-base-200 rounded p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs">JD</div>
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

      <div className="container mx-auto text-center">
        <h2 className="text-6xl font-bold">How it works</h2>
        <p className="text-xl mb-12">It's easy to use. Just install the extension and add the filters you want to hide.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          <div className="card bg-base-100 shadow-lg border border-base-200">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="card-title text-xl">Install the extension</h3>
              <p>Download and install the browser extension from the Chrome Web Store or Firefox Add-ons.</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-lg border border-base-200">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="card-title text-xl">Create your filters</h3>
              <p>Add names, emails, or any text that you want to hide from your screen.</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-lg border border-base-200">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="card-title text-xl">Browse with privacy</h3>
              <p>Your sensitive information will be automatically hidden while browsing or sharing your screen.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto text-center py-16">
        <h2 className="text-6xl font-bold">Features</h2>
        <p className="text-xl mb-12">Powerful tools that give you complete control over what appears on your screen.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          <div className="card bg-base-100 shadow-lg border border-base-200">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <Filter className="w-6 h-6 text-primary" />
                <h3 className="card-title text-xl">Custom text filters</h3>
              </div>
              <p className="text-left">You define what should be hidden</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-lg border border-base-200">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <Hash className="w-6 h-6 text-primary" />
                <h3 className="card-title text-xl">Regex support</h3>
              </div>
              <p className="text-left">Advanced pattern matching for power users</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-lg border border-base-200">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-primary" />
                <h3 className="card-title text-xl">Per-website control</h3>
              </div>
              <p className="text-left">Different filters for different domains</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-lg border border-base-200">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-primary" />
                <h3 className="card-title text-xl">Fast and offline</h3>
              </div>
              <p className="text-left">No data ever leaves your browser</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
