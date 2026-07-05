'use client';

/** Line chart showing inventory value trend. Feed it real historical snapshots in production. */
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Props {
  data: { label: string; value: number }[];
}

export function InventoryChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#8A94A6' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#8A94A6' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12 }}
        />
        <Line type="monotone" dataKey="value" stroke="#0066CC" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
