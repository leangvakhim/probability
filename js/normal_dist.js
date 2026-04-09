// --- Canvas & Math Setup ---
const canvas = document.getElementById('distCanvas');
const ctx = canvas.getContext('2d');

// Handle high DPI displays
function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}
window.addEventListener('resize', () => {
    resizeCanvas();
    renderCurrentStep(); // Redraw on resize
});

// Parameters for the distribution
let currentMean = 0;
let currentStdDev = 5;
let highlightMode = 'none'; // 'none', 'empirical'

// The Gaussian function
function gaussian(x, mean, stdDev) {
    const variance = stdDev * stdDev;
    const exponent = -Math.pow(x - mean, 2) / (2 * variance);
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
}

// Draw the curve
function drawCurve() {
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;

    ctx.clearRect(0, 0, width, height);

    // Coordinate mapping limits
    const xMin = -30;
    const xMax = 30;
    // Max Y based on minimum possible standard deviation (2) to keep scale constant
    const maxY = gaussian(0, 0, 2) * 1.2;

    // Mapping functions
    const mapX = (x) => ((x - xMin) / (xMax - xMin)) * width;
    const mapY = (y) => height - ((y / maxY) * height * 0.8) - 20; // Leave bottom margin

    // Draw axis
    ctx.beginPath();
    ctx.moveTo(0, mapY(0));
    ctx.lineTo(width, mapY(0));
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw shaded regions if Empirical Rule is active
    if (highlightMode === 'empirical') {
        const drawRegion = (startDev, endDev, color) => {
            ctx.beginPath();
            const startX = currentMean + (startDev * currentStdDev);
            const endX = currentMean + (endDev * currentStdDev);

            ctx.moveTo(mapX(startX), mapY(0));
            for (let x = startX; x <= endX; x += 0.2) {
                ctx.lineTo(mapX(x), mapY(gaussian(x, currentMean, currentStdDev)));
            }
            ctx.lineTo(mapX(endX), mapY(0));
            ctx.fillStyle = color;
            ctx.fill();
        };

        // 68% (1 std dev)
        drawRegion(-1, 1, 'rgba(59, 130, 246, 0.4)'); // blue-500
        // 95% (2 std dev)
        drawRegion(-2, -1, 'rgba(96, 165, 250, 0.25)'); // blue-400
        drawRegion(1, 2, 'rgba(96, 165, 250, 0.25)');
        // 99.7% (3 std dev)
        drawRegion(-3, -2, 'rgba(147, 197, 253, 0.15)'); // blue-300
        drawRegion(2, 3, 'rgba(147, 197, 253, 0.15)');
    }

    // Draw the bell curve path
    ctx.beginPath();
    for (let x = xMin; x <= xMax; x += 0.2) {
        const y = gaussian(x, currentMean, currentStdDev);
        const px = mapX(x);
        const py = mapY(y);
        if (x === xMin) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = '#2563eb'; // blue-600
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw Mean Line
    ctx.beginPath();
    ctx.moveTo(mapX(currentMean), mapY(0));
    ctx.lineTo(mapX(currentMean), mapY(gaussian(currentMean, currentMean, currentStdDev)));
    ctx.strokeStyle = '#0f172a'; // slate-900
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]); // Reset

    // Mean Label
    ctx.fillStyle = '#0f172a';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Mean (μ)', mapX(currentMean), mapY(0) + 15);
}

