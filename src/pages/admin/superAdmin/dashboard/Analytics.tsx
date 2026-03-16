import React from "react";
import { GlassCard } from "../../ui/GlassCard";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const data = [
  { month: "Jan", sales: 500 },
  { month: "Feb", sales: 900 },
  { month: "Mar", sales: 800 },
  { month: "Apr", sales: 1200 },
  { month: "May", sales: 1500 },
  { month: "Jun", sales: 1700 }
];

const AnalyticsPage = () => {

  return (

    <GlassCard>

      <h2 className="text-xl font-bold mb-6">
        Sales Analytics
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <AreaChart data={data}>

          <CartesianGrid stroke="#ffffff10"/>

          <XAxis dataKey="month" stroke="#ffffff40"/>

          <YAxis stroke="#ffffff40"/>

          <Tooltip/>

          <Area
            type="monotone"
            dataKey="sales"
            stroke="#06b6d4"
            fill="#06b6d430"
            strokeWidth={3}
          />

        </AreaChart>

      </ResponsiveContainer>

    </GlassCard>

  );

};

export default AnalyticsPage;