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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Content Filters</h2>
            
            {/* Existing Filters List */}
            <div className="space-y-4 mb-6">
              {filters.map((filter, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Pattern: {filter.pattern}</p>
                    <p className="text-sm text-gray-500">Domain: {filter.domain}</p>
                    <p className="text-sm text-gray-500">Action: {filter.action}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteFilter(filter)}
                    className="ml-4 text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Filter Button */}
            {!open && (
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Add New Filter
              </button>
            )}

            {/* Add Filter Form */}
            {open && (
              <div className="mt-6 space-y-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <label htmlFor="pattern" className="block text-sm font-medium text-gray-700">
                    Pattern
                  </label>
                  <input
                    type="text"
                    id="pattern"
                    value={newFilter.pattern}
                    onChange={(e) => setNewFilter({ ...newFilter, pattern: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter pattern..."
                  />
                </div>

                <div>
                  <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
                    Domain
                  </label>
                  <input
                    type="text"
                    id="domain"
                    value={newFilter.domain}
                    onChange={(e) => setNewFilter({ ...newFilter, domain: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="* for all domains"
                  />
                </div>

                <div>
                  <label htmlFor="action" className="block text-sm font-medium text-gray-700">
                    Action
                  </label>
                  <select
                    id="action"
                    value={newFilter.action}
                    onChange={(e) => setNewFilter({ ...newFilter, action: e.target.value as Filter["action"]})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    <option value="stars">Stars</option>
                    <option value="blur">Blur</option>
                    <option value="remove">Remove</option>
                    <option value="redacted">Redacted</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Cancel
                  </button>
                  <button
                    onClick={handleAddFilter}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Add Filter
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters
