'use client';

/** Bar chart breaking down product count per category. */
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Props {
  data: { category: string; count: number }[];
}

export function CategoryChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="category" tick={{ fontSize: 12, fill: '#8A94A6' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#8A94A6' }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12 }} />
        <Bar dataKey="count" fill="#00AEEF" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
