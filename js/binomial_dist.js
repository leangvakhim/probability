// <!-- Logic Script -->
// -- State Management --
let currentStep = 0;
const totalSteps = 6; // Updated to 6 steps

// -- Chart Variables --
let binomialChart = null;
let chartInitialized = false;

// -- Navigation Logic --
function showStep(stepIndex) {
    // Hide all steps
    const allSteps = document.querySelectorAll('.step-content');
    allSteps.forEach((el, index) => {
        if (index === stepIndex) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });

    // Update Header and Progress
    document.getElementById('step-indicator').innerText = `Step ${stepIndex + 1} of ${totalSteps}`;
    document.getElementById('progress-bar').style.width = `${((stepIndex + 1) / totalSteps) * 100}%`;

    // Update Buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = (stepIndex === 0);

    if (stepIndex === totalSteps - 1) {
        nextBtn.innerHTML = `Finish`;
        nextBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        nextBtn.classList.add('bg-green-600', 'hover:bg-green-700');
        nextBtn.disabled = true; // Reached the end
    } else {
        nextBtn.innerHTML = `Next Step &rarr;`;
        nextBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
        nextBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
        nextBtn.disabled = false;
    }

    // Init chart if arriving at Step 4 (Index 3)
    if (stepIndex === 3 && !chartInitialized) {
        initChart();
    }
}

function nextStep() {
    if (currentStep < totalSteps - 1) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
        document.getElementById('nextBtn').disabled = false; // re-enable next if moving backwards
    }
}

// -- Math Functions for Binomial Distribution --

// Calculate Factorial
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Calculate Combinations (nCr)
function combinations(n, k) {
    if (k < 0 || k > n) return 0;
    return factorial(n) / (factorial(k) * factorial(n - k));
}

// Calculate single binomial probability P(X=k) (PMF)
function binomialProbability(n, k, p) {
    if (k > n || k < 0) return 0;
    return combinations(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

// Calculate Cumulative Distribution Function (CDF) P(X <= k)
function binomialCDF(n, k, p) {
    let sum = 0;
    for (let i = 0; i <= k; i++) {
        sum += binomialProbability(n, i, p);
    }
    return sum;
}

// Generate entire distribution arrays
function generateDistribution(n, p) {
    const labels = [];
    const data = [];
    for (let k = 0; k <= n; k++) {
        labels.push(k);
        data.push(binomialProbability(n, k, p));
    }
    return { labels, data };
}

// -- Chart.js Logic --
function initChart() {
    const ctx = document.getElementById('binomialChart').getContext('2d');
    const n = parseInt(document.getElementById('nSlider').value);
    const p = parseFloat(document.getElementById('pSlider').value);

    const dist = generateDistribution(n, p);

    binomialChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dist.labels,
            datasets: [{
                label: 'Probability P(X=k)',
                data: dist.data,
                backgroundColor: 'rgba(59, 130, 246, 0.7)', // Tailwind blue-500
                borderColor: 'rgba(37, 99, 235, 1)',   // Tailwind blue-600
                borderWidth: 1,
                borderRadius: 4,
                hoverBackgroundColor: 'rgba(29, 78, 216, 0.9)' // Tailwind blue-700
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `Probability: ${(context.raw * 100).toFixed(2)}%`;
                        }
                    }
                },
                legend: { display: false }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Number of Successes (k)', font: { weight: 'bold' } }
                },
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Probability', font: { weight: 'bold' } },
                    ticks: {
                        callback: function (value) {
                            return value.toFixed(2);
                        }
                    }
                }
            }
        }
    });
    chartInitialized = true;
}

function updateChart() {
    if (!chartInitialized) return;

    const n = parseInt(document.getElementById('nSlider').value);
    const p = parseFloat(document.getElementById('pSlider').value);

    // Update text displays
    document.getElementById('nValueDisplay').innerText = n;
    document.getElementById('pValueDisplay').innerText = p.toFixed(2);

    // Recalculate and update chart
    const dist = generateDistribution(n, p);
    binomialChart.data.labels = dist.labels;
    binomialChart.data.datasets[0].data = dist.data;

    binomialChart.update();
}
