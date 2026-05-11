import { Search, X } from 'lucide-react'

export default function SearchInput({ value, onChange, placeholder = 'Search...', autoFocus = false, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
      <input
        autoFocus={autoFocus}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-lg border border-surface-500 bg-surface-700 px-10 text-sm text-ink-primary placeholder-ink-muted outline-none transition-colors focus:border-emerald-600"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-ink-secondary hover:bg-surface-600 hover:text-ink-primary"
          title="Clear search"
        >
          <X size={16} />
        </button>
      ) : null}
    </div>
  )
}

