import { Account } from '../types'

export const mockAccounts: Account[] = [
  {
    id: 'acc-001',
    username: 'national_security_updates',
    platform: 'X',
    profileUrl: 'https://x.com/national_security_updates',
    profileImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    creationDate: '2023-09-15T10:23:45Z',
    followerCount: 4312,
    followingCount: 127,
    postCount: 432,
    bio: 'Official security updates from the border. Verified information only.',
    location: 'North Region',
    detectedAt: '2024-01-05T08:12:33Z',
    detectedBy: 'AI Detection',
    confidenceScore: 0.92,
    status: 'New',
    verifiedBy: null,
    verifiedAt: null,
    suspiciousActivityCount: 12,
    suspiciousActivity: [
      {
        id: 'act-001',
        type: 'Posting Pattern',
        timestamp: '2024-01-04T23:45:12Z',
        description: 'Automated posting detected with precise 4-hour intervals',
        severity: 'High'
      },
      {
        id: 'act-002',
        type: 'Content Analysis',
        timestamp: '2024-01-03T14:22:48Z',
        description: 'Posts contain disinformation about border security operations',
        severity: 'High'
      }
    ],
    detectionReasons: [
      'Suspicious creation date (account age < 6 months)',
      'Bot-like posting pattern detected',
      'Profile impersonates official security channel',
      'Content matched known disinformation patterns',
      'Network connection to previously identified fake accounts'
    ],
    evidence: [
      {
        id: 'ev-001',
        type: 'Screenshot',
        capturedAt: '2024-01-05T08:15:22Z',
        content: 'https://images.pexels.com/photos/6347919/pexels-photo-6347919.jpeg',
        description: 'Account profile showing fake verification badge'
      },
      {
        id: 'ev-002',
        type: 'Post',
        capturedAt: '2024-01-04T23:45:12Z',
        content: 'ALERT: Security forces withdrawing from northern border sector. Local residents should prepare for potential incursions.',
        description: 'False information - no such withdrawal has occurred'
      }
    ],
    networkConnections: [
      {
        accountId: 'acc-005',
        username: 'truth_sentinel',
        platform: 'X',
        connectionType: 'Follower',
        suspiciousScore: 0.87
      },
      {
        accountId: 'acc-008',
        username: 'border_news_official',
        platform: 'X',
        connectionType: 'Following',
        suspiciousScore: 0.91
      }
    ]
  },
  {
    id: 'acc-002',
    username: 'cmdr.rajput2024',
    platform: 'Facebook',
    profileUrl: 'https://facebook.com/cmdr.rajput2024',
    profileImage: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg',
    creationDate: '2023-11-02T15:34:21Z',
    followerCount: 1834,
    followingCount: 56,
    postCount: 78,
    bio: 'Commander, Special Forces. Western Sector. DM for sensitive information.',
    location: 'Western Region',
    detectedAt: '2024-01-07T11:32:47Z',
    detectedBy: 'AI Detection',
    confidenceScore: 0.88,
    status: 'Under Review',
    verifiedBy: null,
    verifiedAt: null,
    suspiciousActivityCount: 5,
    suspiciousActivity: [
      {
        id: 'act-003',
        type: 'Profile Analysis',
        timestamp: '2024-01-07T11:35:22Z',
        description: 'Account impersonates military commander using recycled profile image',
        severity: 'High'
      }
    ],
    detectionReasons: [
      'Impersonation of military personnel',
      'Profile image reverse search shows stock photo',
      'Solicits sensitive information via direct messages',
      'Location inconsistent with claimed role'
    ],
    evidence: [
      {
        id: 'ev-003',
        type: 'Profile',
        capturedAt: '2024-01-07T11:33:12Z',
        content: 'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg',
        description: 'Profile claiming to be military commander'
      }
    ],
    networkConnections: [
      {
        accountId: 'acc-012',
        username: 'intel_officer_sharma',
        platform: 'Facebook',
        connectionType: 'Friend',
        suspiciousScore: 0.79
      }
    ]
  },
  {
    id: 'acc-003',
    username: 'itbp_officer_pradeep',
    platform: 'Instagram',
    profileUrl: 'https://instagram.com/itbp_officer_pradeep',
    profileImage: 'https://images.pexels.com/photos/2955375/pexels-photo-2955375.jpeg',
    creationDate: '2023-10-18T09:12:53Z',
    followerCount: 3257,
    followingCount: 243,
    postCount: 187,
    bio: 'Official ITBP Officer. Sharing daily updates from the field. #BorderSecurity',
    location: 'Eastern Region',
    detectedAt: '2024-01-03T16:45:32Z',
    detectedBy: 'Human Report',
    confidenceScore: 0.95,
    status: 'Verified Fake',
    verifiedBy: 'Human Analyst',
    verifiedAt: '2024-01-04T10:23:41Z',
    suspiciousActivityCount: 8,
    suspiciousActivity: [
      {
        id: 'act-004',
        type: 'Content Analysis',
        timestamp: '2024-01-02T19:12:34Z',
        description: 'Posts contain geolocation data exposing sensitive border positions',
        severity: 'High'
      }
    ],
    detectionReasons: [
      'Unauthorized use of ITBP insignia and credentials',
      'Posts reveal sensitive operational information',
      'Account created shortly before disinformation campaign',
      'Linguistic analysis shows non-native language patterns'
    ],
    evidence: [
      {
        id: 'ev-004',
        type: 'Screenshot',
        capturedAt: '2024-01-03T16:48:12Z',
        content: 'https://images.pexels.com/photos/6483582/pexels-photo-6483582.jpeg',
        description: 'Post revealing sensitive border patrol routes'
      }
    ],
    networkConnections: [
      {
        accountId: 'acc-015',
        username: 'border_insider',
        platform: 'Instagram',
        connectionType: 'Follower',
        suspiciousScore: 0.93
      }
    ]
  },
  {
    id: 'acc-004',
    username: 'defense_ministry_updates',
    platform: 'X',
    profileUrl: 'https://x.com/defense_ministry_updates',
    profileImage: 'https://images.pexels.com/photos/7899528/pexels-photo-7899528.jpeg',
    creationDate: '2023-12-05T14:28:36Z',
    followerCount: 5673,
    followingCount: 42,
    postCount: 231,
    bio: 'Latest updates from the Ministry of Defense. Not affiliated with any official entity.',
    location: 'Capital Region',
    detectedAt: '2024-01-08T07:23:16Z',
    detectedBy: 'AI Detection',
    confidenceScore: 0.81,
    status: 'False Positive',
    verifiedBy: 'Human Analyst',
    verifiedAt: '2024-01-09T11:45:22Z',
    suspiciousActivityCount: 3,
    suspiciousActivity: [
      {
        id: 'act-005',
        type: 'Account Activity',
        timestamp: '2024-01-08T02:12:45Z',
        description: 'Unusual posting time pattern detected',
        severity: 'Medium'
      }
    ],
    detectionReasons: [
      'Similar name to official accounts',
      'Unusual posting time patterns',
      'High follower growth rate'
    ],
    evidence: [],
    networkConnections: []
  },
  {
    id: 'acc-005',
    username: 'truth_sentinel',
    platform: 'X',
    profileUrl: 'https://x.com/truth_sentinel',
    profileImage: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg',
    creationDate: '2023-08-22T11:15:42Z',
    followerCount: 2894,
    followingCount: 156,
    postCount: 578,
    bio: 'Exposing the truth about border operations that the media won\'t tell you.',
    location: 'Unknown',
    detectedAt: '2024-01-02T13:56:29Z',
    detectedBy: 'AI Detection',
    confidenceScore: 0.87,
    status: 'Verified Fake',
    verifiedBy: 'AI Verification',
    verifiedAt: '2024-01-02T14:12:33Z',
    suspiciousActivityCount: 15,
    suspiciousActivity: [
      {
        id: 'act-006',
        type: 'Network Analysis',
        timestamp: '2024-01-02T13:58:12Z',
        description: 'Part of coordinated network of 34+ accounts spreading identical messages',
        severity: 'High'
      }
    ],
    detectionReasons: [
      'Part of coordinated influence operation',
      'Linguistic analysis matches known foreign operators',
      'Amplifies known disinformation narratives',
      'Uses advanced obfuscation techniques to avoid detection'
    ],
    evidence: [
      {
        id: 'ev-005',
        type: 'Network',
        capturedAt: '2024-01-02T14:05:22Z',
        content: 'https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg',
        description: 'Network visualization showing coordination with other fake accounts'
      }
    ],
    networkConnections: [
      {
        accountId: 'acc-001',
        username: 'national_security_updates',
        platform: 'X',
        connectionType: 'Following',
        suspiciousScore: 0.92
      }
    ]
  }
]