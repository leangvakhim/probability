// Data and content for each step
const steps = [
    {
        title: "Step 1: The Real-World Scenario",
        description: "Imagine you are at a charity fundraiser. There is a box filled with <strong>10 sealed envelopes</strong>. You pay a fee to randomly draw one envelope and you get to keep the money inside. Let <strong>\\(X\\)</strong> represent the amount of money you win. This is our <em>Random Variable</em>.",
        render: () => `
            <div class="flex flex-col items-center gap-6 fade-in">
                <p class="text-lg text-slate-600 text-center max-w-2xl">There are 10 envelopes in total. Here is what is inside them:</p>
                <div class="flex flex-wrap justify-center gap-4 max-w-2xl">
                    ${Array(5).fill('<div class="w-16 h-20 bg-slate-200 border-2 border-slate-300 rounded-md flex items-center justify-center font-bold text-slate-500 shadow-sm envelope-hover text-lg">$0</div>').join('')}
                    ${Array(3).fill('<div class="w-16 h-20 bg-blue-100 border-2 border-blue-300 rounded-md flex items-center justify-center font-bold text-blue-600 shadow-sm envelope-hover text-lg">$10</div>').join('')}
                    ${Array(1).fill('<div class="w-16 h-20 bg-purple-100 border-2 border-purple-300 rounded-md flex items-center justify-center font-bold text-purple-600 shadow-sm envelope-hover text-lg">$50</div>').join('')}
                    ${Array(1).fill('<div class="w-16 h-20 bg-yellow-100 border-2 border-yellow-400 rounded-md flex items-center justify-center font-bold text-yellow-600 shadow-sm envelope-hover text-lg">$100</div>').join('')}
                </div>
                <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-sm text-blue-800 max-w-2xl mt-4">
                    <strong>Note:</strong> Because there are finite, distinct outcomes ($0, $10, $50, $100), this is called a <strong>Discrete Probability Distribution</strong>.
                </div>
            </div>
        `
    },
    {
        title: "Step 2: Building the Probability Distribution",
        description: "To understand our chances, we create a probability table. We list every possible outcome for \\(X\\) (denoted as \\(x\\)) and calculate its probability, \\(P(x)\\). Since there are 10 envelopes total, the probability is simply the number of specific envelopes divided by 10.",
        render: () => `
            <div class="fade-in max-w-3xl mx-auto w-full">
                <div class="overflow-x-auto rounded-lg shadow border border-slate-200">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-100 text-slate-700">
                                <th class="p-4 border-b font-semibold text-center">Outcome \\(x\\) (Prize)</th>
                                <th class="p-4 border-b font-semibold text-center">Number of Envelopes</th>
                                <th class="p-4 border-b font-semibold text-center">Probability \\(P(x)\\)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b hover:bg-slate-50">
                                <td class="p-4 text-center font-medium text-slate-500">$0</td>
                                <td class="p-4 text-center">5</td>
                                <td class="p-4 text-center font-bold text-blue-600">5/10 = 0.5</td>
                            </tr>
                            <tr class="border-b hover:bg-slate-50">
                                <td class="p-4 text-center font-medium text-blue-600">$10</td>
                                <td class="p-4 text-center">3</td>
                                <td class="p-4 text-center font-bold text-blue-600">3/10 = 0.3</td>
                            </tr>
                            <tr class="border-b hover:bg-slate-50">
                                <td class="p-4 text-center font-medium text-purple-600">$50</td>
                                <td class="p-4 text-center">1</td>
                                <td class="p-4 text-center font-bold text-blue-600">1/10 = 0.1</td>
                            </tr>
                            <tr class="hover:bg-slate-50">
                                <td class="p-4 text-center font-medium text-yellow-600">$100</td>
                                <td class="p-4 text-center">1</td>
                                <td class="p-4 text-center font-bold text-blue-600">1/10 = 0.1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="text-sm text-slate-500 mt-4 text-center">Notice that all probabilities add up to exactly 1.0 (or 100%). This is a requirement for a valid probability distribution!</p>
            </div>
        `
    },
    {
        title: "Step 3: What is Expected Value?",
        description: "The <strong>Expected Value</strong> (denoted as \\(E[X]\\) or \\(\\mu\\)) tells us what we can expect to win <em>on average</em> if we played this game infinitely many times. It is the probability-weighted average of all possible outcomes.",
        render: () => `
            <div class="fade-in flex flex-col items-center text-center gap-6">
                <div class="bg-blue-50 p-8 rounded-xl border border-blue-200 shadow-inner w-full max-w-2xl">
                    <h3 class="text-xl font-bold text-blue-900 mb-4">The Formula</h3>
                    <div class="text-3xl text-slate-800 mb-4 overflow-x-auto pb-4">
                        \\[ E[X] = \\sum_{i=1}^{n} x_i \\cdot P(x_i) \\]
                    </div>
                    <p class="text-slate-700 text-left mt-4 text-sm md:text-base leading-relaxed">
                        <strong>What this means in plain English:</strong><br>
                        1. Take every possible prize (\\(x\\)).<br>
                        2. Multiply it by the chance of winning it (\\(P(x)\\)).<br>
                        3. Add (\\(\\sum\\)) all those numbers together.
                    </p>
                </div>
            </div>
        `
    },
    {
        title: "Step 4: Calculating the Weights",
        description: "Let's apply the formula by adding a new column to our table. We will multiply each outcome \\(x\\) by its probability \\(P(x)\\). This tells us how much 'value' each envelope type contributes to the overall average.",
        render: () => `
            <div class="fade-in max-w-4xl mx-auto w-full">
                <div class="overflow-x-auto rounded-lg shadow border border-slate-200">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-100 text-slate-700">
                                <th class="p-3 border-b font-semibold text-center">Outcome \\(x\\)</th>
                                <th class="p-3 border-b font-semibold text-center">Prob \\(P(x)\\)</th>
                                <th class="p-3 border-b font-semibold text-center bg-blue-100">Contribution: \\(x \\cdot P(x)\\)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b">
                                <td class="p-3 text-center">$0</td>
                                <td class="p-3 text-center">0.5</td>
                                <td class="p-3 text-center bg-blue-50 text-slate-500 font-mono">0 &times; 0.5 = <strong class="text-slate-800">$0.00</strong></td>
                            </tr>
                            <tr class="border-b">
                                <td class="p-3 text-center">$10</td>
                                <td class="p-3 text-center">0.3</td>
                                <td class="p-3 text-center bg-blue-50 text-slate-500 font-mono">10 &times; 0.3 = <strong class="text-blue-600">$3.00</strong></td>
                            </tr>
                            <tr class="border-b">
                                <td class="p-3 text-center">$50</td>
                                <td class="p-3 text-center">0.1</td>
                                <td class="p-3 text-center bg-blue-50 text-slate-500 font-mono">50 &times; 0.1 = <strong class="text-purple-600">$5.00</strong></td>
                            </tr>
                            <tr>
                                <td class="p-3 text-center">$100</td>
                                <td class="p-3 text-center">0.1</td>
                                <td class="p-3 text-center bg-blue-50 text-slate-500 font-mono">100 &times; 0.1 = <strong class="text-yellow-600">$10.00</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `
    },
    {
        title: "Step 5: Recap & The Final Expected Value",
        description: "Finally, we sum all the contributions together to find our Expected Value. This single number represents the <em>long-term average value</em> of drawing one envelope.",
        render: () => `
            <div class="fade-in flex flex-col items-center gap-6 w-full">
                <div class="w-full max-w-3xl bg-green-50 border-2 border-green-500 rounded-xl p-6 shadow-sm text-center">
                    <h3 class="text-lg text-green-800 font-semibold mb-2">Final Calculation</h3>
                    <div class="text-xl md:text-2xl text-slate-800 mb-4 overflow-x-auto pb-2">
                        \\[ E[X] = 0 + 3 + 5 + 10 = \\mathbf{\\$18} \\]
                    </div>
                    <p class="text-green-900 text-lg font-medium">The Expected Value is $18.</p>
                </div>

                <div class="w-full max-w-3xl space-y-4">
                    <h4 class="font-bold text-slate-800 text-lg border-b pb-2">What does this actually mean?</h4>
                    <ul class="list-disc pl-5 space-y-2 text-slate-700">
                        <li><strong>It's an average, not a guarantee:</strong> You will <em>never</em> actually open an envelope and find exactly $18. You will only ever win $0, $10, $50, or $100.</li>
                        <li><strong>The Long Run:</strong> If you played this game 1,000 times, your total winnings would be roughly $18,000. Divided by 1,000 games, you average $18 per game.</li>
                        <li><strong>Making Decisions:</strong> If the charity charges <strong>$20</strong> to play this game, should you play it to make money? <em>No!</em> Your expected value is $18, meaning you are mathematically expected to lose $2 per game on average.</li>
                    </ul>

                    <div class="mt-6 bg-slate-100 p-4 rounded-lg">
                        <h4 class="font-bold text-slate-800 mb-2">Summary of Formulas:</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono bg-white p-3 rounded border">
                            <div><strong>Random Variable (X):</strong><br> The possible outcomes ($0, $10, $50, $100)</div>
                            <div><strong>Probability P(x):</strong><br> Chance of each outcome</div>
                            <div class="col-span-1 md:col-span-2 border-t pt-2 mt-2">
                                <strong>Expected Value Formula:</strong><br>
                                \\( E[X] = \\sum [x \\cdot P(x)] \\)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
];

let currentStep = 0;

// DOM Elements
const titleEl = document.getElementById('content-area');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressContainer = document.getElementById('progress-container');

// Initialize Progress Bar
function initProgress() {
    progressContainer.innerHTML = steps.map((_, index) => `
        <div class="h-2 flex-1 rounded-full bg-blue-800/30 overflow-hidden relative transition-all duration-300">
            <div id="progress-fill-${index}" class="absolute top-0 left-0 h-full w-0 bg-white transition-all duration-500 ease-out"></div>
        </div>
    `).join('');
}

// Update Progress Bar
function updateProgress() {
    steps.forEach((_, index) => {
        const fill = document.getElementById(`progress-fill-${index}`);
        if (index < currentStep) {
            fill.style.width = '100%';
        } else if (index === currentStep) {
            fill.style.width = '100%'; // Active step is filled
        } else {
            fill.style.width = '0%';
        }
    });
}

// Render the current step
function renderView() {
    const stepData = steps[currentStep];

    // Build content HTML
    const html = `
        <div class="mb-8 fade-in">
            <h2 class="text-2xl font-bold text-slate-800 mb-3">${stepData.title}</h2>
            <p class="text-slate-600 leading-relaxed">${stepData.description}</p>
        </div>
        <div class="w-full flex justify-center">
            ${stepData.render()}
        </div>
    `;

    // Inject HTML
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = html;

    // Update buttons
    prevBtn.disabled = currentStep === 0;
    if (currentStep === steps.length - 1) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = "Finished &#10003;";
        nextBtn.classList.replace('bg-blue-600', 'bg-green-600');
        nextBtn.classList.replace('hover:bg-blue-700', 'hover:bg-green-700');
    } else {
        nextBtn.disabled = false;
        nextBtn.innerHTML = "Next Step &rarr;";
        nextBtn.classList.replace('bg-green-600', 'bg-blue-600');
        nextBtn.classList.replace('hover:bg-green-700', 'hover:bg-blue-700');
    }

    updateProgress();

    // Re-render LaTeX math formulas if MathJax is loaded
    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([contentArea]).catch(function (err) {
            console.log('MathJax error: ', err.message);
        });
    }
}

// Event Listeners
prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderView();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        renderView();
    }
});

// Initialize App
initProgress();
renderView();