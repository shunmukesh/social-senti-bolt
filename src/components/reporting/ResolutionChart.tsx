import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { platformResponseRates } from '../../data/mockAnalytics'

const ResolutionChart: React.FC = () => {
  const data = platformResponseRates.map(item => ({
    name: item.platform,
    responseTime: item.responseTime,
    actionRate: Math.round(item.actionRate * 100)
  }))

  return (
    <div className="card p-5">
      <h2 className="text-lg font-semibold mb-4">Platform Response Analysis</h2>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" label={{ value: 'Response Time (hours)', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Action Rate (%)', angle: -90, position: 'insideRight' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--neutral-50)', 
                borderColor: 'var(--neutral-200)',
                borderRadius: '0.375rem'
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="responseTime" fill="#3B82F6" name="Avg. Response Time (hours)" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="actionRate" fill="#10B981" name="Action Rate (%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
        <p className="mb-2">
          <span className="font-medium">Analysis:</span> Instagram shows the best performance with 
          quick response times and high action rates, while LinkedIn has the longest response times 
          but moderate action rates.
        </p>
        <p>
          <span className="font-medium">Recommendation:</span> Prioritize urgent reports to Instagram 
          for fastest resolution. For LinkedIn reports, include more comprehensive evidence to improve 
          action rates.
        </p>
      </div>
    </div>
  )
}

export default ResolutionChart