// --- Content Steps Data ---
const steps = [
    {
        title: "1. The Bell Curve Introduction",
        concept: "The Normal Distribution, often called the 'Bell Curve' because of its shape, is the most important probability distribution in statistics. It shows that data near the center (average) are more frequent in occurrence than data far from the center.",
        exampleTitle: "Real-World Example: Human Heights",
        example: "Think about the heights of adult men in a city. Most men will be around the average height (e.g., 5 feet 9 inches). These men make up the large 'bump' in the middle of the bell. Very few men are extremely short (e.g., 4 feet tall) and very few are extremely tall (e.g., 7 feet tall). These rare cases form the low 'tails' on the left and right.",
        setup: () => {
            currentMean = 0; currentStdDev = 5; highlightMode = 'none';
            document.getElementById('controlsArea').classList.add('hidden');
        }
    },
    {
        title: "2. The Mean (μ)",
        concept: "The <strong>Mean</strong> (represented by the Greek letter Mu: $\\mu$) is the exact center of the distribution. It represents the average value of your data. Changing the mean shifts the entire bell curve to the left or right, but doesn't change its shape.",
        exampleTitle: "Real-World Example: Apple Weights",
        example: "Imagine two orchards. Orchard A grows apples with an average weight of 150 grams. Orchard B grows a larger variety with an average weight of 200 grams. Their bell curves look identical in shape, but Orchard B's curve is shifted further to the right on the scale.",
        setup: () => {
            currentStdDev = 5; highlightMode = 'none';
            document.getElementById('controlsArea').classList.remove('hidden');
            document.getElementById('meanControl').classList.remove('hidden');
            document.getElementById('stdDevControl').classList.add('hidden');

            // Render math inside labels
            katex.render("\\mu", document.getElementById('meanMath'));
        }
    },
    {
        title: "3. The Standard Deviation (σ)",
        concept: "The <strong>Standard Deviation</strong> (Greek letter Sigma: $\\sigma$) measures how 'spread out' the data is around the mean. <br><br>A <strong>low $\\sigma$</strong> means data is tightly clustered around the mean (a tall, skinny curve). A <strong>high $\\sigma$</strong> means data is spread over a wider range (a flat, wide curve).",
        exampleTitle: "Real-World Example: Test Scores",
        example: "Consider a math test. If the teacher was great and everyone studied together, most students might score around 80%. This is a low standard deviation (tall curve). However, if half the class didn't study at all and half studied perfectly, scores would range wildly from 30% to 100%. This is a high standard deviation (flat curve).",
        setup: () => {
            currentMean = 0; highlightMode = 'none';
            document.getElementById('controlsArea').classList.remove('hidden');
            document.getElementById('meanControl').classList.add('hidden');
            document.getElementById('stdDevControl').classList.remove('hidden');

            // Reset slider for this step
            document.getElementById('stdDevSlider').value = currentStdDev;
            document.getElementById('stdDevValue').textContent = currentStdDev;

            katex.render("\\sigma", document.getElementById('sdMath'));
        }
    },
    {
        title: "4. The 68-95-99.7 Rule",
        concept: "Also known as the Empirical Rule, it allows us to predict where data will fall in a perfectly normal distribution:<br><br><span class='inline-block w-3 h-3 bg-blue-500 opacity-60 rounded-full mr-1'></span> <strong>68%</strong> of data falls within 1 standard deviation ($1\\sigma$) of the mean.<br><span class='inline-block w-3 h-3 bg-blue-400 opacity-40 rounded-full mr-1'></span> <strong>95%</strong> falls within 2 standard deviations ($2\\sigma$).<br><span class='inline-block w-3 h-3 bg-blue-300 opacity-30 rounded-full mr-1'></span> <strong>99.7%</strong> falls within 3 standard deviations ($3\\sigma$).",
        exampleTitle: "Real-World Example: Commute Times",
        example: "If your average commute is 30 minutes ($\\mu=30$) with a standard deviation of 5 minutes ($\\sigma=5$), you can confidently say: 68% of the time, your trip takes 25-35 minutes. 95% of the time, it takes 20-40 minutes. It is practically guaranteed (99.7%) to take between 15 and 45 minutes.",
        setup: () => {
            currentMean = 0; currentStdDev = 5; highlightMode = 'empirical';
            document.getElementById('controlsArea').classList.add('hidden');
        }
    },
    {
        title: "5. Recap & The Equation",
        concept: "To recap: The Normal Distribution describes how natural data clusters around an average ($\\mu$) and spreads out ($\\sigma$).<br><br>While it looks natural, it's defined by a specific mathematical equation called the Probability Density Function (PDF):",
        equation: "f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}",
        exampleTitle: "Breaking down the formula:",
        example: "<ul class='list-disc pl-5 space-y-2 mt-2 text-sm'><li><strong>$f(x)$</strong>: The probability density (height of the curve at point $x$).</li><li><strong>$x$</strong>: The specific data point you are checking.</li><li><strong>$\\mu$ (Mu)</strong>: The mean (center point).</li><li><strong>$\\sigma$ (Sigma)</strong>: The standard deviation (spread).</li><li><strong>$\\pi$ and $e$</strong>: Mathematical constants (approx 3.14159 and 2.71828).</li></ul>",
        setup: () => {
            currentMean = 0; currentStdDev = 5; highlightMode = 'none';
            document.getElementById('controlsArea').classList.add('hidden');
        }
    }
];

