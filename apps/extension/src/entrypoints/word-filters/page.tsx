import Layout from "@/components/Layout";
import { useStorage } from "@/hooks/storage";
import type { Filter } from "@/lib/filters";
import { storageType } from "@/lib/storage";
import { CheckIcon, InfoIcon, PencilIcon, PlusIcon, TrashIcon, XIcon } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useStorage<Filter[]>(`${storageType}:filters`, []);
  const [newFilter, setNewFilter] = useState<Filter>({
    pattern: "",
    domain: "*",
    action: "stars",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingFilter, setEditingFilter] = useState<Filter | null>(null);

  const handleAddFilter = () => {
    if (!newFilter.pattern) return;
    setFilters([...filters, newFilter]);
    setOpen(false);
    setNewFilter({
      pattern: "",
      domain: "*",
      action: "stars",
    });
  };

  const handleDeleteFilter = (filter: Filter) => {
    setFilters(filters.filter((f: Filter) => f !== filter));
  };

  const handleStartEdit = (filter: Filter, index: number) => {
    setEditingIndex(index);
    setEditingFilter({ ...filter });
  };

  const handleSaveEdit = () => {
    if (!editingFilter || editingIndex === null) return;
    const newFilters = [...filters];
    newFilters[editingIndex] = editingFilter;
    setFilters(newFilters);
    setEditingIndex(null);
    setEditingFilter(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingFilter(null);
  };

  return (
    <Layout isSensitive>
      <div className="mx-auto max-w-6xl space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Word Filters</h1>
          <button className="btn btn-sm btn-primary gap-1" onClick={() => setOpen(true)}>
            <PlusIcon className="h-4 w-4" />
            Add
          </button>
        </div>

        {/* Filters List */}
        <div className="space-y-3">
          {filters.map((filter: Filter, index: number) => (
            <div
              key={index}
              className="bg-base-200 hover:bg-base-300 rounded-lg p-3 transition-colors"
            >
              {editingIndex === index ? (
                <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[2fr_1fr_1fr_auto]">
                  <div>
                    <div className="mb-1 text-xs font-semibold uppercase">Text to hide</div>
                    <input
                      type="text"
                      className="input input-sm input-bordered w-full"
                      value={editingFilter?.pattern || ""}
                      onChange={e =>
                        setEditingFilter({ ...editingFilter!, pattern: e.target.value })
                      }
                      placeholder="Text to hide"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <div className="mb-1 text-xs font-semibold uppercase">Where to hide it</div>
                      <div className="tooltip tooltip-right" data-tip="Use * for all websites">
                        <InfoIcon className="text-info h-3 w-3 cursor-help" />
                      </div>
                    </div>
                    <input
                      type="text"
                      className="input input-sm input-bordered w-full"
                      value={editingFilter?.domain || ""}
                      onChange={e =>
                        setEditingFilter({ ...editingFilter!, domain: e.target.value })
                      }
                      placeholder="e.g. All websites"
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-xs font-semibold uppercase">How to hide it</div>
                    <select
                      className="select select-sm select-bordered w-full"
                      value={editingFilter?.action || "stars"}
                      onChange={e =>
                        setEditingFilter({
                          ...editingFilter!,
                          action: e.target.value as Filter["action"],
                        })
                      }
                    >
                      <option value="blur">Blur - Make content unreadable but present</option>
                      <option value="remove">Remove - Completely hide the content</option>
                      <option value="stars">Replace with "**"</option>
                      <option value="redacted">Black box censorship</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2 self-end">
                    <button className="btn btn-ghost btn-sm btn-square" onClick={handleCancelEdit}>
                      <XIcon className="h-4 w-4" />
                    </button>
                    <button className="btn btn-ghost btn-sm btn-square" onClick={handleSaveEdit}>
                      <CheckIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[2fr_1fr_1fr_auto]">
                  <div className="overflow-x-auto">
                    <div className="mb-1 text-xs font-semibold uppercase">Text to hide</div>
                    <code className="bg-base-300 block truncate rounded px-2 py-1 text-sm">
                      {filter.pattern}
                    </code>
                  </div>
                  <div>
                    <div className="mb-1 text-xs font-semibold uppercase">Where to hide it</div>
                    <code className="bg-base-300 block truncate rounded px-2 py-1 text-sm">
                      {filter.domain}
                    </code>
                  </div>
                  <div>
                    <div className="mb-1 text-xs font-semibold uppercase">How to hide it</div>
                    <span
                      className={`badge ${
                        filter.action === "blur"
                          ? "badge-info"
                          : filter.action === "remove"
                            ? "badge-error"
                            : filter.action === "stars"
                              ? "badge-warning"
                              : "badge-success"
                      }`}
                    >
                      {filter.action}
                    </span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      className="btn btn-ghost btn-sm btn-square"
                      onClick={() => handleStartEdit(filter, index)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      className="btn btn-ghost btn-sm btn-square text-error"
                      onClick={() => handleDeleteFilter(filter)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filters.length === 0 && (
            <div className="text-base-content/60 py-8 text-center">
              No word filters added yet. Click "Add" to create one.
            </div>
          )}
        </div>

        {/* Add Filter Modal */}
        <dialog className={`modal ${open ? "modal-open" : ""}`}>
          <div className="modal-box">
            <h3 className="mb-4 text-lg font-bold">Add New Word Filter</h3>
            <div className="grid grid-cols-1 gap-4">
              <label className="grid grid-cols-1 gap-2">
                <span>Text to hide</span>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={newFilter.pattern}
                  onChange={e => setNewFilter({ ...newFilter, pattern: e.target.value })}
                  placeholder="Enter text you want to hide"
                />
              </label>

              <label className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-1">
                  <span>Where to hide it</span>
                  <div className="tooltip tooltip-right" data-tip="Use * for all websites">
                    <InfoIcon className="text-info h-4 w-4 cursor-help" />
                  </div>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={newFilter.domain}
                  onChange={e => setNewFilter({ ...newFilter, domain: e.target.value })}
                  placeholder="All websites (*) or specific sites"
                />
              </label>

              <label className="grid grid-cols-1 gap-2">
                <span>How to hide it</span>
                <select
                  className="select select-bordered w-full"
                  value={newFilter.action}
                  onChange={e =>
                    setNewFilter({
                      ...newFilter,
                      action: e.target.value as Filter["action"],
                    })
                  }
                >
                  <option value="blur">Blur - Make content unreadable but present</option>
                  <option value="remove">Remove - Completely hide the content</option>
                  <option value="stars">Replace with "**"</option>
                  <option value="redacted">Black box censorship</option>
                </select>
              </label>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddFilter}>
                Add Word Filter
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </Layout>
  );
}
