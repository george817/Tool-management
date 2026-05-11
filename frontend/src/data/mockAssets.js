import { mockUsers } from './mockUsers'

const day = 24 * 60 * 60 * 1000
const dateDaysAgo = (days) => new Date(Date.now() - days * day).toISOString()
const dateDaysAhead = (days) => new Date(Date.now() + days * day).toISOString()

const baseAssets = [
  { asset_name: 'Makita HR2630 Rotary Hammer', asset_type: 'Tool', category: 'Power Tools', status: 'available', condition: 'good', location: 'Tool Room A', quantity: 3, last_serviced: '2026-04-15' },
  { asset_name: 'Snap-on 3/8" Torque Wrench', asset_type: 'Tool', category: 'Hand Tools', status: 'issued', condition: 'good', location: 'Site B', quantity: 1, last_serviced: '2026-03-20' },
  { asset_name: 'Bosch GWS 22-230 Angle Grinder', asset_type: 'Tool', category: 'Power Tools', status: 'under_repair', condition: 'fair', location: 'Workshop', quantity: 2, last_serviced: '2026-02-10' },
  { asset_name: 'Hilti TE 60 Rotary Hammer', asset_type: 'Tool', category: 'Power Tools', status: 'available', condition: 'good', location: 'Tool Room A', quantity: 1, last_serviced: '2026-04-01' },
  { asset_name: 'Stanley 25ft Measuring Tape', asset_type: 'Tool', category: 'Measuring', status: 'available', condition: 'good', location: 'Tool Room B', quantity: 8, last_serviced: null },
  { asset_name: 'Fluke 117 Digital Multimeter', asset_type: 'Tool', category: 'Measuring', status: 'issued', condition: 'good', location: 'Electrical Bay', quantity: 2, last_serviced: null },
  { asset_name: 'DeWalt DCD796 Cordless Drill', asset_type: 'Tool', category: 'Power Tools', status: 'overdue', condition: 'good', location: 'Unknown', quantity: 1, last_serviced: '2026-03-05' },
  { asset_name: 'Ridgid 14" Pipe Cutter', asset_type: 'Tool', category: 'Plumbing Tools', status: 'available', condition: 'fair', location: 'Tool Room A', quantity: 2, last_serviced: null },
  { asset_name: 'JCB 3CX Backhoe Loader', asset_type: 'Equipment', category: 'Earthmoving', status: 'operational', condition: 'good', location: 'Site A', quantity: 1, last_serviced: '2026-04-20' },
  { asset_name: 'Caterpillar 320 Excavator', asset_type: 'Equipment', category: 'Earthmoving', status: 'operational', condition: 'good', location: 'Site C', quantity: 1, last_serviced: '2026-03-15' },
  { asset_name: 'Komatsu WB93R-8 Backhoe', asset_type: 'Equipment', category: 'Earthmoving', status: 'under_repair', condition: 'poor', location: 'Workshop', quantity: 1, last_serviced: '2026-02-28' },
  { asset_name: 'Toyota 8FBN25 Forklift', asset_type: 'Equipment', category: 'Material Handling', status: 'available', condition: 'good', location: 'Warehouse', quantity: 2, last_serviced: '2026-04-10' },
  { asset_name: 'Manitou MT 732 Telehandler', asset_type: 'Equipment', category: 'Material Handling', status: 'issued', condition: 'good', location: 'Site B', quantity: 1, last_serviced: '2026-03-01' },
  { asset_name: 'Cummins C15D5 15kVA Generator', asset_type: 'Power', category: 'Generators', status: 'available', condition: 'good', location: 'Power Bay', quantity: 3, last_serviced: '2026-04-25' },
  { asset_name: 'Honda EU22i Inverter Generator', asset_type: 'Power', category: 'Generators', status: 'issued', condition: 'good', location: 'Site A', quantity: 2, last_serviced: '2026-03-30' },
  { asset_name: 'Atlas Copco XATS 67 Compressor', asset_type: 'Power', category: 'Compressors', status: 'operational', condition: 'fair', location: 'Site C', quantity: 1, last_serviced: '2026-02-20' },
  { asset_name: 'Ingersoll-Rand UP6-15 Compressor', asset_type: 'Power', category: 'Compressors', status: 'available', condition: 'good', location: 'Workshop', quantity: 1, last_serviced: '2026-04-05' },
  { asset_name: 'Lincoln Electric Welder 225A', asset_type: 'Power', category: 'Welding', status: 'issued', condition: 'good', location: 'Fabrication', quantity: 4, last_serviced: null },
  { asset_name: 'Kirloskar Water Pump 5HP', asset_type: 'Power', category: 'Pumps', status: 'overdue', condition: 'fair', location: 'Unknown', quantity: 1, last_serviced: '2026-03-01' },
  { asset_name: 'Toyota Fortuner DL-01-AB-1234', asset_type: 'Vehicle', category: 'SUV', status: 'available', condition: 'good', location: 'Vehicle Bay', quantity: 1, last_serviced: '2026-04-01' },
  { asset_name: 'Tata 407 Flatbed Truck', asset_type: 'Vehicle', category: 'Truck', status: 'issued', condition: 'fair', location: 'Site B', quantity: 2, last_serviced: '2026-03-10' },
  { asset_name: 'Mahindra Bolero Pickup', asset_type: 'Vehicle', category: 'Pickup', status: 'available', condition: 'good', location: 'Vehicle Bay', quantity: 3, last_serviced: '2026-04-30' },
  { asset_name: 'Ashok Leyland Partner Van', asset_type: 'Vehicle', category: 'Van', status: 'under_repair', condition: 'poor', location: 'Workshop', quantity: 1, last_serviced: '2026-02-15' },
]

