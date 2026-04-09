// --- DATA & CONTENT ---
const steps = [
    {
        title: "The Setup (Prior Probability)",
        desc: `Imagine a population of 1,000 people. A certain disease is rare and affects exactly <strong>1%</strong> of this population.<br><br>This means out of 1,000 people, <strong>10</strong> actually have the disease (<span class="text-red-500 font-semibold">red dots</span>), and <strong>990</strong> are perfectly healthy (<span class="text-slate-400 font-semibold">gray dots</span>). This initial belief is called the "Prior Probability".`,
        formula: `
            <div class="flex justify-between items-center">
                <span>P(Disease)</span>
                <span class="font-bold text-red-600">1% (0.01)</span>
            </div>
            <div class="flex justify-between items-center text-slate-400 text-xs">
                <span>P(Healthy)</span>
                <span>99% (0.99)</span>
            </div>
        `,
        state: 0
    },
    {
        title: "The Test: True Positives",
        desc: `Scientists develop a test for this disease. It's quite good! If you actually have the disease, the test will correctly identify it <strong>90%</strong> of the time (Sensitivity).<br><br>Let's look at our 10 sick people. <strong>9</strong> of them will get a True Positive result (moving to the top), while <strong>1</strong> unlucky person gets a False Negative (moving to the bottom).`,
        formula: `
            <div class="flex justify-between items-center">
                <span>P(Positive | Disease)</span>
                <span class="font-bold text-blue-600">90%</span>
            </div>
            <div class="text-xs text-slate-500 mt-2 border-t pt-2">
                9 sick people test positive.<br>1 sick person tests negative.
            </div>
        `,
        state: 1
    },
    {
        title: "The Flaw: False Positives",
        desc: `However, the test isn't perfect. If you are completely healthy, there is a <strong>9%</strong> chance the test will falsely alarm and say you are sick.<br><br>Let's look at our 990 healthy people. 9% of 990 is roughly <strong>89</strong> people. These 89 healthy people get a False Positive (moving to the top). The remaining 901 get a True Negative.`,
        formula: `
            <div class="flex justify-between items-center">
                <span>P(Positive | Healthy)</span>
                <span class="font-bold text-orange-500">9%</span>
            </div>
            <div class="text-xs text-slate-500 mt-2 border-t pt-2">
                89 healthy people test positive.<br>901 healthy people test negative.
            </div>
        `,
        state: 2
    },
    {
        title: "The Evidence (Total Positives)",
        desc: `Now, imagine <strong>YOU</strong> take the test and get a Positive result. <br><br>Because of your result, the negative tests (bottom half) are no longer relevant to you. Your universe shrinks to ONLY the people who tested positive (top half).<br><br>How many people in total tested positive? <strong>9</strong> (sick) + <strong>89</strong> (healthy) = <strong>98</strong> people.`,
        formula: `
            <div class="flex justify-between items-center mb-1">
                <span>Total Positives = True Pos + False Pos</span>
            </div>
            <div class="flex justify-between items-center font-bold">
                <span>P(Positive)</span>
                <span>9 + 89 = 98</span>
            </div>
        `,
        state: 3
    },
    {
        title: "The Reality (Posterior Probability)",
        desc: `Bayes' Theorem answers our final question: Given you tested positive, what is the actual probability you have the disease?<br><br>You are one of the 98 positive tests. But only <strong>9</strong> of those actually have the disease. <br><br><strong>9 ÷ 98 ≈ 9.18%</strong>. <br><br>Even with a 90% accurate test, because the disease is so rare, a positive result still means you are most likely healthy! The false alarms outnumber the true cases.`,
        formula: `
            <div class="flex items-center justify-center space-x-3 mb-3 text-sm">
                <div class="font-semibold text-blue-700">P(Sick | Pos) =</div>
                <div class="flex flex-col items-center">
                    <div class="border-b border-slate-400 pb-1">True Positives</div>
                    <div class="pt-1">Total Positives</div>
                </div>
            </div>
            <div class="flex items-center justify-center space-x-3 text-lg">
                <div>=</div>
                <div class="flex flex-col items-center">
                    <div class="border-b border-slate-400 pb-1">9</div>
                    <div class="pt-1">98</div>
                </div>
                <div class="font-bold text-red-600">≈ 9.18%</div>
            </div>
        `,
        state: 4
    },
    {
        title: "The Mathematical Summary",
        desc: `Here is how the visualization maps directly to the formal equation of Bayes' Theorem:<br><br><div class="text-center font-semibold text-slate-700">P(A|B) = [ P(B|A) × P(A) ] / P(B)</div><br>Where <strong>A</strong> = Having the Disease, and <strong>B</strong> = Testing Positive.`,
        formula: `
            <div class="flex flex-col space-y-3 text-sm">
                <div class="flex justify-between items-center border-b pb-1">
                    <span>P(A) <span class="text-xs text-slate-500 font-normal ml-1">Prior Prob.</span></span>
                    <span class="font-bold text-red-600">0.01</span>
                </div>
                <div class="flex justify-between items-center border-b pb-1">
                    <span>P(B|A) <span class="text-xs text-slate-500 font-normal ml-1">True Pos. Rate</span></span>
                    <span class="font-bold text-blue-600">0.90</span>
                </div>
                <div class="flex justify-between items-center border-b pb-1">
                    <span>P(B) <span class="text-xs text-slate-500 font-normal ml-1">Total Positives</span></span>
                    <span class="font-bold">0.098</span>
                </div>
                <div class="flex items-center justify-center pt-2 space-x-2 text-base">
                    <div class="font-bold text-slate-800">P(A|B) =</div>
                    <div class="flex flex-col items-center">
                        <div class="border-b border-slate-800 pb-1 px-2">0.90 × 0.01</div>
                        <div class="pt-1">0.098</div>
                    </div>
                    <div class="font-bold text-red-600">≈ 9.18%</div>
                </div>
            </div>
        `,
        state: 5
    }
];

