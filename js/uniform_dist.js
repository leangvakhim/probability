const canvas = document.getElementById('vizCanvas');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

const stepsData = [
    {
        title: "What is the Uniform Distribution?",
        desc: "The Uniform Distribution is the simplest statistical distribution. It describes a scenario where all possible outcomes are <strong>equally likely</strong> to occur. There are no peaks, no biases, and no favorites; it represents absolute fairness.",
        example: "<strong>Real-World Example:</strong> Imagine a completely fair lottery. If 100 people buy a ticket, every single person has the exact same 1% chance of winning. No ticket has an advantage over another.",
        type: 'canvas',
        draw: () => {
            clearCanvas();
            drawAxes("Outcomes", "Likelihood (Probability)");

            // Draw a completely flat, stable line representing fairness
            ctx.beginPath();
            ctx.moveTo(100, 200);
            ctx.lineTo(500, 200);
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#4f46e5'; // indigo-600
            ctx.stroke();

            // Draw abstract equal nodes
            const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
            for (let i = 0; i < 5; i++) {
                let x = 140 + (i * 80);
                ctx.beginPath();
                ctx.arc(x, 200, 15, 0, Math.PI * 2);
                ctx.fillStyle = colors[i];
                ctx.fill();
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Text above
                ctx.fillStyle = '#64748b';
                ctx.font = '14px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText("Equal", x, 170);
            }

            ctx.fillStyle = '#4f46e5';
            ctx.font = 'bold 18px sans-serif';
            ctx.fillText("Constant Probability Across All Events", W / 2, 100);
        }
    },
    {
        title: "Discrete Uniform Distribution",
        desc: "When outcomes are distinct, separate values (like integers), we call it <em>Discrete</em>. Because there are a finite number of outcomes (n), the probability of any single outcome occurring is exactly <strong>1/n</strong>.",
        example: "<strong>Real-World Example:</strong> Rolling a standard 6-sided die. The possible outcomes are exactly 1, 2, 3, 4, 5, or 6. You cannot roll a 2.5. The probability of rolling any specific number is precisely 1/6 (about 16.67%).",
        type: 'canvas',
        draw: () => {
            clearCanvas();
            drawAxes("Die Face Value", "Probability P(x)");

            const bars = 6;
            const barWidth = 40;
            const spacing = 30;
            const startX = 120;
            const probHeight = 150; // 1/6 height representation

            ctx.fillStyle = '#64748b';
            ctx.font = '14px sans-serif';

            // Make "1/6" label vertical
            ctx.save();
            ctx.translate(35, H - 40 - probHeight + 15);
            ctx.rotate(-Math.PI / 2);
            ctx.textAlign = 'right';
            ctx.fillText("1/6", 0, 0);
            ctx.restore();

            // Dashed line for 1/6
            ctx.beginPath();
            ctx.setLineDash([5, 5]);
            ctx.moveTo(50, H - 40 - probHeight);
            ctx.lineTo(550, H - 40 - probHeight);
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.setLineDash([]);

            for (let i = 0; i < bars; i++) {
                let x = startX + (i * (barWidth + spacing));
                let y = H - 40 - probHeight;

                // Draw Bar
                ctx.fillStyle = '#4f46e5';
                ctx.fillRect(x, y, barWidth, probHeight);

                // X Axis labels (1 to 6)
                ctx.fillStyle = '#334155';
                ctx.font = 'bold 16px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(i + 1, x + barWidth / 2, H - 25);
            }
        }
    },
    {
        title: "Continuous Uniform Distribution",
        desc: "When outcomes can be absolutely <em>any</em> value within a range <strong>[a, b]</strong> (including infinite decimal variations), it's <em>Continuous</em>. Instead of distinct bars, it forms a solid rectangle block of probability.",
        example: "<strong>Real-World Example:</strong> Waiting for a subway train that arrives exactly every 10 minutes. If you walk into the station randomly, your wait time is a continuous uniform distribution between 0 and 10 minutes. You could wait exactly 4.521 minutes.",
        type: 'canvas',
        draw: () => {
            clearCanvas();
            drawAxes("Values (x)", "Density f(x)");

            const a = 150; // X coord for 'a'
            const b = 450; // X coord for 'b'
            const rectHeight = 180;
            const yTop = H - 40 - rectHeight;

            // Y label (Vertical)
            ctx.fillStyle = '#64748b';
            ctx.font = '14px sans-serif';
            ctx.save();
            ctx.translate(35, yTop + 35);
            ctx.rotate(-Math.PI / 2);
            ctx.textAlign = 'center';
            ctx.fillText("1 / (b - a)", 0, 0);
            ctx.restore();

            // Draw solid Rectangle
            ctx.fillStyle = 'rgba(79, 70, 229, 0.2)'; // Light indigo fill
            ctx.fillRect(a, yTop, b - a, rectHeight);

            // Draw Outline
            ctx.strokeStyle = '#4f46e5';
            ctx.lineWidth = 3;
            ctx.strokeRect(a, yTop, b - a, rectHeight);

            // X Axis labels (a and b)
            ctx.fillStyle = '#334155';
            ctx.font = 'bold 18px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText("a", a, H - 15);
            ctx.fillText("b", b, H - 15);

            // Title inside
            ctx.fillStyle = '#4f46e5';
            ctx.fillText("All values between 'a' and 'b' are possible", W / 2, 100);
        }
    },
    {
        title: "Probability = Area Under Curve",
        desc: "In a continuous distribution, the probability of an event happening is found by calculating the <strong>Area</strong> of that specific section. The total area of the entire rectangle is always exactly 1 (or 100%).",
        example: "<strong>Real-World Example:</strong> Back to the subway (arriving every 10 mins). What's the probability you wait between 3 and 5 minutes? The width is 2 mins. The height is 1/10. Area = Width &times; Height = 2 &times; (1/10) = 2/10 or <strong>20%</strong>.",
        type: 'canvas',
        draw: () => {
            clearCanvas();
            drawAxes("Time (Minutes)", "Density");

            const a = 100; // 0 mins
            const b = 500; // 10 mins
            const rectHeight = 150;
            const yTop = H - 40 - rectHeight;

            // Base Rectangle
            ctx.fillStyle = 'rgba(203, 213, 225, 0.3)'; // slate-300
            ctx.fillRect(a, yTop, b - a, rectHeight);
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 2;
            ctx.strokeRect(a, yTop, b - a, rectHeight);

            // X Axis markers
            ctx.fillStyle = '#334155';
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText("0", a, H - 25);
            ctx.fillText("10", b, H - 25);

            // Highlighted Sub-area (e.g. 3 to 5 mins)
            const x1 = a + ((b - a) * 0.3); // 3 mins
            const x2 = a + ((b - a) * 0.5); // 5 mins

            ctx.fillStyle = 'rgba(245, 158, 11, 0.6)'; // amber-500
            ctx.fillRect(x1, yTop, x2 - x1, rectHeight);

            // Borders for highlighted area
            ctx.beginPath();
            ctx.moveTo(x1, yTop); ctx.lineTo(x1, H - 40);
            ctx.moveTo(x2, yTop); ctx.lineTo(x2, H - 40);
            ctx.strokeStyle = '#d97706';
            ctx.stroke();

            ctx.fillText("3", x1, H - 15);
            ctx.fillText("5", x2, H - 15);

            // Annotation
            ctx.fillStyle = '#d97706';
            ctx.font = 'bold 16px sans-serif';
            ctx.fillText("Area = 20% Probability", (x1 + x2) / 2, yTop - 20);
        }
    },
    {
        title: "Recap & Formulas",
        desc: "To summarize, the Uniform Distribution is defined by its lowest value (a) and highest value (b). Because everything in between is perfectly flat, the math relies on simple rectangles.<br><br>Here are the core mathematical formulas that define the Continuous Uniform Distribution.",
        example: "<strong>Why these matter:</strong> These formulas allow statisticians to quickly calculate the expected value (mean), the spread (variance), and the exact probability of any range of events occurring within a uniform system.",
        type: 'html',
        draw: () => {
            // Canvas is hidden, HTML shown via renderStep logic
        }
    }
];

