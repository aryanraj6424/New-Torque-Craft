import React from "react";
import { GlassCard } from "../../ui/GlassCard";

const influencers = [
  { name: "Diesel Mike", code: "DIESELMIKE15", revenue: "$32,500" },
  { name: "Duramax Dan", code: "DAN10", revenue: "$21,000" }
];

const InfluencersPage = () => {

  return (

    <GlassCard>

      <h2 className="text-xl font-bold mb-6">
        Influencer Campaigns
      </h2>

      <table className="w-full text-sm">

        <thead className="text-slate-400">

          <tr>
            <th>Name</th>
            <th>Coupon Code</th>
            <th>Revenue</th>
          </tr>

        </thead>

        <tbody className="text-white">

          {influencers.map((inf, i) => (

            <tr key={i} className="border-t border-white/10">

              <td className="py-3">{inf.name}</td>
              <td>{inf.code}</td>
              <td>{inf.revenue}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </GlassCard>

  );

};

export default InfluencersPage;