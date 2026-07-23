// --- 1. Dynamic Matrix Script Reveal Engine ---
const descElement = document.querySelector('.description-reveal');
const rawText = "Computer Engineering Student | Embedded Systems & Backend Developer";

descElement.innerHTML = rawText.split("").map(char => {
    if(char === " ") return `<span class="word-space">&nbsp;</span>`;
    return `<span class="char-unit">${char}</span>`;
}).join("");

document.querySelectorAll('.char-unit').forEach((char, index) => {
    setTimeout(() => {
        char.classList.add('revealed');
    }, 40 * index);
});

// --- 2. Intersection Observer Core ---
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidebar-links a");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const activeId = entry.target.getAttribute("id");
            navLinks.forEach(link => link.classList.remove("active"));
            const matchingLink = document.querySelector(`.sidebar-links a[href="#${activeId}"]`);
            if (matchingLink) matchingLink.classList.add("active");
        }
    });
}, { root: null, rootMargin: "-30% 0px -60% 0px", threshold: 0 });

sections.forEach(section => sectionObserver.observe(section));

// --- 3. Fluid Physics Frame Loop & Flashlight Engine ---
const cursor = document.getElementById('customCursor');
const dot = document.getElementById('cursorDot');
const interactiveTargets = document.querySelectorAll('.interactive-target');

let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

if (window.matchMedia("(pointer: fine)").matches) {
    document.documentElement.classList.add('desktop-engine');

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    function renderCursorLoop() {
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        
        // Synchronize raw position vector directly to CSS engine variables
        document.documentElement.style.setProperty('--flashlight-x', `${mouseX}px`);
        document.documentElement.style.setProperty('--flashlight-y', `${mouseY}px`);
        
        requestAnimationFrame(renderCursorLoop);
    }
    requestAnimationFrame(renderCursorLoop);

    interactiveTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover-state');
            dot.classList.add('dot-hover-state');
        });
        target.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover-state');
            dot.classList.remove('dot-hover-state');
        });
    });
}

// --- 4. Adaptive Vector Typography Deflection (Magnet Engine) ---
const magnetText = document.querySelector('.interactive-magnet');
if (magnetText && window.matchMedia("(pointer: fine)").matches) {
    magnetText.addEventListener('mousemove', (e) => {
        const coord = magnetText.getBoundingClientRect();
        const x = (e.clientX - coord.left) - (coord.width / 2);
        const y = (e.clientY - coord.top) - (coord.height / 2);
        
        magnetText.style.transform = `translate3d(${x * 0.15}px, ${y * 0.2}px, 0) rotateX(${-y * 0.05}deg) rotateY(${x * 0.05}deg)`;
    });

    magnetText.addEventListener('mouseleave', () => {
        magnetText.style.transform = 'translate3d(0,0,0) rotateX(0deg) rotateY(0deg)';
    });
}

// --- 5. Rai: Autonomous Draggable Portfolio Robot ---
const robot = document.getElementById('robotCompanion');
const robotSpeech = document.getElementById('robotSpeech');
const robotFact = document.getElementById('robotFact');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const robotFacts = [
    "Raine builds across the full stack — from microcontroller firmware to web interfaces.",
    "The resistor sorter uses an ESP32-S3 CAM and OpenCV to classify components.",
    "Raine's smart locker combines RFID authentication with real-time database validation.",
    "The OS Visualizer turns scheduling algorithms and process metrics into an interactive GUI.",
    "This portfolio's background has a flashlight effect that follows your cursor.",
    "Raine works with Java, Python, C++, SQL, JavaScript, PHP, and HTML/CSS.",
    "The Numerical Methods app solves systems of linear equations right in the browser."
];
const sectionReactions = {
    home: "This is Raine's launch pad! Computer engineering, embedded systems, and backend development all meet here.",
    about: "Raine builds complete systems: hardware at the bottom, intelligent software on top. Adding that to my data banks!",
    skills: "So many tools! I see Java, Python, C++, SQL, JavaScript, PHP, and machine vision with OpenCV.",
    projects: "Project territory! Drop me over a card and I'll inspect that build for you.",
    contact: "Need a computer engineer for your quest? Raine's email, GitHub, and direct line are all here."
};

