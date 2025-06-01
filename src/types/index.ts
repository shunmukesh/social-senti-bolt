export type Platform = 'Facebook' | 'Instagram' | 'X' | 'LinkedIn' | 'TikTok'

export type AccountStatus = 
  | 'New' 
  | 'Under Review' 
  | 'Verified Fake' 
  | 'False Positive'

export type ReportStatus = 
  | 'Pending' 
  | 'Acknowledged' 
  | 'Actioned' 
  | 'Denied'

export type ThreatLevel = 
  | 'Low' 
  | 'Moderate' 
  | 'High' 
  | 'Critical'

export type DetectionSource = 
  | 'AI Detection' 
  | 'Human Report' 
  | 'Partner Report'

export type VerificationSource = 
  | 'AI Verification' 
  | 'Human Analyst' 
  | null

export interface Evidence {
  id: string
  type: 'Screenshot' | 'Post' | 'Profile' | 'Network' | 'Message'
  capturedAt: string
  content: string
  description?: string
}

export interface SuspiciousActivity {
  id: string
  type: string
  timestamp: string
  description: string
  severity: 'Low' | 'Medium' | 'High'
}

export interface NetworkConnection {
  accountId: string
  username: string
  platform: Platform
  connectionType: 'Follower' | 'Following' | 'Friend' | 'Interaction'
  suspiciousScore: number
}

export interface Account {
  id: string
  username: string
  platform: Platform
  profileUrl: string
  profileImage: string
  creationDate: string
  followerCount: number
  followingCount: number
  postCount: number
  bio: string
  location?: string
  detectedAt: string
  detectedBy: DetectionSource
  confidenceScore: number
  status: AccountStatus
  verifiedBy: VerificationSource
  verifiedAt: string | null
  suspiciousActivityCount: number
  suspiciousActivity: SuspiciousActivity[]
  detectionReasons: string[]
  evidence?: Evidence[]
  networkConnections: NetworkConnection[]
}

export interface FakeAccountReport {
  id: string
  accountId: string
  accountName: string
  platform: Platform
  reportedAt: string
  reportedBy: string
  status: ReportStatus
  evidence: Evidence[]
  platformResponse: string | null
  resolutionDate: string | null
}

export interface PlatformMetrics {
  platform: Platform
  accountsDetected: number
  reportsPending: number
  reportsActioned: number
  avgResolutionTimeHours: number
}

export interface RegionHotspot {
  region: string
  country: string
  coordinates: [number, number]
  accountCount: number
  threatLevel: ThreatLevel
}

export interface TrendInsight {
  id: string
  title: string
  description: string
  detectedAt: string
  relatedAccounts: number
  confidence: number
  category: 'Disinformation' | 'Bot Network' | 'Impersonation' | 'Other'
}