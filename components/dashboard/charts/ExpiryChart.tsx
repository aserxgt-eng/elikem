'use client';

/** Donut chart summarizing product lifecycle status distribution. */
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Props {
  active: number;
  nearExpiry: number;
  expired: number;
}

const COLORS = ['#16A34A', '#D97706', '#DC2626'];

export function ExpiryChart({ active, nearExpiry, expired }: Props) {
  const data = [
    { name: 'Active', value: active },
    { name: 'Near Expiry', value: nearExpiry },
    { name: 'Expired', value: expired },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={3}>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12 }} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
