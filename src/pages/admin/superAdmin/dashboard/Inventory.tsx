import React, { useMemo, useState } from "react";
import { Search, Box, RefreshCcw } from "lucide-react";
import { inventoryItems, InventoryItem, StockMovement } from "../../../../data/inventory";

const formatNumber = (value: number) => value.toLocaleString("en-US");
const formatDate = (date: string) => new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const Inventory: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [filter, setFilter] = useState<string>("");

  const filteredItems = useMemo(() => {
    const query = filter.trim().toLowerCase();
    if (!query) return inventoryItems;
    return inventoryItems.filter((item) =>
      item.sku.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
  }, [filter]);

  const totalStock = inventoryItems.reduce((sum, i) => sum + i.totalStock, 0);
  const allocatedStock = inventoryItems.reduce((sum, i) => sum + i.allocated, 0);
  const reservedStock = inventoryItems.reduce((sum, i) => sum + i.reserved, 0);
  const availableStock = inventoryItems.reduce((sum, i) => sum + i.available, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Inventory</h2>
          <p className="text-sm text-slate-400">View stock levels and track inventory movement.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search SKU, name, category"
              className="w-72 rounded-lg border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            onClick={() => {
              setFilter("");
              setSelectedItem(null);
            }}
            className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            <RefreshCcw size={16} /> Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-4 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Total Stock</p>
              <p className="text-2xl font-bold text-white">{formatNumber(totalStock)}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Allocated Stock</p>
              <p className="text-2xl font-bold text-white">{formatNumber(allocatedStock)}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Reserved Stock</p>
              <p className="text-2xl font-bold text-white">{formatNumber(reservedStock)}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Available Stock</p>
              <p className="text-2xl font-bold text-white">{formatNumber(availableStock)}</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-lg font-semibold">Inventory Items</h3>
            <div className="mt-4 space-y-3">
              {filteredItems.map((item) => (
                <button
                  key={item.sku}
                  onClick={() => setSelectedItem(item)}
                  className={`w-full rounded-lg border p-4 text-left transition ${
                    selectedItem?.sku === item.sku
                      ? "border-blue-500/40 bg-white/5"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.name}</p>
                      <p className="text-xs text-slate-400">{item.sku} • {item.category}</p>
                    </div>
                    <p className="text-sm font-semibold text-white">{formatNumber(item.available)} available</p>
                  </div>
                  <div className="mt-2 flex gap-3 text-xs text-slate-400">
                    <span>Allocated: {formatNumber(item.allocated)}</span>
                    <span>Reserved: {formatNumber(item.reserved)}</span>
                    <span>Total: {formatNumber(item.totalStock)}</span>
                  </div>
                </button>
              ))}

              {filteredItems.length === 0 && (
                <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center text-sm text-slate-300">
                  No inventory items match your search.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {selectedItem ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Product details</p>
                  <h3 className="text-lg font-semibold text-white">{selectedItem.name}</h3>
                  <p className="text-xs text-slate-400">{selectedItem.sku}</p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="rounded-lg bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10"
                >
                  Back
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Category</p>
                  <p className="text-sm font-semibold text-white">{selectedItem.category}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Location</p>
                  <p className="text-sm font-semibold text-white">{selectedItem.location}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Total stock</p>
                  <p className="text-2xl font-semibold text-white">{formatNumber(selectedItem.totalStock)}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Available</p>
                  <p className="text-2xl font-semibold text-white">{formatNumber(selectedItem.available)}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Allocated</p>
                  <p className="text-2xl font-semibold text-white">{formatNumber(selectedItem.allocated)}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Reserved</p>
                  <p className="text-2xl font-semibold text-white">{formatNumber(selectedItem.reserved)}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs text-slate-400 uppercase tracking-wide">Stock movement</p>
                <div className="mt-3 divide-y divide-white/10 rounded-lg border border-white/10 bg-white/5">
                  {selectedItem.movements.map((movement: StockMovement) => (
                    <div key={movement.id} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{movement.type} — {movement.quantity}</p>
                        <p className="text-xs text-slate-400">{movement.note}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">{formatDate(movement.date)}</p>
                        <p className="text-xs text-slate-400">{movement.performedBy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <Box size={28} className="text-slate-400" />
                <p className="text-sm text-slate-300">Select a product to view inventory details.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
