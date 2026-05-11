import { cx } from '../../utils/format'

export default function LoadingSkeleton({ rows = 4, className = '' }) {
  return (
    <div className={cx('space-y-3', className)}>
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className="h-14 animate-pulse rounded-lg border border-surface-600 bg-surface-700/70" />
      ))}
    </div>
  )
}