const additionalAssets = [
  ['Milwaukee M18 Impact Driver', 'Tool', 'Power Tools', 'available', 'good', 'Tool Room A', 4],
  ['Bosch GLM 50 Laser Measure', 'Tool', 'Measuring', 'available', 'good', 'Tool Room B', 6],
  ['Knipex Insulated Pliers Set', 'Tool', 'Electrical Tools', 'issued', 'good', 'Electrical Bay', 3],
  ['Greenlee Hydraulic Cable Cutter', 'Tool', 'Electrical Tools', 'overdue', 'fair', 'Site A', 1],
  ['Stanley Socket Set 42pc', 'Tool', 'Hand Tools', 'available', 'good', 'Tool Room A', 7],
  ['Bahco Adjustable Wrench Kit', 'Tool', 'Hand Tools', 'issued', 'good', 'Workshop', 5],
  ['Makita Cut-Off Saw LW1401', 'Tool', 'Power Tools', 'available', 'fair', 'Fabrication', 2],
  ['Husqvarna K770 Power Cutter', 'Tool', 'Cutting Tools', 'under_repair', 'fair', 'Workshop', 1],
  ['Fluke TiS55 Thermal Imager', 'Tool', 'Inspection', 'available', 'good', 'Electrical Bay', 1],
  ['Bosch GLL 3-80 Line Laser', 'Tool', 'Measuring', 'issued', 'good', 'Site C', 2],
  ['Hitachi Demolition Hammer H65SB3', 'Tool', 'Power Tools', 'available', 'good', 'Tool Room B', 1],
  ['Ridgid SeeSnake Inspection Camera', 'Tool', 'Inspection', 'overdue', 'good', 'Unknown', 1],
  ['CAT D6T Track-Type Tractor', 'Equipment', 'Earthmoving', 'operational', 'good', 'Site A', 1],
  ['Volvo SD110 Soil Compactor', 'Equipment', 'Compaction', 'issued', 'good', 'Site B', 1],
  ['BOMAG BW211 Roller', 'Equipment', 'Compaction', 'available', 'fair', 'Site C', 1],
  ['Hyundai HL770 Wheel Loader', 'Equipment', 'Earthmoving', 'operational', 'good', 'Site A', 1],
  ['Liebherr LTM 1050 Mobile Crane', 'Equipment', 'Lifting', 'issued', 'good', 'Site C', 1],
  ['Genie GS-1930 Scissor Lift', 'Equipment', 'Access', 'available', 'good', 'Warehouse', 2],
  ['JLG 450AJ Boom Lift', 'Equipment', 'Access', 'overdue', 'fair', 'Unknown', 1],
  ['Godrej GX300D Forklift', 'Equipment', 'Material Handling', 'available', 'good', 'Warehouse', 2],
  ['Doosan Portable Light Tower', 'Power', 'Lighting', 'issued', 'good', 'Site A', 4],
  ['Kirloskar 62.5kVA DG Set', 'Power', 'Generators', 'available', 'good', 'Power Bay', 2],
  ['Cummins 125kVA Generator', 'Power', 'Generators', 'operational', 'good', 'Site C', 1],
  ['Atlas Copco QAS 45 Generator', 'Power', 'Generators', 'overdue', 'fair', 'Unknown', 1],
  ['Miller Big Blue 400 Welder', 'Power', 'Welding', 'available', 'good', 'Fabrication', 2],
  ['ESAB Warrior 500i Welder', 'Power', 'Welding', 'issued', 'good', 'Fabrication', 3],
  ['Grundfos CR Pump Assembly', 'Power', 'Pumps', 'under_repair', 'poor', 'Workshop', 1],
  ['Crompton Greaves Motor 15HP', 'Power', 'Motors', 'available', 'good', 'Power Bay', 5],
  ['Tata Prima 3530 Tipper', 'Vehicle', 'Truck', 'issued', 'good', 'Site A', 1],
  ['Eicher Pro 3015 Truck', 'Vehicle', 'Truck', 'available', 'good', 'Vehicle Bay', 2],
  ['Mahindra Camper 4WD', 'Vehicle', 'Pickup', 'overdue', 'fair', 'Unknown', 1],
  ['Maruti Suzuki Eeco Van', 'Vehicle', 'Van', 'available', 'good', 'Vehicle Bay', 2],
  ['Force Traveller Staff Van', 'Vehicle', 'Van', 'issued', 'good', 'Site B', 1],
  ['BharatBenz Water Tanker', 'Vehicle', 'Tanker', 'under_repair', 'poor', 'Workshop', 1],
  ['Tata Ace Utility Vehicle', 'Vehicle', 'Utility', 'available', 'fair', 'Warehouse', 3],
  ['Swaraj Mazda Service Truck', 'Vehicle', 'Service', 'operational', 'good', 'Workshop', 1],
  ['Yokogawa Clamp Meter', 'Tool', 'Measuring', 'available', 'good', 'Electrical Bay', 4],
  ['Gedore Torque Multiplier', 'Tool', 'Hand Tools', 'issued', 'good', 'Workshop', 1],
  ['Bosch Core Drill GDB 180', 'Tool', 'Power Tools', 'available', 'good', 'Tool Room A', 2],
  ['Hilti DD 150 Core Rig', 'Tool', 'Power Tools', 'overdue', 'fair', 'Unknown', 1],
  ['Rothenberger Pipe Threader', 'Tool', 'Plumbing Tools', 'available', 'good', 'Tool Room B', 1],
  ['Enerpac Hydraulic Jack 50T', 'Tool', 'Lifting Tools', 'issued', 'good', 'Site C', 2],
  ['SKF Laser Alignment Tool', 'Tool', 'Inspection', 'available', 'good', 'Workshop', 1],
  ['Trimble Total Station C5', 'Tool', 'Survey', 'issued', 'good', 'Site A', 1],
  ['Sokkia Auto Level B40A', 'Tool', 'Survey', 'available', 'good', 'Tool Room B', 3],
  ['Honeywell GasAlert Detector', 'Tool', 'Safety', 'overdue', 'fair', 'Unknown', 2],
  ['MSA Altair 4XR Gas Detector', 'Tool', 'Safety', 'available', 'good', 'Safety Store', 5],
  ['Dewatering Pump 10HP', 'Power', 'Pumps', 'issued', 'fair', 'Site B', 2],
  ['Portable Air Compressor 185 CFM', 'Power', 'Compressors', 'available', 'good', 'Power Bay', 1],
  ['Electric Chain Hoist 3T', 'Equipment', 'Lifting', 'issued', 'good', 'Fabrication', 2],
  ['Material Cage Lift 1T', 'Equipment', 'Lifting', 'available', 'good', 'Warehouse', 1],
]

