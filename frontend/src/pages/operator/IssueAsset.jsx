import { useMemo, useState } from 'react'
import { ArrowRight, Loader2, MapPin } from 'lucide-react'
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

export default function IssueAsset() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [issuedTo, setIssuedTo] = useState('')
  const [remarks, setRemarks] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()
  const { assets, loading } = useAssets({ status: 'available', q: query })

  const results = useMemo(() => assets.slice(0, 18), [assets])

  const confirmIssue = async () => {
    if (!selected || !issuedTo.trim()) return
    setSubmitting(true)
    const response = await assetService.issueAsset(selected.id, issuedTo.trim(), remarks, user)
    setSubmitting(false)
    if (response.success) {
      toast.success(`Issued to ${issuedTo.trim()} - ${selected.asset_code}`)
      window.setTimeout(() => navigate('/operator/dashboard'), 1000)
    } else {
      toast.error(response.message || 'Issue failed')
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-ink-secondary">Asset checkout</p>
        <h1 className="text-2xl font-semibold text-ink-primary">Issue Asset</h1>
      </div>

      <SearchInput value={query} onChange={setQuery} autoFocus placeholder="Search by name or asset code..." />

      {loading ? <LoadingSkeleton rows={5} /> : null}
      {!loading && !results.length ? <div className="rounded-lg border border-surface-600 bg-surface-800 p-5 text-sm text-ink-secondary">No available assets match this search.</div> : null}

      <div className="grid gap-3 lg:grid-cols-2">
        {results.map((asset) => (
          <button
            key={asset.id}
            type="button"
            onClick={() => {
              setSelected(asset)
              setIssuedTo('')
              setRemarks('')
            }}
            className="rounded-lg border border-surface-600 bg-surface-800 p-4 text-left transition-colors hover:border-emerald-600 hover:bg-surface-700"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-ink-primary">{asset.asset_name}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <AssetCode>{asset.asset_code}</AssetCode>
                  <span className="text-xs text-ink-secondary">{asset.category}</span>
                </div>
              </div>
              <StatusBadge status="available" />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="inline-flex items-center gap-2 text-ink-secondary">
                <MapPin size={15} />
                {asset.location}
              </span>
              <span className="inline-flex items-center gap-1 font-medium text-emerald-300">
                Select
                <ArrowRight size={15} />
              </span>
            </div>
          </button>
        ))}
      </div>

      <ConfirmModal
        open={Boolean(selected)}
        title="Issue Asset"
        onClose={() => setSelected(null)}
        footer={(
          <>
            <button type="button" onClick={() => setSelected(null)} className="h-10 rounded-md border border-surface-500 px-4 text-sm font-medium text-ink-primary hover:bg-surface-700">Cancel</button>
            <button type="button" onClick={confirmIssue} disabled={!issuedTo.trim() || submitting} className="inline-flex h-10 items-center gap-2 rounded-md bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50">
              {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
              Confirm Issue
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
            <label className="block text-sm text-ink-secondary">
              Issuing to
              <input value={issuedTo} onChange={(event) => setIssuedTo(event.target.value)} className="mt-2 h-11 w-full rounded-md border border-surface-500 bg-surface-700 px-3 text-ink-primary outline-none focus:border-emerald-600" placeholder="Worker name" />
            </label>
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

