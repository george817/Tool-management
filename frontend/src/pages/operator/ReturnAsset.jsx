import { useMemo, useState } from 'react'
import { Loader2, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import { useAssets } from '../../hooks/useAssets'
import { assetService } from '../../services/asset.service'
import AssetCode from '../../components/common/AssetCode'
import ConfirmModal from '../../components/common/ConfirmModal'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import SearchInput from '../../components/common/SearchInput'
import StatusBadge from '../../components/common/StatusBadge'
import { timeAgo } from '../../utils/format'

const conditions = [
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'damaged', label: 'Damaged - will go to repair' },
]

export default function ReturnAsset() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [condition, setCondition] = useState('good')
  const [remarks, setRemarks] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()
  const { assets, loading } = useAssets({ q: query })

  const returnable = useMemo(() => assets.filter((asset) => asset.status === 'issued' || asset.status === 'overdue').slice(0, 18), [assets])

  const confirmReturn = async () => {
    if (!selected) return
    setSubmitting(true)
    const response = await assetService.returnAsset(selected.id, condition, remarks, user)
    setSubmitting(false)
    if (response.success) {
      toast.success(`${selected.asset_code} returned`)
      window.setTimeout(() => navigate('/operator/dashboard'), 1000)
    } else {
      toast.error(response.message || 'Return failed')
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-ink-secondary">Asset intake</p>
        <h1 className="text-2xl font-semibold text-ink-primary">Return Asset</h1>
      </div>

      <SearchInput value={query} onChange={setQuery} autoFocus placeholder="Search issued or overdue assets..." />

      {loading ? <LoadingSkeleton rows={5} /> : null}
      {!loading && !returnable.length ? <div className="rounded-lg border border-surface-600 bg-surface-800 p-5 text-sm text-ink-secondary">No issued assets match this search.</div> : null}

      <div className="grid gap-3 lg:grid-cols-2">
        {returnable.map((asset) => (
          <button
            key={asset.id}
            type="button"
            onClick={() => {
              setSelected(asset)
              setCondition('good')
              setRemarks('')
            }}
            className="rounded-lg border border-surface-600 bg-surface-800 p-4 text-left transition-colors hover:border-sky-600 hover:bg-surface-700"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-ink-primary">{asset.asset_name}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <AssetCode>{asset.asset_code}</AssetCode>
                  <span className="text-xs text-ink-secondary">Issued to {asset.issued_to}</span>
                </div>
              </div>
              <StatusBadge status={asset.status} />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="inline-flex items-center gap-2 text-ink-secondary">
                <MapPin size={15} />
                {asset.location}
              </span>
              <span className="text-xs text-ink-muted">Issued {timeAgo(asset.issued_date)}</span>
            </div>
          </button>
        ))}
      </div>

      <ConfirmModal
        open={Boolean(selected)}
        title="Return Asset"
        onClose={() => setSelected(null)}
        footer={(
          <>
            <button type="button" onClick={() => setSelected(null)} className="h-10 rounded-md border border-surface-500 px-4 text-sm font-medium text-ink-primary hover:bg-surface-700">Cancel</button>
            <button type="button" onClick={confirmReturn} disabled={submitting} className="inline-flex h-10 items-center gap-2 rounded-md bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50">
              {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
              Confirm Return
            </button>
          </>
        )}
      >
        {selected ? (
          <div className="space-y-5">
            <div>
              <p className="font-semibold text-ink-primary">{selected.asset_name}</p>
              <AssetCode>{selected.asset_code}</AssetCode>
            </div>
            <div>
              <p className="mb-2 text-sm text-ink-secondary">Condition on return</p>
              <div className="grid gap-2">
                {conditions.map((item) => (
                  <label key={item.value} className="flex cursor-pointer items-center gap-3 rounded-md border border-surface-600 bg-surface-900 px-3 py-3 text-sm text-ink-primary">
                    <input type="radio" name="condition" value={item.value} checked={condition === item.value} onChange={() => setCondition(item.value)} className="h-4 w-4 accent-emerald-600" />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>
            <label className="block text-sm text-ink-secondary">
              Remarks
              <textarea value={remarks} onChange={(event) => setRemarks(event.target.value)} className="mt-2 min-h-20 w-full rounded-md border border-surface-500 bg-surface-700 px-3 py-2 text-ink-primary outline-none focus:border-emerald-600" placeholder="Optional" />
            </label>
          </div>
        ) : null}
      </ConfirmModal>
    </div>
  )
}

