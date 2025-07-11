import "../assets/hide.css";
import { log } from "@/lib/log";
import { isEnabled, textReplacement } from "@/lib/utils";
import { Element as ExposingElement, Filter } from "@/types";
import { isMatch } from "matcher";

// Process the DOM to find and replace text based on filters
const processGeneralFilters = async () => {
  const rawFilters = await storage.getItem<Filter[]>("local:filters");
  const matchedWords = new Map<Node, Filter>();

  const filters = rawFilters?.filter(filter => {
    const url = new URL(document.location.href);

    return isMatch(url.hostname, filter.domain);
  });

  log.info("Processing DOM. Looking to apply " + (filters?.length ?? 0) + " filters...");

  // Check if document.body exists, fallback to document.documentElement
  const rootNode = document.body || document.documentElement;

  if (!rootNode) {
    log.warn("No root node available for processing");
    return;
  }

  const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT, {
    acceptNode: node => {
      if (node.parentNode?.nodeName === "SCRIPT" || node.parentNode?.nodeName === "STYLE") {
        return NodeFilter.FILTER_SKIP;
      }

      for (const filter of filters ?? []) {
        if (filter.expression.startsWith("/") && filter.expression.endsWith("/")) {
          const regex = new RegExp(filter.expression.slice(1, -1), "gi");

          const match = node.textContent?.match(regex);
          if (match) {
            matchedWords.set(node, { ...filter, expression: match[0] });
            return NodeFilter.FILTER_ACCEPT;
          }
        } else if (node.textContent?.toLowerCase()?.includes(filter.expression.toLowerCase())) {
          matchedWords.set(node, filter);
          return NodeFilter.FILTER_ACCEPT;
        }
      }

      return NodeFilter.FILTER_SKIP;
    },
  });

  // Log all text nodes that match the filters
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const matchedWord = matchedWords.get(node);

    if (!matchedWord || !node.textContent) continue;

    // Replace the text content with a censored version
    // There are two types of censoring: via regex or via string replacement
    node.textContent = textReplacement(matchedWord.type, node.textContent, matchedWord.expression);
  }

  log.info("DOM Processed successfully.");
};

const processElements = async () => {
  const rawelements = await storage.getItem<ExposingElement[]>("local:elements");
  const url = new URL(document.location.href);
  const elements = rawelements?.filter(element => isMatch(url.hostname, element.website));

  if (!elements) {
    log.info("No exposing elements found for this page.");
    return;
  }

  log.info(`Processing ${elements.length} exposing elements.`);

  elements.forEach(element => {
    const nodes = document.querySelectorAll(element.selector);
    nodes.forEach(node => {
      if (node.textContent) {
        switch (element.action) {
          case "censor":
            node.textContent = "*".repeat(node.textContent.length);
            break;
          case "remove":
            node.textContent = "";
            break;
          default:
            log.warn(`Unknown action: ${element.action}`);
        }
      }
    });
  });

  log.info("Exposing elements processed successfully.");
};

export default defineContentScript({
  matches: ["<all_urls>"],
  runAt: "document_start",
  async main() {
    if (!(await isEnabled())) {
      document.documentElement.setAttribute("data-ds-ready", "true");
      return;
    }

    Promise.all([processGeneralFilters(), processElements()]);

    const observer = new MutationObserver(async el => {
      if (el.length === 0) return;

      log.info("DOM changed, reprocessing...");

      if (el.some(mutation => mutation.type === "childList" || mutation.type === "characterData")) {
        Promise.all([processGeneralFilters(), processElements()]);
        document.documentElement.setAttribute("data-ds-ready", "true");
      }
    });

    storage.watch("local:filters", async () => {
      log.info("Filters changed, reprocessing...");
      await processGeneralFilters();
      document.documentElement.setAttribute("data-ds-ready", "true");
    });

    storage.watch("local:elements", async () => {
      log.info("Exposing elements changed, reprocessing...");
      await processElements();
      document.documentElement.setAttribute("data-ds-ready", "true");
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    document.documentElement.setAttribute("data-ds-ready", "true");
  },
});
