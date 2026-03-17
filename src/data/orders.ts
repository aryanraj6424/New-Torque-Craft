import { customersByArea, CustomerRecord } from "./customers";

export type OrderStatus = "Pending" | "Completed" | "Cancelled";

export type OrderProduct = {
  sku: string;
  name: string;
  qty: number;
  price: number;
};

export type OrderInvoice = {
  number: string;
  date: string;
  total: number;
  url: string;
};

export type OrderShipping = {
  carrier: string;
  trackingId: string;
  status: string;
  estimatedDelivery: string;
};

export type OrderWarranty = {
  product: string;
  status: string;
  expires: string;
};

export type OrderRefund = {
  id: string;
  status: string;
  amount: number;
  requestedAt: string;
  resolvedAt?: string;
};

export type OrderAdminTracking = {
  assignedTo: string;
  lastUpdated: string;
  notes: string;
};

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customer: CustomerRecord;
  dealer: {
    name: string;
    location: string;
  };
  distributor: {
    name: string;
    region: string;
  };
  products: OrderProduct[];
  invoice: OrderInvoice;
  shipping: OrderShipping;
  qr: {
    code: string;
    scans: number;
    status: string;
  };
  warranty: OrderWarranty[];
  refund?: OrderRefund;
  adminTracking: OrderAdminTracking;
};

export const orders: Order[] = [
  {
    id: "ORD-00145",
    createdAt: "2026-03-12",
    status: "Pending",
    customer: customersByArea.Gurgaon[0],
    dealer: {
      name: "Prime Auto Dealers",
      location: "Sector 45, Gurgaon"
    },
    distributor: {
      name: "NorthZone Distributors",
      region: "North"
    },
    products: [
      { sku: "TC-TRK-100", name: "TorqueCraft Truck Stud Kit", qty: 2, price: 12999 },
      { sku: "TC-BSP-002", name: "Premium Bolt Set", qty: 1, price: 4999 }
    ],
    invoice: {
      number: "INV-2026-0145",
      date: "2026-03-12",
      total: 30997,
      url: "https://example.com/invoice/INV-2026-0145"
    },
    shipping: {
      carrier: "DHL",
      trackingId: "DHL-782314",
      trackingUrl: "https://www.google.com/search?q=DHL+782314",
      status: "Label created",
      estimatedDelivery: "2026-03-18"
    },
    qr: {
      code: "QR-78392-AB",
      scans: 18,
      status: "Active"
    },
    warranty: [
      { product: "TorqueCraft Truck Stud Kit", status: "Active", expires: "2027-03-12" },
      { product: "Premium Bolt Set", status: "Active", expires: "2027-03-12" }
    ],
    refund: {
      id: "RFD-310",
      status: "Pending",
      amount: 130,
      requestedAt: "2026-03-13"
    },
    adminTracking: {
      assignedTo: "Aditi Sharma",
      lastUpdated: "2026-03-13",
      notes: "Awaiting warehouse pickup confirmation."
    }
  },
  {
    id: "ORD-00146",
    createdAt: "2026-03-11",
    status: "Completed",
    customer: customersByArea.Faridabad[0],
    dealer: {
      name: "Delta Motors",
      location: "Sector 31, Faridabad"
    },
    distributor: {
      name: "Central Distributors",
      region: "Central"
    },
    products: [
      { sku: "TC-ECO-010", name: "Eco Engine Head Studs", qty: 1, price: 8999 }
    ],
    invoice: {
      number: "INV-2026-0146",
      date: "2026-03-11",
      total: 8999,
      url: "https://example.com/invoice/INV-2026-0146"
    },
    shipping: {
      carrier: "FedEx",
      trackingId: "FDX-550921",
      trackingUrl: "https://www.google.com/search?q=FDX+550921",
      status: "Delivered",
      estimatedDelivery: "2026-03-14"
    },
    qr: {
      code: "QR-99100-FD",
      scans: 12,
      status: "Active"
    },
    warranty: [
      { product: "Eco Engine Head Studs", status: "Active", expires: "2027-03-11" }
    ],
    adminTracking: {
      assignedTo: "Rohan Mehta",
      lastUpdated: "2026-03-14",
      notes: "Delivered and confirmed by dealer."
    }
  },
  {
    id: "ORD-00147",
    createdAt: "2026-03-10",
    status: "Cancelled",
    customer: customersByArea.Noida[0],
    dealer: {
      name: "Prime Auto Dealers",
      location: "Sector 45, Gurgaon"
    },
    distributor: {
      name: "SouthLine Distributors",
      region: "South"
    },
    products: [
      { sku: "TC-BSP-008", name: "High-Performance Bolts", qty: 4, price: 2299 }
    ],
    invoice: {
      number: "INV-2026-0147",
      date: "2026-03-10",
      total: 9196,
      url: "https://example.com/invoice/INV-2026-0147"
    },
    shipping: {
      carrier: "BlueDart",
      trackingId: "BDT-214980",
      trackingUrl: "https://www.google.com/search?q=BDT+214980",
      status: "Cancelled",
      estimatedDelivery: "-"
    },
    qr: {
      code: "QR-31415-BC",
      scans: 10,
      status: "Inactive"
    },
    warranty: [
      { product: "High-Performance Bolts", status: "Inactive", expires: "2026-02-28" }
    ],
    refund: {
      id: "RFD-321",
      status: "Approved",
      amount: 120,
      requestedAt: "2026-03-11",
      resolvedAt: "2026-03-12"
    },
    adminTracking: {
      assignedTo: "Neha Gupta",
      lastUpdated: "2026-03-12",
      notes: "Order cancelled by dealer due to inventory mismatch. Refund approved."
    }
  }
];
