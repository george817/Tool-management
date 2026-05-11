import { mockAssets } from '../data/mockAssets'
import { mockUsers } from '../data/mockUsers'
import { recordActivity } from '../data/mockActivity'
import { recordTransaction } from '../data/mockTransactions'
import { delay } from './delay'

const searchText = (asset) => [
  asset.asset_name,
  asset.asset_code,
  asset.asset_type,
  asset.category,
  asset.status,
  asset.location,
  asset.issued_to,
].filter(Boolean).join(' ').toLowerCase()

const applyFilters = (assets, filters = {}) => {
  let result = [...assets]
  if (filters.status && filters.status !== 'all') {
    result = result.filter((asset) => asset.status === filters.status)
  }
  if (filters.type && filters.type !== 'all') {
    result = result.filter((asset) => asset.asset_type === filters.type)
  }
  if (filters.location) {
    result = result.filter((asset) => asset.location.toLowerCase().includes(filters.location.toLowerCase()))
  }
  if (filters.q) {
    result = result.filter((asset) => searchText(asset).includes(filters.q.toLowerCase()))
  }
  return result
}

const actorFrom = (actor) => actor || { name: 'Ravi Kumar', department: 'Tool Room' }

export const assetService = {
  getAll: async (filters = {}) => {
    await delay(350, 650)
    return { data: applyFilters(mockAssets, filters), success: true }
  },

  getById: async (id) => {
    await delay(200, 420)
    const asset = mockAssets.find((item) => item.id === Number(id))
    return asset ? { data: asset, success: true } : { data: null, success: false, message: 'Asset not found' }
  },

  issueAsset: async (assetId, issuedTo, remarks = '', actor) => {
    await delay(500, 800)
    const asset = mockAssets.find((item) => item.id === Number(assetId))
    if (!asset) return { data: null, success: false, message: 'Asset not found' }

    const worker = mockUsers.find((user) => user.name.toLowerCase() === issuedTo.toLowerCase())
    asset.status = 'issued'
    asset.issued_to = issuedTo
    asset.issued_to_id = worker?.id || null
    asset.issued_department = worker?.department || 'Field Operations'
    asset.issued_date = new Date().toISOString()
    asset.due_date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    asset.location = worker?.department || asset.location

    const user = actorFrom(actor)
    recordActivity({ type: 'issue', asset, userName: user.name, department: user.department, action: `issued to ${issuedTo}` })
    recordTransaction({
      type: 'issue',
      asset_id: asset.id,
      asset_name: asset.asset_name,
      asset_code: asset.asset_code,
      asset_type: asset.asset_type,
      user_id: user.id,
      user_name: user.name,
      department: user.department,
      issued_to: issuedTo,
      remarks,
    })

    return { data: asset, success: true, message: `${asset.asset_name} issued to ${issuedTo}` }
  },

  returnAsset: async (assetId, condition = 'good', remarks = '', actor) => {
    await delay(500, 800)
    const asset = mockAssets.find((item) => item.id === Number(assetId))
    if (!asset) return { data: null, success: false, message: 'Asset not found' }

    const returnedBy = asset.issued_to
    asset.status = condition === 'damaged' ? 'under_repair' : 'available'
    asset.condition = condition === 'damaged' ? 'poor' : condition
    asset.location = condition === 'damaged' ? 'Workshop' : 'Tool Room A'
    asset.issued_to = null
    asset.issued_to_id = null
    asset.issued_department = null
    asset.issued_date = null
    asset.due_date = null

    const user = actorFrom(actor)
    recordActivity({ type: 'return', asset, userName: user.name, department: user.department, action: `returned by ${returnedBy || 'field team'}` })
    recordTransaction({
      type: 'return',
      asset_id: asset.id,
      asset_name: asset.asset_name,
      asset_code: asset.asset_code,
      asset_type: asset.asset_type,
      user_id: user.id,
      user_name: user.name,
      department: user.department,
      condition,
      remarks,
    })

    return { data: asset, success: true, message: `${asset.asset_name} returned successfully` }
  },

  search: async (query) => {
    await delay(250, 450)
    return { data: applyFilters(mockAssets, { q: query }), success: true }
  },

  addAsset: async (asset) => {
    await delay(450, 700)
    const id = Math.max(...mockAssets.map((item) => item.id)) + 1
    const next = {
      id,
      asset_code: asset.asset_code || `AST-2024-${String(id).padStart(4, '0')}`,
      quantity: 1,
      condition: 'good',
      status: 'available',
      issued_to: null,
      issued_to_id: null,
      issued_department: null,
      issued_date: null,
      due_date: null,
      purchase_date: new Date().toISOString(),
      value: 0,
      notes: '',
      ...asset,
    }
    mockAssets.unshift(next)
    recordActivity({ type: 'maintenance', asset: next, userName: 'Priya Sharma', department: 'Operations', action: 'added asset record' })
    return { data: next, success: true, message: `${next.asset_name} added` }
  },

  updateAsset: async (assetId, changes) => {
    await delay(400, 650)
    const asset = mockAssets.find((item) => item.id === Number(assetId))
    if (!asset) return { data: null, success: false, message: 'Asset not found' }
    Object.assign(asset, changes)
    recordActivity({ type: 'maintenance', asset, userName: 'Priya Sharma', department: 'Operations', action: 'updated asset record' })
    return { data: asset, success: true, message: `${asset.asset_name} updated` }
  },
}

