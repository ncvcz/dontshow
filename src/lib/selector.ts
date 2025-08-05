import { getCssSelector } from "css-selector-generator";

export const getSelector = (element: HTMLElement): string => {
  try {
    const selector = getCssSelector(element, {
      blacklist: [
        /^style$/,
        /^data-.*-hover$/,
        /^data-.*-focus$/,
        /^data-.*-active$/,
        /^aria-expanded$/,
        /^aria-selected$/,
        /^tabindex$/,
      ],
      includeTag: true,
      whitelist: [
        "id",
        "class",
        "data-testid",
        "data-cy",
        "data-qa",
        "name",
        "type",
        "role",
        "aria-label",
        "aria-labelledby",
        "href",
        "src",
      ],
      combineBetweenSelectors: true,
      combineWithinSelector: true,
      maxCombinations: 50,
      maxCandidates: 1000,
    });

    const matchingElements = document.querySelectorAll(selector);

    if (matchingElements.length === 1) {
      return selector;
    }

    const fallbackSelector = getCssSelector(element, {
      blacklist: [/^style$/, /^data-.*-hover$/, /^data-.*-focus$/, /^data-.*-active$/],
      includeTag: true,
      combineBetweenSelectors: true,
      combineWithinSelector: true,
      maxCombinations: 100,
      maxCandidates: 2000,
      selectors: ["id", "class", "tag", "attribute", "nthchild"],
    });

    const fallbackMatches = document.querySelectorAll(fallbackSelector);

    if (fallbackMatches.length === 1) {
      return fallbackSelector;
    }

    return generatePositionalSelector(element);
  } catch (error) {
    console.warn("Errore nella generazione del selettore CSS:", error);
    return generatePositionalSelector(element);
  }
};

const generatePositionalSelector = (element: HTMLElement): string => {
  const path: string[] = [];
  let current: Element | null = element;

  while (current && current.nodeType === Node.ELEMENT_NODE) {
    let selector = current.tagName.toLowerCase();

    if (current.id) {
      selector += `#${CSS.escape(current.id)}`;
      path.unshift(selector);
      break;
    }

    if (current.className && typeof current.className === "string") {
      const classes = current.className.trim().split(/\s+/);
      if (classes.length > 0 && classes[0]) {
        selector += "." + classes.map(cls => CSS.escape(cls)).join(".");
      }
    }

    const parent = current.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(
        child => child.tagName === current!.tagName
      );

      if (siblings.length > 1) {
        const index = siblings.indexOf(current as Element) + 1;
        selector += `:nth-of-type(${index})`;
      }
    }

    path.unshift(selector);
    current = current.parentElement;

    if (path.length >= 10) break;
  }

  return path.join(" > ");
};
