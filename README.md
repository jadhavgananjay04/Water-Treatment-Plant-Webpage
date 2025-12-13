# Water Treatment Plant Dashboard

A comprehensive web-based dashboard for monitoring water treatment plant parameters. This static web application provides real-time visualization of water quality parameters for both influent (incoming water) and effluent (treated water) streams. Built with modern web technologies, it includes an admin panel for data management and interactive charts for trend analysis.

## 🌟 Features

### Core Functionality
- **Parameter Information Panel**: Detailed information about each water quality parameter with safe ranges and health implications
- **Current Parameters Display**: Real-time table showing current influent and effluent values for all parameters
- **Weekly Data Table**: Comprehensive table with borders displaying historical data (last 7 days) for all parameters
- **Interactive Trend Charts**: Three separate interactive graphs using Chart.js:
  - **pH Level Chart**: Dedicated graph for pH trends (Influent vs Effluent)
  - **Turbidity Chart**: Dedicated graph for turbidity trends (Influent vs Effluent)
  - **Other Parameters Chart**: Combined graph for TDS, Hardness, Chloride, Calcium, Phosphorus, and DO (all with Influent vs Effluent)
- **Admin Panel**: Secure login system with password management
- **Data Persistence**: Uses browser localStorage (no backend required)
- **Responsive Design**: Mobile-friendly interface using Bootstrap 5
- **Multi-language Support**: Language selector (English/मराठी) in header

### Parameters Tracked

The dashboard monitors **8 water quality parameters** for both influent and effluent:

1. **pH** - Normal Range: 6.5-8.5 (Harmful if < 6.5 or > 8.5 for drinking water)
2. **Turbidity** - Safe Range: < 1 NTU (Indicates suspended particles if > 1 NTU)
3. **TDS (Total Dissolved Solids)** - Safe Range: < 500 mg/L (Indicates high dissolved solids if > 500 mg/L)
4. **Hardness** - Desirable Range: < 200 mg/L (as CaCO3)
5. **Chloride** - Safe Range: < 250 mg/L (May cause taste issues if > 250 mg/L)
6. **Calcium** - Typical Range: < 75 mg/L
7. **Phosphorus** - Desirable: < 0.1 mg/L in effluent
8. **Dissolved Oxygen (DO)** - Desirable: > 5 mg/L in effluent

## 📁 Project Structure

```
water_treatment_webpage_project/
├── index.html              # Main HTML file with all UI components
├── minor_project2.css     # Custom CSS styles
├── script.js              # JavaScript logic for data management and charts
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Local Development

#### Option 1: Direct File Opening
Simply open `index.html` in your web browser. Note: Some features may be limited due to browser security restrictions with localStorage.

#### Option 2: Local Server (Recommended)

**Using Python 3:**
```bash
python -m http.server 8080
```
Then visit: `http://localhost:8080`

**Using Python 2:**
```bash
python -m SimpleHTTPServer 8080
```

**Using Node.js (http-server):**
```bash
npx http-server -p 8080
```

**Using PHP:**
```bash
php -S localhost:8080
```

## 🔐 Admin Panel

### Default Credentials
- **Username**: `water`
- **Password**: `water1234`

### Accessing Admin Panel
1. Click the **"Admin Login"** button on the main page
2. Enter the username and password
3. Upon successful login, the Admin Panel modal will open

### Admin Features

#### Update Parameters Tab
- Update influent (incoming water) and effluent (treated water) values for all 8 parameters
- Form includes separate input fields for each parameter
- Input validation with appropriate step values (0.1 for pH, 0.01 for decimal parameters)
- Upon submission:
  - Updates the "Current Parameters" table immediately
  - Adds today's date as a new entry to the weekly history
  - Automatically refreshes all three trend charts
  - Maintains only the last 7 days of data

#### Change Password Tab
- Change the admin password securely
- Requires current password verification
- Validates that new password and confirmation match
- Updates credentials in localStorage

## 💾 Data Storage

The application uses browser `localStorage` for data persistence:

### Storage Keys

1. **`adminCredentials`**
   - Stores admin login credentials
   - Format: `{ username: "water", password: "water1234" }`
   - Can be updated via the Admin Panel

