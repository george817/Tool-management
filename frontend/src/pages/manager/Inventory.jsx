import { useMemo, useState } from 'react'
import { Download, Eye, Loader2, Pencil, Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import { assetCategoriesByType } from '../../data/mockAssets'
import { assetService } from '../../services/asset.service'
import { useAssets } from '../../hooks/useAssets'
import AssetCode from '../../components/common/AssetCode'
import ConfirmModal from '../../components/common/ConfirmModal'
import DataTable from '../../components/common/DataTable'
import SearchInput from '../../components/common/SearchInput'
import StatusBadge from '../../components/common/StatusBadge'

const blankAsset = {
  asset_name: '',
  asset_code: '',
  asset_type: 'Tool',
  category: 'Power Tools',
  status: 'available',
  condition: 'good',
  location: '',
  quantity: 1,
  last_serviced: '',
  notes: '',
}

export default function Inventory() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [type, setType] = useState('all')
  const [location, setLocation] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(blankAsset)
  const [saving, setSaving] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const { assets, loading } = useAssets({ q: query, status, type, location }, reloadKey)

  const openAdd = () => {
    setEditing(null)
    setForm({ ...blankAsset, asset_code: `AST-2024-${String(Date.now()).slice(-4)}` })
    setModalOpen(true)
  }

  const openEdit = (asset) => {
    setEditing(asset)
    setForm({
      asset_name: asset.asset_name,
      asset_code: asset.asset_code,
      asset_type: asset.asset_type,
      category: asset.category,
      status: asset.status,
      condition: asset.condition,
      location: asset.location,
      quantity: asset.quantity,
      last_serviced: asset.last_serviced || '',
      notes: asset.notes || '',
    })
    setModalOpen(true)
  }

  const updateField = (field, value) => {
    setForm((current) => {
      const next = { ...current, [field]: value }
      if (field === 'asset_type') next.category = assetCategoriesByType[value][0]
      return next
    })
  }

  const saveAsset = async () => {
    if (!form.asset_name.trim() || !form.asset_code.trim()) return
    setSaving(true)
    const payload = { ...form, quantity: Number(form.quantity || 1), last_serviced: form.last_serviced || null }
    const response = editing ? await assetService.updateAsset(editing.id, payload) : await assetService.addAsset(payload)
    setSaving(false)
    if (response.success) {
      toast.success(response.message)
      setModalOpen(false)
      setReloadKey((value) => value + 1)
    } else {
      toast.error(response.message || 'Unable to save asset')
    }
  }

  const exportCsv = () => {
    const headers = ['Asset Name', 'Code', 'Type', 'Category', 'Status', 'Condition', 'Location', 'Quantity']
    const rows = assets.map((asset) => [asset.asset_name, asset.asset_code, asset.asset_type, asset.category, asset.status, asset.condition, asset.location, asset.quantity])
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'assetops-inventory.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  const columns = useMemo(() => [
    { key: 'asset_name', label: 'Asset Name', sortable: true, render: (asset) => <span className="font-medium text-ink-primary">{asset.asset_name}</span> },
    { key: 'asset_code', label: 'Code', sortable: true, render: (asset) => <AssetCode>{asset.asset_code}</AssetCode> },
    { key: 'asset_type', label: 'Type', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: (asset) => <StatusBadge status={asset.status} /> },
    { key: 'condition', label: 'Condition', sortable: true, render: (asset) => <StatusBadge status={asset.condition} /> },
    { key: 'location', label: 'Location', sortable: true },
    {
      key: 'action',
      label: 'Action',
      render: (asset) => (
        <div className="flex gap-1">
          <button type="button" className="grid h-8 w-8 place-items-center rounded-md text-ink-secondary hover:bg-surface-700 hover:text-ink-primary" title="View asset"><Eye size={16} /></button>
          <button type="button" onClick={() => openEdit(asset)} className="grid h-8 w-8 place-items-center rounded-md text-ink-secondary hover:bg-surface-700 hover:text-ink-primary" title="Edit asset"><Pencil size={16} /></button>
        </div>
      ),
    },
  ], [])

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-ink-secondary">Master asset register</p>
          <h1 className="text-2xl font-semibold text-ink-primary">Inventory</h1>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={exportCsv} className="inline-flex h-10 items-center gap-2 rounded-md border border-surface-500 px-3 text-sm font-medium text-ink-primary hover:bg-surface-700">
            <Download size={16} />
            Export CSV
          </button>
          <button type="button" onClick={openAdd} className="inline-flex h-10 items-center gap-2 rounded-md bg-emerald-600 px-3 text-sm font-semibold text-white hover:bg-emerald-500">
            <Plus size={16} />
            Add Asset
          </button>
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-[1fr_170px_170px_220px]">
        <SearchInput value={query} onChange={setQuery} placeholder="Search assets..." />
        <select value={type} onChange={(event) => setType(event.target.value)} className="h-12 rounded-lg border border-surface-500 bg-surface-700 px-3 text-sm text-ink-primary outline-none focus:border-emerald-600">
          <option value="all">All Types</option>
          <option value="Tool">Tool</option>
          <option value="Equipment">Equipment</option>
          <option value="Power">Power</option>
          <option value="Vehicle">Vehicle</option>
        </select>
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-12 rounded-lg border border-surface-500 bg-surface-700 px-3 text-sm text-ink-primary outline-none focus:border-emerald-600">
          <option value="all">All Statuses</option>
          <option value="available">Available</option>
          <option value="issued">Issued</option>
          <option value="overdue">Overdue</option>
          <option value="under_repair">Under Repair</option>
          <option value="operational">Operational</option>
        </select>
        <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Location" className="h-12 rounded-lg border border-surface-500 bg-surface-700 px-3 text-sm text-ink-primary outline-none placeholder:text-ink-muted focus:border-emerald-600" />
      </div>

      <DataTable columns={columns} data={assets} loading={loading} pageSize={15} />

      <ConfirmModal
        open={modalOpen}
        title={editing ? 'Edit Asset' : 'Add Asset'}
        onClose={() => setModalOpen(false)}
        footer={(
          <>
            <button type="button" onClick={() => setModalOpen(false)} className="h-10 rounded-md border border-surface-500 px-4 text-sm font-medium text-ink-primary hover:bg-surface-700">Cancel</button>
            <button type="button" onClick={saveAsset} disabled={saving || !form.asset_name || !form.asset_code} className="inline-flex h-10 items-center gap-2 rounded-md bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50">
              {saving ? <Loader2 size={16} className="animate-spin" /> : null}
              Save Asset
            </button>
          </>
        )}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-ink-secondary">Asset Name
            <input value={form.asset_name} onChange={(event) => updateField('asset_name', event.target.value)} className="mt-2 h-10 w-full rounded-md border border-surface-500 bg-surface-700 px-3 text-ink-primary outline-none focus:border-emerald-600" />
          </label>
          <label className="text-sm text-ink-secondary">Asset Code
            <input value={form.asset_code} onChange={(event) => updateField('asset_code', event.target.value)} className="mt-2 h-10 w-full rounded-md border border-surface-500 bg-surface-700 px-3 font-mono text-ink-primary outline-none focus:border-emerald-600" />
          </label>
          <label className="text-sm text-ink-secondary">Type
            <select value={form.asset_type} onChange={(event) => updateField('asset_type', event.target.value)} className="mt-2 h-10 w-full rounded-md border border-surface-500 bg-surface-700 px-3 text-ink-primary outline-none focus:border-emerald-600">
              {Object.keys(assetCategoriesByType).map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="text-sm text-ink-secondary">Category
            <select value={form.category} onChange={(event) => updateField('category', event.target.value)} className="mt-2 h-10 w-full rounded-md border border-surface-500 bg-surface-700 px-3 text-ink-primary outline-none focus:border-emerald-600">
              {assetCategoriesByType[form.asset_type].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="text-sm text-ink-secondary">Status
            <select value={form.status} onChange={(event) => updateField('status', event.target.value)} className="mt-2 h-10 w-full rounded-md border border-surface-500 bg-surface-700 px-3 text-ink-primary outline-none focus:border-emerald-600">
              <option value="available">Available</option>
              <option value="issued">Issued</option>
              <option value="overdue">Overdue</option>
              <option value="under_repair">Under Repair</option>
              <option value="operational">Operational</option>
            </select>
          </label>
          <label className="text-sm text-ink-secondary">Condition
            <select value={form.condition} onChange={(event) => updateField('condition', event.target.value)} className="mt-2 h-10 w-full rounded-md border border-surface-500 bg-surface-700 px-3 text-ink-primary outline-none focus:border-emerald-600">
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </label>
          <label className="text-sm text-ink-secondary">Location
            <input value={form.location} onChange={(event) => updateField('location', event.target.value)} className="mt-2 h-10 w-full rounded-md border border-surface-500 bg-surface-700 px-3 text-ink-primary outline-none focus:border-emerald-600" />
          </label>
          <label className="text-sm text-ink-secondary">Quantity
            <input type="number" min="1" value={form.quantity} onChange={(event) => updateField('quantity', event.target.value)} className="mt-2 h-10 w-full rounded-md border border-surface-500 bg-surface-700 px-3 text-ink-primary outline-none focus:border-emerald-600" />
          </label>
          <label className="text-sm text-ink-secondary">Last Serviced
            <input type="date" value={form.last_serviced} onChange={(event) => updateField('last_serviced', event.target.value)} className="mt-2 h-10 w-full rounded-md border border-surface-500 bg-surface-700 px-3 text-ink-primary outline-none focus:border-emerald-600" />
          </label>
          <label className="text-sm text-ink-secondary sm:col-span-2">Notes
            <textarea value={form.notes} onChange={(event) => updateField('notes', event.target.value)} className="mt-2 min-h-20 w-full rounded-md border border-surface-500 bg-surface-700 px-3 py-2 text-ink-primary outline-none focus:border-emerald-600" />
          </label>
        </div>
      </ConfirmModal>
    </div>
  )
}

