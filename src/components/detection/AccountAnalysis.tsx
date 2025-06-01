import React, { useState } from 'react'
import { Platform } from '../../types'
import { FiSearch, FiAlertTriangle, FiLoader } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useAccountAnalysis } from '../../hooks/useAccountAnalysis'

const AccountAnalysis: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>('X')
  const [username, setUsername] = useState('')
  const { analyzeNewAccount, isAnalyzing, error } = useAccountAnalysis()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return
    
    try {
      await analyzeNewAccount(platform, username)
      setUsername('')
    } catch (err) {
      // Error handling is managed by the hook
    }
  }

  return (
    <div className="card p-5">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FiSearch className="text-primary-600 dark:text-primary-400" />
        Analyze New Account
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="platform" className="block text-sm font-medium mb-1">
            Platform
          </label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="X">X (Twitter)</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="TikTok">TikTok</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username or Profile URL
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={`Enter ${platform} username or profile URL`}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-md bg-error-100 dark:bg-error-900/30 text-error-800 dark:text-error-300 text-sm flex items-center gap-2"
          >
            <FiAlertTriangle className="flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
        
        <button
          type="submit"
          disabled={isAnalyzing || !username.trim()}
          className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <FiLoader className="animate-spin" />
              Analyzing Account...
            </>
          ) : (
            <>
              <FiSearch />
              Analyze Account
            </>
          )}
        </button>
      </form>
      
      <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
        Our AI system will analyze the account for suspicious patterns and potential fake account indicators.
      </p>
    </div>
  )
}

export default AccountAnalysis