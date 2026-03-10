export default function DealerDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dealer Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold">54</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Products Purchased</h3>
          <p className="text-2xl font-bold">230</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Warranty Registered</h3>
          <p className="text-2xl font-bold">98</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Pending Orders</h3>
          <p className="text-2xl font-bold">4</p>
        </div>

      </div>

      {/* Orders Table */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Order ID</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-2">ORD1023</td>
              <td>Head Stud Kit</td>
              <td>5</td>
              <td className="text-green-600">Shipped</td>
            </tr>

            <tr>
              <td className="py-2">ORD1024</td>
              <td>Main Stud Kit</td>
              <td>2</td>
              <td className="text-blue-600">Delivered</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  );
}