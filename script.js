// Initialize default admin credentials in localStorage if not exists
if (!localStorage.getItem('adminCredentials')) {
    localStorage.setItem('adminCredentials', JSON.stringify({
        username: 'water',
        password: 'water1234'
    }));
}

// Initialize parameters history with demo data if not exists
if (!localStorage.getItem('parametersHistory')) {
    const demoData = [];
    const today = new Date();
    
    // Generate 7 days of realistic demo data
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        demoData.push({
            date: date.toISOString().split('T')[0],
            influent: {
                ph: (Math.random() * (8.5 - 6.5) + 6.5).toFixed(1),      // pH range: 6.5-8.5
                bod: Math.floor(Math.random() * (350 - 250) + 250),      // BOD range: 250-350 mg/L
                cod: Math.floor(Math.random() * (700 - 500) + 500),      // COD range: 500-700 mg/L
                tss: Math.floor(Math.random() * (200 - 100) + 100),      // TSS range: 100-200 mg/L
                turbidity: Math.floor(Math.random() * (120 - 80) + 80),  // Turbidity range: 80-120 NTU
                nh3: Number((Math.random() * (50 - 20) + 20).toFixed(2)), // NH3 range: 20-50 mg/L
                do: Number((Math.random() * (3 - 1) + 1).toFixed(2)),     // DO range: 1-3 mg/L
                nutrients: Number((Math.random() * (30 - 10) + 10).toFixed(2)) // Nutrients range: 10-30 mg/L
            },
            effluent: {
                ph: (Math.random() * (8.0 - 7.0) + 7.0).toFixed(1),      // pH range: 7.0-8.0
                bod: Math.floor(Math.random() * (30 - 10) + 10),         // BOD range: 10-30 mg/L
                cod: Math.floor(Math.random() * (100 - 50) + 50),        // COD range: 50-100 mg/L
                tss: Math.floor(Math.random() * (30 - 5) + 5),           // TSS range: 5-30 mg/L
                turbidity: Math.floor(Math.random() * (30 - 10) + 10),   // Turbidity range: 10-30 NTU
                nh3: Number((Math.random() * (5 - 1) + 1).toFixed(2)),    // NH3 range: 1-5 mg/L
                do: Number((Math.random() * (8 - 5) + 5).toFixed(2)),     // DO range: 5-8 mg/L
                nutrients: Number((Math.random() * (10 - 1) + 1).toFixed(2)) // Nutrients range: 1-10 mg/L
            }
        });
    }
    
    localStorage.setItem('parametersHistory', JSON.stringify(demoData));
}

// Bootstrap Modal instances
let loginModal;
let adminModal;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap modals
    loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    adminModal = new bootstrap.Modal(document.getElementById('adminModal'));
    
    // Initialize event listeners
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('parameterForm').addEventListener('submit', handleParameterUpdate);
    document.getElementById('passwordForm').addEventListener('submit', handlePasswordChange);
    
    // Load and display initial data
    loadHistoricalData();
    updateGraph();
});

function showLoginModal() {
    loginModal.show();
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const credentials = JSON.parse(localStorage.getItem('adminCredentials'));
    
    if (username === credentials.username && password === credentials.password) {
        loginModal.hide();
        adminModal.show();
        document.getElementById('loginForm').reset();
    } else {
        alert('Invalid credentials');
    }
}

function handleParameterUpdate(e) {
    e.preventDefault();
    
    const newParameters = {
        date: new Date().toISOString().split('T')[0],
        influent: {
            ph: document.getElementById('ph-influent').value,
            bod: document.getElementById('bod-influent').value,
            cod: document.getElementById('cod-influent').value,
            tss: document.getElementById('tss-influent').value,
            turbidity: document.getElementById('turbidity-influent').value,
            nh3: document.getElementById('nh3-influent').value,
            do: document.getElementById('do-influent').value,
            nutrients: document.getElementById('nutrients-influent').value
        },
        effluent: {
            ph: document.getElementById('ph-effluent').value,
            bod: document.getElementById('bod-effluent').value,
            cod: document.getElementById('cod-effluent').value,
            tss: document.getElementById('tss-effluent').value,
            turbidity: document.getElementById('turbidity-effluent').value,
            nh3: document.getElementById('nh3-effluent').value,
            do: document.getElementById('do-effluent').value,
            nutrients: document.getElementById('nutrients-effluent').value
        }
    };
    
    // Update current parameters display
    updateCurrentParameters(newParameters);
    
    // Add to history
    const history = JSON.parse(localStorage.getItem('parametersHistory'));
    history.unshift(newParameters);
    
    // Keep only last 7 days
    while (history.length > 7) {
        history.pop();
    }
    
    localStorage.setItem('parametersHistory', JSON.stringify(history));
    
    // Refresh displays
    loadHistoricalData();
    updateGraph();
    
    adminModal.hide();
    document.getElementById('parameterForm').reset();
}

