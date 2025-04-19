import React from 'react';

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
      <div className="w-full max-w-md space-y-10 text-center">
        {/* Step 1: Greeting */}
        <div className="space-y-2">
          <h1 className="text-5xl font-bold">
            Thanks for installing Don't Show!
          </h1>
        </div>

        {/* Step 2: Explanation */}
        <div className="space-y-3">
          <p className="text-base opacity-80">
            Don't Show is a browser extension that allows you to hide words or patterns on websites based on filters you define.
          </p>
        </div>

        {/* Step 3: Call to action */}
        <div className="space-y-4">
          <a
            href="word-filters.html"
            className="btn btn-primary w-full"
          >
            Configure Filters
          </a>
          <p className="text-sm opacity-60">
            You can update them anytime from the extension menu.
          </p>
        </div>
      </div>
    </div>
  );
}
