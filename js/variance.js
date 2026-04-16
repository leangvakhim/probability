// --- Data & Content Definition ---
const steps = [
    {
        title: "1. The Scenario & Distribution",
        description: `
            <p class="mb-4">Imagine you run a specialty coffee stand. Let <span class="font-bold text-indigo-600">\\(X\\)</span> be the number of "Signature Lattes" you sell in a random 10-minute window.</p>
            <p class="mb-4">Based on weeks of tracking, you know you usually sell between 0 and 3 lattes. The probabilities of selling exactly <span class="font-bold text-indigo-600">\\(x\\)</span> lattes, denoted as <span class="font-bold text-indigo-600">\\(P(x)\\)</span>, are shown in the table.</p>
            <p class="text-sm text-slate-500 bg-white p-3 rounded border-l-4 border-indigo-400 shadow-sm">Notice that all probabilities add up to exactly 1.0 (100%). This is our discrete probability distribution.</p>
        `,
        tableCols: ['x', 'P'],
        showFormulas: false
    },
    {
        title: "2. Finding the Expected Value (Mean)",
        description: `
            <p class="mb-4">Before we can calculate "Variance" (which is the spread around the average), we must find that average!</p>
            <p class="mb-4">The <strong>Expected Value</strong>, denoted as <span class="font-bold text-indigo-600">\\(\\mu\\)</span> (mu) or <span class="font-bold text-indigo-600">\\(E(X)\\)</span>, is the long-term average.</p>
            <p class="mb-4">We calculate it by multiplying each possible outcome <span class="font-bold">\\(x\\)</span> by its probability <span class="font-bold">\\(P(x)\\)</span>, and then adding them all up.</p>
            <p class="text-sm font-semibold text-green-700 bg-green-50 p-3 rounded shadow-sm">\\( \\mu = 1.6 \\) lattes.</p>
        `,
        tableCols: ['x', 'P', 'xP'],
        showFormulas: false
    },
    {
        title: "3. Deviation from the Mean",
        description: `
            <p class="mb-4">Variance measures <em>spread</em>. How far is each possible sales number from our average of 1.6?</p>
            <p class="mb-4">We find this by calculating the <strong>Deviation</strong>: <span class="font-bold text-indigo-600">\\((x - \\mu)\\)</span>.</p>
            <p class="mb-4">For example, selling 0 lattes is 1.6 <em>below</em> average (a deviation of -1.6). Selling 3 lattes is 1.4 <em>above</em> average.</p>
            <p class="text-sm text-slate-500 bg-white p-3 rounded border-l-4 border-amber-400 shadow-sm">Note: If we just added these deviations up, the positives and negatives would cancel each other out!</p>
        `,
        tableCols: ['x', 'P', 'Dev'],
        showFormulas: false
    },
    {
        title: "4. Squaring the Deviations",
        description: `
            <p class="mb-4">To solve the problem of negatives cancelling out positives, we <strong>square</strong> each deviation: <span class="font-bold text-indigo-600">\\((x - \\mu)^2\\)</span>.</p>
            <p class="mb-4">Squaring does two important things:</p>
            <ul class="list-disc pl-5 mb-4 space-y-2 text-sm">
                <li>It makes all values positive.</li>
                <li>It heavily penalizes outcomes that are <em>very</em> far from the mean, giving them more weight.</li>
            </ul>
        `,
        tableCols: ['x', 'P', 'Dev', 'SqDev'],
        showFormulas: false
    },
    {
        title: "5. Weighting by Probability",
        description: `
            <p class="mb-4">We have our squared deviations, but they don't all happen equally often. Selling 1 latte (happens 40% of the time) is much more common than selling 0 lattes (10%).</p>
            <p class="mb-4">Therefore, we must multiply each squared deviation by its probability: <span class="font-bold text-indigo-600">\\((x - \\mu)^2 \\cdot P(x)\\)</span>.</p>
            <p class="mb-4">This tells us the "expected value of the squared deviations."</p>
        `,
        tableCols: ['x', 'P', 'SqDev', 'Weighted'],
        showFormulas: false
    },
    {
        title: "6. The Variance & Recap",
        description: `
            <p class="mb-4">We made it! To find the final <strong>Variance</strong>, denoted as <span class="font-bold text-indigo-600">\\(Var(X)\\)</span> or <span class="font-bold text-indigo-600">\\(\\sigma^2\\)</span>, we simply sum up the probability-weighted squared deviations.</p>
            <p class="mb-4"><strong>Variance = 0.84</strong></p>
            <p class="text-sm bg-indigo-50 text-indigo-900 border border-indigo-100 p-3 rounded mt-4 shadow-sm">Variance is a single number that tells us how "volatile" or spread out our coffee sales are. A larger variance means less predictability.</p>
        `,
        tableCols: ['x', 'P', 'xP', 'Weighted'],
        showFormulas: true
    }
];

// --- State ---
let currentStep = 0;

