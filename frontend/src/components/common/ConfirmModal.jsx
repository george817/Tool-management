import { X } from 'lucide-react'

export default function ConfirmModal({ open, title, children, footer, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 px-0 sm:items-center sm:px-4">
      <div className="w-full rounded-t-lg border border-surface-600 bg-surface-800 shadow-panel sm:max-w-lg sm:rounded-lg">
        <div className="flex items-center justify-between border-b border-surface-600 px-5 py-4">
          <h2 className="text-base font-semibold text-ink-primary">{title}</h2>
          <button type="button" onClick={onClose} className="grid h-8 w-8 place-items-center rounded-md text-ink-secondary hover:bg-surface-700 hover:text-ink-primary" title="Close">
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-5">{children}</div>
        {footer ? <div className="flex justify-end gap-3 border-t border-surface-600 px-5 py-4">{footer}</div> : null}
      </div>
    </div>
  )
}

