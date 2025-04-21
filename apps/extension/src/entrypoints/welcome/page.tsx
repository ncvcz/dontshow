import { AlertTriangle } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="bg-base-100 flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-10 text-center">
        {/* Step 1: Greeting */}
        <div className="space-y-2">
          <h1 className="text-5xl font-bold">Thanks for installing Don't Show!</h1>
        </div>

        {/* Alpha Warning Alert */}
        <div role="alert" className="alert alert-warning shadow-lg">
          <AlertTriangle className="h-6 w-6 shrink-0 stroke-current" />
          <span>
            Warning: This is an alpha version. You might encounter bugs or incomplete features.
          </span>
        </div>

        {/* Step 2: Explanation */}
        <div className="space-y-3">
          <p className="text-base opacity-80">
            Don't Show is a browser extension that allows you to hide words or patterns on websites
            based on filters you define.
          </p>
        </div>

        {/* Step 3: Call to action */}
        <div className="space-y-4">
          <a href="word-filters.html" className="btn btn-primary w-full">
            Configure Filters
          </a>
          <p className="text-sm opacity-60">You can update them anytime from the extension menu.</p>
        </div>
      </div>
    </div>
  );
}
