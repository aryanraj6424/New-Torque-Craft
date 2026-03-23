import { Routes, Route, Navigate } from 'react-router-dom';
import DistributorLayout from './DistributorLayout';
import Dashboard from './Dashboard';
import DealerManagement from './DealerManagement';
import Financials from './Financials';
import Orders from './Orders';
import Products from './Products';
import QRSystem from './QRSystem';
import Reports from './Reports';
import ReturnsWarranty from './ReturnsWarranty';
import Shipping from './Shipping';
import Settings from './Settings';

export default function Distributor() {
  return (
    <Routes>
      <Route element={<DistributorLayout />}>
        {/* Base path /admin/distributor handles redirect to dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
        
        {/* All routes are relative to /admin/distributor/ */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dealer-management" element={<DealerManagement />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="qr-system" element={<QRSystem />} />
        <Route path="returns-warranty" element={<ReturnsWarranty />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="financials" element={<Financials />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}