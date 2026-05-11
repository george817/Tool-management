import { addDays, formatISO, subDays } from 'date-fns'
import { mockAssets } from './mockAssets'

const vendors = ['Shakti Industrial Services', 'Metro Equipment Care', 'Northline Motors', 'VoltEdge Maintenance', 'PrimeLift Works']

export const mockMaintenance = Array.from({ length: 48 }, (_, index) => {
  const asset = mockAssets[(index * 4) % mockAssets.length]
  const last = subDays(new Date(), 10 + (index * 8) % 220)
  const next = addDays(last, 60 + (index % 5) * 30)

  return {
    id: index + 1,
    asset_id: asset.id,
    asset_name: asset.asset_name,
    asset_code: asset.asset_code,
    asset_type: asset.asset_type,
    last_service: formatISO(last, { representation: 'date' }),
    next_due: formatISO(next, { representation: 'date' }),
    service_type: index % 3 === 0 ? 'Preventive' : index % 3 === 1 ? 'Inspection' : 'Corrective',
    vendor: vendors[index % vendors.length],
    cost: 3500 + (index % 13) * 1850,
    notes: index % 7 === 0 ? 'Part replacement recommended at next interval.' : 'Completed and cleared for use.',
  }
})

export const getMaintenanceStatus = (nextDue) => {
  const due = new Date(nextDue)
  const today = new Date()
  const days = Math.ceil((due - today) / (24 * 60 * 60 * 1000))
  if (days < 0) return 'overdue'
  if (days <= 30) return 'due_soon'
  return 'ok'
}

