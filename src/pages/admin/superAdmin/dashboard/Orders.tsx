import React, { useMemo, useState } from "react";
import { ArrowLeft, Box, CheckCircle2, Clock, XCircle, Truck, FileText } from "lucide-react";
import { orders, Order } from "../../../../data/orders";

const formatCurrency = (value: number) => {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
};

export type OrderStatus = "Pending" | "Completed" | "Cancelled";
const statusOptions: OrderStatus[] = ["Pending", "Completed", "Cancelled"];

const Orders: React.FC = () => {
  const [filter, setFilter] = useState<OrderStatus>("Pending");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = useMemo(() => orders.filter((o) => o.status === filter), [filter]);

  const totalAmount = (order: any) => order.products.reduce((sum: number, p: any) => sum + p.price * p.qty, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Orders</h2>
          <p className="text-sm text-slate-400">Manage all orders and view full order details.</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => {
                setFilter(status);
                setSelectedOrder(null);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-slate-200 hover:bg-white/10"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{filter} Orders</h3>
            <span className="text-xs text-slate-400">{filteredOrders.length} orders</span>
          </div>

          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  selectedOrder?.id === order.id
                    ? "border-blue-500/40 bg-white/5"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">Order ID</p>
                    <p className="text-sm font-semibold text-white">{order.id}</p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${
                      order.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-200"
                        : order.status === "Completed"
                        ? "bg-emerald-500/20 text-emerald-200"
                        : "bg-red-500/20 text-red-200"
                    }`}
                  >
                    {order.status === "Pending" && <Clock size={12} />}
                    {order.status === "Completed" && <CheckCircle2 size={12} />}
                    {order.status === "Cancelled" && <XCircle size={12} />}
                    {order.status}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-4 text-xs text-slate-400">
                  <div>
                    <p>Dealer</p>
                    <p className="text-white font-semibold">{order.dealer.name}</p>
                  </div>
                  <div>
                    <p>Distributor</p>
                    <p className="text-white font-semibold">{order.distributor.name}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <span>Created: {order.createdAt}</span>
                  <span className="font-semibold text-white">{formatCurrency(totalAmount(order))}</span>
                </div>
              </button>
            ))}

            {filteredOrders.length === 0 && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-sm text-slate-300">
                No orders found for this status.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {selectedOrder ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Order details</p>
                  <h3 className="text-lg font-semibold text-white">{selectedOrder.id}</h3>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-lg bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10"
                >
                  Back
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Customer</p>
                  <p className="text-sm font-semibold text-white">{selectedOrder.customer.name}</p>
                  <p className="text-xs text-slate-400">{selectedOrder.customer.email}</p>
                  <p className="text-xs text-slate-400">{selectedOrder.customer.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Dealer</p>
                  <p className="text-sm font-semibold text-white">{selectedOrder.dealer.name}</p>
                  <p className="text-xs text-slate-400">{selectedOrder.dealer.location}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Distributor</p>
                  <p className="text-sm font-semibold text-white">{selectedOrder.distributor.name}</p>
                  <p className="text-xs text-slate-400">{selectedOrder.distributor.region}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs text-slate-400 uppercase tracking-wide">Products</p>
                <div className="mt-3 divide-y divide-white/10 rounded-lg border border-white/10 bg-white/5">
                  {selectedOrder.products.map((product) => (
                    <div key={product.sku} className="flex items-center justify-between p-4">
                      <div>
                        <p className="text-sm font-semibold text-white">{product.name}</p>
                        <p className="text-xs text-slate-400">{product.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-white">{product.qty}x</p>
                        <p className="text-xs text-slate-400">{formatCurrency(product.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  href={selectedOrder.invoice.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  <span>
                    <FileText size={16} className="inline-block mr-2" /> Invoice
                  </span>
                  <span className="text-slate-300">View</span>
                </a>

                <a
                  href={selectedOrder.shipping.trackingUrl ?? "#"}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`flex items-center justify-between rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-white transition ${
                    selectedOrder.shipping.trackingUrl
                      ? "bg-white/5 hover:bg-white/10"
                      : "bg-white/10 cursor-not-allowed"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Truck size={16} /> Tracking
                  </span>
                  <span className="text-slate-300">
                    {selectedOrder.shipping.trackingId ?? "—"}
                  </span>
                </a>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <Box size={28} className="text-slate-400" />
                <p className="text-sm text-slate-300">Select an order to view its details.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
