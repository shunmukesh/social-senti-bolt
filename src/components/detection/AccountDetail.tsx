import React from 'react'
import { Account } from '../../types'
import { format } from 'date-fns'
import { 
  FiUser, FiUsers, FiMessageSquare, FiCalendar, 
  FiMapPin, FiShield, FiClock, FiAlertTriangle 
} from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useApp } from '../../contexts/AppContext'
import ConfidenceScore from './ConfidenceScore'
import NetworkGraph from './NetworkGraph'

interface AccountDetailProps {
  account: Account
}

const AccountDetail: React.FC<AccountDetailProps> = ({ account }) => {
  const { 
    markAccountAsFake, 
    markAccountAsLegitimate, 
    reportAccount 
  } = useApp()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': 
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200'
      case 'Under Review': 
        return 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300'
      case 'Verified Fake': 
        return 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-300'
      case 'False Positive': 
        return 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300'
      default: 
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200'
    }
  }

  const renderActionButtons = () => {
    if (account.status === 'New' || account.status === 'Under Review') {
      return (
        <div className="flex gap-3 mt-6">
          <button 
            className="btn-danger flex-1"
            onClick={() => markAccountAsFake(account.id)}
          >
            Verify as Fake
          </button>
          <button 
            className="btn-secondary flex-1"
            onClick={() => markAccountAsLegitimate(account.id)}
          >
            Mark as Legitimate
          </button>
        </div>
      )
    } else if (account.status === 'Verified Fake') {
      return (
        <div className="mt-6">
          <button 
            className="btn-primary w-full"
            onClick={() => reportAccount(account.id)}
          >
            Report to Platform
          </button>
        </div>
      )
    }
    
    return null
  }

  return (
    <div className="flex flex-col h-full">
      <div className="card p-5 flex-1 overflow-y-auto sentinel-scrollbar">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Header & Profile */}
          <div className="flex items-start gap-4">
            <img 
              src={account.profileImage} 
              alt={account.username}
              className="w-16 h-16 rounded-full object-cover" 
            />
            
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h2 className="text-xl font-semibold">@{account.username}</h2>
                <div className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(account.status)}`}>
                  {account.status}
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                <span className="font-medium px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">
                  {account.platform}
                </span>
                <span>•</span>
                <a 
                  href={account.profileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  View Profile
                </a>
              </div>
              
              <p className="mt-2 text-sm">{account.bio}</p>
            </div>
          </div>
          
          {/* Profile Stats & Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                <FiUsers className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Followers</p>
                <p className="font-medium">{account.followerCount.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                <FiUser className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Following</p>
                <p className="font-medium">{account.followingCount.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                <FiMessageSquare className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Posts</p>
                <p className="font-medium">{account.postCount.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                <FiCalendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Created</p>
                <p className="font-medium">{format(new Date(account.creationDate), 'MMM d, yyyy')}</p>
              </div>
            </div>
          </div>
          
          {account.location && (
            <div className="flex items-center gap-2 text-sm">
              <FiMapPin className="text-neutral-500 dark:text-neutral-400" />
              <span>{account.location}</span>
            </div>
          )}
          
          {/* AI Confidence Score */}
          <div>
            <h3 className="text-base font-medium mb-3 flex items-center gap-2">
              <FiShield className="text-primary-600 dark:text-primary-400" />
              AI Confidence Score
            </h3>
            
            <ConfidenceScore score={account.confidenceScore} />
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Detected by:</h4>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  account.detectedBy === 'AI Detection' 
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                }`}>
                  {account.detectedBy}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  on {format(new Date(account.detectedAt), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
            
            {account.verifiedBy && (
              <div className="mt-3">
                <h4 className="text-sm font-medium mb-2">Verified by:</h4>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    account.verifiedBy === 'AI Verification'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    {account.verifiedBy}
                  </span>
                  {account.verifiedAt && (
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      on {format(new Date(account.verifiedAt), 'MMM d, yyyy')}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Detection Reasons */}
          <div>
            <h3 className="text-base font-medium mb-3 flex items-center gap-2">
              <FiAlertTriangle className="text-warning-500" />
              Reasons for Detection
            </h3>
            
            <ul className="space-y-2">
              {account.detectionReasons.map((reason, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start gap-2 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <span className="inline-block w-4 h-4 rounded-full bg-warning-100 dark:bg-warning-900/30 text-warning-600 dark:text-warning-400 flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                    {index + 1}
                  </span>
                  <span>{reason}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Suspicious Activity */}
          {account.suspiciousActivity.length > 0 && (
            <div>
              <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                <FiClock className="text-error-500" />
                Suspicious Activity ({account.suspiciousActivityCount})
              </h3>
              
              <div className="space-y-3">
                {account.suspiciousActivity.map((activity) => (
                  <div 
                    key={activity.id}
                    className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium">{activity.type}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        activity.severity === 'High' 
                          ? 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-300' 
                          : activity.severity === 'Medium'
                            ? 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300'
                            : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300'
                      }`}>
                        {activity.severity}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                      {activity.description}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      {format(new Date(activity.timestamp), 'MMM d, yyyy, HH:mm')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Evidence */}
          {account.evidence && account.evidence.length > 0 && (
            <div>
              <h3 className="text-base font-medium mb-3">Evidence</h3>
              
              <div className="space-y-4">
                {account.evidence.map((evidence) => (
                  <div 
                    key={evidence.id}
                    className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-medium">{evidence.type}</h4>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {format(new Date(evidence.capturedAt), 'MMM d, yyyy')}
                      </span>
                    </div>
                    
                    {evidence.type === 'Screenshot' || evidence.type === 'Network' ? (
                      <div className="mt-2">
                        <img 
                          src={evidence.content} 
                          alt={evidence.description || 'Evidence'} 
                          className="w-full h-auto rounded-md object-cover" 
                        />
                      </div>
                    ) : (
                      <div className="mt-2 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-md text-sm">
                        {evidence.content}
                      </div>
                    )}
                    
                    {evidence.description && (
                      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                        {evidence.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Network Analysis */}
          {account.networkConnections.length > 0 && (
            <div>
              <h3 className="text-base font-medium mb-3">Network Analysis</h3>
              <NetworkGraph account={account} />
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Action Buttons */}
      <div className="card p-4 mt-4">
        {renderActionButtons()}
      </div>
    </div>
  )
}

export default AccountDetail