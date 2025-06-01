import React from 'react'
import { useApp } from '../contexts/AppContext'
import ThreatLevelIndicator from '../components/dashboard/ThreatLevelIndicator'
import { MetricsGrid } from '../components/dashboard/MetricsWidget'
import PlatformBreakdown from '../components/dashboard/PlatformBreakdown'
import ActivityFeed from '../components/dashboard/ActivityFeed'
import TrendsPanel from '../components/dashboard/TrendsPanel'

const Dashboard: React.FC = () => {
  const { threatLevel } = useApp()
  
  return (
    <div className="space-y-6">
      <MetricsGrid />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ThreatLevelIndicator level={threatLevel} />
        </div>
        <div className="lg:col-span-2">
          <PlatformBreakdown />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        <div className="lg:col-span-1">
          <TrendsPanel />
        </div>
      </div>
    </div>
  )
}

export default Dashboard