import React from 'react'
import { ThreatLevel } from '../../types'
import { motion } from 'framer-motion'

interface ThreatLevelIndicatorProps {
  level: ThreatLevel
}

const ThreatLevelIndicator: React.FC<ThreatLevelIndicatorProps> = ({ level }) => {
  const getColor = () => {
    switch (level) {
      case 'Low':
        return 'bg-success-500'
      case 'Moderate':
        return 'bg-warning-500'
      case 'High':
        return 'bg-orange-500'
      case 'Critical':
        return 'bg-error-500'
      default:
        return 'bg-neutral-500'
    }
  }

  const getPercentage = () => {
    switch (level) {
      case 'Low':
        return 25
      case 'Moderate':
        return 50
      case 'High':
        return 75
      case 'Critical':
        return 100
      default:
        return 0
    }
  }

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Current Threat Level</h2>
        <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getColor()}`}>
          {level}
        </div>
      </div>
      
      <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${getColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${getPercentage()}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      
      <div className="flex justify-between mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        <span>Low</span>
        <span>Moderate</span>
        <span>High</span>
        <span>Critical</span>
      </div>
      
      <div className="mt-4 text-sm">
        <p className="mb-2">
          <span className="font-medium">Primary Concern:</span> {' '}
          {level === 'High' || level === 'Critical' 
            ? 'Coordinated disinformation campaign detected across multiple platforms'
            : 'Isolated fake accounts with limited reach and engagement'
          }
        </p>
        <p>
          <span className="font-medium">Recommended Action:</span> {' '}
          {level === 'High' || level === 'Critical'
            ? 'Immediate review and reporting of all detected accounts'
            : 'Regular monitoring and scheduled reviews'
          }
        </p>
      </div>
    </div>
  )
}

export default ThreatLevelIndicator