let currentStep = 0;

// --- DOM ELEMENTS ---
const stepTitle = document.getElementById('stepTitle');
const stepDescription = document.getElementById('stepDescription');
const formulaContent = document.getElementById('formulaContent');
const stepIndicator = document.getElementById('stepIndicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const contentContainer = document.getElementById('contentContainer');

// --- CANVAS SETUP ---
const canvas = document.getElementById('bayesCanvas');
const ctx = canvas.getContext('2d');
const CANVAS_W = 800;
const CANVAS_H = 600;

// --- PARTICLE SYSTEM ---
const particles = [];
const DOT_RADIUS = 3.5;
const SPACING = 10;

// Initialize 1000 particles
// 10 Sick (9 true pos, 1 false neg)
for (let i = 0; i < 10; i++) {
    particles.push({
        id: i,
        isSick: true,
        isPositive: i < 9, // 90% sensitivity
        x: 0, y: 0, tx: 0, ty: 0,
        color: '#ef4444', // red-500
        alpha: 1, tAlpha: 1,
        radius: DOT_RADIUS
    });
}
// 990 Healthy (89 false pos, 901 true neg)
for (let i = 0; i < 990; i++) {
    particles.push({
        id: 10 + i,
        isSick: false,
        isPositive: i < 89, // ~9% false positive
        x: 0, y: 0, tx: 0, ty: 0,
        color: '#94a3b8', // slate-400
        alpha: 1, tAlpha: 1,
        radius: DOT_RADIUS
    });
}

// Helper: arrange a subset of particles in a grid
function setGridTargets(subset, startX, startY, maxCols) {
    subset.forEach((p, index) => {
        const row = Math.floor(index / maxCols);
        const col = index % maxCols;
        p.tx = startX + col * SPACING;
        p.ty = startY + row * SPACING;
    });
}

function updateParticleLayout(state) {
    const sick = particles.filter(p => p.isSick);
    const healthy = particles.filter(p => !p.isSick);

    const sickPos = sick.filter(p => p.isPositive);
    const sickNeg = sick.filter(p => !p.isPositive);

    const healthyPos = healthy.filter(p => p.isPositive);
    const healthyNeg = healthy.filter(p => !p.isPositive);

    // Reset alphas
    particles.forEach(p => {
        p.tAlpha = 1;
        p.radius = DOT_RADIUS;
    });

    if (state === 0) {
        // All sick together, all healthy together
        setGridTargets(sick, 100, 150, 2); // 10 dots = 2x5
        setGridTargets(healthy, 250, 80, 35); // 990 dots = 35x29
    }
    else if (state === 1) {
        // Sick split, healthy together
        setGridTargets(sickPos, 100, 150, 2); // Top
        setGridTargets(sickNeg, 100, 450, 2); // Bottom
        setGridTargets(healthy, 250, 80, 35); // Unchanged
    }
    else if (state === 2) {
        // Both split
        setGridTargets(sickPos, 100, 150, 2);
        setGridTargets(sickNeg, 100, 450, 2);

        setGridTargets(healthyPos, 250, 150, 35); // Top
        setGridTargets(healthyNeg, 250, 300, 35); // Bottom
    }
    else if (state === 3) {
        // Group positives, fade negatives
        sickNeg.forEach(p => p.tAlpha = 0.05);
        healthyNeg.forEach(p => p.tAlpha = 0.05);

        // Move negatives down slightly to represent being discarded
        setGridTargets(sickNeg, 100, 500, 2);
        setGridTargets(healthyNeg, 250, 500, 35);

        // Group positives in the center
        // Total pos = 9 + 89 = 98. Let's make a grid of 10 cols
        setGridTargets(sickPos, 350, 200, 10);
        // healthyPos continues after sickPos in the same grid logic roughly
        healthyPos.forEach((p, index) => {
            const offsetIndex = index + sickPos.length; // start after sick
            const row = Math.floor(offsetIndex / 10);
            const col = offsetIndex % 10;
            p.tx = 350 + col * SPACING;
            p.ty = 200 + row * SPACING;
        });
    }
    else if (state === 4 || state === 5) {
        // Same layout as 3, but highlight the true positives
        sickNeg.forEach(p => p.tAlpha = 0); // Hide entirely
        healthyNeg.forEach(p => p.tAlpha = 0);

        setGridTargets(sickPos, 350, 200, 10);
        healthyPos.forEach((p, index) => {
            const offsetIndex = index + sickPos.length;
            const row = Math.floor(offsetIndex / 10);
            const col = offsetIndex % 10;
            p.tx = 350 + col * SPACING;
            p.ty = 200 + row * SPACING;
        });

        // Fade healthy positives slightly, emphasize sick positives
        healthyPos.forEach(p => p.tAlpha = 0.3);
        sickPos.forEach(p => p.radius = DOT_RADIUS * 1.5);
    }
}

// Initialize positions instantly for the first frame
updateParticleLayout(0);
particles.forEach(p => { p.x = p.tx; p.y = p.ty; p.alpha = p.tAlpha; });

// --- ANIMATION LOOP ---
function drawCanvas() {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Draw Background Labels based on state
    ctx.fillStyle = '#64748b'; // slate-500
    ctx.font = '14px Inter, sans-serif';
    ctx.textAlign = 'center';

    if (currentStep === 0) {
        ctx.fillText('Sick (1%)', 110, 120);
        ctx.fillText('Healthy (99%)', 420, 50);
    } else if (currentStep === 1) {
        ctx.fillText('Tests Positive (90%)', 110, 120);
        ctx.fillText('Tests Negative', 110, 420);
        ctx.fillText('Healthy (99%)', 420, 50);
    } else if (currentStep === 2) {
        ctx.fillText('True Positives (9)', 110, 120);
        ctx.fillText('False Negatives (1)', 110, 420);

        ctx.fillText('False Positives (89)', 420, 120);
        ctx.fillText('True Negatives (901)', 420, 270);
    } else if (currentStep === 3) {
        ctx.font = 'bold 18px Inter, sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.fillText('Pool of Total Positive Results (98 people)', CANVAS_W / 2, 160);
    } else if (currentStep === 4 || currentStep === 5) {
        ctx.font = 'bold 18px Inter, sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.fillText('Only 9 out of 98 are actually sick!', CANVAS_W / 2, 160);

        // Draw a highlight box around the true positives
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(340, 190, 100, 20); // rough bounding box for the 9 dots
        ctx.setLineDash([]);
    }

    // Draw Particles
    particles.forEach(p => {
        // Interpolate position (easing)
        p.x += (p.tx - p.x) * 0.08;
        p.y += (p.ty - p.y) * 0.08;
        p.alpha += (p.tAlpha - p.alpha) * 0.08;

        if (p.alpha > 0.01) {
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();

            // Add ring for positives in step 4
            if (currentStep === 4 && p.isSick && p.isPositive) {
                ctx.strokeStyle = '#fca5a5';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    });

    ctx.globalAlpha = 1.0;
    requestAnimationFrame(drawCanvas);
}
drawCanvas();


// --- UI LOGIC ---
function renderStep() {
    const stepData = steps[currentStep];

    // Trigger fade animation
    contentContainer.classList.remove('fade-in');
    void contentContainer.offsetWidth; // trigger reflow
    contentContainer.classList.add('fade-in');

    stepTitle.innerHTML = stepData.title;
    stepDescription.innerHTML = stepData.desc;
    formulaContent.innerHTML = stepData.formula;
    stepIndicator.textContent = `Step ${currentStep + 1} of ${steps.length}`;

    // Buttons state
    prevBtn.disabled = currentStep === 0;
    nextBtn.disabled = currentStep === steps.length - 1;

    // Update Visualization
    updateParticleLayout(stepData.state);
}

prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep();
    }
});

// Initial render
renderStep();