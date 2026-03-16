import React from "react";
import { GlassCard } from "../../ui/GlassCard";
import { Plus } from "lucide-react";

const coupons = [
  { code: "TORQUE10", discount: "10%", uses: 120 },
  { code: "DIESELMIKE15", discount: "15%", uses: 85 },
  { code: "LAUNCH20", discount: "20%", uses: 45 }
];

const CouponsPage = () => {

  return (

    <GlassCard>

      <div className="flex justify-between mb-6">

        <h2 className="text-xl font-bold">
          Coupon System
        </h2>

        <button className="bg-blue-600 px-4 py-2 text-xs rounded-lg flex gap-2 items-center">
          <Plus size={14}/> Create Coupon
        </button>

      </div>

      <table className="w-full text-sm">

        <thead className="text-slate-400">

          <tr>
            <th>Coupon Code</th>
            <th>Discount</th>
            <th>Total Uses</th>
          </tr>

        </thead>

        <tbody className="text-white">

          {coupons.map((coupon, i) => (

            <tr key={i} className="border-t border-white/10">

              <td className="py-3">{coupon.code}</td>
              <td>{coupon.discount}</td>
              <td>{coupon.uses}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </GlassCard>

  );

};

export default CouponsPage;