const issuedUsers = mockUsers.filter((user) => user.id > 100)

export const mockAssets = [...baseAssets, ...additionalAssets.map(([asset_name, asset_type, category, status, condition, location, quantity]) => ({
  asset_name,
  asset_type,
  category,
  status,
  condition,
  location,
  quantity,
  last_serviced: null,
}))].map((asset, index) => {
  const id = index + 1
  const isCheckedOut = asset.status === 'issued' || asset.status === 'overdue'
  const user = isCheckedOut && index % 10 === 1 ? mockUsers[0] : issuedUsers[(index * 3) % issuedUsers.length]
  const overdueOffset = 2 + (index % 16)
  const issuedOffset = asset.status === 'overdue' ? overdueOffset + 14 : 2 + (index % 12)

  return {
    id,
    asset_code: `AST-${id < 24 ? 2024 - (index % 3) : 2024}-${String(id).padStart(4, '0')}`,
    value: 18000 + (index % 17) * 14250,
    purchase_date: new Date(2020 + (index % 6), index % 12, 5 + (index % 20)).toISOString(),
    notes: index % 5 === 0 ? 'Priority asset for active site operations.' : '',
    issued_to: isCheckedOut ? user.name : null,
    issued_to_id: isCheckedOut ? user.id : null,
    issued_department: isCheckedOut ? user.department : null,
    issued_date: isCheckedOut ? dateDaysAgo(issuedOffset) : null,
    due_date: isCheckedOut ? (asset.status === 'overdue' ? dateDaysAgo(overdueOffset) : dateDaysAhead(7 + (index % 9))) : null,
    ...asset,
  }
})

export const assetCategoriesByType = {
  Tool: ['Power Tools', 'Hand Tools', 'Measuring', 'Electrical Tools', 'Plumbing Tools', 'Inspection', 'Survey', 'Safety', 'Cutting Tools', 'Lifting Tools'],
  Equipment: ['Earthmoving', 'Material Handling', 'Compaction', 'Lifting', 'Access'],
  Power: ['Generators', 'Compressors', 'Welding', 'Pumps', 'Motors', 'Lighting'],
  Vehicle: ['SUV', 'Truck', 'Pickup', 'Van', 'Tanker', 'Utility', 'Service'],
}
