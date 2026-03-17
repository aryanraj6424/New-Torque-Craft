export interface CustomerOrder {
  id: string;
  product: string;
  date: string;
  total: string;
}

export interface CustomerWarranty {
  product: string;
  status: string;
  expires: string;
}

export interface CustomerRefund {
  id: string;
  status: string;
  amount: string;
}

export interface CustomerRecord {
  name: string;
  phone: string;
  email: string;
  location: string;
  deliveryAddress: string;
  qrScans: number;
  orders: CustomerOrder[];
  warranty: CustomerWarranty[];
  refundRequests: CustomerRefund[];
}

export const customersByArea: Record<string, CustomerRecord[]> = {
  Gurgaon: [
    {
      name: "Gurgaon Auto Solutions",
      phone: "+91 98765 43210",
      email: "gurgaon@torquecraft.com",
      location: "Sector 45, Gurgaon",
      deliveryAddress: "Plot 12, Industrial Area, Gurgaon, Haryana 122001",
      qrScans: 18,
      orders: [
        { id: "ORD-701", product: "Torque Bolt Set", date: "2026-03-10", total: "$890" },
      ],
      warranty: [
        { product: "Torque Bolt Set", status: "Active", expires: "2026-09-12" }
      ],
      refundRequests: [
        { id: "RFD-310", status: "Pending", amount: "$130" }
      ]
    }
  ],
  Faridabad: [
    {
      name: "Faridabad Repair Center",
      phone: "+91 98123 45678",
      email: "faridabad@torquecraft.com",
      location: "Sector 31, Faridabad",
      deliveryAddress: "Shop 5, Market Road, Faridabad, Haryana 121001",
      qrScans: 12,
      orders: [
        { id: "ORD-712", product: "Hydraulic Filter", date: "2026-03-11", total: "$560" },
      ],
      warranty: [
        { product: "Hydraulic Filter", status: "Active", expires: "2026-08-20" }
      ],
      refundRequests: [
        { id: "RFD-321", status: "Approved", amount: "$45" }
      ]
    }
  ],
  Noida: [
    {
      name: "Noida Torque Depot",
      phone: "+91 98100 22334",
      email: "noida@torquecraft.com",
      location: "Sector 62, Noida",
      deliveryAddress: "Building 7, Tech Park, Noida, UP 201301",
      qrScans: 10,
      orders: [
        { id: "ORD-724", product: "Brake Fluid", date: "2026-03-09", total: "$240" },
      ],
      warranty: [
        { product: "Brake Fluid", status: "Expired", expires: "2025-12-01" }
      ],
      refundRequests: []
    }
  ]
};
