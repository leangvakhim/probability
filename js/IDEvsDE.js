// --- Data: The Steps of the Visualization ---
const steps = [
    {
        badge: "Introduction",
        title: "What are they?",
        description: "In probability, calculating the chance of multiple events happening sequentially depends on one crucial question: <strong>Does the first event change the odds of the second event?</strong>",
        visual: `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
                <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 class="font-bold text-emerald-600 text-xl mb-2">Independent Events</h3>
                    <p class="text-sm text-slate-500 mb-4">Events are completely isolated. One does not affect the other.</p>
                    <div class="flex justify-center items-center gap-4">
                        <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-bold text-xl">A</div>
                        <span class="text-slate-300 text-2xl">|</span>
                        <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-bold text-xl">B</div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 class="font-bold text-rose-600 text-xl mb-2">Dependent Events</h3>
                    <p class="text-sm text-slate-500 mb-4">Events are linked. The outcome of the first alters the second.</p>
                    <div class="flex justify-center items-center gap-2">
                        <div class="w-16 h-16 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center font-bold text-xl">A</div>
                        <span class="text-rose-400 font-bold text-2xl">→</span>
                        <div class="w-16 h-16 bg-rose-200 text-rose-700 rounded-lg flex items-center justify-center font-bold text-xl shadow-inner">B</div>
                    </div>
                </div>
            </div>
        `
    },
    {
        badge: "Scenario Setup",
        title: "The Marble Jar",
        description: "Let's use a real-world example. Imagine we have a jar containing <strong>5 marbles</strong> in total: <strong class='text-red-500'>3 Red</strong> and <strong class='text-blue-500'>2 Blue</strong>. We are going to draw a marble twice.",
        visual: `
            <div class="flex flex-col items-center">
                <p class="mb-4 font-semibold text-slate-500 uppercase tracking-widest text-sm">Starting State</p>
                <div class="jar">
                    <div class="marble-red"></div>
                    <div class="marble-red"></div>
                    <div class="marble-red"></div>
                    <div class="marble-blue"></div>
                    <div class="marble-blue"></div>
                </div>
                <div class="mt-6 flex gap-4">
                    <div class="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm"><span class="font-bold text-xl text-red-500">3/5</span> Red</div>
                    <div class="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm"><span class="font-bold text-xl text-blue-500">2/5</span> Blue</div>
                </div>
            </div>
        `
    },
    {
        badge: "Independent Events",
        title: "Drawing WITH Replacement",
        description: "An independent event happens when we draw a marble, record its color, and then <strong>put it back in the jar</strong> before the next draw. The jar resets.",
        visual: `
            <div class="w-full flex flex-col gap-6 max-w-2xl">
                <!-- Draw 1 -->
                <div class="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div class="text-center w-1/3">
                        <p class="text-xs font-bold text-slate-400 mb-1 uppercase">Start</p>
                        <div class="jar scale-75 transform origin-top">
                            <div class="marble-red"></div><div class="marble-red"></div><div class="marble-red"></div>
                            <div class="marble-blue"></div><div class="marble-blue"></div>
                        </div>
                    </div>
                    <div class="flex flex-col items-center w-1/3">
                        <span class="text-sm font-semibold text-slate-500 mb-2">Draw 1</span>
                        <div class="text-xl text-slate-300">→</div>
                    </div>
                    <div class="text-center w-1/3 flex flex-col items-center">
                        <p class="text-xs font-bold text-red-500 mb-2 uppercase">Result</p>
                        <div class="marble-red mb-2"></div>
                        <span class="bg-red-50 text-red-600 font-mono px-2 py-1 rounded text-sm border border-red-100">P(Red) = 3/5</span>
                    </div>
                </div>

                <div class="text-center">
                    <span class="inline-block bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-bold shadow-sm">↓ We put the red marble back! ↓</span>
                </div>

                <!-- Draw 2 -->
                <div class="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div class="text-center w-1/3">
                        <p class="text-xs font-bold text-slate-400 mb-1 uppercase">Before Draw 2</p>
                        <div class="jar scale-75 transform origin-top">
                            <div class="marble-red"></div><div class="marble-red"></div><div class="marble-red"></div>
                            <div class="marble-blue"></div><div class="marble-blue"></div>
                        </div>
                    </div>
                    <div class="flex flex-col items-center w-1/3">
                        <span class="text-sm font-semibold text-slate-500 mb-2">Draw 2</span>
                        <div class="text-xl text-slate-300">→</div>
                    </div>
                    <div class="text-center w-1/3 flex flex-col items-center">
                        <p class="text-xs font-bold text-blue-500 mb-2 uppercase">Result</p>
                        <div class="marble-blue mb-2"></div>
                        <span class="bg-blue-50 text-blue-600 font-mono px-2 py-1 rounded text-sm border border-blue-100">P(Blue) = 2/5</span>
                    </div>
                </div>
            </div>
        `
    },
    {
        badge: "Dependent Events",
        title: "Drawing WITHOUT Replacement",
        description: "Now let's look at dependent events. This time, we draw a marble and <strong>keep it out of the jar</strong>. This changes the total number of marbles for the next draw!",
        visual: `
            <div class="w-full flex flex-col gap-6 max-w-2xl">
                <!-- Draw 1 -->
                <div class="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div class="text-center w-1/3">
                        <p class="text-xs font-bold text-slate-400 mb-1 uppercase">Start</p>
                        <div class="jar scale-75 transform origin-top">
                            <div class="marble-red"></div><div class="marble-red"></div><div class="marble-red"></div>
                            <div class="marble-blue"></div><div class="marble-blue"></div>
                        </div>
                    </div>
                    <div class="flex flex-col items-center w-1/3">
                        <span class="text-sm font-semibold text-slate-500 mb-2">Draw 1</span>
                        <div class="text-xl text-slate-300">→</div>
                    </div>
                    <div class="text-center w-1/3 flex flex-col items-center">
                        <p class="text-xs font-bold text-red-500 mb-2 uppercase">Result</p>
                        <div class="marble-red mb-2"></div>
                        <span class="bg-red-50 text-red-600 font-mono px-2 py-1 rounded text-sm border border-red-100">P(Red) = 3/5</span>
                    </div>
                </div>

                <div class="text-center">
                    <span class="inline-block bg-rose-100 text-rose-800 px-4 py-1 rounded-full text-sm font-bold shadow-sm">↓ We keep the red marble OUT! ↓</span>
                </div>

                <!-- Draw 2 -->
                <div class="flex justify-between items-center bg-white p-4 rounded-xl border-rose-300 shadow-md ring-2 ring-rose-50 relative overflow-hidden">
                    <div class="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase">Odds Changed!</div>
                    <div class="text-center w-1/3">
                        <p class="text-xs font-bold text-slate-400 mb-1 uppercase">Before Draw 2</p>
                        <div class="jar scale-75 transform origin-top border-rose-300">
                            <div class="marble-red marble-faded"></div><div class="marble-red"></div><div class="marble-red"></div>
                            <div class="marble-blue"></div><div class="marble-blue"></div>
                        </div>
                        <p class="text-[10px] mt-1 text-rose-500 font-bold">Only 4 left!</p>
                    </div>
                    <div class="flex flex-col items-center w-1/3">
                        <span class="text-sm font-semibold text-slate-500 mb-2">Draw 2</span>
                        <div class="text-xl text-slate-300">→</div>
                    </div>
                    <div class="text-center w-1/3 flex flex-col items-center">
                        <p class="text-xs font-bold text-blue-500 mb-2 uppercase">Result</p>
                        <div class="marble-blue mb-2"></div>
                        <span class="bg-blue-50 text-blue-600 font-mono px-2 py-1 rounded text-sm border border-blue-100">P(Blue) = 2/4</span>
                    </div>
                </div>
            </div>
        `
    },
    {
        badge: "Summary",
        title: "The Mathematical Difference",
        description: "Because of how the jar resets (or doesn't), calculating the probability of <em>both</em> events happening together requires different formulas.",
        visual: `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">

                <!-- Independent Formula -->
                <div class="bg-white p-6 rounded-xl shadow-sm border border-emerald-200">
                    <div class="flex items-center gap-2 mb-4">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <h3 class="font-bold text-slate-800">Independent Events</h3>
                    </div>
                    <p class="text-sm text-slate-500 mb-4">You just multiply the probability of Event A by the normal probability of Event B.</p>
                    <div class="bg-slate-50 p-4 rounded-lg font-mono text-center border border-slate-200 shadow-inner">
                        <p class="text-sm text-slate-500 mb-2">P(A and B) = </p>
                        <p class="text-lg text-emerald-700 font-bold">P(A) × P(B)</p>
                    </div>
                    <p class="mt-4 text-sm text-center text-slate-600">
                        3/5 × 2/5 = <strong>6/25 (24%)</strong>
                    </p>
                </div>

                <!-- Dependent Formula -->
                <div class="bg-white p-6 rounded-xl shadow-sm border border-rose-200">
                    <div class="flex items-center gap-2 mb-4">
                        <div class="w-3 h-3 rounded-full bg-rose-500"></div>
                        <h3 class="font-bold text-slate-800">Dependent Events</h3>
                    </div>
                    <p class="text-sm text-slate-500 mb-4">You multiply P(A) by the probability of B <strong>GIVEN THAT</strong> A already happened.</p>
                    <div class="bg-slate-50 p-4 rounded-lg font-mono text-center border border-slate-200 shadow-inner">
                        <p class="text-sm text-slate-500 mb-2">P(A and B) = </p>
                        <p class="text-lg text-rose-700 font-bold">P(A) × P(B | A)</p>
                    </div>
                    <p class="mt-4 text-sm text-center text-slate-600">
                        3/5 × 2/4 = <strong>6/20 (30%)</strong>
                    </p>
                </div>

            </div>
        `
    }
];

