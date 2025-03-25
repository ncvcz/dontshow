import { Storage } from "@plasmohq/storage";

const storage = new Storage();

export type Filter = {
  pattern: string
  domain: string
  selector?: string
  action: "blur" | "remove" | "stars" | "redacted"
  customText?: string
}


export const getFilters = async (): Promise<Filter[]> => {
  return storage.get<Filter[]>("filters") || [];
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
          case "stars":
            node.textContent = originalText.replace(regex, (m) => "*".repeat(m.length))
            break
          case "redacted":
            node.textContent = originalText.replace(regex, "[REDACTED]")
            break
        }
      }
    })
  }
}