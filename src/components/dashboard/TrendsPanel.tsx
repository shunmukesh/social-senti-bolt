import React from 'react'
import { trendInsights } from '../../data/mockAnalytics'
import { formatDistanceToNow } from 'date-fns'
import { FiTrendingUp, FiUsers, FiBarChart2 } from 'react-icons/fi'
import { motion } from 'framer-motion'

const TrendsPanel: React.FC = () => {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">AI-Detected Trends</h2>
        <div className="flex items-center gap-1 text-xs font-medium text-primary-600 dark:text-primary-400">
          <FiTrendingUp className="w-4 h-4" />
          <span>AI-Powered Insights</span>
        </div>
      </div>
      
      <div className="space-y-4 max-h-[400px] overflow-y-auto sentinel-scrollbar pr-2">
        {trendInsights.map((trend, index) => (
          <motion.div 
            key={trend.id}
            className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{trend.title}</h3>
              
              <div className={`
                text-xs px-2 py-0.5 rounded-full font-medium
                ${trend.category === 'Disinformation' && 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-300'}
                ${trend.category === 'Bot Network' && 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'}
                ${trend.category === 'Impersonation' && 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300'}
                ${trend.category === 'Other' && 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300'}
              `}>
                {trend.category}
              </div>
            </div>
            
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{trend.description}</p>
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex gap-3">
                <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
                  <FiUsers className="w-3.5 h-3.5" />
                  <span>{trend.relatedAccounts} accounts</span>
                </div>
                
                <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
                  <FiBarChart2 className="w-3.5 h-3.5" />
                  <span>{(trend.confidence * 100).toFixed(0)}% confidence</span>
                </div>
              </div>
              
              <span className="text-neutral-500 dark:text-neutral-400">
                {formatDistanceToNow(new Date(trend.detectedAt), { addSuffix: true })}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TrendsPanel