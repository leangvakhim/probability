// --- Step Data Configuration ---
const steps = [
    {
        title: "1. The Waiting Game",
        content: `
            <p>The <strong>Exponential Distribution</strong> is a continuous probability distribution that is heavily used to model the <em>time we must wait</em> until a specific event occurs.</p>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-r-lg">
                <h4 class="font-bold text-blue-800 mb-1">Real-World Example</h4>
                <p class="text-sm text-blue-900">Imagine you are waiting for a shooting star. If shooting stars appear randomly and independently of each other, the time you spend waiting for the next one perfectly follows an exponential distribution.</p>
            </div>

            <p>Other examples include:</p>
            <ul class="list-disc pl-5 space-y-1 mt-2">
                <li>The time until a lightbulb burns out.</li>
                <li>The time between calls arriving at a customer service desk.</li>
                <li>The distance between mutations on a DNA strand.</li>
            </ul>
        `,
        chartType: 'pdf',
        showControls: false,
        defaultLambda: 1.0,
        hideChart: false
    },
    {
        title: "2. The Rate Parameter ($\\lambda$)",
        content: `
            <p>The entire distribution is controlled by a single, powerful parameter called the <strong>Rate Parameter</strong>, denoted by the Greek letter <strong>$\\lambda$ (lambda)</strong>.</p>

            <p>$\\lambda$ represents the <strong>average number of events per unit of time</strong>.</p>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-r-lg">
                <h4 class="font-bold text-blue-800 mb-1">Real-World Example</h4>
                <p class="text-sm text-blue-900">Think of a fast-food drive-thru.</p>
                <ul class="list-disc pl-5 mt-2 text-sm text-blue-900">
                    <li><strong>High $\\lambda$ (e.g., 5 cars/hour):</strong> It's busy! The curve is steep, meaning short waiting times are highly probable.</li>
                    <li><strong>Low $\\lambda$ (e.g., 0.5 cars/hour):</strong> It's quiet. The curve is flat, meaning you are much more likely to wait a long time.</li>
                </ul>
            </div>

            <p class="font-semibold text-indigo-700 text-center mt-4">&rarr; Try adjusting the slider on the right to see how $\\lambda$ shapes the curve!</p>
        `,
        chartType: 'pdf',
        showControls: true,
        defaultLambda: 1.0,
        hideChart: false
    },
    {
        title: "3. Probability Density Function",
        content: `
            <p>The curve you see is the <strong>Probability Density Function (PDF)</strong>. Its formula is:</p>

            <div class="text-center my-4">
                $$f(x) = \lambda e^{-\lambda x}$$
            </div>

            <p><strong>Important:</strong> The Y-axis is <em>density</em>, not direct probability. To find the actual probability of waiting a certain amount of time (say, between 1 and 2 hours), you calculate the <strong>area under the curve</strong> between those two points.</p>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-r-lg">
                <h4 class="font-bold text-blue-800 mb-1">Real-World Example</h4>
                <p class="text-sm text-blue-900">If $\\lambda = 1$ (1 bus per hour), the area under the curve between $x=0$ and $x=1$ represents the exact probability (~63%) that the bus will arrive within your first hour of waiting. Notice how the curve drops exponentially—meaning excessively long waits become highly unlikely.</p>
            </div>
        `,
        chartType: 'pdf_area',
        showControls: true,
        defaultLambda: 1.0,
        hideChart: false
    },
    {
        title: "4. Cumulative Distribution (CDF)",
        content: `
            <p>Often, we want to know the probability that an event happens <em>before or exactly at</em> a certain time $x$. This is given by the <strong>Cumulative Distribution Function (CDF)</strong>:</p>

            <div class="text-center my-4">
                $$F(x) = 1 - e^{-\lambda x}$$
            </div>

            <p>Notice how the chart has changed from a decreasing curve to an "S-shape" that climbs and approaches 1.0 (or 100%).</p>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-r-lg">
                <h4 class="font-bold text-blue-800 mb-1">Real-World Example</h4>
                <p class="text-sm text-blue-900">If your laptop battery dies at an exponential rate of $\\lambda = 0.2$ per year. You can look at the CDF at $x = 3$ years to find the total probability (about 45%) that your battery will have died <em>by</em> the end of year 3.</p>
            </div>
        `,
        chartType: 'cdf',
        showControls: true,
        defaultLambda: 1.0,
        hideChart: false
    },
    {
        title: "5. The Memoryless Property",
        content: `
            <p>The exponential distribution is famous for being <strong>memoryless</strong>. The math states:</p>

            <div class="text-center my-4">
                $$P(X > x + t \mid X > x) = P(X > t)$$
            </div>

            <p>In plain English: The machine doesn't remember how long it has been running.</p>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-r-lg">
                <h4 class="font-bold text-blue-800 mb-1">Real-World Example</h4>
                <p class="text-sm text-blue-900">Suppose you are waiting for a taxi, and the time follows an exponential distribution. If you have already waited 15 minutes, the probability of waiting <em>another</em> 5 minutes is exactly the same as if you had just walked up to the corner and waited 5 minutes.</p>
                <p class="text-sm text-blue-900 mt-2"><strong>The system has no memory of your past waiting time!</strong></p>
            </div>
        `,
        chartType: 'pdf',
        showControls: false,
        defaultLambda: 1.0,
        hideChart: false
    },
    {
        title: "6. Summary & Formulas",
        content: `
            <p>You have successfully explored the core concepts of the Exponential Distribution!</p>
            <p class="mt-4">We covered:</p>
            <ul class="list-disc pl-5 space-y-2 mt-2">
                <li>The basic concept of waiting times.</li>
                <li>How the rate parameter $\\lambda$ shapes the curve.</li>
                <li>The Probability Density Function (PDF).</li>
                <li>The Cumulative Distribution Function (CDF).</li>
                <li>The fascinating "Memoryless Property".</li>
            </ul>
            <p class="mt-6 text-indigo-700 font-bold">Review the cheat sheet on the right for all standard formulas &rarr;</p>
        `,
        chartType: 'none',
        showControls: false,
        defaultLambda: 1.0,
        hideChart: true
    }
];

