import React from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { mockAccounts } from '../../data/mockAccounts'
import { mockReports } from '../../data/mockReports'
import { FiShield, FiCheckCircle, FiAlertCircle, FiClock } from 'react-icons/fi'
import { motion } from 'framer-motion'

interface ActivityItem {
  id: string
  type: 'detection' | 'verification' | 'report' | 'resolution'
  title: string
  description: string
  timestamp: string
  platform: string
  source: string
}

const ActivityFeed: React.FC = () => {
  // Create activity items from mock data
  const activityItems: ActivityItem[] = [
    ...mockAccounts.map(account => ({
      id: `detection-${account.id}`,
      type: 'detection' as const,
      title: `New Fake Account Detected`,
      description: `@${account.username} on ${account.platform}`,
      timestamp: account.detectedAt,
      platform: account.platform,
      source: account.detectedBy
    })),
    ...mockAccounts
      .filter(account => account.verifiedAt)
      .map(account => ({
        id: `verification-${account.id}`,
        type: 'verification' as const,
        title: account.status === 'Verified Fake' 
          ? 'Account Verified as Fake' 
          : 'Account Marked as Legitimate',
        description: `@${account.username} on ${account.platform}`,
        timestamp: account.verifiedAt || '',
        platform: account.platform,
        source: account.verifiedBy || 'Unknown'
      })),
    ...mockReports.map(report => ({
      id: `report-${report.id}`,
      type: 'report' as const,
      title: 'Account Reported to Platform',
      description: `@${report.accountName} on ${report.platform}`,
      timestamp: report.reportedAt,
      platform: report.platform,
      source: report.reportedBy
    })),
    ...mockReports
      .filter(report => report.resolutionDate)
      .map(report => ({
        id: `resolution-${report.id}`,
        type: 'resolution' as const,
        title: report.status === 'Actioned' 
          ? 'Platform Removed Account' 
          : 'Platform Denied Request',
        description: `@${report.accountName} on ${report.platform}`,
        timestamp: report.resolutionDate || '',
        platform: report.platform,
        source: report.platform
      }))
  ]
  
  // Sort by timestamp, most recent first
  const sortedActivity = activityItems
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10) // Just take the 10 most recent

  const getIconForType = (type: string) => {
    switch (type) {
      case 'detection':
        return <FiAlertCircle className="w-4 h-4 text-primary-500" />
      case 'verification':
        return <FiShield className="w-4 h-4 text-secondary-500" />
      case 'report':
        return <FiClock className="w-4 h-4 text-warning-500" />
      case 'resolution':
        return <FiCheckCircle className="w-4 h-4 text-success-500" />
      default:
        return null
    }
  }

  const getSourceBadge = (source: string) => {
    let color = ''
    switch (source) {
      case 'AI Detection':
      case 'AI Verification':
        color = 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
        break
      case 'Human Analyst':
      case 'Human Report':
      case 'Field Personnel':
      case 'Central Agency':
        color = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
        break
      default:
        color = 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300'
    }
    
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full ${color}`}>
        {source}
      </span>
    )
  }

  return (
    <div className="card p-5">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      
      <div className="space-y-4 max-h-[500px] overflow-y-auto sentinel-scrollbar pr-2">
        {sortedActivity.map((item, index) => (
          <motion.div 
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="mt-1">{getIconForType(item.type)}</div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.description}</p>
              
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {getSourceBadge(item.source)}
                <span className="text-xs text-neutral-500 dark:text-neutral-500">
                  {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-500 hidden sm:inline">
                  {format(new Date(item.timestamp), 'MMM d, yyyy, HH:mm')}
                </span>
              </div>
            </div>
            
            <div className="text-xs font-medium px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800">
              {item.platform}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ActivityFeed