function handlePasswordChange(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const credentials = JSON.parse(localStorage.getItem('adminCredentials'));
    
    if (currentPassword !== credentials.password) {
        alert('Current password is incorrect');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return;
    }
    
    credentials.password = newPassword;
    localStorage.setItem('adminCredentials', JSON.stringify(credentials));
    
    alert('Password updated successfully');
    adminModal.hide();
    document.getElementById('passwordForm').reset();
}

function updateCurrentParameters(parameters) {
    document.getElementById('ph-before').textContent = parameters.influent.ph;
    document.getElementById('bod-before').textContent = parameters.influent.bod;
    document.getElementById('cod-before').textContent = parameters.influent.cod;
    document.getElementById('tss-before').textContent = parameters.influent.tss;
    document.getElementById('turbidity-before').textContent = parameters.influent.turbidity;
    document.getElementById('nh3-before').textContent = parameters.influent.nh3 ?? '';
    document.getElementById('do-before').textContent = parameters.influent.do ?? '';
    document.getElementById('nutrients-before').textContent = parameters.influent.nutrients ?? '';
    
    document.getElementById('ph-after').textContent = parameters.effluent.ph;
    document.getElementById('bod-after').textContent = parameters.effluent.bod;
    document.getElementById('cod-after').textContent = parameters.effluent.cod;
    document.getElementById('tss-after').textContent = parameters.effluent.tss;
    document.getElementById('turbidity-after').textContent = parameters.effluent.turbidity;
    document.getElementById('nh3-after').textContent = parameters.effluent.nh3 ?? '';
    document.getElementById('do-after').textContent = parameters.effluent.do ?? '';
    document.getElementById('nutrients-after').textContent = parameters.effluent.nutrients ?? '';
}

