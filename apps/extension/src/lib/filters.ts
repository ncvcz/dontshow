import { Storage } from "@plasmohq/storage";

const storage = new Storage();

export type Filter = {
  pattern: string
  domain: string
  selector?: string
  action: "blur" | "remove" | "replace"
  maskType?: "stars" | "redacted" | "custom"
  customText?: string
}

export const getFilters = (): Filter[] => {
  const filters: Filter[] = [
    {
      pattern: "valerio.clemenzi@*",
      domain: "*",
      action: "replace",
      maskType: "stars",
    }
  ];

  storage.get<Filter[]>("filters").then((filters) => {
    filters.forEach((filter) => {
      filters.push(filter)
    })
  })

  return filters
}

export const applyFiltersToDOM = (filters: Filter[]) => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  let node: Node | null

  while ((node = walker.nextNode())) {
    const parent = node.parentElement
    if (!parent) continue

    const originalText = node.textContent ?? ""

    filters.forEach((filter) => {
      if (filter.domain !== "*" && !location.hostname.includes(filter.domain)) return

      const regex = new RegExp(filter.pattern, "gi")

      if (regex.test(originalText)) {
        switch (filter.action) {
          case "blur":
            parent.style.filter = "blur(5px)"
            parent.style.transition = "filter 0.2s"
            break
          case "remove":
            parent.remove()
            break
          case "replace":
            if (filter.maskType === "stars") {
              node.textContent = originalText.replace(regex, (m) => "*".repeat(m.length))
            } else if (filter.maskType === "redacted") {
              node.textContent = originalText.replace(regex, "[REDACTED]")
            } else if (filter.maskType === "custom" && filter.customText) {
              node.textContent = originalText.replace(regex, filter.customText)
            }
            break
        }
      }
    })
  }
}