let robotX = 0;
let robotY = 0;
let targetX = 0;
let targetY = 0;
let draggingRobot = false;
let robotMoved = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let factIndex = -1;
let speechTimer;
let roamTimer;
let factTimer;
let lastInteractionKey = '';
let lastInteractionTime = 0;

function robotBounds() {
    const rect = robot.getBoundingClientRect();
    const padding = 14;
    const sidebarClearance = window.innerWidth > 768 ? 290 : padding;
    return {
        minX: sidebarClearance,
        maxX: Math.max(sidebarClearance, window.innerWidth - rect.width - padding),
        minY: window.innerWidth <= 768 ? 82 : padding,
        maxY: Math.max(82, window.innerHeight - rect.height - padding)
    };
}

function clampRobot(x, y) {
    const bounds = robotBounds();
    return {
        x: Math.min(bounds.maxX, Math.max(bounds.minX, x)),
        y: Math.min(bounds.maxY, Math.max(bounds.minY, y))
    };
}

function placeRobot(x, y) {
    robotX = x;
    robotY = y;
    robot.dataset.speechSide = x + (robot.offsetWidth / 2) < window.innerWidth / 2 ? 'right' : 'left';
    robot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
}

function showRobotFact(message) {
    clearTimeout(speechTimer);
    if (message) {
        robotFact.textContent = message;
    } else {
        factIndex = (factIndex + 1) % robotFacts.length;
        robotFact.textContent = robotFacts[factIndex];
    }
    robotSpeech.classList.add('is-visible');
    speechTimer = setTimeout(() => robotSpeech.classList.remove('is-visible'), 6500);
}

function findRobotInteraction(clientX, clientY) {
    const layers = document.elementsFromPoint(clientX, clientY);
    const project = layers.find(element => element.classList?.contains('project-card'));
    if (project) {
        const title = project.querySelector('h3')?.textContent.trim() || 'this project';
        const comments = {
            'Operating System Algorithm Visualizer': "CPU scheduling without the headache! This visualizer makes operating-system algorithms easier to explore.",
            'Web-Based Numerical Methods Application': "Numbers ahead! This browser app solves systems of linear equations with interactive results.",
            'IoT-Based Smart Locker System': "A guarded treasure vault! RFID and real-time database checks keep this smart locker secure.",
            'ESP32-S3 CAM-Based Automated Resistor Sorter': "Robot-eye vision! An ESP32-S3 CAM and OpenCV help sort resistors automatically."
        };
        return { key: `project:${title}`, element: project, message: comments[title] || `This is ${title}, one of Raine's featured builds.` };
    }

    const skillGroup = layers.find(element => element.classList?.contains('skill-category'));
    if (skillGroup) {
        const title = skillGroup.querySelector('h3')?.textContent.trim() || 'Technical skills';
        return { key: `skill:${title}`, element: skillGroup, message: `${title}? Excellent gear for a computer engineer's toolkit.` };
    }

    const section = layers.find(element => element.tagName === 'SECTION' && element.id);
    if (section && sectionReactions[section.id]) {
        return { key: `section:${section.id}`, element: section, message: sectionReactions[section.id] };
    }
    return null;
}

function reactToRobotLocation(clientX, clientY, force = false) {
    const interaction = findRobotInteraction(clientX, clientY);
    if (!interaction) return;
    const now = Date.now();
    if (!force && (interaction.key === lastInteractionKey || now - lastInteractionTime < 650)) return;
    lastInteractionKey = interaction.key;
    lastInteractionTime = now;
    showRobotFact(interaction.message);
    robot.classList.add('is-reacting');
    interaction.element.classList.remove('robot-visited');
    void interaction.element.offsetWidth;
    interaction.element.classList.add('robot-visited');
    setTimeout(() => interaction.element.classList.remove('robot-visited'), 900);
    setTimeout(() => robot.classList.remove('is-reacting'), 650);
}

