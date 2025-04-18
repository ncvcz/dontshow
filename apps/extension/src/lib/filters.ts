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
  let regex = regexCache.get(pattern);

  if (!regex) {
    regex = new RegExp(pattern, "gi");
    regexCache.set(pattern, regex);
  }

  return regex;
};

const applyTextReplacement = (text: string, regex: RegExp, action: "stars" | "redacted", customText?: string): string => {
  const re = getRegex(regex.source);
  re.lastIndex = 0;

  return action === "stars" 
    ? text.replaceAll(re, m => "*".repeat(m.length))
    : text.replaceAll(re, customText || "[REDACTED]");
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
          textNode.textContent = applyTextReplacement(text, regex, filter.action, filter.customText);
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

  // Apply selector-based filters first
  applicableFilters.forEach(filter => {
    if (filter.selector) {
      document.querySelectorAll(filter.selector).forEach(el => 
        applyFilterToElement(el, filter)
      );
    }
  });

  // Apply text-based filters using TreeWalker
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: node => {
        if (!node.nodeValue?.trim()) return NodeFilter.FILTER_SKIP;
        if (node.parentElement?.tagName === "SCRIPT") return NodeFilter.FILTER_SKIP;
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

      const originalText = node.textContent ?? "";
      
      if (!originalText.trim()) continue;

      for (const filter of applicableFilters) {
        if (filter.selector) continue;

        const regex = getRegex(filter.pattern);
        regex.lastIndex = 0;

        if (regex.exec(originalText)) {
          switch (filter.action) {
            case "blur":
              (parent as HTMLElement).style.filter = "blur(5px)";
              break;
            case "remove":
              parent.remove();
              break;
            case "stars":
            case "redacted":
              node.textContent = applyTextReplacement(originalText, regex, filter.action, filter.customText);
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
