import { AlertTriangleIcon } from "lucide-react";

import { useStorage } from "@/hooks/storage";
import { defaultSettings, Settings } from "@/lib/settings";
import { useState } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
  isSensitive?: boolean;
}

export default function Layout({ children, isSensitive }: LayoutProps) {
  const [continueBrowsing, setContinueBrowsing] = useState(false);
  const [enabled, _setEnabled] = useStorage<boolean>(
    `${import.meta.env.CHROME ? "sync" : "local"}:enabled`,
    false
  );
  const [settings, _setSettings] = useStorage<Settings>(
    `${import.meta.env.CHROME ? "sync" : "local"}:settings`,
    defaultSettings
  );

  return !enabled || continueBrowsing || !settings.sensitiveAlert || !isSensitive ? (
    <div className="bg-base-100 min-h-screen">
      <Navbar />
      <main className="container mx-auto p-4">{children}</main>
    </div>
  ) : (
    <div className="bg-base-100 flex min-h-screen flex-col items-center justify-center space-y-4">
      <AlertTriangleIcon className="text-warning h-32 w-32" />
      <h1 className="text-5xl font-bold">This page contains sensitive content</h1>
      <p className="max-w-2xl text-center text-lg">
        This page may display sensitive personal information. If you're screen sharing or live
        streaming, consider enabling protection to avoid exposing private data.
      </p>
      <button className="btn btn-error" onClick={() => setContinueBrowsing(true)}>
        Continue Browsing (at your own risk)
      </button>
    </div>
  );
}
