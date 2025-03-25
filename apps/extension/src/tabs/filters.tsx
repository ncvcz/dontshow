import { useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"

import type { Filter } from "~src/lib/filters"
import "../style.css"

function Filters() {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useStorage<Filter[]>("filters", [])
  const [newFilter, setNewFilter] = useState<Filter>({
    pattern: "",
    domain: "*",
    action: "stars"
  })

  const handleAddFilter = () => {
    if (!newFilter.pattern) return
    setFilters([...filters, newFilter])
    setOpen(false)
    setNewFilter({
      pattern: "",
      domain: "*",
      action: "stars"
    })
  }

  const handleDeleteFilter = (filter: Filter) => {
    setFilters(filters.filter((f) => f !== filter))
  }

  return (
   <div>todo</div> 
  )
}

export default Filters
