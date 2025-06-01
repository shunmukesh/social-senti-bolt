import React from 'react'
import { FiTrendingUp, FiUsers, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi'
import { motion } from 'framer-motion'

interface MetricsWidgetProps {
  title: string
  value: number
  change?: number
  icon: React.ReactNode
  color: string
}

const MetricsWidget: React.FC<MetricsWidgetProps> = ({ 
  title, 
  value, 
  change, 
  icon,
  color
}) => {
  return (
    <motion.div 
      className="card p-5"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value.toLocaleString()}</h3>
          
          {change !== undefined && (
            <div className="flex items-center mt-2">
              <FiTrendingUp className={`w-4 h-4 ${change >= 0 ? 'text-success-500' : 'text-error-500'}`} />
              <span className={`text-xs ml-1 ${change >= 0 ? 'text-success-500' : 'text-error-500'}`}>
                {change >= 0 ? '+' : ''}{change}% from last week
              </span>
            </div>
          )}
        </div>
        
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  )
}

export const MetricsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <MetricsWidget 
        title="Detected (24h)" 
        value={86} 
        change={12} 
        icon={<FiAlertTriangle className="w-5 h-5 text-white" />}
        color="bg-primary-600"
      />
      <MetricsWidget 
        title="Under Review" 
        value={124} 
        icon={<FiUsers className="w-5 h-5 text-white" />}
        color="bg-accent-600"
      />
      <MetricsWidget 
        title="Verified Fake" 
        value={352} 
        change={8} 
        icon={<FiCheckCircle className="w-5 h-5 text-white" />}
        color="bg-secondary-600"
      />
      <MetricsWidget 
        title="Accounts Removed" 
        value={218} 
        change={-2} 
        icon={<FiUsers className="w-5 h-5 text-white" />}
        color="bg-error-600"
      />
    </div>
  )
}

export default MetricsWidget