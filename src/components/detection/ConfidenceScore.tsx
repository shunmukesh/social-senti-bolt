import React from 'react'
import { motion } from 'framer-motion'

interface ConfidenceScoreProps {
  score: number
}

const ConfidenceScore: React.FC<ConfidenceScoreProps> = ({ score }) => {
  const percentage = score * 100
  
  const getColor = () => {
    if (percentage >= 80) return 'bg-error-500 dark:bg-error-600'
    if (percentage >= 50) return 'bg-warning-500 dark:bg-warning-600'
    return 'bg-success-500 dark:bg-success-600'
  }

  const getTextColor = () => {
    if (percentage >= 80) return 'text-error-600 dark:text-error-400'
    if (percentage >= 50) return 'text-warning-600 dark:text-warning-400'
    return 'text-success-600 dark:text-success-400'
  }

  // Factors that influence confidence score
  const factors = [
    {
      name: 'Account Age',
      contribution: percentage >= 70 ? 'High Risk' : percentage >= 40 ? 'Medium Risk' : 'Low Risk',
      weight: percentage >= 70 ? 0.25 : percentage >= 40 ? 0.15 : 0.05
    },
    {
      name: 'Posting Pattern',
      contribution: percentage >= 80 ? 'High Risk' : percentage >= 50 ? 'Medium Risk' : 'Low Risk',
      weight: percentage >= 80 ? 0.30 : percentage >= 50 ? 0.20 : 0.10
    },
    {
      name: 'Network Analysis',
      contribution: percentage >= 75 ? 'High Risk' : percentage >= 45 ? 'Medium Risk' : 'Low Risk',
      weight: percentage >= 75 ? 0.25 : percentage >= 45 ? 0.15 : 0.05
    },
    {
      name: 'Content Analysis',
      contribution: percentage >= 65 ? 'High Risk' : percentage >= 40 ? 'Medium Risk' : 'Low Risk',
      weight: percentage >= 65 ? 0.20 : percentage >= 40 ? 0.10 : 0.05
    }
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium">AI Confidence Score</span>
        <span className={`text-lg font-bold ${getTextColor()}`}>{percentage.toFixed(0)}%</span>
      </div>
      
      <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${getColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Key Factors</h4>
        <div className="space-y-3">
          {factors.map((factor, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className={`inline-block w-1 h-6 rounded-sm ${
                  factor.contribution === 'High Risk' 
                    ? 'bg-error-500' 
                    : factor.contribution === 'Medium Risk'
                      ? 'bg-warning-500'
                      : 'bg-success-500'
                }`}></span>
                <span>{factor.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  factor.contribution === 'High Risk' 
                    ? 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-300' 
                    : factor.contribution === 'Medium Risk'
                      ? 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300'
                      : 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300'
                }`}>
                  {factor.contribution}
                </span>
                <span className="text-neutral-500 dark:text-neutral-400 w-10 text-right">
                  {(factor.weight * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-md text-sm">
        <p className="text-primary-800 dark:text-primary-300">
          <span className="font-medium">AI Explanation:</span> This account exhibits multiple suspicious indicators, 
          including {percentage >= 70 ? 'highly automated posting patterns' : 'irregular activity patterns'} and 
          {percentage >= 75 ? ' strong connections to known fake accounts' : ' some suspicious network connections'}.
          {percentage >= 65 ? ' Content analysis indicates coordinated messaging with other suspicious accounts.' : ''}
        </p>
      </div>
    </div>
  )
}

export default ConfidenceScore