import { storageType } from "./storage";
import { matchWildcard } from "./wildcard";

export type Filter = {
  pattern: string;
  domain: string;
  selector?: string;
  action: "blur" | "remove" | "stars" | "redacted";
  customText?: string;
};

export const getFilters = async (): Promise<Filter[]> => {
  return (await storage.getItem<Filter[]>(`${storageType}:filters`)) ?? [];
};

// Cache compiled regex patterns for better performance
const regexCache = new Map<string, RegExp>();

const getRegex = (pattern: string): RegExp => {
  if (!regexCache.has(pattern)) {
    regexCache.set(pattern, new RegExp(pattern, "gi"));
  }
  return regexCache.get(pattern)!;
};

const applyTextReplacement = (text: string, pattern: string, action: "stars" | "redacted", customText?: string): string => {
  const regex = getRegex(pattern);
  return action === "stars" 
    ? text.replaceAll(regex, m => "*".repeat(m.length))
    : text.replaceAll(regex, customText || "[REDACTED]");
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
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      let textNode: Node | null;
      
      while ((textNode = walker.nextNode())) {
        const text = textNode.textContent ?? "";
        if (regex.test(text)) {
          regex.lastIndex = 0; // Reset lastIndex
          textNode.textContent = applyTextReplacement(text, filter.pattern, filter.action, filter.customText);
        }
      }
      break;
  }
};

export const applyFiltersToDOM = (filters: Filter[]): void => {
  if (!filters.length || !document.body) return;

  const applicableFilters = filters.filter(filter => 
    matchWildcard(filter.domain, location.hostname)
  );

  if (!applicableFilters.length) return;

  // Apply selector-based filters
  for (const filter of applicableFilters) {
    if (filter.selector) {
      document.querySelectorAll(filter.selector).forEach(el => 
        applyFilterToElement(el, filter)
      );
    }
  }

  // Apply text-based filters using TreeWalker for better performance
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: node => {
        if (!node.nodeValue?.trim() || node.parentElement?.tagName === "SCRIPT") {
          return NodeFilter.FILTER_SKIP;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const processNextBatch = (): void => {
    const startTime = performance.now();
    const MAX_PROCESSING_TIME = 10; // ms
    let node: Node | null;

    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent) continue;

      const text = node.textContent ?? "";
      if (!text.trim()) continue;

      // Check text-only filters (without selectors)
      for (const filter of applicableFilters) {
        if (filter.selector) continue;

        const regex = getRegex(filter.pattern);
        regex.lastIndex = 0;

        if (regex.test(text)) {
          switch (filter.action) {
            case "blur":
              (parent as HTMLElement).style.filter = "blur(5px)";
              break;
            case "remove":
              parent.remove();
              break;
            case "stars":
            case "redacted":
              node.textContent = applyTextReplacement(text, filter.pattern, filter.action, filter.customText);
              break;
          }
          break;
        }
      }

      // Process in batches to avoid blocking the main thread
      if (performance.now() - startTime > MAX_PROCESSING_TIME) {
        setTimeout(processNextBatch, 0);
        return;
      }
    }
  };

  processNextBatch();
};
