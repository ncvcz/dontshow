import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useStorage } from "@/hooks/storage";
import { Element as ExposingElement } from "@/types";
import { getCssSelector } from "css-selector-generator";
import { XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props {
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function App({ onClose }: Props) {
  const [elements, setElements] = useStorage<ExposingElement[]>("local:elements", []);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [isHoverUI, setIsHoverUI] = useState(false);

  const handleClose: React.MouseEventHandler<HTMLButtonElement> = event => {
    onClose?.(event);
  };

  useEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.textContent?.trim() === "") return;
      target.style.outline = "2px solid blue";
      target.style.cursor = "pointer";
      target.setAttribute("data-ds-hovered", "true");
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      target.style.outline = "";
      target.removeAttribute("data-ds-hovered");
    };

    const handleClick = async (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (isHoverUI) return;
      const target = event.target as Element;
      const selector = getCssSelector(target);

      const newElement: ExposingElement = {
        selector,
        website: new URL(document.location.href).hostname,
        action: "censor",
      };

      const updatedElements = [...elements, newElement];

      setElements(updatedElements);
      setHoveredElement(null);
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("click", handleClick);
    };
  }, [elements]);

  return (
    <>
      <div
        className="absolute bottom-0 left-0 z-[99999] p-4"
        onMouseOver={() => {
          setHoveredElement(null);
          setIsHoverUI(true);
        }}
        onMouseOut={() => setIsHoverUI(false)}
      >
        <Button variant="outline" onClick={handleClose}>
          <XIcon className="h-4 w-4" />
        </Button>
      </div>

      {elements.map((element, index) => {
        const popover = document.querySelector(element.selector) as HTMLElement;

        if (!popover) {
          console.warn(`Element with selector "${element.selector}" not found.`);
          return null;
        }
        if (popover.textContent?.trim() === "") return null;

        return (
          <div
            key={index}
            className="absolute cursor-pointer border-2 border-red-500"
            onMouseOver={() => {
              setHoveredElement(popover);
            }}
            onMouseOut={() => {
              setHoveredElement(null);
            }}
            style={{
              top: popover.getBoundingClientRect().top + window.scrollY,
              left: popover.getBoundingClientRect().left + window.scrollX,
              width: popover.getBoundingClientRect().width,
              height: popover.getBoundingClientRect().height,
            }}
          >
            {hoveredElement === popover && (
              <button
                className="h-full w-full bg-red-400 text-center"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();

                  const updatedElements = elements.filter((_, i) => i !== index);
                  setElements(updatedElements);
                }}
              >
                <span>Remove</span>
              </button>
            )}
          </div>
        );
      })}
    </>
  );
}