// --- State Management ---
let currentStep = 0;

// --- DOM Elements ---
const badgeEl = document.getElementById('step-badge');
const titleEl = document.getElementById('step-title');
const descEl = document.getElementById('step-desc');
const visualEl = document.getElementById('visual-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const counterEl = document.getElementById('step-counter');
const progressContainer = document.getElementById('progress-container');
const contentArea = document.getElementById('content-area');

// --- Initialization ---
function init() {
    // Generate progress dots
    steps.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `w-full h-2 rounded-full transition-all duration-300 ${index === 0 ? 'bg-white' : 'bg-indigo-400/40'}`;
        dot.id = `dot-${index}`;
        progressContainer.appendChild(dot);
    });

    // Event Listeners
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));

    // Load initial step
    renderStep();
}

// --- Logic ---
function navigate(direction) {
    const newStep = currentStep + direction;
    if (newStep >= 0 && newStep < steps.length) {
        currentStep = newStep;

        // Add fade animation trigger
        contentArea.classList.remove('fade-in');
        void contentArea.offsetWidth; // trigger reflow
        contentArea.classList.add('fade-in');

        renderStep();
    }
}

function renderStep() {
    const data = steps[currentStep];

    // Update Text
    badgeEl.innerText = data.badge;
    titleEl.innerHTML = data.title;
    descEl.innerHTML = data.description;
    visualEl.innerHTML = data.visual;

    // Update Buttons
    prevBtn.disabled = currentStep === 0;
    if (currentStep === steps.length - 1) {
        nextBtn.disabled = true;
        nextBtn.innerText = "Finish ✓";
        nextBtn.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
        nextBtn.classList.add('bg-emerald-500', 'hover:bg-emerald-600');
    } else {
        nextBtn.disabled = false;
        nextBtn.innerText = "Next →";
        nextBtn.classList.remove('bg-emerald-500', 'hover:bg-emerald-600');
        nextBtn.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
    }

    // Update Footer Counter
    counterEl.innerText = `Step ${currentStep + 1} of ${steps.length}`;

    // Update Progress Dots
    steps.forEach((_, index) => {
        const dot = document.getElementById(`dot-${index}`);
        if (index <= currentStep) {
            dot.classList.replace('bg-indigo-400/40', 'bg-white');
        } else {
            dot.classList.replace('bg-white', 'bg-indigo-400/40');
        }
    });
}

// Run app
init();