import React from 'react'
import { PlatformMetrics } from '../../types'
import { FiClock, FiCheck, FiAlertCircle } from 'react-icons/fi'
import { motion } from 'framer-motion'

interface PlatformMetricsCardProps {
  platform: PlatformMetrics
}

const PlatformMetricsCard: React.FC<PlatformMetricsCardProps> = ({ platform }) => {
  // Calculate action percentage
  const actionPercentage = Math.round((platform.reportsActioned / (platform.reportsPending + platform.reportsActioned)) * 100)
  
  // Determine color based on metrics
  const getActionColor = () => {
    if (actionPercentage >= 70) return 'text-success-500'
    if (actionPercentage >= 40) return 'text-warning-500'
    return 'text-error-500'
  }
  
  const getTimeColor = () => {
    if (platform.avgResolutionTimeHours <= 48) return 'text-success-500'
    if (platform.avgResolutionTimeHours <= 72) return 'text-warning-500'
    return 'text-error-500'
  }

  return (
    <motion.div 
      className="card p-5"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <h3 className="text-lg font-semibold mb-4">{platform.platform}</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <FiAlertCircle className="w-4 h-4" />
            <span>Accounts Detected</span>
          </div>
          <p className="text-2xl font-bold mt-1">{platform.accountsDetected}</p>
        </div>
        
        <div>
          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <FiCheck className="w-4 h-4" />
            <span>Action Rate</span>
          </div>
          <p className={`text-2xl font-bold mt-1 ${getActionColor()}`}>{actionPercentage}%</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <FiClock className="w-4 h-4" />
            <span>Avg. Resolution</span>
          </div>
          <p className={`text-xl font-bold mt-1 ${getTimeColor()}`}>{platform.avgResolutionTimeHours}h</p>
        </div>
        
        <div>
          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <FiAlertCircle className="w-4 h-4" />
            <span>Pending</span>
          </div>
          <p className="text-xl font-bold mt-1">{platform.reportsPending}</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <button className="w-full py-2 px-4 bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/20 dark:hover:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-md text-sm font-medium transition-colors">
          View Platform Dashboard
        </button>
      </div>
    </motion.div>
  )
}

export default PlatformMetricsCard