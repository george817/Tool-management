import { mockAssets } from './mockAssets'
import { mockUsers } from './mockUsers'

const types = ['issue', 'return', 'maintenance', 'issue', 'overdue', 'return']
const verbs = {
  issue: 'issued',
  return: 'returned',
  maintenance: 'serviced',
  overdue: 'flagged overdue',
}

const day = 24 * 60 * 60 * 1000
const at = (minutesAgo) => new Date(Date.now() - minutesAgo * 60 * 1000).toISOString()

export const mockActivity = Array.from({ length: 216 }, (_, index) => {
  const type = types[index % types.length]
  const asset = mockAssets[(index * 9) % mockAssets.length]
  const user = mockUsers[3 + ((index * 4) % (mockUsers.length - 3))]
  return {
    id: index + 1,
    type,
    user_name: user.name,
    department: user.department,
    asset_id: asset.id,
    asset_name: asset.asset_name,
    asset_code: asset.asset_code,
    action: verbs[type],
    created_at: index < 10 ? at(index * 13 + 2) : new Date(Date.now() - (index % 60) * day - index * 7 * 60 * 1000).toISOString(),
  }
})

export const recordActivity = ({ type, asset, userName, department, action }) => {
  const entry = {
    id: Date.now(),
    type,
    user_name: userName,
    department,
    asset_id: asset.id,
    asset_name: asset.asset_name,
    asset_code: asset.asset_code,
    action: action || verbs[type] || 'updated',
    created_at: new Date().toISOString(),
  }
  mockActivity.unshift(entry)
  return entry
}

