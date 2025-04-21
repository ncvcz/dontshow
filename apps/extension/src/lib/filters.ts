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
        // Selector-based blur/remove are handled directly in applyFiltersToDOM first.
        // This function handles text replacements (stars/redacted) for both selector and non-selector filters,
        // and non-selector blur/remove applied to the parent of the matching text node.
        if (filter.selector && (filter.action === "blur" || filter.action === "remove")) continue;

        const regex = getRegex(filter.pattern);
        regex.lastIndex = 0;

        if (regex.test(originalText)) {
          // Apply filter action
          switch (filter.action) {
            case "blur":
              // Apply non-selector blur to parent
              if (
                !filter.selector &&
                parent instanceof HTMLElement &&
                !parent.style.filter.includes("blur")
              ) {
                parent.style.filter = "blur(5px)";
              }
              break;
            case "remove":
              // Apply non-selector remove to parent
              if (!filter.selector) {
                parent.remove();
                // WARNING: Removing elements during TreeWalker iteration can be problematic.
                // The walker might skip siblings or descendants.
                // Breaking the inner loop is a partial mitigation.
                // Consider processing removals separately if issues arise.
              }
              break;
            case "stars":
            case "redacted":
              // Apply text replacement if no selector OR if parent matches selector
              if (!filter.selector || parent.matches(filter.selector)) {
                node.textContent = applyTextReplacement(
                  originalText,
                  regex,
                  filter.action,
                  filter.customText
                );
              }
              break;
          }
          // If a non-text filter action (blur/remove) was applied (necessarily non-selector here),
          // or a text replacement occurred, break the inner loop for this text node.
          // Assumption: First matching filter is sufficient.
          if (
            filter.action === "blur" ||
            filter.action === "remove" ||
            node.textContent !== originalText
          ) {
            break;
          }
        }
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
        regex.lastIndex = 0; // Reset regex state

        if (regex.test(originalValue)) {
          // Apply filter only if the input doesn't match a more specific selector filter
          // or if the filter has no selector.
          if (!filter.selector || input.matches(filter.selector)) {
            switch (filter.action) {
              case "blur":
                // Censor input like stars/redacted
                input.type = "password";
                break;
              case "remove":
                // Removing the input element itself
                input.remove();
                break;
              case "stars":
              case "redacted":
                // Censor input by changing type to password
                input.type = "password";
                break;
            }
            break; // Stop checking filters for this input once matched
          }
        }
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
