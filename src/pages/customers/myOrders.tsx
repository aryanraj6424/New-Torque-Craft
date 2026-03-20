// import React from 'react';
// import { Search } from 'lucide-react';

// const ordersData = [
//   {
//     id: "OD336915895647969100",
//     name: "MEDERMA Advanced Plus Scar Gel",
//     price: "505",
//     status: "Delivered on Mar 03",
//     subStatus: "Your item has been delivered",
//     statusType: "delivered",
//     image: "https://via.placeholder.com/80", 
    
//   },
//   {
//     id: "OD336915895647969101",
//     name: "Minutes Basket - 1 Items",
//     price: "164",
//     status: "Order Cancelled",
//     subStatus: "Your item has been cancelled",
//     statusType: "cancelled",
//     image: "https://via.placeholder.com/80",
//   },
//   {
//     id: "OD336915895647969102",
//     name: "Minutes Basket - 5 Items",
//     price: "393",
//     status: "Delivered on Feb 14",
//     subStatus: "Your item has been delivered",
//     statusType: "delivered",
//     image: "https://via.placeholder.com/80",
//   }
// ];

// const MyOrders = () => {
//   return (
//     <div className="flex gap-4 bg-[#f1f3f6] w-full">
//       {/* --- LEFT FILTERS (As per Image) --- */}
//       <div className="w-64 flex-shrink-0">
//         <div className="bg-white shadow-sm rounded-sm p-4 border border-gray-200">
//           <h2 className="text-lg font-bold text-gray-800 mb-4">Filters</h2>
          
//           <div className="mb-6">
//             <p className="text-[12px] font-bold text-gray-800 uppercase mb-3 tracking-wide">Order Status</p>
//             {['On the way', 'Delivered', 'Cancelled', 'Returned'].map((item) => (
//               <label key={item} className="flex items-center gap-3 mb-3 cursor-pointer group">
//                 <input type="checkbox" className="w-4 h-4 accent-blue-600 border-gray-300 rounded-sm" />
//                 <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">{item}</span>
//               </label>
//             ))}
//           </div>

//           <div className="mb-2">
//             <p className="text-[12px] font-bold text-gray-800 uppercase mb-3 tracking-wide">Order Time</p>
//             {['Last 30 days', '2024', '2023', 'Older'].map((item) => (
//               <label key={item} className="flex items-center gap-3 mb-3 cursor-pointer group">
//                 <input type="checkbox" className="w-4 h-4 accent-blue-600 border-gray-300 rounded-sm" />
//                 <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">{item}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* --- RIGHT CONTENT (Orders List) --- */}
//       <div className="flex-grow space-y-3">
//         {/* Search Bar */}
//         <div className="flex shadow-sm bg-white rounded-sm overflow-hidden border border-gray-200">
//           <input 
//             type="text" 
//             placeholder="Search your orders here" 
//             className="flex-grow px-4 py-2.5 text-sm outline-none placeholder:text-gray-400"
//           />
//           <button className="bg-[#2874f0] text-white px-6 py-2.5 flex items-center gap-2 font-bold text-sm hover:bg-blue-700 transition-all">
//             <Search size={16} strokeWidth={3} />
//             Search Orders
//           </button>
//         </div>

//         {/* Order Cards */}
//         {ordersData.map((order) => (
//           <div key={order.id} className="bg-white border border-gray-200 rounded-sm p-5 flex hover:shadow-md transition-shadow cursor-pointer">
//             {/* Product Image */}
//             <div className="w-20 h-20 flex-shrink-0 mr-6">
//               <img src={order.image} alt="product" className="w-full h-full object-contain" />
//             </div>

//             {/* Product Info & Shared Tag */}
//             <div className="flex-grow flex flex-col justify-start min-w-0">
//               {order.sharedBy && (
//                 <div className="bg-[#fff9f1] border border-[#ffebd0] rounded-full px-3 py-0.5 w-fit mb-3">
//                   <p className="text-[11px] text-[#845d21]">{order.sharedBy}</p>
//                 </div>
//               )}
//               <h3 className="text-[14px] font-medium text-gray-800 truncate hover:text-[#2874f0]">
//                 {order.name}
//               </h3>
//             </div>

