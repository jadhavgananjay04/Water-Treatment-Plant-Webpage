# Water Treatment Plant Dashboard

A simple static dashboard for monitoring water treatment parameters. Built with plain HTML, CSS (Bootstrap + custom), and JavaScript using localStorage. Includes an admin panel to update daily parameters and a weekly trend chart with Chart.js.

## Features
- Parameter info and current readings for influent and effluent
- Admin login with editable parameters
- Weekly data table (influent/effluent)
- Trend chart (Chart.js) for all parameters
- Data persistence via `localStorage` (no backend required)

### Parameters Tracked
- pH
- BOD (mg/L)
- COD (mg/L)
- TSS (mg/L)
- Turbidity (NTU)
- Ammonia (NH3) (mg/L)
- Dissolved Oxygen (mg/L)
- Nutrients (mg/L)

## Project Structure
```
project/
  index.html
  minor_project2.css
  script.js
  README.md
```

## Getting Started (Local)
- Open `index.html` directly in your browser, or start a tiny local server:
```bash
# Python 3
python -m http.server 8080
# then visit http://localhost:8080
```

## Admin Panel
- Default credentials:
  - Username: `water`
  - Password: `water1234`
- Click “Admin Login” → enter credentials → “Update Parameters” tab to edit influent/effluent values.
- Submitting updates will:
  - Update the “Current Parameters” table
  - Add a new row for today to the weekly history (keeps last 7 days)
  - Refresh the chart

## Data Storage
- Uses `localStorage` keys:
  - `adminCredentials`: `{ username, password }`
  - `parametersHistory`: Array of the last 7 daily records
- On first load, demo data for the last 7 days is generated.

## Deploying
This is a static site (no server). Any static host works. Options:

### GitHub Pages (free)
1. Create a GitHub repo and push the project files to the repo root.
2. In GitHub: Settings → Pages → Build and deployment → Source: “Deploy from a branch”.
3. Select Branch `main` (or `master`), Folder `/root` → Save. Wait ~1–2 minutes.

Quick Git commands (PowerShell):
```bash
cd C:\Users\jadha\Desktop\project
git init
git add .
git commit -m "Deploy site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

### Netlify (drag-and-drop easiest)
- Go to https://app.netlify.com/drop and drop the whole `project` folder.
- Or connect your Git repo; Netlify auto-deploys on push. HTTPS + custom domain supported.

### Vercel
- Import your Git repo at https://vercel.com/new → Framework preset: “Other”.
- Deploy. HTTPS + custom domain supported.

### AWS S3 Static Hosting
1. Create an S3 bucket and enable “Static website hosting”.
2. Upload files, set public-read via bucket policy, set `index.html` as index document.
3. Optional: use CloudFront for HTTPS and custom domain.

## Customization
- Update parameter descriptions and thresholds in `index.html` under “Parameter Information”.
- Adjust demo-data ranges in `script.js` where initial `parametersHistory` is created.
- Change credentials in `localStorage` or update via UI (password tab).

## Tech Stack
- Bootstrap 5 (CDN)
- Chart.js (CDN)
- Vanilla JavaScript, HTML, CSS

## Notes
- Because this uses `localStorage`, data is per-browser. For shared multi-user data, a backend or hosted DB/API would be needed.
