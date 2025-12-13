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
                turbidity: Math.floor(Math.random() * (120 - 80) + 80),  // Turbidity range: 80-120 NTU
                tds: Math.floor(Math.random() * (600 - 400) + 400),       // TDS range: 400-600 mg/L
                hardness: Number((Math.random() * (200 - 100) + 100).toFixed(2)), // Hardness range: 100-200 mg/L
                chloride: Number((Math.random() * (300 - 150) + 150).toFixed(2)), // Chloride range: 150-300 mg/L
                calcium: Number((Math.random() * (120 - 60) + 60).toFixed(2)),     // Calcium range: 60-120 mg/L
                phosphorus: Number((Math.random() * (5 - 1) + 1).toFixed(2)),     // Phosphorus range: 1-5 mg/L
                do: Number((Math.random() * (3 - 1) + 1).toFixed(2))              // DO range: 1-3 mg/L
            },
            effluent: {
                ph: (Math.random() * (8.0 - 7.0) + 7.0).toFixed(1),      // pH range: 7.0-8.0
                turbidity: Math.floor(Math.random() * (30 - 10) + 10),   // Turbidity range: 10-30 NTU
                tds: Math.floor(Math.random() * (400 - 200) + 200),       // TDS range: 200-400 mg/L
                hardness: Number((Math.random() * (150 - 50) + 50).toFixed(2)),   // Hardness range: 50-150 mg/L
                chloride: Number((Math.random() * (200 - 100) + 100).toFixed(2)), // Chloride range: 100-200 mg/L
                calcium: Number((Math.random() * (80 - 40) + 40).toFixed(2)),     // Calcium range: 40-80 mg/L
                phosphorus: Number((Math.random() * (0.5 - 0.1) + 0.1).toFixed(2)), // Phosphorus range: 0.1-0.5 mg/L
                do: Number((Math.random() * (8 - 5) + 5).toFixed(2))              // DO range: 5-8 mg/L
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
            turbidity: document.getElementById('turbidity-influent').value,
            tds: document.getElementById('tds-influent').value,
            hardness: document.getElementById('hardness-influent').value,
            chloride: document.getElementById('chloride-influent').value,
            calcium: document.getElementById('calcium-influent').value,
            phosphorus: document.getElementById('phosphorus-influent').value,
            do: document.getElementById('do-influent').value
        },
        effluent: {
            ph: document.getElementById('ph-effluent').value,
            turbidity: document.getElementById('turbidity-effluent').value,
            tds: document.getElementById('tds-effluent').value,
            hardness: document.getElementById('hardness-effluent').value,
            chloride: document.getElementById('chloride-effluent').value,
            calcium: document.getElementById('calcium-effluent').value,
            phosphorus: document.getElementById('phosphorus-effluent').value,
            do: document.getElementById('do-effluent').value
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
    document.getElementById('ph-before').textContent = parameters.influent.ph ?? '';
    document.getElementById('turbidity-before').textContent = parameters.influent.turbidity ?? '';
    document.getElementById('tds-before').textContent = parameters.influent.tds ?? '';
    document.getElementById('hardness-before').textContent = parameters.influent.hardness ?? '';
    document.getElementById('chloride-before').textContent = parameters.influent.chloride ?? '';
    document.getElementById('calcium-before').textContent = parameters.influent.calcium ?? '';
    document.getElementById('phosphorus-before').textContent = parameters.influent.phosphorus ?? '';
    document.getElementById('do-before').textContent = parameters.influent.do ?? '';
    
    document.getElementById('ph-after').textContent = parameters.effluent.ph ?? '';
    document.getElementById('turbidity-after').textContent = parameters.effluent.turbidity ?? '';
    document.getElementById('tds-after').textContent = parameters.effluent.tds ?? '';
    document.getElementById('hardness-after').textContent = parameters.effluent.hardness ?? '';
    document.getElementById('chloride-after').textContent = parameters.effluent.chloride ?? '';
    document.getElementById('calcium-after').textContent = parameters.effluent.calcium ?? '';
    document.getElementById('phosphorus-after').textContent = parameters.effluent.phosphorus ?? '';
    document.getElementById('do-after').textContent = parameters.effluent.do ?? '';
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
            <td>${record.influent.turbidity ?? ''}</td>
            <td>${record.effluent.turbidity ?? ''}</td>
            <td>${record.influent.tds ?? ''}</td>
            <td>${record.effluent.tds ?? ''}</td>
            <td>${record.influent.hardness ?? ''}</td>
            <td>${record.effluent.hardness ?? ''}</td>
            <td>${record.influent.chloride ?? ''}</td>
            <td>${record.effluent.chloride ?? ''}</td>
            <td>${record.influent.calcium ?? ''}</td>
            <td>${record.effluent.calcium ?? ''}</td>
            <td>${record.influent.phosphorus ?? ''}</td>
            <td>${record.effluent.phosphorus ?? ''}</td>
            <td>${record.influent.do ?? ''}</td>
            <td>${record.effluent.do ?? ''}</td>
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
    const labels = history.map(record => record.date).reverse();

    // Helper to coerce to numbers (empty -> null)
    const toNumberOrNull = (value) => {
        if (value === null || value === undefined || value === '') return null;
        const n = Number(value);
        return Number.isFinite(n) ? n : null;
    };

    const color = (r, g, b) => `rgba(${r}, ${g}, ${b}, 1)`;

    const chartOptions = {
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
    };

    // Chart 1: pH Level
    const phCtx = document.getElementById('phChart').getContext('2d');
    if (window.phChart instanceof Chart) {
        window.phChart.destroy();
    }
    window.phChart = new Chart(phCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
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
                }
            ]
        },
        options: chartOptions
    });

    // Chart 2: Turbidity
    const turbidityCtx = document.getElementById('turbidityChart').getContext('2d');
    if (window.turbidityChart instanceof Chart) {
        window.turbidityChart.destroy();
    }
    window.turbidityChart = new Chart(turbidityCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Turbidity (Influent)',
                    data: history.map(record => toNumberOrNull(record.influent.turbidity)).reverse(),
                    borderColor: color(255, 206, 86),
                    backgroundColor: color(255, 206, 86),
                    tension: 0.2,
                    spanGaps: true
                },
                {
                    label: 'Turbidity (Effluent)',
                    data: history.map(record => toNumberOrNull(record.effluent.turbidity)).reverse(),
                    borderColor: color(75, 192, 192),
                    backgroundColor: color(75, 192, 192),
                    tension: 0.2,
                    spanGaps: true
                }
            ]
        },
        options: chartOptions
    });

    // Chart 3: Other Parameters (TDS, Hardness, Chloride, Calcium, Phosphorus, DO)
    const otherParamsCtx = document.getElementById('otherParamsChart').getContext('2d');
    if (window.otherParamsChart instanceof Chart) {
        window.otherParamsChart.destroy();
    }
    window.otherParamsChart = new Chart(otherParamsCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                // TDS
                {
                    label: 'TDS (Influent)',
                    data: history.map(record => toNumberOrNull(record.influent.tds)).reverse(),
                    borderColor: color(153, 102, 255),
                    backgroundColor: color(153, 102, 255),
                    tension: 0.2,
                    spanGaps: true
                },
                {
                    label: 'TDS (Effluent)',
                    data: history.map(record => toNumberOrNull(record.effluent.tds)).reverse(),
                    borderColor: color(255, 159, 64),
                    backgroundColor: color(255, 159, 64),
                    tension: 0.2,
                    spanGaps: true
                },
                // Hardness
                {
                    label: 'Hardness (Influent)',
                    data: history.map(record => toNumberOrNull(record.influent.hardness)).reverse(),
                    borderColor: color(201, 203, 207),
                    backgroundColor: color(201, 203, 207),
                    tension: 0.2,
                    spanGaps: true
                },
                {
                    label: 'Hardness (Effluent)',
                    data: history.map(record => toNumberOrNull(record.effluent.hardness)).reverse(),
                    borderColor: color(99, 255, 132),
                    backgroundColor: color(99, 255, 132),
                    tension: 0.2,
                    spanGaps: true
                },
                // Chloride
                {
                    label: 'Chloride (Influent)',
                    data: history.map(record => toNumberOrNull(record.influent.chloride)).reverse(),
                    borderColor: color(0, 0, 0),
                    backgroundColor: color(0, 0, 0),
                    tension: 0.2,
                    spanGaps: true
                },
                {
                    label: 'Chloride (Effluent)',
                    data: history.map(record => toNumberOrNull(record.effluent.chloride)).reverse(),
                    borderColor: color(255, 0, 255),
                    backgroundColor: color(255, 0, 255),
                    tension: 0.2,
                    spanGaps: true
                },
                // Calcium
                {
                    label: 'Calcium (Influent)',
                    data: history.map(record => toNumberOrNull(record.influent.calcium)).reverse(),
                    borderColor: color(128, 0, 128),
                    backgroundColor: color(128, 0, 128),
                    tension: 0.2,
                    spanGaps: true
                },
                {
                    label: 'Calcium (Effluent)',
                    data: history.map(record => toNumberOrNull(record.effluent.calcium)).reverse(),
                    borderColor: color(255, 105, 180),
                    backgroundColor: color(255, 105, 180),
                    tension: 0.2,
                    spanGaps: true
                },
                // Phosphorus
                {
                    label: 'Phosphorus (Influent)',
                    data: history.map(record => toNumberOrNull(record.influent.phosphorus)).reverse(),
                    borderColor: color(0, 128, 255),
                    backgroundColor: color(0, 128, 255),
                    tension: 0.2,
                    spanGaps: true
                },
                {
                    label: 'Phosphorus (Effluent)',
                    data: history.map(record => toNumberOrNull(record.effluent.phosphorus)).reverse(),
                    borderColor: color(0, 200, 200),
                    backgroundColor: color(0, 200, 200),
                    tension: 0.2,
                    spanGaps: true
                },
                // Dissolved Oxygen
                {
                    label: 'DO (Influent)',
                    data: history.map(record => toNumberOrNull(record.influent.do)).reverse(),
                    borderColor: color(100, 100, 0),
                    backgroundColor: color(100, 100, 0),
                    tension: 0.2,
                    spanGaps: true
                },
                {
                    label: 'DO (Effluent)',
                    data: history.map(record => toNumberOrNull(record.effluent.do)).reverse(),
                    borderColor: color(200, 200, 0),
                    backgroundColor: color(200, 200, 0),
                    tension: 0.2,
                    spanGaps: true
                }
            ]
        },
        options: chartOptions
    });
}