// --- Application State ---
let currentStep = 0;
let currentLambda = 1.0;
let chartInstance = null;

// --- DOM Elements ---
const elTitle = document.getElementById('step-title');
const elContent = document.getElementById('step-content');
const elStepIndicator = document.getElementById('step-indicator');
const elTotalSteps = document.getElementById('total-steps');
const elBtnPrev = document.getElementById('btn-prev');
const elBtnNext = document.getElementById('btn-next');
const elDotContainer = document.getElementById('dot-indicators');
const elControls = document.getElementById('controls-container');
const elLambdaSlider = document.getElementById('lambda-slider');
const elLambdaValue = document.getElementById('lambda-value');
const elRecapOverlay = document.getElementById('recap-overlay');
const ctx = document.getElementById('mathChart').getContext('2d');

// --- Initialization ---
function init() {
    elTotalSteps.textContent = steps.length;
    createDots();

    // Event Listeners
    elBtnNext.addEventListener('click', () => changeStep(1));
    elBtnPrev.addEventListener('click', () => changeStep(-1));

    elLambdaSlider.addEventListener('input', (e) => {
        currentLambda = parseFloat(e.target.value);
        elLambdaValue.textContent = currentLambda.toFixed(1);

        // Re-render math if lambda is shown in equations (Optional, currently hardcoded in LaTeX)
        updateChart();
    });

    // Initial Render
    renderStep();
}

// --- UI Updates ---
function createDots() {
    elDotContainer.innerHTML = '';
    for (let i = 0; i < steps.length; i++) {
        const dot = document.createElement('div');
        dot.className = `w-2 h-2 rounded-full transition-colors duration-300 ${i === 0 ? 'bg-indigo-600' : 'bg-slate-300'}`;
        elDotContainer.appendChild(dot);
    }
}

function updateDots() {
    const dots = elDotContainer.children;
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = `w-2 h-2 rounded-full transition-colors duration-300 ${i === currentStep ? 'bg-indigo-600 w-4' : 'bg-slate-300'}`;
    }
}

function changeStep(direction) {
    currentStep += direction;
    if (currentStep < 0) currentStep = 0;
    if (currentStep >= steps.length) currentStep = steps.length - 1;
    renderStep();
}

