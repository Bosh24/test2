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
  // Modal state
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [selectedAccount, setSelectedAccount] = React.useState(null)
  const [selectedAction, setSelectedAction] = React.useState('')

  // Helper function to get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active': return 'badge badge-success'
      case 'pending': return 'badge badge-warn'
      case 'failed': return 'badge badge-error'
      default: return 'badge'
    }
  }

  // Handle opening modal
  const handleTakeControl = (account) => {
    setSelectedAccount(account)
    setSelectedAction('')
    setIsModalOpen(true)
  }

  // Handle closing modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedAccount(null)
    setSelectedAction('')
  }

  // Handle action execution
  const handleExecuteAction = () => {
    if (selectedAccount && selectedAction) {
      controlAccount(selectedAccount.id, selectedAction)
      handleCloseModal()
    }
  }

  return (
    <div className="card">
      <div className="text-lg font-semibold mb-4">Account Control</div>
      
      {/* Account List */}
      <div className="space-y-2">
        {accounts.map(account => (
          <div key={account.id} className="flex items-center justify-between p-3  rounded-lg">
              <div>
                <div className="font-mono text-sm">{account.id}</div>
                <span className={getStatusBadgeClass(account.status)}>
                  {account.status}
                </span>
              </div>
            <button
              onClick={() => handleTakeControl(account)}
              className="px-3 py-1 bg-blue hover:bg-blue text-white text-sm rounded-md transition-colors"
            >
              Take Control
            </button>
          </div>
        ))}
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-900 rounded-xl p-6 w-96 max-w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Account Control</h3>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-white text-xl"
              >
                ×
              </button>
            </div>

            {selectedAccount && (
              <div className="space-y-4">
                {/* Account Info */}
                <div>
                  <div className="text-sm text-slate-400 mb-1">Account ID</div>
                  <div className="font-mono text-lg">{selectedAccount.id}</div>
                </div>

                <div>
                  <div className="text-sm text-slate-400 mb-1">Current Status</div>
                  <span className={getStatusBadgeClass(selectedAccount.status)}>
                    {selectedAccount.status}
                  </span>
                </div>

                {/* Action Selection */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Select Action</label>
                  <select
                    value={selectedAction}
                    onChange={(e) => setSelectedAction(e.target.value)}
                    className="w-full bg-slate-950 rounded-lg px-3 py-2"
                  >
                    <option value="">Choose an action...</option>
                    <option value="Pause">Pause</option>
                    <option value="Resume">Resume</option>
                    <option value="Force Close">Force Close</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleExecuteAction}
                    disabled={!selectedAction}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
