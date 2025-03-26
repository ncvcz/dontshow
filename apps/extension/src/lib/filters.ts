import { Storage } from "@plasmohq/storage";
import { matchWildcard } from "./wildcard";

const storage = new Storage();

export type Filter = {
  pattern: string
  domain: string
  selector?: string
  action: "blur" | "remove" | "stars" | "redacted"
  customText?: string
}

export const getFilters = async (): Promise<Filter[]> => {
  return await storage.get<Filter[]>("filters") ?? [];
}

// Cache compiled regex patterns for better performance
const regexCache = new Map<string, RegExp>();

export const applyFiltersToDOM = (filters: Filter[]) => {
  // Early return if no filters or empty body
  if (!filters.length || !document.body) return;
  
  // Pre-filter to only include filters that match the current domain
  const applicableFilters = filters.filter(filter => 
    matchWildcard(filter.domain, location.hostname)
  );
  
  // Early return if no applicable filters
  if (!applicableFilters.length) return;
  
  // Use a more efficient selector-based approach when selectors are provided
  applicableFilters.forEach(filter => {
    if (filter.selector) {
      const elements = document.querySelectorAll(filter.selector);
      elements.forEach(el => applyFilterToElement(el, filter));
      return;
    }
  });
  
  // For non-selector filters, use TreeWalker for text nodes
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  
  // Process nodes in batches to avoid blocking the main thread
  const processNextBatch = () => {
    const startTime = performance.now();
    const MAX_PROCESSING_TIME = 10; // ms
    
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent) continue;
      
      const originalText = node.textContent ?? "";
      if (!originalText.trim()) continue; // Skip empty text nodes
      
      for (const filter of applicableFilters) {
        if (filter.selector) continue; // Skip selector-based filters
        
        // Get or create the regex pattern
        let regex = regexCache.get(filter.pattern);
        if (!regex) {
          regex = new RegExp(filter.pattern, "gi");
          regexCache.set(filter.pattern, regex);
        }
        
        // Reset regex state
        regex.lastIndex = 0;
        
        if (regex.test(originalText)) {
          applyFilterAction(node, parent, originalText, regex, filter);
          break; // Once a filter is applied, skip other filters for this node
        }
      }
      
      // Check if we've been processing for too long and should yield
      if (performance.now() - startTime > MAX_PROCESSING_TIME) {
        setTimeout(processNextBatch, 0);
        return;
      }
    }
  };
  
  processNextBatch();
}

function applyFilterToElement(element: Element, filter: Filter) {
  let regex = regexCache.get(filter.pattern);
  if (!regex) {
    regex = new RegExp(filter.pattern, "gi");
    regexCache.set(filter.pattern, regex);
  }
  
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
}

function applyFilterAction(node: Node, parent: Element, originalText: string, regex: RegExp, filter: Filter) {
  switch (filter.action) {
    case "blur":
      (parent as HTMLElement).style.filter = "blur(5px)";
      break;
    case "remove":
      parent.remove();
      break;
    case "stars":
      // Reset regex state
      regex.lastIndex = 0;
      node.textContent = originalText.replace(regex, (m) => "*".repeat(m.length));
      break;
    case "redacted":
      // Reset regex state
      regex.lastIndex = 0;
      node.textContent = originalText.replace(
        regex, 
        filter.customText || "[REDACTED]"
      );
      break;
  }
}

function applyTextNodeFilters(element: Element, regex: RegExp, action: "stars" | "redacted", customText?: string) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  let textNode: Node | null;
  
  while ((textNode = walker.nextNode())) {
    const text = textNode.textContent ?? "";
    
    // Reset regex state
    regex.lastIndex = 0;
    
    if (regex.test(text)) {
      // Reset regex again for the replacement
      regex.lastIndex = 0;
      
      if (action === "stars") {
        textNode.textContent = text.replace(regex, (m) => "*".repeat(m.length));
      } else { // redacted
        textNode.textContent = text.replace(regex, customText || "[REDACTED]");
      }
    }
  }
}