let currentStep = 0;

// DOM Elements
const stepBadge = document.getElementById('step-badge');
const stepTitle = document.getElementById('step-title');
const stepDesc = document.getElementById('step-description');
const stepExample = document.getElementById('step-example');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dots-container');
const canvasEl = document.getElementById('vizCanvas');
const formulaEl = document.getElementById('formula-container');
const textContainer = document.getElementById('text-container');

// Initialize UI
function init() {
    // Create dots
    for (let i = 0; i < stepsData.length; i++) {
        const dot = document.createElement('div');
        dot.className = `w-2.5 h-2.5 rounded-full transition-colors ${i === 0 ? 'bg-indigo-600' : 'bg-slate-300'}`;
        dotsContainer.appendChild(dot);
    }

    // Bind events
    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            renderStep();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentStep < stepsData.length - 1) {
            currentStep++;
            renderStep();
        }
    });

    renderStep();
}

// Helper: Clear and draw axes on canvas
function clearCanvas() {
    ctx.clearRect(0, 0, W, H);
}

function drawAxes(xLabel, yLabel) {
    const padLeft = 50;
    const padBottom = 40;

    ctx.beginPath();
    // Y Axis
    ctx.moveTo(padLeft, 20);
    ctx.lineTo(padLeft, H - padBottom);
    // X Axis
    ctx.lineTo(W - 20, H - padBottom);

    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Arrows
    ctx.beginPath();
    ctx.moveTo(padLeft - 5, 30); ctx.lineTo(padLeft, 20); ctx.lineTo(padLeft + 5, 30);
    ctx.moveTo(W - 30, H - padBottom - 5); ctx.lineTo(W - 20, H - padBottom); ctx.lineTo(W - 30, H - padBottom + 5);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#64748b';
    ctx.font = '14px sans-serif';

    // Y Axis Label (Vertical)
    ctx.save();
    ctx.translate(15, H / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText(yLabel, 0, 0);
    ctx.restore();

    // X Axis Label
    ctx.textAlign = 'right';
    ctx.fillText(xLabel, W - 20, H - 10);
}

// Apply animations to text
function triggerTextAnimation() {
    textContainer.classList.remove('fade-in');
    void textContainer.offsetWidth; // trigger reflow
    textContainer.classList.add('fade-in');
}

function renderStep() {
    const data = stepsData[currentStep];

    // Update Text Content
    stepBadge.innerText = `Step ${currentStep + 1} of ${stepsData.length}`;
    stepTitle.innerText = data.title;
    stepDesc.innerHTML = `<p>${data.desc}</p>`;
    stepExample.innerHTML = data.example;

    triggerTextAnimation();

    // Handle Visuals Swap (Canvas vs HTML Formulas)
    if (data.type === 'canvas') {
        canvasEl.classList.remove('hidden');
        formulaEl.classList.add('hidden');

        // Add fade animation to canvas
        canvasEl.classList.remove('fade-in');
        void canvasEl.offsetWidth;
        canvasEl.classList.add('fade-in');

        data.draw();
    } else {
        canvasEl.classList.add('hidden');
        formulaEl.classList.remove('hidden');

        formulaEl.classList.remove('fade-in');
        void formulaEl.offsetWidth;
        formulaEl.classList.add('fade-in');
    }

    // Update Navigation Buttons state
    prevBtn.disabled = currentStep === 0;
    nextBtn.disabled = currentStep === stepsData.length - 1;

    // Update Dots
    Array.from(dotsContainer.children).forEach((dot, index) => {
        if (index === currentStep) {
            dot.classList.remove('bg-slate-300');
            dot.classList.add('bg-indigo-600');
        } else {
            dot.classList.remove('bg-indigo-600');
            dot.classList.add('bg-slate-300');
        }
    });
}

// Start App
window.onload = init;