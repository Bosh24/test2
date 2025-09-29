import React from 'react'
import { controlAccount } from '../api/mockServer'

/**
 * TODO:
 * - Render a table/list of accounts passed via props (ids + status).
 * - For each account, provide a "Take Control" button.
 * - Clicking opens a modal overlay inside this component showing:
 *    - Account ID
 *    - Current Status
 *    - <select> with actions: "Pause", "Resume", "Force Close"
 *    - Confirm button that calls controlAccount(accountId, action) and closes the modal.
 * - Style with Tailwind. Failed=red, Pending=yellow, Active=green (see index.css badge classes).
 */
export default function AccountControl({ accounts }) {
  // Implement here
  return (
    <div className="card">
      <div className="text-lg font-semibold mb-2">Account Control</div>
      <p className="text-sm text-slate-400">Implement UI here.</p>
    </div>
  )
}