function chooseRobotDestination() {
    if (draggingRobot || robot.matches(':hover') || document.hidden || reduceMotion.matches) return;
    const bounds = robotBounds();
    targetX = bounds.minX + Math.random() * (bounds.maxX - bounds.minX);
    targetY = bounds.minY + Math.random() * (bounds.maxY - bounds.minY);
    robot.dataset.facing = targetX < robotX ? 'left' : 'right';
    robot.classList.add('is-flying');
}

function scheduleRobotRoam() {
    clearInterval(roamTimer);
    if (!reduceMotion.matches) roamTimer = setInterval(chooseRobotDestination, 7200);
}

function scheduleRobotFacts() {
    clearInterval(factTimer);
    factTimer = setInterval(() => {
        if (!draggingRobot && !document.hidden) showRobotFact();
    }, 14000);
}

function animateRobot() {
    if (!draggingRobot && !reduceMotion.matches) {
        const dx = targetX - robotX;
        const dy = targetY - robotY;
        if (Math.abs(dx) + Math.abs(dy) > 1) {
            placeRobot(robotX + dx * 0.012, robotY + dy * 0.012);
        } else {
            robot.classList.remove('is-flying');
        }
    }
    requestAnimationFrame(animateRobot);
}

function beginRobotDrag(event) {
    if (event.button !== undefined && event.button !== 0) return;
    const rect = robot.getBoundingClientRect();
    draggingRobot = true;
    robotMoved = false;
    dragOffsetX = event.clientX - rect.left;
    dragOffsetY = event.clientY - rect.top;
    lastInteractionKey = '';
    robot.classList.add('is-dragging');
    showRobotFact("Mobility mode engaged! Move me over a section or project card.");
    robot.setPointerCapture(event.pointerId);
    event.preventDefault();
}

robot.addEventListener('pointerdown', beginRobotDrag);
robot.addEventListener('pointermove', (event) => {
    if (!draggingRobot) return;
    const next = clampRobot(event.clientX - dragOffsetX, event.clientY - dragOffsetY);
    if (Math.abs(next.x - robotX) + Math.abs(next.y - robotY) > 3) robotMoved = true;
    targetX = next.x;
    targetY = next.y;
    placeRobot(next.x, next.y);
    if (robotMoved) reactToRobotLocation(event.clientX, event.clientY);
});
robot.addEventListener('pointerup', (event) => {
    if (!draggingRobot) return;
    draggingRobot = false;
    robot.classList.remove('is-dragging');
    if (robot.hasPointerCapture(event.pointerId)) robot.releasePointerCapture(event.pointerId);
    if (robotMoved) {
        reactToRobotLocation(event.clientX, event.clientY, true);
    } else {
        showRobotFact();
    }
    setTimeout(chooseRobotDestination, 1800);
});
robot.addEventListener('pointercancel', () => {
    draggingRobot = false;
    robot.classList.remove('is-dragging');
});
robot.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        showRobotFact();
    }
});

window.addEventListener('resize', () => {
    const safe = clampRobot(robotX, robotY);
    targetX = safe.x;
    targetY = safe.y;
    placeRobot(safe.x, safe.y);
});
reduceMotion.addEventListener('change', scheduleRobotRoam);

const initialRobotPosition = clampRobot(window.innerWidth - 190, window.innerHeight - 190);
targetX = initialRobotPosition.x;
targetY = initialRobotPosition.y;
placeRobot(targetX, targetY);
requestAnimationFrame(animateRobot);
scheduleRobotRoam();
scheduleRobotFacts();
setTimeout(() => showRobotFact("R-01 online! Drag me around, or tap me for a portfolio fact."), 1800);
setTimeout(chooseRobotDestination, 4200);
