import { format, formatDistanceToNowStrict, parseISO } from 'date-fns'

export const cx = (...classes) => classes.filter(Boolean).join(' ')

export const initials = (name = '') => name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()

export const formatDate = (value, pattern = 'MMM dd') => {
  if (!value) return '-'
  return format(typeof value === 'string' ? parseISO(value) : value, pattern)
}

export const timeAgo = (value) => {
  if (!value) return ''
  return `${formatDistanceToNowStrict(typeof value === 'string' ? parseISO(value) : value)} ago`
}

export const daysPast = (value) => {
  if (!value) return 0
  const delta = Date.now() - new Date(value).getTime()
  return Math.max(0, Math.ceil(delta / (24 * 60 * 60 * 1000)))
}

export const currency = (value) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
}).format(value || 0)

export const statusLabel = (status) => ({
  available: 'Available',
  issued: 'Issued',
  overdue: 'Overdue',
  under_repair: 'Under Repair',
  operational: 'Operational',
  good: 'Good',
  fair: 'Fair',
  poor: 'Poor',
  damaged: 'Damaged',
  ok: 'OK',
  due_soon: 'Due Soon',
})[status] || status