2. **`parametersHistory`**
   - Stores the last 7 days of parameter data
   - Format: Array of objects, each containing:
     ```javascript
     {
       date: "YYYY-MM-DD",
       influent: {
         ph, turbidity, tds, hardness, chloride, calcium, phosphorus, do
       },
       effluent: {
         ph, turbidity, tds, hardness, chloride, calcium, phosphorus, do
       }
     }
     ```

### Demo Data
On first load, the application automatically generates 7 days of realistic demo data with appropriate ranges for each parameter:
- **Influent values**: Higher ranges (untreated water)
- **Effluent values**: Lower ranges (treated water)

### Data Management
- New entries are added to the beginning of the array
- Only the most recent 7 days are kept (older data is automatically removed)
- Data persists across browser sessions
- Data is browser-specific (not shared across devices)

## 📊 Chart Features

### Three Separate Interactive Charts

1. **pH Level Chart**
   - Displays pH trends for Influent and Effluent
   - Color-coded lines for easy comparison
   - Interactive tooltips on hover

2. **Turbidity Chart**
   - Shows Turbidity trends (NTU) for both streams
   - Visual comparison of treatment effectiveness

3. **Other Parameters Chart**
   - Combined visualization of 6 parameters:
     - TDS (Total Dissolved Solids)
     - Hardness
     - Chloride
     - Calcium
     - Phosphorus
     - Dissolved Oxygen (DO)
   - Each parameter shows both Influent and Effluent lines
   - Color-coded legend for easy identification

### Chart Features
- **Responsive**: Automatically adjusts to screen size
- **Interactive**: Hover to see exact values
- **Legend**: Click to show/hide specific data series
- **Auto-scaling**: Y-axis starts at zero for better visualization
- **Smooth Lines**: Curved line charts for better trend visualization

## 🎨 Customization

### Updating Parameter Information
Edit the parameter descriptions and safe ranges in `index.html` under the "Parameter Information" section (lines 32-63).

### Adjusting Demo Data Ranges
Modify the demo data generation in `script.js` (lines 19-41) to change the initial data ranges:
```javascript
influent: {
    ph: (Math.random() * (8.5 - 6.5) + 6.5).toFixed(1),
    // Adjust ranges as needed
}
```

### Changing Admin Credentials
- **Via UI**: Use the "Change Password" tab in Admin Panel
- **Via Code**: Modify `script.js` lines 3-6:
```javascript
localStorage.setItem('adminCredentials', JSON.stringify({
    username: 'your_username',
    password: 'your_password'
}));
```

### Styling Customization
- **Colors**: Edit `minor_project2.css` to change color scheme
- **Table Borders**: Modify border colors in CSS (lines 47-60)
- **Chart Colors**: Update color values in `script.js` `updateGraph()` function

## 🛠️ Tech Stack

- **HTML5**: Structure and semantic markup
- **CSS3**: Custom styling with Bootstrap integration
- **Bootstrap 5.3.2**: Responsive UI framework (via CDN)
- **JavaScript (ES6+)**: Application logic and data management
- **Chart.js**: Interactive chart library (via CDN)
- **localStorage API**: Client-side data persistence

### External Dependencies (CDN)
- Bootstrap CSS: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css`
- Bootstrap JS: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js`
- Chart.js: `https://cdn.jsdelivr.net/npm/chart.js`

## 📝 Notes & Limitations

### Browser Compatibility
- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- localStorage support required

### Data Persistence
- **Browser-specific**: Data stored in localStorage is specific to each browser
- **Not shared**: Data is not synchronized across devices or browsers
- **Clearing data**: Clearing browser cache/localStorage will reset all data
- **Multi-user**: For shared multi-user data, a backend API or database would be required

### Security Considerations
- Admin credentials are stored in plain text in localStorage (not suitable for production)
- No encryption for sensitive data
- For production use, implement proper authentication and backend API

### Future Enhancements
- Backend API integration for shared data
- User authentication system
- Data export functionality (CSV/PDF)
- Email alerts for parameter thresholds
- Historical data beyond 7 days
- Real-time data integration from sensors
- Multi-language support implementation

**© 2025 Water Treatment Plant Dashboard - All Rights Reserved**