function renderStep() {
    const stepData = steps[currentStep];

    // Update Text content
    elTitle.textContent = stepData.title;
    elContent.innerHTML = stepData.content;
    elStepIndicator.textContent = currentStep + 1;

    // Render MathJax
    if (window.MathJax) {
        MathJax.typesetPromise([elContent]).catch((err) => console.log('MathJax Error:', err));
    }

    // Update Controls
    if (stepData.showControls) {
        elControls.classList.remove('hidden');
    } else {
        elControls.classList.add('hidden');
    }

    // Default lambda reset on step change if desired, or keep user choice.
    // Let's reset it to 1.0 on new steps to avoid confusion, except when navigating back to controls.
    if (!stepData.showControls) {
        currentLambda = stepData.defaultLambda;
        elLambdaSlider.value = currentLambda;
        elLambdaValue.textContent = currentLambda.toFixed(1);
    }

    // Update Chart visibility
    if (stepData.hideChart) {
        elRecapOverlay.classList.remove('hidden');
        elRecapOverlay.classList.add('flex');
        if (window.MathJax) {
            MathJax.typesetPromise([elRecapOverlay]).catch(console.log);
        }
    } else {
        elRecapOverlay.classList.add('hidden');
        elRecapOverlay.classList.remove('flex');
        updateChart();
    }

    // Button states
    elBtnPrev.disabled = currentStep === 0;

    if (currentStep === steps.length - 1) {
        elBtnNext.disabled = true;
        elBtnNext.classList.replace('bg-indigo-600', 'bg-slate-300');
    } else {
        elBtnNext.disabled = false;
        elBtnNext.classList.replace('bg-slate-300', 'bg-indigo-600');
    }

    updateDots();
}

// --- Math & Chart Logic ---
function generateData(type, lambda) {
    const labels = [];
    const data1 = []; // Main curve
    const data2 = []; // Filled area (if needed)

    // x values from 0 to 5
    for (let x = 0; x <= 5; x += 0.1) {
        const xVal = parseFloat(x.toFixed(1));
        labels.push(xVal);

        if (type === 'pdf' || type === 'pdf_area') {
            // PDF: f(x) = lambda * e^(-lambda * x)
            const yVal = lambda * Math.exp(-lambda * xVal);
            data1.push(yVal);

            if (type === 'pdf_area') {
                // Fill only up to x = 1.5 for illustration
                data2.push(xVal <= 1.5 ? yVal : null);
            }
        } else if (type === 'cdf') {
            // CDF: F(x) = 1 - e^(-lambda * x)
            const yVal = 1 - Math.exp(-lambda * xVal);
            data1.push(yVal);
        }
    }

    return { labels, data1, data2 };
}

function updateChart() {
    const stepData = steps[currentStep];
    if (stepData.hideChart) return;

    const chartType = stepData.chartType;
    const { labels, data1, data2 } = generateData(chartType, currentLambda);

    // Destroy previous instance
    if (chartInstance) {
        chartInstance.destroy();
    }

    let datasets = [];

    if (chartType === 'pdf') {
        datasets.push({
            label: 'PDF Curve f(x)',
            data: data1,
            borderColor: '#4f46e5', // Indigo-600
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 0
        });
    } else if (chartType === 'pdf_area') {
        datasets.push({
            label: 'Probability Area (P(0 ≤ X ≤ 1.5))',
            data: data2,
            borderColor: 'transparent',
            backgroundColor: 'rgba(16, 185, 129, 0.4)', // Emerald
            fill: true,
            tension: 0.4,
            pointRadius: 0
        });
        datasets.push({
            label: 'PDF Curve f(x)',
            data: data1,
            borderColor: '#4f46e5',
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            pointRadius: 0
        });
    } else if (chartType === 'cdf') {
        datasets.push({
            label: 'CDF Curve F(x)',
            data: data1,
            borderColor: '#10b981', // Emerald-500
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 0
        });
    }

    const chartConfig = {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: { family: "'Inter', sans-serif", size: 13 },
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleFont: { size: 14 },
                    bodyFont: { size: 14 },
                    callbacks: {
                        title: (context) => `Time (x): ${context[0].label}`,
                        label: (context) => `Value: ${context.raw.toFixed(4)}`
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time / Distance (x)',
                        font: { weight: 'bold' }
                    },
                    grid: { color: '#f1f5f9' }
                },
                y: {
                    title: {
                        display: true,
                        text: chartType === 'cdf' ? 'Cumulative Probability F(x)' : 'Density f(x)',
                        font: { weight: 'bold' }
                    },
                    min: 0,
                    // Lock Y axis a bit higher than max possible PDF to avoid bouncing when sliding
                    max: chartType === 'cdf' ? 1.05 : 5.2,
                    grid: { color: '#f1f5f9' }
                }
            },
            animation: {
                duration: 400,
                easing: 'easeOutQuart'
            }
        }
    };

    chartInstance = new Chart(ctx, chartConfig);
}

// Boot up the application
document.addEventListener('DOMContentLoaded', init);