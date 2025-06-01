import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { platformMetrics } from '../../data/mockAnalytics'

const PlatformBreakdown: React.FC = () => {
  const data = platformMetrics.map(item => ({
    name: item.platform,
    value: item.accountsDetected
  }))

  const COLORS = ['#2563EB', '#10B981', '#06B6D4', '#8B5CF6', '#F59E0B']

  return (
    <div className="card p-5">
      <h2 className="text-lg font-semibold mb-4">Platform Breakdown</h2>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value} accounts`, 'Detected']}
              contentStyle={{ 
                backgroundColor: 'var(--neutral-50)', 
                borderColor: 'var(--neutral-200)',
                borderRadius: '0.375rem',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mt-4">
        {platformMetrics.slice(0, 3).map((platform) => (
          <div key={platform.platform} className="text-center">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Actioned %</p>
            <p className="text-lg font-semibold">
              {Math.round((platform.reportsActioned / (platform.reportsPending + platform.reportsActioned)) * 100)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlatformBreakdown