import { useStorage } from "@/hooks/storage";
import { getSelector } from "@/lib/selector";
import { Element as ExposingElement } from "@/types";
import React, { useEffect, useState } from "react";
import { ControlButtons } from "./_components/control-buttons";
import { ElementOverlay } from "./_components/element-overlay";
import { ElementsTable } from "./_components/elements-table";
import { HighlightOverlay } from "./_components/highlight-overlay";

interface Props {
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function App({ onClose }: Props) {
  const [elements, setElements] = useStorage<ExposingElement[]>("local:elements", []);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [isHoverUI, setIsHoverUI] = useState(false);
  const [elementsRemoved, setElementsRemoved] = useState<ExposingElement[]>([]);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);

  const resetElements = () => {
    setElements([]);
    setElementsRemoved([]);
    setHoveredElement(null);
    setHighlightedElement(null);
  };

  const handleElementHover = (element: HTMLElement | null) => {
    setHighlightedElement(element);
  };

  const handleElementRemove = (index: number, element: ExposingElement) => {
    resetElements();
    setElements(elements.filter((_, i) => i !== index));
    setElementsRemoved([...elementsRemoved, element]);
  };

  const handleDeleteAll = () => {
    resetElements();
    setElementsRemoved([...elementsRemoved, ...elements]);
    setElements([]);
  };

  const handleClose: React.MouseEventHandler<HTMLButtonElement> = event => {
    setIsHoverUI(true);
    setHoveredElement(null);
    onClose?.(event);

    if (elementsRemoved.length > 0) window.location.reload();
  };

  useEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      if (isHoverUI) return;
      const target = event.target as HTMLElement;

      if (target.textContent?.trim() === "") return;
      target.style.outline = "2px solid blue";
      target.style.cursor = "pointer";
    };

    const handleMouseOut = (event: MouseEvent) => {
      if (isHoverUI) return;

      const target = event.target as HTMLElement;
      target.style.outline = "";
    };

    const handleClick = async (event: MouseEvent) => {
      if (isHoverUI) return;

      event.preventDefault();
      event.stopPropagation();

      const target = event.target as HTMLElement;
      const selector = getSelector(target);

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
        className="fixed bottom-0 left-0 z-[99999] p-4"
        onMouseOver={() => {
          setHoveredElement(null);
          setIsHoverUI(true);
        }}
        onMouseOut={() => setIsHoverUI(false)}
      >
        <ElementsTable
          elements={elements}
          onElementHover={handleElementHover}
          onElementRemove={handleElementRemove}
        />
        <ControlButtons elements={elements} onClose={handleClose} onDeleteAll={handleDeleteAll} />
      </div>

      {elements.map((element, index) => (
        <ElementOverlay
          key={index}
          element={element}
          index={index}
          hoveredElement={hoveredElement}
          onElementHover={setHoveredElement}
          onElementRemove={(idx, elem) => {
            const updatedElements = elements.filter((_, i) => i !== idx);
            setElements(updatedElements);
            setElementsRemoved([...elementsRemoved, elem]);
          }}
        />
      ))}

      {highlightedElement && <HighlightOverlay element={highlightedElement} />}
    </>
  );
}
