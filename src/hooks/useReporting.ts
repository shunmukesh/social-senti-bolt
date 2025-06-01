import { useState, useCallback } from 'react';
import { Account, FakeAccountReport } from '../types';
import { reportAccount } from '../services/api/socialPlatforms';
import { saveReport } from '../services/database';

export function useReporting() {
  const [isReporting, setIsReporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const submitReport = useCallback(async (account: Account) => {
    setIsReporting(true);
    setError(null);
    
    try {
      // Submit report to platform
      const platformResponse = await reportAccount(
        account.platform,
        account.id,
        account.evidence || []
      );
      
      // Create report record
      const report: FakeAccountReport = {
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
      };
      
      // Save report to database
      const savedReport = await saveReport(report);
      
      return savedReport;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit report';
      setError(message);
      throw err;
    } finally {
      setIsReporting(false);
    }
  }, []);
  
  return {
    submitReport,
    isReporting,
    error
  };
}