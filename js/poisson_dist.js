document.addEventListener('DOMContentLoaded', () => {

    // --- Render Math Equations ---
    if (window.renderMathInElement) {
        renderMathInElement(document.body, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ]
        });
    }

    // --- STATE MANAGEMENT ---
    const totalSteps = 5; // Updated to 5 steps
    let currentStep = 0;

    // --- DOM ELEMENTS ---
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressDotsContainer = document.getElementById('progress-dots');

    // Timeline Elements
    const canvas = document.getElementById('timelineCanvas');
    const ctx = canvas.getContext('2d');
    const simulateBtn = document.getElementById('simulateBtn');
    let animationTimeout;

    // Chart Elements
    let chartInstance = null;
    const lambdaSlider = document.getElementById('lambdaSlider');
    const lambdaValueSpan = document.getElementById('lambdaValue');
    const interpLambdaSpans = document.querySelectorAll('[id^="interp-lambda"]');

    // --- INITIALIZATION ---
    initProgressDots();
    updateUI();

    // --- EVENT LISTENERS ---
    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            updateUI();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps - 1) {
            currentStep++;
            updateUI();
        }
    });

    // --- UI UPDATE LOGIC ---
    function initProgressDots() {
        for (let i = 0; i < totalSteps; i++) {
            const dot = document.createElement('div');
            dot.className = `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${i === 0 ? 'bg-white text-indigo-600' : 'bg-indigo-400 text-indigo-100'}`;
            dot.id = `dot-${i}`;
            dot.innerText = i + 1;
            progressDotsContainer.appendChild(dot);
        }
    }

    function updateUI() {
        // Update Step Visibility
        for (let i = 0; i < totalSteps; i++) {
            const stepDiv = document.getElementById(`step-${i}`);
            if (stepDiv) {
                if (i === currentStep) {
                    stepDiv.classList.add('step-active');
                } else {
                    stepDiv.classList.remove('step-active');
                }
            }

            // Update Dots
            const dot = document.getElementById(`dot-${i}`);
            if (dot) {
                if (i === currentStep) {
                    dot.className = 'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 bg-white text-indigo-600 shadow-md ring-4 ring-indigo-300';
                } else if (i < currentStep) {
                    dot.className = 'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 bg-indigo-300 text-indigo-700';
                } else {
                    dot.className = 'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 bg-indigo-500 text-indigo-200';
                }
            }
        }

        // Update Buttons
        prevBtn.disabled = currentStep === 0;

        if (currentStep === totalSteps - 1) {
            nextBtn.innerHTML = "Finish";
            nextBtn.disabled = true;
        } else {
            nextBtn.innerHTML = "Next Step &rarr;";
            nextBtn.disabled = false;
        }

        // Trigger Specific Step Logic
        if (currentStep === 0) setupTimelineAnimation();
        if (currentStep === 1) initChart();

        // Ensure math renders if user navigates dynamically back and forth (For steps 4 and 5)
        if ((currentStep === 3 || currentStep === 4) && window.renderMathInElement) {
            const currentStepEl = document.getElementById(`step-${currentStep}`);
            if (currentStepEl) {
                renderMathInElement(currentStepEl, {
                    delimiters: [
                        { left: '$$', right: '$$', display: true },
                        { left: '$', right: '$', display: false }
                    ]
                });
            }
        }
    }

    // --- STEP 1: TIMELINE ANIMATION LOGIC ---
    function setupTimelineAnimation() {
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        drawTimeline(true); // Draw empty
    }

    function resizeCanvas() {
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        drawTimeline(true);
    }

    simulateBtn.addEventListener('click', () => {
        simulateBtn.disabled = true;
        simulateBtn.innerText = "Simulating...";
        drawTimeline(false); // Animate dots
    });

    function drawTimeline(empty = false) {
        clearTimeout(animationTimeout);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (empty) {
            simulateBtn.disabled = false;
            simulateBtn.innerText = "Simulate 1 Hour";
            return;
        }

        // Simulate Poisson process (Lambda = ~6 for visual purposes)
        const lambda = 6;
        let numEvents = 0;
        // Simple Poisson random number generator
        let L = Math.exp(-lambda);
        let p = 1.0;
        let k = 0;
        do {
            k++;
            p *= Math.random();
        } while (p > L);
        numEvents = k - 1;

        // Generate random positions on timeline (Uniform distribution for event times)
        let positions = [];
        for (let i = 0; i < numEvents; i++) {
            // Avoid edges slightly
            positions.push(20 + Math.random() * (canvas.width - 40));
        }
        positions.sort((a, b) => a - b); // Sort chronologically

        let currentDot = 0;

        function drawNextDot() {
            if (currentDot < positions.length) {
                const x = positions[currentDot];
                const y = canvas.height / 2;

                // Draw dot
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, Math.PI * 2);
                ctx.fillStyle = '#4f46e5'; // Indigo 600
                ctx.fill();

                // Draw pulse ring
                ctx.beginPath();
                ctx.arc(x, y, 12, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(79, 70, 229, 0.4)';
                ctx.lineWidth = 2;
                ctx.stroke();

                currentDot++;
                animationTimeout = setTimeout(drawNextDot, 300); // 300ms between arrivals
            } else {
                simulateBtn.disabled = false;
                simulateBtn.innerText = `Done! (${numEvents} Customers)`;
            }
        }

        // Start drawing dots after a slight delay
        setTimeout(drawNextDot, 200);
    }


    // --- STEP 2: CHART LOGIC ---
    // Generate Poisson Data
    function calculatePoissonData(lambda, maxK = 30) {
        let data = [];
        let p = Math.exp(-lambda); // P(x=0)
        data.push(p);

        for (let k = 1; k <= maxK; k++) {
            p = p * (lambda / k);
            data.push(p);
        }
        return data;
    }

    function initChart() {
        if (chartInstance) return; // Already initialized

        const ctxChart = document.getElementById('poissonChart').getContext('2d');
        const initialLambda = parseFloat(lambdaSlider.value);

        // Fixed X-axis from 0 to 30 events
        const labels = Array.from({ length: 31 }, (_, i) => i);
        const data = calculatePoissonData(initialLambda, 30);

        chartInstance = new Chart(ctxChart, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Probability P(X = k)',
                    data: data,
                    backgroundColor: 'rgba(79, 70, 229, 0.7)',
                    borderColor: 'rgba(79, 70, 229, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 400 // Smooth animation when slider moves
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 0.4, // Keep Y axis fixed so shape change is obvious
                        title: {
                            display: true,
                            text: 'Probability'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Number of Occurrences (k)'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `Probability: ${(context.raw * 100).toFixed(2)}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Slider Event Listener
    lambdaSlider.addEventListener('input', (e) => {
        const newLambda = parseFloat(e.target.value);

        // Update text
        lambdaValueSpan.innerText = newLambda;
        interpLambdaSpans.forEach(span => span.innerText = newLambda);

        // Update chart
        if (chartInstance) {
            chartInstance.data.datasets[0].data = calculatePoissonData(newLambda, 30);

            // Adjust max Y axis dynamically if probability drops very low to keep it visible
            const maxProb = Math.max(...chartInstance.data.datasets[0].data);
            chartInstance.options.scales.y.max = maxProb > 0.4 ? maxProb + 0.05 : 0.4;

            chartInstance.update();
        }
    });

});