//             {/* Price Section */}
//             <div className="w-32 text-right pr-12">
//               <span className="text-[14px] font-bold text-gray-800">₹{order.price}</span>
//             </div>

//             {/* Status Section */}
//             <div className="w-56 flex flex-col items-start">
//               <div className="flex items-center gap-2">
//                 <div className={`w-2.5 h-2.5 rounded-full ${order.statusType === 'delivered' ? 'bg-[#26a541]' : 'bg-[#ff6161]'}`}></div>
//                 <span className="text-[14px] font-bold text-gray-800">
//                   {order.status}
//                 </span>
//               </div>
//               <p className="text-[12px] text-gray-500 mt-1 leading-tight">
//                 {order.subStatus}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyOrders;





import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const ordersData = [
  {
    id: "OD336915895647969100",
    name: "MEDERMA Advanced Plus Scar Gel",
    price: 505,
    status: "Delivered",
    date: "2025-03-03",
    statusType: "delivered",
    image: "https://via.placeholder.com/80",
  },
  {
    id: "OD336915895647969101",
    name: "Minutes Basket - 1 Items",
    price: 164,
    status: "Cancelled",
    date: "2025-03-10",
    statusType: "cancelled",
    image: "https://via.placeholder.com/80",
  },
  {
    id: "OD336915895647969102",
    name: "Minutes Basket - 5 Items",
    price: 393,
    status: "Delivered",
    date: "2025-02-14",
    statusType: "delivered",
    image: "https://via.placeholder.com/80",
  }
];

const MyOrders = () => {

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // 🔥 FILTER LOGIC
  const filteredOrders = ordersData.filter(order => {
    const matchSearch =
      order.name.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter.length === 0 || statusFilter.includes(order.status);

    return matchSearch && matchStatus;
  });

  // 🔥 HANDLE FILTER
  const toggleStatus = (status) => {
    setStatusFilter(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  return (
    <div className="flex gap-4 bg-[#f1f3f6] w-full p-4">

      {/* LEFT FILTER */}
      <div className="w-64">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h2 className="font-bold mb-4">Filters</h2>

          <p className="text-xs font-bold mb-2">Order Status</p>
          {["Delivered", "Cancelled"].map((item) => (
            <label key={item} className="flex gap-2 mb-2 cursor-pointer">
              <input
                type="checkbox"
                onChange={() => toggleStatus(item)}
                checked={statusFilter.includes(item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 space-y-4">

        {/* SEARCH */}
        <div className="flex bg-white rounded-lg overflow-hidden shadow-sm border">
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 outline-none"
          />
          <button className="bg-blue-600 text-white px-5 flex items-center gap-2">
            <Search size={16}/> Search
          </button>
        </div>

        {/* LIST */}
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            onClick={() => setSelectedOrder(order)}
            className="bg-white p-4 rounded-lg border flex justify-between items-center hover:shadow-md cursor-pointer transition"
          >
            {/* LEFT */}
            <div className="flex gap-4">
              <img src={order.image} className="w-16 h-16 object-contain"/>

              <div>
                <h3 className="font-medium">{order.name}</h3>
                <p className="text-xs text-gray-500">{order.id}</p>
              </div>
            </div>

            {/* PRICE */}
            <div className="font-bold">₹{order.price}</div>

            {/* STATUS */}
            <div>
              <span className={`px-3 py-1 text-xs rounded-full ${
                order.statusType === "delivered"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No orders found 🚫
          </div>
        )}
      </div>

      {/* 🔥 ORDER DETAIL MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
          <div className="bg-white w-[400px] p-6 rounded-lg">

            <div className="flex justify-between mb-4">
              <h2 className="font-bold text-lg">Order Details</h2>
              <button onClick={()=>setSelectedOrder(null)}><X/></button>
            </div>

            <img src={selectedOrder.image} className="w-24 mx-auto"/>

            <h3 className="mt-4 font-medium text-center">{selectedOrder.name}</h3>

            <div className="mt-4 space-y-2 text-sm">
              <p><b>Order ID:</b> {selectedOrder.id}</p>
              <p><b>Price:</b> ₹{selectedOrder.price}</p>
              <p><b>Status:</b> {selectedOrder.status}</p>
              <p><b>Date:</b> {selectedOrder.date}</p>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 mt-4 rounded">
              Track Order
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default MyOrders;