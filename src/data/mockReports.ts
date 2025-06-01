import { FakeAccountReport } from '../types'

export const mockReports: FakeAccountReport[] = [
  {
    id: 'report-001',
    accountId: 'acc-003',
    accountName: 'itbp_officer_pradeep',
    platform: 'Instagram',
    reportedAt: '2024-01-04T11:23:41Z',
    status: 'Actioned',
    reportedBy: 'Central Agency',
    evidence: [
      {
        id: 'ev-004',
        type: 'Screenshot',
        capturedAt: '2024-01-03T16:48:12Z',
        content: 'https://images.pexels.com/photos/6483582/pexels-photo-6483582.jpeg',
        description: 'Post revealing sensitive border patrol routes'
      }
    ],
    platformResponse: 'Account has been permanently suspended for impersonation and security violation.',
    resolutionDate: '2024-01-06T09:15:22Z'
  },
  {
    id: 'report-002',
    accountId: 'acc-005',
    accountName: 'truth_sentinel',
    platform: 'X',
    reportedAt: '2024-01-02T15:34:27Z',
    status: 'Pending',
    reportedBy: 'Central Agency',
    evidence: [
      {
        id: 'ev-005',
        type: 'Network',
        capturedAt: '2024-01-02T14:05:22Z',
        content: 'https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg',
        description: 'Network visualization showing coordination with other fake accounts'
      }
    ],
    platformResponse: null,
    resolutionDate: null
  },
  {
    id: 'report-003',
    accountId: 'acc-008',
    accountName: 'border_news_official',
    platform: 'X',
    reportedAt: '2023-12-28T14:22:36Z',
    status: 'Acknowledged',
    reportedBy: 'Field Personnel',
    evidence: [
      {
        id: 'ev-008',
        type: 'Post',
        capturedAt: '2023-12-28T09:12:45Z',
        content: 'BREAKING: Massive security breach along eastern sector. Multiple infiltrations reported. #BorderAlert',
        description: 'False information - no security breach occurred'
      }
    ],
    platformResponse: 'We have received your report and are investigating this account for platform violations.',
    resolutionDate: null
  },
  {
    id: 'report-004',
    accountId: 'acc-012',
    accountName: 'intel_officer_sharma',
    platform: 'Facebook',
    reportedAt: '2023-12-15T11:34:22Z',
    status: 'Denied',
    reportedBy: 'Central Agency',
    evidence: [
      {
        id: 'ev-012',
        type: 'Profile',
        capturedAt: '2023-12-15T09:45:11Z',
        content: 'https://images.pexels.com/photos/3648434/pexels-photo-3648434.jpeg',
        description: 'Profile claiming to be intelligence officer'
      }
    ],
    platformResponse: 'After review, we have determined this account does not violate our community standards.',
    resolutionDate: '2023-12-18T16:22:45Z'
  },
  {
    id: 'report-005',
    accountId: 'acc-015',
    accountName: 'border_insider',
    platform: 'Instagram',
    reportedAt: '2023-12-22T08:56:12Z',
    status: 'Actioned',
    reportedBy: 'Field Personnel',
    evidence: [
      {
        id: 'ev-015',
        type: 'Message',
        capturedAt: '2023-12-21T15:23:47Z',
        content: 'Direct message soliciting information about patrol schedules from junior personnel',
        description: 'Account attempted to gather sensitive operational information'
      }
    ],
    platformResponse: 'Account has been permanently suspended for security violations and attempting to solicit sensitive information.',
    resolutionDate: '2023-12-24T10:45:33Z'
  }
]