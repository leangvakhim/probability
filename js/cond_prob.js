// DOM Elements
const titleEl = document.getElementById('step-title');
const descEl = document.getElementById('step-description');
const mathEl = document.getElementById('step-math');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const counterEl = document.getElementById('step-counter');
const indicatorsContainer = document.getElementById('step-indicators');

// SVG Elements
const universeGrp = document.getElementById('universe-group');
const circleAGrp = document.getElementById('circle-a-group');
const circleBGrp = document.getElementById('circle-b-group');
const intersectGrp = document.getElementById('intersection-group');
const focusOverlay = document.getElementById('focus-overlay');
const labelA = document.getElementById('label-a');
const labelB = document.getElementById('label-b');

// Helper function to manage SVG state smoothly
function updateSVG(states) {
    universeGrp.style.opacity = states.universe ?? 1;
    circleAGrp.style.opacity = states.circleA ?? 0.3;
    circleBGrp.style.opacity = states.circleB ?? 0.3;
    intersectGrp.style.opacity = states.intersect ?? 0;

    // Labels can fade out if their circle gets faded out drastically
    labelA.style.opacity = (states.circleA ?? 0.3) < 0.2 ? 0 : 1;
    labelB.style.opacity = (states.circleB ?? 0.3) < 0.2 ? 0 : 1;

    // Grayscale effect for unselected parts to simulate "shrinking sample space"
    if (states.isolateB) {
        circleAGrp.setAttribute('fill', 'rgba(156, 163, 175, 0.1)'); // Grayed out
        circleAGrp.setAttribute('stroke', '#e5e7eb');
        universeGrp.setAttribute('opacity', '0.2');
    } else {
        circleAGrp.setAttribute('fill', 'rgba(239, 68, 68, 0.3)'); // Normal Red
        circleAGrp.setAttribute('stroke', '#ef4444');
        universeGrp.setAttribute('opacity', states.universe ?? 1);
    }
}

// The Story / Steps Data
const steps = [
    {
        title: "1. The Sample Space (Universe)",
        description: `
            <p>Imagine a local pizzeria serves exactly <strong>100 customers</strong> on a given day.</p>
            <p>This entire group of 100 people is our <strong>Sample Space (Ω)</strong>. In probability, this represents 100% of all possible outcomes. Every person we analyze belongs inside this white box.</p>
        `,
        math: `Total Customers = 100`,
        visual: () => updateSVG({ universe: 1, circleA: 0.1, circleB: 0.1, intersect: 0 })
    },
    {
        title: "2. Event A: Pepperoni",
        description: `
            <p>Let <strong>Event A</strong> be the customers who ordered a Pepperoni pizza.</p>
            <p>Out of the 100 total customers, <strong>60 people</strong> ordered Pepperoni.</p>
            <p>The probability of randomly picking someone who ordered Pepperoni is simply 60 out of 100.</p>
        `,
        math: `P(A) = <span class="fraction"><span class="numerator">60</span><span class="denominator">100</span></span> = 0.60`,
        visual: () => updateSVG({ universe: 1, circleA: 1, circleB: 0.1, intersect: 0 })
    },
    {
        title: "3. Event B: Mushrooms",
        description: `
            <p>Let <strong>Event B</strong> be the customers who ordered a Mushroom pizza.</p>
            <p>Out of the 100 total customers, <strong>40 people</strong> ordered Mushrooms.</p>
            <p>Notice how the two circles overlap. This means some people like both toppings!</p>
        `,
        math: `P(B) = <span class="fraction"><span class="numerator">40</span><span class="denominator">100</span></span> = 0.40`,
        visual: () => updateSVG({ universe: 1, circleA: 0.4, circleB: 1, intersect: 0 })
    },
    {
        title: "4. The Intersection (Both)",
        description: `
            <p>Looking closely at the overlap, we find that <strong>20 customers</strong> ordered a pizza with BOTH Pepperoni and Mushrooms.</p>
            <p>This overlapping area is called the <strong>Intersection (A ∩ B)</strong>.</p>
        `,
        math: `P(A ∩ B) = <span class="fraction"><span class="numerator">20</span><span class="denominator">100</span></span> = 0.20`,
        visual: () => updateSVG({ universe: 1, circleA: 0.5, circleB: 0.5, intersect: 1 })
    },
    {
        title: "5. The Condition (The 'Given')",
        description: `
            <p>Now, here comes <strong>Conditional Probability</strong>.</p>
            <p>Question: "If we randomly pick a customer, and we <em>already know</em> they ordered Mushrooms, what is the probability they also ordered Pepperoni?"</p>
            <p>Because we <em>know</em> Event B (Mushrooms) happened, we completely ignore everyone else. <strong>Our entire universe shrinks to just the Mushroom circle!</strong></p>
        `,
        math: `New Universe = Event B (40 people)`,
        visual: () => updateSVG({ universe: 0.2, circleA: 0.1, circleB: 1, intersect: 1, isolateB: true })
    },
    {
        title: "6. Calculating P(A | B)",
        description: `
            <p>We read <strong>P(A | B)</strong> as "The probability of Event A, <em>given</em> Event B".</p>
            <p>Inside our new shrunk universe (the 40 Mushroom eaters), how many ordered Pepperoni? Just the intersection (20 people).</p>
            <p>So, we divide the overlap by our new, smaller universe.</p>
        `,
        math: `P(A | B) = <span class="fraction"><span class="numerator">P(A ∩ B)</span><span class="denominator">P(B)</span></span> = <span class="fraction"><span class="numerator">20</span><span class="denominator">40</span></span> = <strong class="ml-2 text-lg">0.50 (or 50%)</strong>`,
        visual: () => updateSVG({ universe: 0.1, circleA: 0.1, circleB: 1, intersect: 1, isolateB: true })
    }
];

let currentStep = 0;

// Initialize progress dots
function initIndicators() {
    steps.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `h-2 flex-grow rounded-full transition-colors duration-300 ${index === 0 ? 'bg-indigo-600' : 'bg-gray-200'}`;
        dot.id = `dot-${index}`;
        indicatorsContainer.appendChild(dot);
    });
}

// Render the current step
function renderStep() {
    const step = steps[currentStep];

    // Fade out text
    titleEl.style.opacity = 0;
    descEl.style.opacity = 0;
    mathEl.style.opacity = 0;

    setTimeout(() => {
        // Update text content
        titleEl.innerHTML = step.title;
        descEl.innerHTML = step.description;
        mathEl.innerHTML = step.math;

        // Update UI Controls
        counterEl.innerText = currentStep + 1;
        prevBtn.disabled = currentStep === 0;
        nextBtn.disabled = currentStep === steps.length - 1;

        // Update indicators
        steps.forEach((_, index) => {
            const dot = document.getElementById(`dot-${index}`);
            if (index <= currentStep) {
                dot.className = 'h-2 flex-grow rounded-full transition-colors duration-300 bg-indigo-600';
            } else {
                dot.className = 'h-2 flex-grow rounded-full transition-colors duration-300 bg-gray-200';
            }
        });

        // Fade in text
        titleEl.style.opacity = 1;
        descEl.style.opacity = 1;
        mathEl.style.opacity = 1;
    }, 200);

    // Trigger visual action
    step.visual();
}

// Event Listeners
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

// Start
initIndicators();
renderStep();