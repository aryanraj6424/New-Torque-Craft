import { Routes, Route, Navigate } from 'react-router-dom';
import DealerLayout from './DealerLayout';
import Overview from './Overview';
import Customers from './Customers';
import Inventory from './Inventory';
import OrderHistory from './OrderHistory';
import PurchaseOrders from './PurchaseOrders';
import Warranty from './Warranty';
import Refunds from './Refunds';
import Settings from './Settings';
import DealerPayment from './DealerPayment';
export default function Dealer() {
  return (
    <Routes>
      <Route element={<DealerLayout />}>
        {/* This 'index' route handles the base path: /admin/dealer
           It will redirect the user to: /admin/dealer/overview
        */}
        <Route index element={<Navigate to="overview" replace />} />
        
        {/* NOTE: Do NOT add leading slashes here. 
           'overview' becomes /admin/dealer/overview 
        */}
        <Route path="overview" element={<Overview />} />
        <Route path="customers" element={<Customers />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="order-history" element={<OrderHistory />} />
        <Route path="purchase-orders" element={<PurchaseOrders />} />
        <Route path="warranty" element={<Warranty />} />
        <Route path="refunds" element={<Refunds />} />
        <Route path="payment" element={<DealerPayment />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}