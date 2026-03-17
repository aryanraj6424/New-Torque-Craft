export interface ProductStock {
  id: string;
  name: string;
  sku: string;
  totalStock: number;
  reservedStock: number;
  availableStock: number;
}

export interface CustomerRecord {
  id: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  orderCount: number;
  revenue: number;
  status: "Active" | "Inactive";
}

export interface DealerRecord {
  id: string;
  name: string;
  area: string;
  location: string;
  phone: string;
  email: string;
  status: "Active" | "Inactive";
  totalOrders: number;
  revenue: number;
  customers: CustomerRecord[];
}

export interface DistributorRecord {
  id: string;
  name: string;
  region: string;
  status: "Active" | "Inactive";
  address: string;
  phone: string;
  email: string;
  totalDealers: number;
  totalRevenue: number;
  totalOrders: number;
  products: ProductStock[];
  dealers: DealerRecord[];
}

export const distributors: DistributorRecord[] = [
  {
    id: "DIST-01",
    name: "North India Logistics",
    region: "India",
    status: "Active",
    address: "Sector 45, Gurgaon, Haryana, India",
    phone: "+91 98765 43210",
    email: "northindia@torquecraft.com",
    totalDealers: 45,
    totalRevenue: 1580000,
    totalOrders: 10240,
    products: [
      { id: "P001", name: "Torque Bolt Set", sku: "TBS-01", totalStock: 12400, reservedStock: 3200, availableStock: 9200 },
      { id: "P002", name: "Hydraulic Filter", sku: "HF-12", totalStock: 8400, reservedStock: 900, availableStock: 7500 },
      { id: "P003", name: "Brake Fluid", sku: "BF-9", totalStock: 6300, reservedStock: 1200, availableStock: 5100 },
    ],
    dealers: [
      {
        id: "D-IND-001",
        name: "Gurgaon Auto Solutions",
        area: "Gurgaon",
        location: "Sector 45, Gurgaon",
        phone: "+91 98111 22334",
        email: "gurgaon@northindia.com",
        status: "Active",
        totalOrders: 420,
        revenue: 260000,
        customers: [
          { id: "C-101", name: "Kumar Auto", location: "Gurgaon", phone: "+91 98111 00001", email: "kumar@auto.com", orderCount: 45, revenue: 52000, status: "Active" },
          { id: "C-102", name: "Saini Motors", location: "Gurgaon", phone: "+91 98111 00002", email: "saini@motors.com", orderCount: 32, revenue: 39000, status: "Active" },
        ],
      },
      {
        id: "D-IND-002",
        name: "Faridabad Repair Center",
        area: "Faridabad",
        location: "Sector 31, Faridabad",
        phone: "+91 98111 22335",
        email: "faridabad@northindia.com",
        status: "Active",
        totalOrders: 310,
        revenue: 210000,
        customers: [
          { id: "C-201", name: "Ram Auto", location: "Faridabad", phone: "+91 98111 00003", email: "ram@auto.com", orderCount: 22, revenue: 18000, status: "Active" },
          { id: "C-202", name: "Sharma Service", location: "Faridabad", phone: "+91 98111 00004", email: "sharma@service.com", orderCount: 18, revenue: 15000, status: "Active" },
        ],
      },
      {
        id: "D-IND-003",
        name: "Noida Torque Depot",
        area: "Noida",
        location: "Sector 62, Noida",
        phone: "+91 98111 22336",
        email: "noida@northindia.com",
        status: "Active",
        totalOrders: 210,
        revenue: 155000,
        customers: [
          { id: "C-301", name: "Amit Wheels", location: "Noida", phone: "+91 98111 00005", email: "amit@wheels.com", orderCount: 19, revenue: 14000, status: "Active" },
        ],
      },
    ],
  },
  {
    id: "DIST-02",
    name: "Southern Spares Co.",
    region: "India",
    status: "Active",
    address: "Sector 25, Bangalore, Karnataka, India",
    phone: "+91 98123 45678",
    email: "southindia@torquecraft.com",
    totalDealers: 32,
    totalRevenue: 1060000,
    totalOrders: 8740,
    products: [
      { id: "P004", name: "Spark Plug Kit", sku: "SPK-07", totalStock: 10400, reservedStock: 2500, availableStock: 7900 },
      { id: "P005", name: "Clutch Assembly", sku: "CLA-22", totalStock: 7200, reservedStock: 1900, availableStock: 5300 },
    ],
    dealers: [
      {
        id: "D-IND-004",
        name: "Chennai Auto Gear",
        area: "Chennai",
        location: "Anna Nagar, Chennai",
        phone: "+91 98111 22337",
        email: "chennai@southernspares.com",
        status: "Active",
        totalOrders: 180,
        revenue: 135000,
        customers: [
          { id: "C-401", name: "Naveen Wheels", location: "Chennai", phone: "+91 98111 00006", email: "naveen@wheels.com", orderCount: 18, revenue: 13000, status: "Active" },
        ],
      },
      {
        id: "D-IND-005",
        name: "Hyderabad Mechanics",
        area: "Hyderabad",
        location: "Banjara Hills, Hyderabad",
        phone: "+91 98111 22338",
        email: "hyderabad@southernspares.com",
        status: "Active",
        totalOrders: 195,
        revenue: 148000,
        customers: [
          { id: "C-501", name: "Reddy Auto", location: "Hyderabad", phone: "+91 98111 00007", email: "reddy@auto.com", orderCount: 22, revenue: 18000, status: "Active" },
        ],
      },
    ],
  },
  {
    id: "DIST-03",
    name: "Western Torque Dist.",
    region: "USA",
    status: "Active",
    address: "742 Evergreen Terrace, Springfield, USA",
    phone: "+1 555 123 4567",
    email: "west@torquecraft.com",
    totalDealers: 58,
    totalRevenue: 2270000,
    totalOrders: 14500,
    products: [
      { id: "P006", name: "Performance Brake Kit", sku: "PBK-34", totalStock: 9800, reservedStock: 2800, availableStock: 7000 },
      { id: "P007", name: "Synthetic Oil Pack", sku: "SOP-55", totalStock: 11200, reservedStock: 3300, availableStock: 7900 },
    ],
    dealers: [
      {
        id: "D-USA-001",
        name: "LA Torque Works",
        area: "Los Angeles",
        location: "Downtown LA, CA",
        phone: "+1 555 223 1111",
        email: "la@westerntorque.com",
        status: "Active",
        totalOrders: 640,
        revenue: 420000,
        customers: [
          { id: "C-601", name: "Sunset Motors", location: "Los Angeles", phone: "+1 555 900 0001", email: "sunset@motors.com", orderCount: 60, revenue: 52000, status: "Active" },
        ],
      },
      {
        id: "D-USA-002",
        name: "San Francisco Gear",
        area: "San Francisco",
        location: "Market Street, SF, CA",
        phone: "+1 555 223 2222",
        email: "sf@westerntorque.com",
        status: "Active",
        totalOrders: 520,
        revenue: 380000,
        customers: [
          { id: "C-701", name: "Bay Area Auto", location: "San Francisco", phone: "+1 555 900 0002", email: "bayauto@com", orderCount: 52, revenue: 46000, status: "Active" },
        ],
      },
    ],
  },
  {
    id: "DIST-04",
    name: "Gulf Distribution Hub",
    region: "UAE",
    status: "Active",
    address: "Dubai Marina, Dubai, UAE",
    phone: "+971 55 123 4567",
    email: "gulf@torquecraft.com",
    totalDealers: 28,
    totalRevenue: 1180000,
    totalOrders: 7200,
    products: [
      { id: "P008", name: "Cooling Fan Kit", sku: "CFK-18", totalStock: 7600, reservedStock: 2100, availableStock: 5500 },
      { id: "P009", name: "Turbo Charger Set", sku: "TCS-44", totalStock: 5600, reservedStock: 1400, availableStock: 4200 },
    ],
    dealers: [
      {
        id: "D-UAE-001",
        name: "Dubai Fast Parts",
        area: "Dubai",
        location: "Jumeirah Lake Towers, Dubai",
        phone: "+971 55 123 7777",
        email: "dubai@gulfdist.com",
        status: "Active",
        totalOrders: 420,
        revenue: 310000,
        customers: [
          { id: "C-801", name: "Emirates Garage", location: "Dubai", phone: "+971 55 900 0001", email: "emirates@garage.com", orderCount: 45, revenue: 39000, status: "Active" },
        ],
      },
      {
        id: "D-UAE-002",
        name: "Sharjah Auto Hub",
        area: "Sharjah",
        location: "Al Majaz, Sharjah",
        phone: "+971 55 123 8888",
        email: "sharjah@gulfdist.com",
        status: "Active",
        totalOrders: 330,
        revenue: 250000,
        customers: [
          { id: "C-901", name: "Sharjah Motors", location: "Sharjah", phone: "+971 55 900 0002", email: "sharjah@motors.com", orderCount: 38, revenue: 34000, status: "Active" },
        ],
      },
    ],
  },
];