// --- Raw Data ---
const data = [
    { x: 0, p: 0.1, xp: 0.0, dev: -1.6, sqdev: 2.56, weighted: 0.256 },
    { x: 1, p: 0.4, xp: 0.4, dev: -0.6, sqdev: 0.36, weighted: 0.144 },
    { x: 2, p: 0.3, xp: 0.6, dev: 0.4, sqdev: 0.16, weighted: 0.048 },
    { x: 3, p: 0.2, xp: 0.6, dev: 1.4, sqdev: 1.96, weighted: 0.392 }
];

// --- DOM Elements ---
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const stepContent = document.getElementById('step-content');
const visualContent = document.getElementById('visual-content');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const dotsContainer = document.getElementById('dots-container');

// --- Initialization ---
function init() {
    // Generate dots
    for (let i = 0; i < steps.length; i++) {
        const dot = document.createElement('div');
        dot.className = `w-2.5 h-2.5 rounded-full transition-colors ${i === 0 ? 'bg-indigo-600' : 'bg-slate-300'}`;
        dot.id = `dot-${i}`;
        dotsContainer.appendChild(dot);
    }

    btnPrev.addEventListener('click', () => changeStep(-1));
    btnNext.addEventListener('click', () => changeStep(1));

    renderStep();
}

// --- Logic ---
function changeStep(direction) {
    currentStep += direction;

    stepContent.classList.remove('fade-in');
    visualContent.classList.remove('fade-in');

    // Trigger a reflow
    void stepContent.offsetWidth;
    void visualContent.offsetWidth;

    stepContent.classList.add('fade-in');
    visualContent.classList.add('fade-in');

    // Optional: reset scroll position when changing steps
    document.querySelector('.md\\:w-7\\/12').scrollTop = 0;

    renderStep();
}

