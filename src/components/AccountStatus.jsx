import React from 'react'
import { getAccountRaw } from '../api/mockServer'

// Intentional bug: uses .state inconsistently and wrong effect deps
export default function AccountStatus({ account }) {
  const [status, setStatus] = React.useState(account?.status || 'pending')

  React.useEffect(() => {
    if (!account?.id) {
      setStatus('pending')
      return
    }
    const raw = getAccountRaw(account.id)
    setStatus(raw && (raw.state || raw.status)) // Handle both state and status
  }, [account?.id]) // Include account.id so it updates when switching

  const cls =
    status === 'active' ? 'badge badge-success' :
    status === 'pending' ? 'badge badge-warn' :
    status === 'failed' ? 'badge badge-error' : 'badge'

  return (
    <div className="flex items-center gap-2">
      <span className="text-slate-400">Status</span>
      <span className={cls}>{String(status)}</span>
    </div>
  )
}
