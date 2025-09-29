import React from 'react'
import AccountStatus from './components/AccountStatus.jsx'
import AccountControl from './components/AccountControl.jsx'
import { getAccounts, subscribe } from './api/mockServer.js'

export default function App() {
  const [accounts, setAccounts] = React.useState(getAccounts())
  const [selected, setSelected] = React.useState(accounts[0])

  React.useEffect(() => {
    const unsub = subscribe((evt) => {
      if (evt.type === 'status_changed') {
        setAccounts(getAccounts())
      }
    })
    return unsub
  }, [])

  React.useEffect(() => {
    // keep selected in sync when list refreshes
    const found = accounts.find(a => a.id === selected?.id) || accounts[0]
    setSelected(found)
  }, [accounts])

  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="mb-6 flex items-baseline justify-between">
        <div>
          <h1 className="text-2xl font-bold">JTNC Control Center — Candidate Exercise</h1>
          <div className="text-slate-400 text-sm">Unique token: <span className="font-mono">JTNC-6W5QWCIW</span></div>
        </div>
        <div className="text-xs text-slate-500">Build time ~1 hour</div>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <div className="mb-3">
            <label className="block text-sm text-slate-400 mb-1">Select Account</label>
            <select
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2"
              value={selected?.id}
              onChange={(e) => setSelected(accounts.find(a => a.id === e.target.value))}
            >
              {accounts.map(a => (
                <option key={a.id} value={a.id}>{a.id}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-400">Account ID</div>
              <div className="font-mono text-lg">{selected?.id}</div>
            </div>
            <AccountStatus account={selected} />
          </div>
        </div>

        <AccountControl accounts={accounts} />
      </div>

      <section className="mt-6 card">
        <h2 className="text-lg font-semibold mb-2">Acceptance Criteria</h2>
        <ul className="list-disc pl-6 space-y-1 text-sm text-slate-300">
          <li>Fix the status bug so switching accounts never shows <code>undefined</code>. The badge must always reflect the correct status.</li>
          <li>Implement <code>AccountControl</code> with a modal that supports actions: <code>Pause</code>, <code>Resume</code>, <code>Force Close</code>, calling <code>controlAccount()</code>.</li>
          <li>Color code: active=green, pending=yellow, failed=red.</li>
          <li>Keep code within this repository. Do not add new dependencies.</li>
        </ul>
      </section>

      <section className="mt-6 card">
        <h2 className="text-lg font-semibold mb-2">How to Submit</h2>
        <ol className="list-decimal pl-6 space-y-1 text-sm text-slate-300">
          <li>Run <code>npm install</code> then <code>npm run dev</code>.</li>
          <li>Implement fixes and features within <span className="font-mono">src/components</span>.</li>
          <li>Record a quick 30–60s screen capture demonstrating:
            <ul className="list-disc pl-6">
              <li>Switching accounts shows correct status (no <code>undefined</code>).</li>
              <li>Modal opens and actions log to console.</li>
              <li>Your unique token visible in header: <span className="font-mono">JTNC-6W5QWCIW</span></li>
            </ul>
          </li>
          <li>Zip your repo or push to a private gist and share the link.</li>
        </ol>
      </section>

      <footer className="mt-8 text-center text-xs text-slate-500">
        Do not modify package dependencies. Timebox yourself to ~1 hour.
      </footer>
    </div>
  )
}
