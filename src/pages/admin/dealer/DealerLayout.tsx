import { Link, Outlet } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, Package, ShieldCheck, ClipboardList, User } from "lucide-react";

export default function DealerLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-navy-deep text-white p-6">
        <h2 className="text-xl font-bold mb-8">Dealer Panel</h2>

        <nav className="space-y-4">

          <Link to="/admin" className="flex items-center gap-3 hover:text-red-400">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link to="/admin/buy-products" className="flex items-center gap-3 hover:text-red-400">
            <ShoppingCart size={18} />
            Buy Products
          </Link>

          <Link to="/admin/inventory" className="flex items-center gap-3 hover:text-red-400">
            <Package size={18} />
            Inventory
          </Link>

          <Link to="/admin/warranty-register" className="flex items-center gap-3 hover:text-red-400">
            <ShieldCheck size={18} />
            Register Warranty
          </Link>

          <Link to="/admin/orders" className="flex items-center gap-3 hover:text-red-400">
            <ClipboardList size={18} />
            Orders
          </Link>

          <Link to="/admin/profile" className="flex items-center gap-3 hover:text-red-400">
            <User size={18} />
            Profile
          </Link>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>

    </div>
  );
}