function renderStep() {
    const step = steps[currentStep];

    // 1. Update Navigation & Progress
    btnPrev.disabled = currentStep === 0;

    if (currentStep === steps.length - 1) {
        btnNext.disabled = true;
        btnNext.innerHTML = "Finish &#10003;";
        btnNext.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
        btnNext.classList.add('bg-green-600', 'hover:bg-green-700');
    } else {
        btnNext.disabled = false;
        btnNext.innerHTML = "Next Step &rarr;";
        btnNext.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
        btnNext.classList.remove('bg-green-600', 'hover:bg-green-700');
    }

    progressBar.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
    progressText.innerText = `Step ${currentStep + 1} of ${steps.length}`;

    // Update Dots
    for (let i = 0; i < steps.length; i++) {
        const dot = document.getElementById(`dot-${i}`);
        dot.className = `w-2.5 h-2.5 rounded-full transition-colors ${i === currentStep ? 'bg-indigo-600' : 'bg-slate-300'}`;
    }

    // 2. Render Text Content
    stepContent.innerHTML = `
        <h2 class="text-2xl font-bold text-slate-800 mb-6">${step.title}</h2>
        <div class="text-lg leading-relaxed text-slate-700">
            ${step.description}
        </div>
    `;

    // 3. Render Visual (Table & Math)
    let tableHTML = `
        <div class="w-full overflow-x-auto rounded-lg shadow-sm border border-slate-200 mb-6 mt-8">
            <table class="w-full text-center border-collapse min-w-max bg-white">
                <thead class="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                        <th class="p-3 border-b border-slate-200 whitespace-nowrap">\\( x \\)</th>
                        <th class="p-3 border-b border-slate-200 whitespace-nowrap">\\( P(x) \\)</th>
                        ${step.tableCols.includes('xP') ? `<th class="p-3 border-b border-slate-200 whitespace-nowrap ${step.tableCols[step.tableCols.length - 1] === 'xP' ? 'bg-indigo-100 text-indigo-800' : ''}">\\( x \\cdot P(x) \\)</th>` : ''}
                        ${step.tableCols.includes('Dev') ? `<th class="p-3 border-b border-slate-200 whitespace-nowrap ${step.tableCols[step.tableCols.length - 1] === 'Dev' ? 'bg-indigo-100 text-indigo-800' : ''}">\\( x - \\mu \\)</th>` : ''}
                        ${step.tableCols.includes('SqDev') ? `<th class="p-3 border-b border-slate-200 whitespace-nowrap ${step.tableCols[step.tableCols.length - 1] === 'SqDev' ? 'bg-indigo-100 text-indigo-800' : ''}">\\( (x - \\mu)^2 \\)</th>` : ''}
                        ${step.tableCols.includes('Weighted') ? `<th class="p-3 border-b border-slate-200 whitespace-nowrap ${step.tableCols[step.tableCols.length - 1] === 'Weighted' ? 'bg-indigo-100 text-indigo-800' : ''}">\\( (x - \\mu)^2 P(x) \\)</th>` : ''}
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
    `;

    data.forEach((row, index) => {
        tableHTML += `<tr class="hover:bg-slate-50 transition-colors">`;
        tableHTML += `<td class="p-3 border-r border-slate-100 whitespace-nowrap">\\( ${row.x} \\)</td>`;
        tableHTML += `<td class="p-3 border-r border-slate-100 whitespace-nowrap">\\( ${row.p} \\)</td>`;

        if (step.tableCols.includes('xP')) {
            const isLast = step.tableCols[step.tableCols.length - 1] === 'xP';
            tableHTML += `<td class="p-3 border-r border-slate-100 whitespace-nowrap ${isLast ? 'highlight-col' : ''}">\\( ${row.xp.toFixed(1)} \\)</td>`;
        }
        if (step.tableCols.includes('Dev')) {
            const isLast = step.tableCols[step.tableCols.length - 1] === 'Dev';
            let colorClass = row.dev < 0 ? 'text-red-600' : (row.dev > 0 ? 'text-green-600' : '');
            tableHTML += `<td class="p-3 border-r border-slate-100 whitespace-nowrap ${isLast ? 'highlight-col' : ''} ${colorClass}">\\( ${row.dev > 0 ? '+' : ''}${row.dev.toFixed(1)} \\)</td>`;
        }
        if (step.tableCols.includes('SqDev')) {
            const isLast = step.tableCols[step.tableCols.length - 1] === 'SqDev';
            tableHTML += `<td class="p-3 border-r border-slate-100 whitespace-nowrap ${isLast ? 'highlight-col' : ''}">\\( ${row.sqdev.toFixed(2)} \\)</td>`;
        }
        if (step.tableCols.includes('Weighted')) {
            const isLast = step.tableCols[step.tableCols.length - 1] === 'Weighted';
            tableHTML += `<td class="p-3 whitespace-nowrap ${isLast ? 'highlight-col' : ''}">\\( ${row.weighted.toFixed(3)} \\)</td>`;
        }

        tableHTML += `</tr>`;
    });

    // Footer row for sums
    tableHTML += `<tr class="bg-slate-100 font-bold border-t-2 border-slate-300">`;
    tableHTML += `<td class="p-3 text-right whitespace-nowrap">Sum (\\(\\Sigma\\)) =</td>`;
    tableHTML += `<td class="p-3 whitespace-nowrap">\\( 1.0 \\)</td>`;

    if (step.tableCols.includes('xP')) {
        tableHTML += `<td class="p-3 text-green-700 whitespace-nowrap">\\( \\mu = 1.6 \\)</td>`;
    }
    if (step.tableCols.includes('Dev')) {
        tableHTML += `<td class="p-3 text-slate-400 whitespace-nowrap">\\( 0 \\)</td>`;
    }
    if (step.tableCols.includes('SqDev')) {
        tableHTML += `<td class="p-3 whitespace-nowrap"></td>`;
    }
    if (step.tableCols.includes('Weighted')) {
        tableHTML += `<td class="p-3 text-indigo-700 text-lg whitespace-nowrap">\\( \\sigma^2 = 0.84 \\)</td>`;
    }

    tableHTML += `</tr></tbody></table></div>`;

    let formulasHTML = '';
    if (step.showFormulas) {
        formulasHTML = `
            <div class="p-6 bg-white text-slate-800 rounded-xl shadow-sm border border-slate-200 w-full mb-4">
                <h3 class="text-xl font-bold mb-4 border-b border-slate-200 pb-2 text-indigo-600">Recap & Formulas</h3>

                <div class="mb-4">
                    <p class="text-slate-600 mb-2 font-semibold">1. Expected Value (Mean)</p>
                    <div class="bg-slate-50 border border-slate-100 p-4 rounded-lg text-xl w-full overflow-x-auto">
                        \\[ \\mu = E(X) = \\sum [x \\cdot P(x)] \\]
                    </div>
                </div>

                <div>
                    <p class="text-slate-600 mb-2 font-semibold">2. Variance of Discrete Random Variable</p>
                    <div class="bg-slate-50 border border-slate-100 p-4 rounded-lg text-xl w-full overflow-x-auto">
                        \\[ Var(X) = \\sigma^2 = \\sum [(x - \\mu)^2 \\cdot P(x)] \\]
                    </div>
                </div>

                <div class="mt-4 pt-4 border-t border-slate-200">
                    <p class="text-sm text-slate-500">
                        <strong>Shortcut Formula:</strong> Alternatively, variance can be calculated as expected value of squares minus square of expected value:
                        <br>
                        <span class="text-indigo-600 font-bold mt-2 block text-center">\\[ Var(X) = E(X^2) - [E(X)]^2 \\]</span>
                    </p>
                </div>
            </div>
        `;
    }

    visualContent.innerHTML = tableHTML + formulasHTML;

    // 4. Render MathJax formulas safely
    if (window.MathJax) {
        MathJax.typesetPromise([stepContent, visualContent]).catch(function (err) {
            console.error('MathJax error:', err.message);
        });
    }
}

// Boot
document.addEventListener('DOMContentLoaded', init);