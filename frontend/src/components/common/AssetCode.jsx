export default function AssetCode({ children, className = '' }) {
  return <span className={`font-mono text-xs text-ink-secondary ${className}`}>{children}</span>
}

