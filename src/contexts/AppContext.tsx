import React, { createContext, useContext, useState } from 'react'
import { mockAccounts } from '../data/mockAccounts'
import { mockReports } from '../data/mockReports'
import { Account, FakeAccountReport, ThreatLevel } from '../types'

interface AppContextType {
  accounts: Account[]
  reports: FakeAccountReport[]
  threatLevel: ThreatLevel
  selectedAccount: Account | null
  setSelectedAccount: (account: Account | null) => void
  filterAccounts: (platform?: string, status?: string) => Account[]
  filterReports: (platform?: string, status?: string) => FakeAccountReport[]
  markAccountAsFake: (accountId: string) => void
  markAccountAsLegitimate: (accountId: string) => void
  reportAccount: (accountId: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts)
  const [reports, setReports] = useState<FakeAccountReport[]>(mockReports)
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [threatLevel] = useState<ThreatLevel>('High')

  const filterAccounts = (platform?: string, status?: string) => {
    return accounts.filter(account => {
      const platformMatch = !platform || account.platform === platform
      const statusMatch = !status || account.status === status
      return platformMatch && statusMatch
    })
  }

  const filterReports = (platform?: string, status?: string) => {
    return reports.filter(report => {
      const platformMatch = !platform || report.platform === platform
      const statusMatch = !status || report.status === status
      return platformMatch && statusMatch
    })
  }

  const markAccountAsFake = (accountId: string) => {
    setAccounts(prevAccounts => 
      prevAccounts.map(account => 
        account.id === accountId 
          ? { ...account, status: 'Verified Fake', verifiedBy: 'Human Analyst', verifiedAt: new Date().toISOString() } 
          : account
      )
    )
  }

  const markAccountAsLegitimate = (accountId: string) => {
    setAccounts(prevAccounts => 
      prevAccounts.map(account => 
        account.id === accountId 
          ? { ...account, status: 'False Positive', verifiedBy: 'Human Analyst', verifiedAt: new Date().toISOString() } 
          : account
      )
    )
  }

  const reportAccount = (accountId: string) => {
    const account = accounts.find(a => a.id === accountId)
    if (!account || account.status !== 'Verified Fake') return

    // Check if report already exists
    const existingReport = reports.find(r => r.accountId === accountId)
    if (existingReport) return

    const newReport: FakeAccountReport = {
      id: `report-${Date.now()}`,
      accountId: account.id,
      accountName: account.username,
      platform: account.platform,
      reportedAt: new Date().toISOString(),
      status: 'Pending',
      reportedBy: 'Central Agency',
      evidence: account.evidence || [],
      platformResponse: null,
      resolutionDate: null
    }

    setReports(prevReports => [...prevReports, newReport])
  }

  const value = {
    accounts,
    reports,
    threatLevel,
    selectedAccount,
    setSelectedAccount,
    filterAccounts,
    filterReports,
    markAccountAsFake,
    markAccountAsLegitimate,
    reportAccount
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = (): AppContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}