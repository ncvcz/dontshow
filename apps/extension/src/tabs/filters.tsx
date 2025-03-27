import { useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { PlusIcon, TrashIcon, PencilIcon, CheckIcon, XIcon } from "lucide-react"

import type { Filter } from "~src/lib/filters"
import "../style.css"
import Layout from "~src/components/Layout"

function Filters() {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useStorage<Filter[]>("filters", [])
  const [newFilter, setNewFilter] = useState<Filter>({
    pattern: "",
    domain: "*",
    action: "stars"
  })
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingFilter, setEditingFilter] = useState<Filter | null>(null)

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

  const handleStartEdit = (filter: Filter, index: number) => {
    setEditingIndex(index)
    setEditingFilter({ ...filter })
  }

  const handleSaveEdit = () => {
    if (!editingFilter || editingIndex === null) return
    const newFilters = [...filters]
    newFilters[editingIndex] = editingFilter
    setFilters(newFilters)
    setEditingIndex(null)
    setEditingFilter(null)
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setEditingFilter(null)
  }

  return (
    <Layout isSensitive>
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Filters</h1>
          <button
            className="btn btn-sm btn-primary gap-1"
            onClick={() => setOpen(true)}>
            <PlusIcon className="w-4 h-4" />
            Add
          </button>
        </div>

        {/* Filters List */}
        <div className="space-y-2">
          {filters.map((filter, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    className="input input-sm input-bordered flex-1"
                    value={editingFilter?.pattern || ""}
                    onChange={(e) =>
                      setEditingFilter({ ...editingFilter!, pattern: e.target.value })
                    }
                    placeholder="Pattern"
                  />
                  <input
                    type="text"
                    className="input input-sm input-bordered w-32"
                    value={editingFilter?.domain || ""}
                    onChange={(e) =>
                      setEditingFilter({ ...editingFilter!, domain: e.target.value })
                    }
                    placeholder="Domain"
                  />
                  <select
                    className="select select-sm select-bordered w-24"
                    value={editingFilter?.action || "stars"}
                    onChange={(e) =>
                      setEditingFilter({
                        ...editingFilter!,
                        action: e.target.value as Filter["action"]
                      })
                    }>
                    <option value="blur">Blur</option>
                    <option value="remove">Remove</option>
                    <option value="stars">Stars</option>
                    <option value="redacted">Redacted</option>
                  </select>
                  <button
                    className="btn btn-ghost btn-sm btn-square"
                    onClick={handleCancelEdit}>
                    <XIcon className="w-4 h-4" />
                  </button>
                  <button
                    className="btn btn-ghost btn-sm btn-square"
                    onClick={handleSaveEdit}>
                    <CheckIcon className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <code className="flex-1 bg-base-300 px-2 py-1 rounded text-sm">{filter.pattern}</code>
                  <code className="w-32 bg-base-300 px-2 py-1 rounded text-sm">{filter.domain}</code>
                  <span className={`badge badge-sm ${
                    filter.action === "blur" ? "badge-info" :
                    filter.action === "remove" ? "badge-error" :
                    filter.action === "stars" ? "badge-warning" :
                    "badge-success"
                  }`}>
                    {filter.action}
                  </span>
                  <button
                    className="btn btn-ghost btn-sm btn-square"
                    onClick={() => handleStartEdit(filter, index)}>
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    className="btn btn-ghost btn-sm btn-square text-error"
                    onClick={() => handleDeleteFilter(filter)}>
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          ))}
          {filters.length === 0 && (
            <div className="text-center py-4 text-base-content/60 text-sm">
              No filters added yet. Click "Add" to create one.
            </div>
          )}
        </div>

        {/* Add Filter Modal */}
        <dialog className={`modal ${open ? "modal-open" : ""}`}>
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Add New Filter</h3>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Pattern</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={newFilter.pattern}
                  onChange={(e) =>
                    setNewFilter({ ...newFilter, pattern: e.target.value })
                  }
                  placeholder="Enter text pattern to match"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Domain</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={newFilter.domain}
                  onChange={(e) =>
                    setNewFilter({ ...newFilter, domain: e.target.value })
                  }
                  placeholder="Enter domain (use * for all)"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Action</span>
                </label>
                <select
                  className="select select-bordered"
                  value={newFilter.action}
                  onChange={(e) =>
                    setNewFilter({
                      ...newFilter,
                      action: e.target.value as Filter["action"]
                    })
                  }>
                  <option value="blur">Blur</option>
                  <option value="remove">Remove</option>
                  <option value="stars">Stars</option>
                  <option value="redacted">Redacted</option>
                </select>
              </div>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddFilter}>
                Add Filter
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </Layout>
  )
}

export default Filters
