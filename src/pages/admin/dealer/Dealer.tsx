import { Routes, Route, Navigate } from 'react-router-dom';
import DealerLayout from './DealerLayout';
import Overview from './Overview';
import OrderHistory from './OrderHistory';
import Customers from './Customers';
import QRVerifications from './QRVerifications';
import RefundsWarranty from './RefundsWarranty';
import Payments from './Payments';
import Products from './Products';
import Settings from './Settings';
import Shipping from './Shipping';

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
        <Route path="order-history" element={<OrderHistory />} /> 
        <Route path="products" element={<Products />} />
        <Route path="qr-verifications" element={<QRVerifications />} />
        <Route path="refunds-warranty" element={<RefundsWarranty />} />
        <Route path="payment" element={<Payments />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}