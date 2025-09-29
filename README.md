# JTNC Frontend Engineer Coding Exercise (1 Hour)

This is a **code-only** exercise focused on React + Tailwind. No written Q&A required.

## Tasks
1) **Bug Fix**: In `src/components/AccountStatus.jsx`, fix the logic so switching accounts never shows `undefined`.  
2) **Feature**: In `src/components/AccountControl.jsx`, implement a modal that lets ops **take control** of one account and choose an action (`Pause`, `Resume`, `Force Close`). Call `controlAccount(id, action)` on confirm.  
3) **Styling**: Color-code status badges: active=green, pending=yellow, failed=red (utility classes already included).

A mock event stream simulates status changes and occasional order rejections (`src/api/mockServer.js`).

## Run
```bash
npm install
npm run dev
```
Open the printed local URL. Your unique token: **JTNC-6W5QWCIW** (rendered in the header).

## Acceptance Criteria
- Status badge always correct after switching accounts (no `undefined` flashes).
- Working modal with the three actions; confirm logs to console.
- Tailwind styling applied; do not add packages or change `package.json` deps.
- Keep changes inside `src/components` where possible.

## Submission
- Zip your repo or private gist and share the link.
- Include a 30–60s screen recording that shows the UI working and the **token** visible.

Good luck!
