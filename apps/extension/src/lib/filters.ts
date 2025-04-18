import { storageType } from "./storage";
import { escapeRegex } from "./utils";
import { matchWildcard } from "./wildcard";

export type FilterAction = "blur" | "remove" | "stars" | "redacted";

export interface Filter {
  pattern: string;
  domain: string;
  selector?: string;
  action: FilterAction;
  customText?: string;
}

// Cache compiled regex patterns for better performance
const regexCache = new Map<string, RegExp>();

const getRegex = (pattern: string): RegExp => {
  let regex = regexCache.get(pattern);
  const isRegex = pattern.startsWith("/") && pattern.endsWith("/");

  if (!regex) {
    regex = new RegExp(
      isRegex ? pattern.slice(1, -1) : escapeRegex(pattern),
      "gi"
    );
  }
  return regex;
};

export const getFilters = async (): Promise<Filter[]> => {
  return (await storage.getItem<Filter[]>(`${storageType}:filters`)) ?? [];
};

const shouldProcessNode = (node: Node): boolean => {
  if (!node.nodeValue?.trim()) return false;
  if (node.parentElement?.tagName === "SCRIPT") return false;
  return true;
};

const applyTextReplacement = (
  text: string,
  regex: RegExp,
  action: "stars" | "redacted",
  customText?: string
): string => {
  regex.lastIndex = 0;
  return action === "stars"
    ? text.replace(regex, m => "*".repeat(m.length))
    : text.replace(regex, customText || "[REDACTED]");
};

const applyFilterToElement = (element: Element, filter: Filter): void => {
  const regex = getRegex(filter.pattern);

  switch (filter.action) {
    case "blur":
      (element as HTMLElement).style.filter = "blur(5px)";
      break;
    case "remove":
      element.remove();
      break;
    case "stars":
    case "redacted":
      applyTextNodeFilters(element, regex, filter.action, filter.customText);
      break;
  }
};

const applyTextNodeFilters = (
  element: Element,
  regex: RegExp,
  action: "stars" | "redacted",
  customText?: string
): void => {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  let textNode: Node | null;

  while ((textNode = walker.nextNode())) {
    const text = textNode.textContent ?? "";
    regex.lastIndex = 0;

    if (regex.test(text)) {
      textNode.textContent = applyTextReplacement(text, regex, action, customText);
    }
  }
};

export const applyFiltersToDOM = (filters: Filter[]): void => {
  if (!filters.length || !document.body) return;

  const applicableFilters = filters.filter(filter =>
    matchWildcard(filter.domain, location.hostname)
  );

  if (!applicableFilters.length) return;

  // Process selector-based filters first
  applicableFilters.forEach(filter => {
    if (filter.selector) {
      document.querySelectorAll(filter.selector).forEach(el =>
        applyFilterToElement(el, filter)
      );
    }
  });

  // Process text nodes for non-selector filters
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    { acceptNode: node => shouldProcessNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP }
  );

  const processNextBatch = (): void => {
    const startTime = performance.now();
    const MAX_PROCESSING_TIME = 10; // ms
    let node: Node | null;

    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent) continue;

      const originalText = node.textContent ?? "";
      if (!originalText.trim()) continue;

      for (const filter of applicableFilters) {
        if (filter.selector) continue;

        const regex = getRegex(filter.pattern);
        regex.lastIndex = 0;

        if (regex.test(originalText)) {
          switch (filter.action) {
            case "blur":
              (parent as HTMLElement).style.filter = "blur(5px)";
              break;
            case "remove":
              parent.remove();
              break;
            case "stars":
            case "redacted":
              node.textContent = applyTextReplacement(
                originalText,
                regex,
                filter.action,
                filter.customText
              );
              break;
          }
          break;
        }
      }

      if (performance.now() - startTime > MAX_PROCESSING_TIME) {
        setTimeout(processNextBatch, 0);
        return;
      }
    }
  };

  processNextBatch();
};