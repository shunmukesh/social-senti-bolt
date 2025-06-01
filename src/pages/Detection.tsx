import React from 'react'
import { useApp } from '../contexts/AppContext'
import AccountList from '../components/detection/AccountList'
import AccountDetail from '../components/detection/AccountDetail'
import AccountAnalysis from '../components/detection/AccountAnalysis'
import { motion } from 'framer-motion'

const Detection: React.FC = () => {
  const { selectedAccount, setSelectedAccount } = useApp()
  
  return (
    <div className="h-[calc(100vh-6.5rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <div className="lg:col-span-1 h-full flex flex-col gap-6">
          <AccountAnalysis />
          <div className="flex-1">
            <AccountList onSelectAccount={setSelectedAccount} />
          </div>
        </div>
        
        <div className="lg:col-span-2 h-full">
          {selectedAccount ? (
            <AccountDetail account={selectedAccount} />
          ) : (
            <motion.div 
              className="card h-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center max-w-md p-6">
                <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-2">Select an Account to Analyze</h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Choose an account from the list to view detailed analysis, 
                  AI confidence scoring, and verification options.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Detection