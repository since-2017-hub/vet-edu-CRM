import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SubscriptionChartProps {
  data: Array<{ date: string; individual: number; practice: number }>;
}

export default function SubscriptionChart({ data }: SubscriptionChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Subscription Growth</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="individual" fill="#3B82F6" name="Individual" />
            <Bar dataKey="practice" fill="#10B981" name="Practice" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}