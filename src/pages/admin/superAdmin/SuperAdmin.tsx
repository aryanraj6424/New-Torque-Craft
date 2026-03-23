import { Routes, Route, Navigate } from 'react-router-dom';
import SuperAdminLayout from './SuperAdminLayout';

// Sabhi components 'dashboard' folder ke andar hain, isliye path badalna hoga
import Dashboard from './Dashboard';
import OrderManagement from './OrderManagement';
import ProductManagement from './ProductManagement';
import CustomerManagement from './CustomerManagement';
import ShippingEngine from './ShippingEngine';
import QRAuthenticity from './QRAuthenticity';
import ReturnWarranty from './ReturnWarranty';
import UserRoleManagement from './UserRoleManagement';
import RegionEngine from './RegionEngine';
import FinancialClosure from './FinancialClosure';
import AnalyticsReports from './AnalyticsReports';

export default function SuperAdmin() {
  return (
    <Routes>
      <Route element={<SuperAdminLayout />}>
        {/* /admin/super-admin par aane par dashboard par bhej dega */}
        <Route index element={<Navigate to="dashboard" replace />} />
        
        {/* Child Routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="customers" element={<CustomerManagement />} />
        <Route path="shipping" element={<ShippingEngine />} />
        <Route path="qr-system" element={<QRAuthenticity />} />
        <Route path="returns-warranty" element={<ReturnWarranty />} />
        <Route path="users-roles" element={<UserRoleManagement />} />
        <Route path="regions" element={<RegionEngine />} />
        <Route path="finance" element={<FinancialClosure />} />
        <Route path="analytics" element={<AnalyticsReports />} />
      </Route>
    </Routes>
  );
}