import { useState, useCallback } from 'react';
import { Account, Platform } from '../types';
import { analyzeAccount } from '../services/ai/detector';
import { fetchAccountData } from '../services/api/socialPlatforms';
import { saveDetectedAccount } from '../services/database';

export function useAccountAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const analyzeNewAccount = useCallback(async (
    platform: Platform,
    username: string
  ) => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Fetch account data from platform API
      const accountData = await fetchAccountData(platform, username);
      
      // Analyze account using AI model
      const analysis = await analyzeAccount(accountData);
      
      // Prepare complete account data
      const account: Account = {
        ...accountData,
        platform,
        detectedAt: new Date().toISOString(),
        detectedBy: 'AI Detection',
        confidenceScore: analysis.confidenceScore,
        status: 'New',
        verifiedBy: null,
        verifiedAt: null,
        suspiciousActivityCount: 0,
        suspiciousActivity: [],
        detectionReasons: analysis.detectionReasons,
        networkConnections: []
      };
      
      // Save to database
      const savedAccount = await saveDetectedAccount(account);
      
      return savedAccount;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to analyze account';
      setError(message);
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  }, []);
  
  return {
    analyzeNewAccount,
    isAnalyzing,
    error
  };
}