function loadHistoricalData() {
    const history = JSON.parse(localStorage.getItem('parametersHistory'));
    const tbody = document.querySelector('#past-data-table tbody');
    tbody.innerHTML = '';
    
    history.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.influent.ph ?? ''}</td>
            <td>${record.effluent.ph ?? ''}</td>
            <td>${record.influent.bod ?? ''}</td>
            <td>${record.effluent.bod ?? ''}</td>
            <td>${record.influent.cod ?? ''}</td>
            <td>${record.effluent.cod ?? ''}</td>
            <td>${record.influent.tss ?? ''}</td>
            <td>${record.effluent.tss ?? ''}</td>
            <td>${record.influent.turbidity ?? ''}</td>
            <td>${record.effluent.turbidity ?? ''}</td>
            <td>${record.influent.nh3 ?? ''}</td>
            <td>${record.effluent.nh3 ?? ''}</td>
            <td>${record.influent.do ?? ''}</td>
            <td>${record.effluent.do ?? ''}</td>
            <td>${record.influent.nutrients ?? ''}</td>
            <td>${record.effluent.nutrients ?? ''}</td>
        `;
        tbody.appendChild(row);
    });
    
    // Update current parameters with the most recent data
    if (history.length > 0) {
        updateCurrentParameters(history[0]);
    }
}

function updateGraph() {
    const history = JSON.parse(localStorage.getItem('parametersHistory'));
    const ctx = document.getElementById('wastewaterChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.wastewaterChart instanceof Chart) {
        window.wastewaterChart.destroy();
    }
    
    const labels = history.map(record => record.date).reverse();

    // Helper to coerce to numbers (empty -> null)
    const toNumberOrNull = (value) => {
        if (value === null || value === undefined || value === '') return null;
        const n = Number(value);
        return Number.isFinite(n) ? n : null;
    };

    const color = (r, g, b) => `rgba(${r}, ${g}, ${b}, 1)`;

    const datasets = [
        // pH
        {
            label: 'pH (Influent)',
            data: history.map(record => toNumberOrNull(record.influent.ph)).reverse(),
            borderColor: color(255, 99, 132),
            backgroundColor: color(255, 99, 132),
            tension: 0.2,
            spanGaps: true
        },
        {
            label: 'pH (Effluent)',
            data: history.map(record => toNumberOrNull(record.effluent.ph)).reverse(),
            borderColor: color(54, 162, 235),
            backgroundColor: color(54, 162, 235),
            tension: 0.2,
            spanGaps: true
        },
        // BOD
        {
            label: 'BOD (Influent)',
            data: history.map(record => toNumberOrNull(record.influent.bod)).reverse(),
            borderColor: color(255, 206, 86),
            backgroundColor: color(255, 206, 86),
            tension: 0.2,
            spanGaps: true
        },
        {
            label: 'BOD (Effluent)',
            data: history.map(record => toNumberOrNull(record.effluent.bod)).reverse(),
            borderColor: color(75, 192, 192),
            backgroundColor: color(75, 192, 192),
            tension: 0.2,
            spanGaps: true
        },
        // COD
        {
            label: 'COD (Influent)',
            data: history.map(record => toNumberOrNull(record.influent.cod)).reverse(),
            borderColor: color(153, 102, 255),
            backgroundColor: color(153, 102, 255),
            tension: 0.2,
            spanGaps: true
        },
        {
            label: 'COD (Effluent)',
            data: history.map(record => toNumberOrNull(record.effluent.cod)).reverse(),
            borderColor: color(255, 159, 64),
            backgroundColor: color(255, 159, 64),
            tension: 0.2,
            spanGaps: true
        },
        // TSS
        {
            label: 'TSS (Influent)',
            data: history.map(record => toNumberOrNull(record.influent.tss)).reverse(),
            borderColor: color(201, 203, 207),
            backgroundColor: color(201, 203, 207),
            tension: 0.2,
            spanGaps: true
        },
        {
            label: 'TSS (Effluent)',
            data: history.map(record => toNumberOrNull(record.effluent.tss)).reverse(),
            borderColor: color(99, 255, 132),
            backgroundColor: color(99, 255, 132),
            tension: 0.2,
            spanGaps: true
        },
        // Turbidity
        {
            label: 'Turbidity (Influent)',
            data: history.map(record => toNumberOrNull(record.influent.turbidity)).reverse(),
            borderColor: color(0, 0, 0),
            backgroundColor: color(0, 0, 0),
            tension: 0.2,
            spanGaps: true
        },
        {
            label: 'Turbidity (Effluent)',
            data: history.map(record => toNumberOrNull(record.effluent.turbidity)).reverse(),
            borderColor: color(255, 0, 255),
            backgroundColor: color(255, 0, 255),
            tension: 0.2,
            spanGaps: true
        }
        ,
        // Ammonia (NH3)
        {
            label: 'NH3 (Influent)',
            data: history.map(record => toNumberOrNull(record.influent.nh3)).reverse(),
            borderColor: color(128, 0, 128),
            backgroundColor: color(128, 0, 128),
            tension: 0.2,
            spanGaps: true
        },
        {
            label: 'NH3 (Effluent)',
            data: history.map(record => toNumberOrNull(record.effluent.nh3)).reverse(),
            borderColor: color(255, 105, 180),
            backgroundColor: color(255, 105, 180),
            tension: 0.2,
            spanGaps: true
        },
        // Dissolved Oxygen
        {
            label: 'DO (Influent)',
            data: history.map(record => toNumberOrNull(record.influent.do)).reverse(),
            borderColor: color(0, 128, 255),
            backgroundColor: color(0, 128, 255),
            tension: 0.2,
            spanGaps: true
        },
        {
            label: 'DO (Effluent)',
            data: history.map(record => toNumberOrNull(record.effluent.do)).reverse(),
            borderColor: color(0, 200, 200),
            backgroundColor: color(0, 200, 200),
            tension: 0.2,
            spanGaps: true
        },
        // Nutrients
        {
            label: 'Nutrients (Influent)',
            data: history.map(record => toNumberOrNull(record.influent.nutrients)).reverse(),
            borderColor: color(100, 100, 0),
            backgroundColor: color(100, 100, 0),
            tension: 0.2,
            spanGaps: true
        },
        {
            label: 'Nutrients (Effluent)',
            data: history.map(record => toNumberOrNull(record.effluent.nutrients)).reverse(),
            borderColor: color(200, 200, 0),
            backgroundColor: color(200, 200, 0),
            tension: 0.2,
            spanGaps: true
        }
    ];
    
    window.wastewaterChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                tooltip: { enabled: true },
                legend: { position: 'bottom' }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}