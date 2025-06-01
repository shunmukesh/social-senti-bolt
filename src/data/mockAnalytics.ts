import { PlatformMetrics, RegionHotspot, TrendInsight } from '../types'

export const platformMetrics: PlatformMetrics[] = [
  {
    platform: 'X',
    accountsDetected: 127,
    reportsPending: 38,
    reportsActioned: 76,
    avgResolutionTimeHours: 52
  },
  {
    platform: 'Facebook',
    accountsDetected: 92,
    reportsPending: 31,
    reportsActioned: 54,
    avgResolutionTimeHours: 68
  },
  {
    platform: 'Instagram',
    accountsDetected: 84,
    reportsPending: 23,
    reportsActioned: 49,
    avgResolutionTimeHours: 43
  },
  {
    platform: 'LinkedIn',
    accountsDetected: 41,
    reportsPending: 15,
    reportsActioned: 22,
    avgResolutionTimeHours: 92
  },
  {
    platform: 'TikTok',
    accountsDetected: 68,
    reportsPending: 27,
    reportsActioned: 33,
    avgResolutionTimeHours: 61
  }
]

export const regionHotspots: RegionHotspot[] = [
  {
    region: 'Northern Border',
    country: 'Region A',
    coordinates: [78.5, 35.8],
    accountCount: 87,
    threatLevel: 'Critical'
  },
  {
    region: 'Eastern Sector',
    country: 'Region B',
    coordinates: [95.2, 28.3],
    accountCount: 64,
    threatLevel: 'High'
  },
  {
    region: 'Western Front',
    country: 'Region C',
    coordinates: [70.1, 33.4],
    accountCount: 43,
    threatLevel: 'Moderate'
  },
  {
    region: 'Southern Region',
    country: 'Region D',
    coordinates: [77.6, 8.9],
    accountCount: 22,
    threatLevel: 'Low'
  },
  {
    region: 'Central Zone',
    country: 'Domestic',
    coordinates: [78.9, 20.7],
    accountCount: 35,
    threatLevel: 'Moderate'
  }
]

export const trendInsights: TrendInsight[] = [
  {
    id: 'trend-001',
    title: 'Coordinated Anti-Border Security Campaign',
    description: 'Network of 120+ accounts spreading identical messaging about border incursions and security failures',
    detectedAt: '2024-01-07T08:23:45Z',
    relatedAccounts: 127,
    confidence: 0.94,
    category: 'Disinformation'
  },
  {
    id: 'trend-002',
    title: 'Military Personnel Impersonation Ring',
    description: 'Sophisticated operation creating fake accounts of senior military personnel to establish credibility and spread misinformation',
    detectedAt: '2024-01-05T15:34:22Z',
    relatedAccounts: 43,
    confidence: 0.91,
    category: 'Impersonation'
  },
  {
    id: 'trend-003',
    title: 'Automated Bot Network - Eastern Sector',
    description: 'Highly automated bot network targeting hashtags related to eastern border security operations',
    detectedAt: '2024-01-03T11:45:36Z',
    relatedAccounts: 89,
    confidence: 0.87,
    category: 'Bot Network'
  },
  {
    id: 'trend-004',
    title: 'Coordinated False Reporting Campaign',
    description: 'Network attempting to trigger panic by reporting false security incidents across multiple platforms',
    detectedAt: '2024-01-01T09:56:12Z',
    relatedAccounts: 65,
    confidence: 0.88,
    category: 'Disinformation'
  },
  {
    id: 'trend-005',
    title: 'New Evasion Techniques Detected',
    description: 'Accounts using sophisticated methods to avoid automated detection including linguistic switching and profile morphing',
    detectedAt: '2023-12-29T14:23:51Z',
    relatedAccounts: 37,
    confidence: 0.82,
    category: 'Other'
  }
]

export const weeklyDetectionData = [
  { date: '2023-12-10', count: 24 },
  { date: '2023-12-17', count: 31 },
  { date: '2023-12-24', count: 27 },
  { date: '2023-12-31', count: 42 },
  { date: '2024-01-07', count: 56 },
  { date: '2024-01-14', count: 73 },
  { date: '2024-01-21', count: 65 },
]

export const platformResponseRates = [
  { platform: 'X', responseTime: 48, actionRate: 0.72 },
  { platform: 'Facebook', responseTime: 72, actionRate: 0.59 },
  { platform: 'Instagram', responseTime: 36, actionRate: 0.68 },
  { platform: 'LinkedIn', responseTime: 96, actionRate: 0.54 },
  { platform: 'TikTok', responseTime: 60, actionRate: 0.49 },
]

export const accountTypeDistribution = [
  { type: 'Disinformation', count: 142 },
  { type: 'Impersonation', count: 97 },
  { type: 'Bot Network', count: 124 },
  { type: 'Phishing', count: 63 },
  { type: 'Coordinated Inauthentic', count: 86 }
]