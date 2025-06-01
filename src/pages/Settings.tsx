import React from 'react'
import { FiShield, FiUsers, FiKey, FiBell, FiCloud } from 'react-icons/fi'
import { motion } from 'framer-motion'

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <motion.div 
            className="card p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FiShield className="text-primary-600 dark:text-primary-400 w-5 h-5" />
              <h2 className="text-lg font-semibold">AI Model Management</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Current Model</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300 font-medium">
                    Active
                  </span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  SentinelAI v2.4.1 - Detection Precision: 94.2%, False Positive Rate: 3.1%
                </p>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  Last updated: May 15, 2025 • Trained on 1.2M samples • Deployed 14 days ago
                </div>
              </div>
              
              <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Model Training</h3>
                  <button className="text-xs px-3 py-1 rounded bg-primary-600 hover:bg-primary-700 text-white transition-colors">
                    Retrain Model
                  </button>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  Retrain the AI model with the latest verified data to improve detection accuracy.
                </p>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  Recommended: Weekly retraining using human-verified feedback loops
                </div>
              </div>
              
              <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Feature Weighting</h3>
                  <button className="text-xs px-3 py-1 rounded bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 transition-colors">
                    Adjust Weights
                  </button>
                </div>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Account Behavior Analysis</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Content Pattern Recognition</span>
                    <span className="font-medium">25%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Network Connection Analysis</span>
                    <span className="font-medium">20%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Temporal Activity Patterns</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Profile Metadata Analysis</span>
                    <span className="font-medium">5%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div>
          <motion.div 
            className="card p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FiUsers className="text-primary-600 dark:text-primary-400 w-5 h-5" />
              <h2 className="text-lg font-semibold">User Management</h2>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                    CA
                  </div>
                  <div>
                    <p className="font-medium">Central Agency</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Administrator</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary-600 flex items-center justify-center text-white font-bold">
                    FP
                  </div>
                  <div>
                    <p className="font-medium">Field Personnel</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Standard User (12 active)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="mt-4 w-full py-2 text-sm font-medium text-primary-600 dark:text-primary-400 border border-primary-300 dark:border-primary-700 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
              Manage Users
            </button>
          </motion.div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          className="card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <FiKey className="text-primary-600 dark:text-primary-400 w-5 h-5" />
            <h2 className="text-lg font-semibold">API Integrations</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-white font-bold text-xs">f</div>
                <span>Facebook</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300">
                Connected
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-pink-500 flex items-center justify-center text-white font-bold text-xs">I</div>
                <span>Instagram</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300">
                Connected
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-white font-bold text-xs">X</div>
                <span>X / Twitter</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300">
                Limited Access
              </span>
            </div>
          </div>
          
          <button className="mt-4 w-full py-2 text-sm font-medium text-primary-600 dark:text-primary-400 border border-primary-300 dark:border-primary-700 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
            Configure API Keys
          </button>
        </motion.div>
        
        <motion.div 
          className="card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <FiBell className="text-primary-600 dark:text-primary-400 w-5 h-5" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3">
              <span className="text-sm">Critical Alerts</span>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input type="checkbox" id="critical" defaultChecked className="sr-only" />
                <div className="w-10 h-5 bg-neutral-200 rounded-full dark:bg-neutral-700"></div>
                <div className="absolute w-5 h-5 rounded-full transition transform bg-primary-600 left-0"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3">
              <span className="text-sm">New Detections</span>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input type="checkbox" id="detections" defaultChecked className="sr-only" />
                <div className="w-10 h-5 bg-neutral-200 rounded-full dark:bg-neutral-700"></div>
                <div className="absolute w-5 h-5 rounded-full transition transform bg-primary-600 left-0"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3">
              <span className="text-sm">Report Updates</span>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input type="checkbox" id="updates" defaultChecked className="sr-only" />
                <div className="w-10 h-5 bg-neutral-200 rounded-full dark:bg-neutral-700"></div>
                <div className="absolute w-5 h-5 rounded-full transition transform bg-primary-600 left-0"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3">
              <span className="text-sm">Weekly Summaries</span>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input type="checkbox" id="summaries" className="sr-only" />
                <div className="w-10 h-5 bg-neutral-200 rounded-full dark:bg-neutral-700"></div>
                <div className="absolute w-5 h-5 rounded-full transition transform bg-neutral-400 dark:bg-neutral-600 left-0"></div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <FiCloud className="text-primary-600 dark:text-primary-400 w-5 h-5" />
            <h2 className="text-lg font-semibold">Data Management</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Data Retention</span>
                <span className="text-xs font-medium text-primary-600 dark:text-primary-400">Configure</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Evidence is automatically archived after 180 days. Critical evidence is retained indefinitely.
              </p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Storage Usage</span>
                <span className="text-xs font-medium text-primary-600 dark:text-primary-400">Manage</span>
              </div>
              <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500" style={{ width: '42%' }}></div>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                4.2 GB used of 10 GB (42%)
              </p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Backup Schedule</span>
                <span className="text-xs font-medium text-primary-600 dark:text-primary-400">Edit</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Daily backups at 00:00 UTC, weekly archives on Sundays
              </p>
            </div>
          </div>
          
          <button className="mt-4 w-full py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            Export All Data
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default Settings