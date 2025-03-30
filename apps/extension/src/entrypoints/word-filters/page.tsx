import type { Filter } from "@/lib/filters"
import { PlusIcon, TrashIcon, PencilIcon, CheckIcon, XIcon, SearchIcon, FilterIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { useStorage } from "@/hooks/storage"
import Layout from "@/components/Layout"

export default function Page() {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useStorage<Filter[]>("sync:filters", [])
  const [newFilter, setNewFilter] = useState<Filter>({
    pattern: "",
    domain: "*",
    action: "stars"
  })
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingFilter, setEditingFilter] = useState<Filter | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<string>("all")
  
  // Filter the filters based on search query and active tab
  const filteredFilters = filters.filter((filter) => {
    const matchesSearch = 
      filter.pattern.toLowerCase().includes(searchQuery.toLowerCase()) ||
      filter.domain.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && filter.action === activeTab;
  });

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
    setFilters(filters.filter((f: Filter) => f !== filter))
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

  // Helper to render example of filtered content
  const renderFilterExample = (filter: Filter) => {
    const sampleText = "This text contains sensitive content";
    
    switch (filter.action) {
      case "blur":
        return <span className="blur-sm font-medium">This text contains <span className="text-primary font-bold">sensitive</span> content</span>;
      case "remove":
        return <span className="opacity-50 line-through font-medium bg-base-300 px-2 py-1 rounded">This text contains <span className="text-error font-bold">sensitive</span> content</span>;
      case "stars":
        return <span className="font-medium">This text contains <span className="text-warning font-bold">*********</span> content</span>;
      case "redacted":
        return <span className="font-medium">This text contains <span className="bg-neutral text-neutral-content px-2 py-0.5 rounded font-bold">[REDACTED]</span> content</span>;
      default:
        return sampleText;
    }
  };

  return (
    <Layout isSensitive>
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Word Filters</h1>
          <button
            className="btn btn-sm btn-primary gap-1"
            onClick={() => setOpen(true)}>
            <PlusIcon className="w-4 h-4" />
            Add
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-2 justify-between items-start md:items-center">
          <div className="tabs tabs-boxed bg-base-300">
            <button 
              className={`tab ${activeTab === 'all' ? 'tab-active font-medium' : ''}`}
              onClick={() => setActiveTab('all')}>All</button>
            <button 
              className={`tab ${activeTab === 'blur' ? 'tab-active font-medium bg-info/20 text-info' : ''}`}
              onClick={() => setActiveTab('blur')}>Blur</button>
            <button 
              className={`tab ${activeTab === 'remove' ? 'tab-active font-medium bg-error/20 text-error' : ''}`}
              onClick={() => setActiveTab('remove')}>Remove</button>
            <button 
              className={`tab ${activeTab === 'stars' ? 'tab-active font-medium bg-warning/20 text-warning' : ''}`}
              onClick={() => setActiveTab('stars')}>Stars</button>
            <button 
              className={`tab ${activeTab === 'redacted' ? 'tab-active font-medium bg-success/20 text-success' : ''}`}
              onClick={() => setActiveTab('redacted')}>Redacted</button>
          </div>
          <div className="join w-full md:w-auto shadow-sm">
            <div className="relative w-full md:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="w-4 h-4 text-base-content/70" />
              </span>
              <input
                type="text"
                placeholder="Search filters..."
                className="input input-bordered w-full pl-10 border-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="indicator">
              {filteredFilters.length !== filters.length && (
                <span className="indicator-item badge badge-primary font-bold">{filteredFilters.length}</span>
              )}
              <button 
                className="btn btn-square join-item btn-primary btn-outline"
                onClick={() => setSearchQuery("")}>
                <FilterIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Table */}
        <div className="overflow-x-auto rounded-lg border border-base-300 shadow-sm">
          {filteredFilters.length > 0 ? (
            <table className="table table-zebra">
              <thead className="bg-base-300 text-base-content">
                <tr>
                  <th className="w-2/5 font-bold">Pattern</th>
                  <th className="w-1/5 font-bold">Domain</th>
                  <th className="w-1/5 font-bold">Action</th>
                  <th className="w-1/5 font-bold">Preview</th>
                  <th className="w-[80px]"></th>
                </tr>
              </thead>
              <tbody>
                {filteredFilters.map((filter: Filter, index: number) => (
                  <tr key={index} className="hover:bg-base-200 border-b border-base-300">
                    {editingIndex === index ? (
                      <>
                        <td>
                          <input
                            type="text"
                            className="input input-sm input-bordered w-full border-2"
                            value={editingFilter?.pattern || ""}
                            onChange={(e) =>
                              setEditingFilter({ ...editingFilter!, pattern: e.target.value })
                            }
                            placeholder="Pattern"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="input input-sm input-bordered w-full border-2"
                            value={editingFilter?.domain || ""}
                            onChange={(e) =>
                              setEditingFilter({ ...editingFilter!, domain: e.target.value })
                            }
                            placeholder="Domain"
                          />
                        </td>
                        <td>
                          <select
                            className="select select-sm select-bordered w-full border-2"
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
                        </td>
                        <td>
                          {editingFilter && renderFilterExample(editingFilter)}
                        </td>
                        <td className="flex justify-end gap-1">
                          <button
                            className="btn btn-ghost btn-xs btn-square text-error"
                            onClick={handleCancelEdit}>
                            <XIcon className="w-4 h-4" />
                          </button>
                          <button
                            className="btn btn-ghost btn-xs btn-square text-success"
                            onClick={handleSaveEdit}>
                            <CheckIcon className="w-4 h-4" />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <code className="bg-base-300 px-2 py-1 rounded text-sm block truncate font-medium text-primary-content">{filter.pattern}</code>
                        </td>
                        <td>
                          <code className="bg-base-300 px-2 py-1 rounded text-sm block truncate font-medium text-primary-content">{filter.domain}</code>
                        </td>
                        <td>
                          <span className={`badge badge-lg font-medium ${
                            filter.action === "blur" ? "badge-info text-info-content" :
                            filter.action === "remove" ? "badge-error text-error-content" :
                            filter.action === "stars" ? "badge-warning text-warning-content" :
                            "badge-success text-success-content"
                          }`}>
                            {filter.action}
                          </span>
                        </td>
                        <td>
                          {renderFilterExample(filter)}
                        </td>
                        <td className="flex justify-end gap-1">
                          <button
                            className="btn btn-ghost btn-xs btn-square text-primary hover:bg-primary/20"
                            onClick={() => handleStartEdit(filter, index)}>
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            className="btn btn-ghost btn-xs btn-square text-error hover:bg-error/20"
                            onClick={() => handleDeleteFilter(filter)}>
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12 bg-base-200 rounded-lg border-2 border-base-300">
              <div className="text-base-content font-medium mb-4">
                {searchQuery ? "No filters match your search criteria." : "No word filters added yet."}
              </div>
              <button
                className="btn btn-primary gap-1 font-medium"
                onClick={() => {
                  setSearchQuery("");
                  setOpen(true);
                }}>
                <PlusIcon className="w-4 h-4" />
                Add Your First Filter
              </button>
            </div>
          )}
        </div>

        {/* Add Filter Modal */}
        <dialog className={`modal ${open ? "modal-open" : ""}`}>
          <div className="modal-box bg-base-100 border border-base-300">
            <h3 className="font-bold text-lg mb-6">Add New Word Filter</h3>
            <div className="space-y-5">
              <div className="form-control">
                <label className="label pl-0">
                  <span className="label-text text-base-content/70 font-medium">Pattern</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-base-200 border-base-300 w-full"
                  value={newFilter.pattern}
                  onChange={(e) =>
                    setNewFilter({ ...newFilter, pattern: e.target.value })
                  }
                  placeholder="Enter text pattern to match"
                />
              </div>
              <div className="form-control">
                <label className="label pl-0">
                  <span className="label-text text-base-content/70 font-medium">Domain</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-base-200 border-base-300 w-full"
                  value={newFilter.domain}
                  onChange={(e) =>
                    setNewFilter({ ...newFilter, domain: e.target.value })
                  }
                  placeholder="Enter domain (use * for all)"
                />
              </div>
              <div className="form-control">
                <label className="label pl-0">
                  <span className="label-text text-base-content/70 font-medium">Type of censorship</span>
                </label>
                <select
                  className="select select-bordered bg-base-200 border-base-300 w-full"
                  value={newFilter.action}
                  onChange={(e) =>
                    setNewFilter({
                      ...newFilter,
                      action: e.target.value as Filter["action"]
                    })
                  }>
                  <option value="blur">Blur - Make content unreadable but present</option>
                  <option value="remove">Remove - Completely hide the content</option>
                  <option value="stars">Stars - Replace with asterisks (***)</option>
                  <option value="redacted">Redacted - Black box censorship</option>
                </select>
              </div>
              
              {/* Live preview of filter */}
              <div className="form-control">
                <label className="label pl-0">
                  <span className="label-text text-base-content/70 font-medium">Preview</span>
                </label>
                <div className="p-4 bg-base-200 rounded-lg">
                  {renderFilterExample(newFilter)}
                </div>
              </div>
            </div>
            <div className="modal-action gap-2 mt-8">
              <button 
                className="btn btn-sm min-w-24 rounded-md" 
                onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-sm btn-primary min-w-36 rounded-md" 
                onClick={handleAddFilter}>
                Add Word Filter
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </Layout>
  );
}
