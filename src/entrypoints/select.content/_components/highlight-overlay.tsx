import React from "react";

interface HighlightOverlayProps {
  element: HTMLElement;
}

export function HighlightOverlay({ element }: HighlightOverlayProps) {
  return (
    <div
      className="absolute border-2 border-green-500"
      style={{
        top: element.getBoundingClientRect().top + window.scrollY,
        left: element.getBoundingClientRect().left + window.scrollX,
        width: element.getBoundingClientRect().width,
        height: element.getBoundingClientRect().height,
      }}
    />
  );
}
