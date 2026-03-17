export type StockMovementType = "IN" | "OUT" | "ADJUST";

export type StockMovement = {
  id: string;
  date: string;
  type: StockMovementType;
  quantity: number;
  note: string;
  performedBy: string;
};

export type InventoryItem = {
  sku: string;
  name: string;
  category: string;
  totalStock: number;
  allocated: number;
  reserved: number;
  available: number;
  location: string;
  movements: StockMovement[];
};

export const inventoryItems: InventoryItem[] = [
  {
    sku: "TC-TRK-100",
    name: "TorqueCraft Truck Stud Kit",
    category: "Engine Parts",
    totalStock: 120,
    allocated: 40,
    reserved: 18,
    available: 62,
    location: "Gurgaon Warehouse",
    movements: [
      {
        id: "MOV-001",
        date: "2026-03-16",
        type: "IN",
        quantity: 80,
        note: "Received central shipment",
        performedBy: "Ravi Patel"
      },
      {
        id: "MOV-002",
        date: "2026-03-18",
        type: "OUT",
        quantity: 20,
        note: "Allocated to order ORD-00145",
        performedBy: "Aditi Sharma"
      }
    ]
  },
  {
    sku: "TC-BSP-002",
    name: "Premium Bolt Set",
    category: "Fasteners",
    totalStock: 250,
    allocated: 65,
    reserved: 22,
    available: 163,
    location: "Noida Warehouse",
    movements: [
      {
        id: "MOV-003",
        date: "2026-03-14",
        type: "IN",
        quantity: 150,
        note: "Restock from supplier",
        performedBy: "Rohan Mehta"
      },
      {
        id: "MOV-004",
        date: "2026-03-19",
        type: "OUT",
        quantity: 12,
        note: "Reserved for incoming order",
        performedBy: "Neha Gupta"
      }
    ]
  },
  {
    sku: "TC-ECO-010",
    name: "Eco Engine Head Studs",
    category: "Engine Parts",
    totalStock: 180,
    allocated: 32,
    reserved: 10,
    available: 138,
    location: "Faridabad Warehouse",
    movements: [
      {
        id: "MOV-005",
        date: "2026-03-10",
        type: "IN",
        quantity: 100,
        note: "Initial stock",
        performedBy: "Sumeet Chaudhary"
      },
      {
        id: "MOV-006",
        date: "2026-03-17",
        type: "OUT",
        quantity: 18,
        note: "Shipped to dealer",
        performedBy: "Ravi Patel"
      }
    ]
  }
];
