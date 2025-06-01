import React, { useState } from 'react'
import { FakeAccountReport } from '../../types'
import { format, formatDistanceToNow } from 'date-fns'
import { FiSearch, FiFilter, FiExternalLink, FiClock, FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi'
import { motion } from 'framer-motion'

interface ReportListProps {
  reports: FakeAccountReport[]
  filterReports: (platform?: string, status?: string) => FakeAccountReport[]
}

const ReportList: React.FC<ReportListProps> = ({ reports, filterReports }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [platformFilter, setPlatformFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  
  const filteredReports = filterReports(platformFilter, statusFilter)
    .filter(report => 
      report.accountName.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const platforms = ['Facebook', 'Instagram', 'X', 'LinkedIn', 'TikTok']
  const statuses = ['Pending', 'Acknowledged', 'Actioned', 'Denied']

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': 
        return <FiClock className="w-5 h-5 text-warning-500" />
      case 'Acknowledged': 
        return <FiAlertCircle className="w-5 h-5 text-primary-500" />
      case 'Actioned': 
        return <FiCheckCircle className="w-5 h-5 text-success-500" />
      case 'Denied': 
        return <FiXCircle className="w-5 h-5 text-error-500" />
      default: 
        return <FiClock className="w-5 h-5 text-warning-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': 
        return 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300'
      case 'Acknowledged': 
        return 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300'
      case 'Actioned': 
        return 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300'
      case 'Denied': 
        return 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-300'
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
            placeholder="Search reports..."
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
        {filteredReports.length > 0 ? (
          <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {filteredReports.map((report, index) => (
              <motion.div 
                key={report.id}
                className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(report.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium">@{report.accountName}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">
                        {report.platform}
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        Reported {formatDistanceToNow(new Date(report.reportedAt), { addSuffix: true })}
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        by {report.reportedBy}
                      </span>
                    </div>
                    
                    {report.platformResponse && (
                      <div className="mt-2 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-md text-sm">
                        <p className="mb-1 font-medium">Platform Response:</p>
                        <p className="text-neutral-600 dark:text-neutral-400">{report.platformResponse}</p>
                      </div>
                    )}
                    
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          ID: {report.id}
                        </span>
                        {report.resolutionDate && (
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            Resolved: {format(new Date(report.resolutionDate), 'MMM d, yyyy')}
                          </span>
                        )}
                      </div>
                      
                      <button className="text-primary-600 dark:text-primary-400 text-sm flex items-center gap-1 hover:underline">
                        <span>View Details</span>
                        <FiExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-8 px-4 text-center text-neutral-500 dark:text-neutral-400">
            No reports match the current filters
          </div>
        )}
      </div>
      
      <div className="p-3 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 text-xs text-neutral-500 dark:text-neutral-400 text-center">
        Showing {filteredReports.length} of {reports.length} reports
      </div>
    </div>
  )
}

export default ReportList