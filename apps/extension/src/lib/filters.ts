import { Settings } from "./settings";
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

// Constants for batch processing
const MAX_PROCESSING_TIME_MS = 10; // ms per batch
const INPUT_BATCH_SIZE = 50; // Number of inputs to process per batch

const getRegex = (pattern: string): RegExp => {
  let regex = regexCache.get(pattern);
  const isRegex = pattern.startsWith("/") && pattern.endsWith("/");

  if (!regex) {
    regex = new RegExp(isRegex ? pattern.slice(1, -1) : escapeRegex(pattern), "gi");
    // Store the compiled regex in the cache
    regexCache.set(pattern, regex); // Ensure regex is stored in cache
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

// Helper to skip selector-based blur/remove filters
const isSelectorBlurRemove = (filter: Filter): boolean =>
  !!filter.selector && (filter.action === "blur" || filter.action === "remove");

// Handlers for text node filters
const textFilterHandlers: Record<
  FilterAction,
  (filter: Filter, node: Node, parent: HTMLElement, original: string) => void
> = {
  blur: (filter, node, parent) => {
    if (!filter.selector && !parent.style.filter.includes("blur")) {
      parent.style.filter = "blur(5px)";
    }
  },
  remove: (filter, node, parent) => {
    if (!filter.selector) {
      parent.remove();
    }
  },
  stars: (filter, node, parent, original) => {
    if (!filter.selector || parent.matches(filter.selector)) {
      node.textContent = applyTextReplacement(
        original,
        getRegex(filter.pattern),
        "stars",
        filter.customText
      );
    }
  },
  redacted: (filter, node, parent, original) => {
    if (!filter.selector || parent.matches(filter.selector)) {
      node.textContent = applyTextReplacement(
        original,
        getRegex(filter.pattern),
        "redacted",
        filter.customText
      );
    }
  },
};

// NEW FUNCTION for text nodes
const applyFiltersToTextNodes = (applicableFilters: Filter[]): void => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: node =>
      shouldProcessNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP,
  });

  const processNextBatch = (): void => {
    const startTime = performance.now();
    let node: Node | null;

    while ((node = walker.nextNode()) && performance.now() - startTime < MAX_PROCESSING_TIME_MS) {
      const parent = node.parentElement;
      if (!parent) continue;

      const originalText = node.textContent ?? "";
      if (!originalText.trim()) continue;

      for (const filter of applicableFilters) {
        if (isSelectorBlurRemove(filter)) continue;
        const regex = getRegex(filter.pattern);
        regex.lastIndex = 0;
        if (!regex.test(originalText)) continue;
        textFilterHandlers[filter.action](filter, node, parent, originalText);
        break;
      }
    }

    // Schedule next batch if nodes remain
    if (walker.nextNode()) {
      // Put the current node back before scheduling the next batch
      walker.previousNode();
      setTimeout(processNextBatch, 0);
    }
  };

  processNextBatch();
};

// Handlers for input element filters
const inputFilterHandlers: Record<FilterAction, (filter: Filter, input: HTMLInputElement) => void> =
  {
    blur: (_, input) => {
      input.type = "password";
    },
    remove: (_, input) => {
      input.remove();
    },
    stars: (_, input) => {
      input.type = "password";
    },
    redacted: (_, input) => {
      input.type = "password";
    },
  };

// NEW FUNCTION for input elements
const applyFiltersToInputs = (applicableFilters: Filter[]): void => {
  const inputs = Array.from(document.querySelectorAll("input"));
  let index = 0;

  const processNextBatch = (): void => {
    const startTime = performance.now();

    while (index < inputs.length && performance.now() - startTime < MAX_PROCESSING_TIME_MS) {
      const input = inputs[index++];

      // If an input is already type="password", changing it again has no effect.
      // We don't need to explicitly skip password fields unless there's a specific reason
      // (e.g., performance on pages with many password fields not matching filters).
      // if (input.type === 'password') continue;

      const originalValue = input.value;
      if (!originalValue) continue;

      for (const filter of applicableFilters) {
        const regex = getRegex(filter.pattern);
        regex.lastIndex = 0;
        if (!regex.test(originalValue) || (filter.selector && !input.matches(filter.selector)))
          continue;
        inputFilterHandlers[filter.action](filter, input);
        break;
      }
    }

    if (index < inputs.length) {
      setTimeout(processNextBatch, 0); // Schedule next batch
    }
  };

  processNextBatch(); // Start processing the first batch
};

export const applyFiltersToDOM = async (filters: Filter[]): Promise<void> => {
  if (!filters.length || !document.body) return;

  const applicableFilters = filters.filter(filter =>
    matchWildcard(filter.domain, location.hostname)
  );

  if (!applicableFilters.length) return;

  // Fetch settings directly from storage
  const settings = await storage.getItem<Settings>(`${storageType}:settings`);

  // 1. Process selector-based filters for direct element actions (blur/remove)
  applicableFilters.forEach(filter => {
    if (filter.selector && (filter.action === "blur" || filter.action === "remove")) {
      try {
        document.querySelectorAll(filter.selector).forEach(el => {
          // Inlined logic from applyFilterToElement
          switch (filter.action) {
            case "blur":
              if (el instanceof HTMLElement) {
                // Type guard for style property
                el.style.filter = "blur(5px)";
              }
              break;
            case "remove":
              el.remove();
              break;
          }
        });
      } catch (e) {
        console.error(
          `Blurri: Invalid selector "${filter.selector}" for filter "${filter.pattern}".`,
          e
        );
      }
    }
  });

  // 2. Process text nodes for replacements (stars/redacted) and non-selector blur/remove
  // Pass all applicable filters; the function will handle selector/action logic internally.
  applyFiltersToTextNodes(applicableFilters);

  // 3. Process input elements for censoring only if setting is explicitly enabled in storage
  // Default to false if not set or settings object is missing.
  if (settings?.inputCensoring) {
    applyFiltersToInputs(applicableFilters);
  }
};
