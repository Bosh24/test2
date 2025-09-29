# JTNC Frontend Engineer Coding Exercise – Instructions

Thank you for your interest in joining our team.  
Please complete the following **1-hour timed coding exercise** using this project.

---

## Setup
1. Open the project folder in your code editor.  
2. Run the following commands:
   ```bash
   npm install
   npm run dev
   ```
3. Open the printed local URL (usually `http://localhost:5173`) in your browser.  

---

## Your Tasks
1. **Bug Fix**  
   - In `src/components/AccountStatus.jsx`, fix the logic so switching accounts never shows `undefined`.  
   - The badge must always display the correct status (`active`, `pending`, `failed`).  

2. **Feature Implementation**  
   - In `src/components/AccountControl.jsx`, build a modal that lets an operator take control of an account.  
   - Modal should show:  
     - Account ID  
     - Current status  
     - A dropdown with actions: `Pause`, `Resume`, `Force Close`  
     - Confirm button → calls `controlAccount(id, action)` (already provided in `mockServer.js`)  
   - Style with Tailwind. Accounts should be color-coded:  
     - Active → Green  
     - Pending → Yellow  
     - Failed → Red  

3. **Demo Recording**  
   - Record a **30–60 second screen capture** showing:  
     - Switching between accounts (no more `undefined`)  
     - The modal opening and actions logging correctly in the browser console  
     - The **unique token** in the header (used to verify your run is local)  

---

## Submission
- Zip your completed project OR push it to a private repo/gist.  
- Include your screen recording.  
- Send both back to us within the requested timeframe.  

---

⏱️ **Important**: Please timebox yourself to **about 1 hour**. We’re not looking for perfection — just proof that you can debug, build features quickly, and work within our React + Tailwind setup.
