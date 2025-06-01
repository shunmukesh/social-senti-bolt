import React from 'react'
import { useApp } from '../contexts/AppContext'
import ReportList from '../components/reporting/ReportList'
import PlatformMetricsCard from '../components/reporting/PlatformMetricsCard'
import ResolutionChart from '../components/reporting/ResolutionChart'
import { platformMetrics } from '../data/mockAnalytics'

const Reporting: React.FC = () => {
  const { reports, filterReports } = useApp()
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {platformMetrics.slice(0, 3).map(platform => (
          <div key={platform.platform}>
            <PlatformMetricsCard platform={platform} />
          </div>
        ))}
      </div>
      
      <ResolutionChart />
      
      <div className="h-[calc(100vh-32rem)]">
        <ReportList reports={reports} filterReports={filterReports} />
      </div>
    </div>
  )
}

export default Reporting