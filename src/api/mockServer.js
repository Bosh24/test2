// Simple event bus to simulate server-side events (order rejections, status changes)
const listeners = new Set();

// seeded mock accounts
let accounts = [
  { id: 'acct_001', status: 'active' },
  { id: 'acct_002', status: 'pending' },
  { id: 'acct_003', status: 'failed' },
];

// Emit a fake "order rejected" event sometimes for any account with 'active' status
function randomTick() {
  const active = accounts.filter(a => a.status === 'active');
  if (active.length && Math.random() < 0.35) {
    const pick = active[Math.floor(Math.random() * active.length)];
    const event = {
      type: 'order_rejected',
      accountId: pick.id,
      orderId: Math.floor(Math.random() * 100000),
      reason: 'Insufficient Funds',
      ts: Date.now()
    };
    for (const cb of listeners) cb(event);
  }
}

// Change statuses occasionally to simulate real-time noise
function randomStatusFlip() {
  const i = Math.floor(Math.random() * accounts.length);
  const next = ['active', 'pending', 'failed'][Math.floor(Math.random()*3)];
  accounts[i] = { ...accounts[i], status: next };
  const event = { type: 'status_changed', accountId: accounts[i].id, status: next, ts: Date.now() };
  for (const cb of listeners) cb(event);
}

setInterval(randomTick, 2500);
setInterval(randomStatusFlip, 4000);

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getAccounts() {
  // Intentionally return shallow copies to mimic API responses
  return accounts.map(a => ({ ...a }));
}

// BUG SEED: this function mimics an API that sometimes returns 'state' instead of 'status'
export function getAccountRaw(id) {
  const a = accounts.find(x => x.id === id);
  if (!a) return null;
  // ~50% chance to use 'state' key instead of 'status'
  const useStateKey = Math.random() < 0.5;
  if (useStateKey) {
    return { id: a.id, state: a.status };
  }
  return { id: a.id, status: a.status };
}

// Control actions (no-op, but log for acceptance tests)
export function controlAccount(id, action) {
  console.log('[CONTROL]', { id, action, ts: Date.now() });
}

