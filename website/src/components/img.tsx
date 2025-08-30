import { useEffect, useState } from "react";

interface Props {
  src: string;
  alt: string;
}

export default function ImagePreview({ src, alt }: Props) {
  const [fullScreen, setFullScreen] = useState(false);

  // Handle escape key to close fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && fullScreen) {
        setFullScreen(false);
      }
    };

    if (fullScreen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when in fullscreen
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [fullScreen]);

  return (
    <>
      <div className="relative h-full w-full">
        <img
          src={src}
          alt={alt}
          className="h-full w-full cursor-zoom-in object-cover transition-transform duration-200 hover:scale-105"
          onClick={() => setFullScreen(true)}
        />
      </div>

      {/* Fullscreen overlay */}
      {fullScreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-md"
          onClick={() => setFullScreen(false)}
        >
          {/* Close button for mobile */}
          <button
            className="absolute top-6 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/20 hover:text-white"
            onClick={() => setFullScreen(false)}
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="relative max-h-full max-w-full">
            <img
              src={src}
              alt={alt}
              className="max-h-full max-w-full cursor-zoom-out object-contain"
              onClick={e => {
                e.stopPropagation();
                setFullScreen(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
