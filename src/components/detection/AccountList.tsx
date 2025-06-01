import React, { useState } from 'react'
import { Account } from '../../types'
import { FiSearch, FiFilter, FiChevronRight } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useApp } from '../../contexts/AppContext'

interface AccountListProps {
  onSelectAccount: (account: Account) => void
}

const AccountList: React.FC<AccountListProps> = ({ onSelectAccount }) => {
  const { accounts, filterAccounts } = useApp()
  const [searchTerm, setSearchTerm] = useState('')
  const [platformFilter, setPlatformFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  
  const filteredAccounts = filterAccounts(platformFilter, statusFilter)
    .filter(account => 
      account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.detectionReasons.some(reason => 
        reason.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )

  const platforms = ['Facebook', 'Instagram', 'X', 'LinkedIn', 'TikTok']
  const statuses = ['New', 'Under Review', 'Verified Fake', 'False Positive']

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

  return (
    <div className="card h-full flex flex-col">
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-600 dark:focus:border-primary-600"
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="relative inline-block">
            <select
              className="appearance-none bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-md pl-8 pr-8 py-2 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-600 dark:focus:border-primary-600 text-sm"
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
            >
              <option value="">All Platforms</option>
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiFilter className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
            </div>
          </div>
          
          <div className="relative inline-block">
            <select
              className="appearance-none bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-md pl-8 pr-8 py-2 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-600 dark:focus:border-primary-600 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiFilter className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto sentinel-scrollbar">
        <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((account, index) => (
              <motion.li 
                key={account.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <button
                  className="w-full px-4 py-3 flex items-start gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors text-left"
                  onClick={() => onSelectAccount(account)}
                >
                  <img 
                    src={account.profileImage} 
                    alt={account.username}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0" 
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">@{account.username}</h3>
                      <span className="ml-2">
                        <FiChevronRight className="w-4 h-4 text-neutral-400" />
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">
                        {account.platform}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${getStatusColor(account.status)}`}>
                        {account.status}
                      </span>
                    </div>
                    
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                      {account.detectionReasons[0]}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <div className="text-xs flex items-center">
                        <span className="font-medium">Score:</span> 
                        <span 
                          className={`ml-1 ${
                            account.confidenceScore > 0.8 
                              ? 'text-error-600 dark:text-error-400' 
                              : account.confidenceScore > 0.5 
                                ? 'text-warning-600 dark:text-warning-400' 
                                : 'text-success-600 dark:text-success-400'
                          }`}
                        >
                          {(account.confidenceScore * 100).toFixed(0)}%
                        </span>
                      </div>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {new Date(account.detectedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </button>
              </motion.li>
            ))
          ) : (
            <div className="py-8 px-4 text-center text-neutral-500 dark:text-neutral-400">
              No accounts match the current filters
            </div>
          )}
        </ul>
      </div>
      
      <div className="p-3 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 text-xs text-neutral-500 dark:text-neutral-400 text-center">
        Showing {filteredAccounts.length} of {accounts.length} accounts
      </div>
    </div>
  )
}

export default AccountList