let currentStep = 0;

// --- UI Updates ---
function updateUI() {
    const step = steps[currentStep];

    // Execute step-specific canvas/control setup
    step.setup();
    drawCurve();

    // Build HTML for right panel
    let html = `
        <h2 class="text-2xl font-bold text-slate-900 mb-4">${step.title}</h2>
        <div class="text-slate-700 leading-relaxed space-y-4">
            <p>${step.concept}</p>
    `;

    if (step.equation) {
        html += `<div class="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center overflow-x-auto my-6 shadow-inner">
                    <div id="equation-container" class="text-xl"></div>
                    </div>`;
    }

    if (step.exampleTitle) {
        html += `
            <div class="bg-white border border-slate-200 rounded-xl p-5 mt-6 shadow-sm">
                <h3 class="font-semibold text-blue-700 flex items-center mb-2">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    ${step.exampleTitle}
                </h3>
                <div class="text-sm text-slate-600 leading-relaxed">${step.example}</div>
            </div>
        `;
    }
    html += `</div>`;

    const contentDiv = document.getElementById('stepContent');
    contentDiv.innerHTML = html;

    // Re-trigger animation
    contentDiv.classList.remove('fade-in');
    void contentDiv.offsetWidth; // Trigger reflow
    contentDiv.classList.add('fade-in');

    // Render equations if present
    if (step.equation) {
        katex.render(step.equation, document.getElementById('equation-container'), { displayMode: true });
    }

    // Render inline math in text (using a simple regex replacer for this isolated case)
    const textNodes = contentDiv.querySelectorAll('p, div.text-sm, li');
    textNodes.forEach(node => {
        if (node.innerHTML.includes('$')) {
            // Quick and dirty inline math rendering for strings wrapped in $...$
            node.innerHTML = node.innerHTML.replace(/\$(.*?)\$/g, (match, formula) => {
                return katex.renderToString(formula, { throwOnError: false });
            });
        }
    });

    // Update buttons
    document.getElementById('prevBtn').disabled = currentStep === 0;
    document.getElementById('nextBtn').disabled = currentStep === steps.length - 1;

    // Update dots
    const indicators = document.getElementById('stepIndicators');
    indicators.innerHTML = '';
    for (let i = 0; i < steps.length; i++) {
        const dot = document.createElement('div');
        dot.className = `w-2.5 h-2.5 rounded-full transition-colors ${i === currentStep ? 'bg-blue-600' : 'bg-slate-300'}`;
        indicators.appendChild(dot);
    }
}

function renderCurrentStep() {
    drawCurve();
}

// --- Event Listeners ---
document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateUI();
    }
});

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateUI();
    }
});

// Sliders
const meanSlider = document.getElementById('meanSlider');
const meanValue = document.getElementById('meanValue');
meanSlider.addEventListener('input', (e) => {
    currentMean = parseFloat(e.target.value);
    meanValue.textContent = currentMean;
    drawCurve();
});

const stdDevSlider = document.getElementById('stdDevSlider');
const stdDevValue = document.getElementById('stdDevValue');
stdDevSlider.addEventListener('input', (e) => {
    currentStdDev = parseFloat(e.target.value);
    stdDevValue.textContent = currentStdDev;
    drawCurve();
});

// --- Initialization ---
window.onload = () => {
    resizeCanvas();
    updateUI();
};