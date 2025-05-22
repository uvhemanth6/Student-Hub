
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Load Dark Mode preference from Local Storage
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        toggleButton.textContent = "☀️ Light Mode";
    }

    // Toggle Dark Mode on button click
    toggleButton.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            toggleButton.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("darkMode", "disabled");
            toggleButton.textContent = "🌙 Dark Mode";
        }
    });
});

function logout() {
    alert("You have been logged out.");
    window.location.href = "index.html";
}

const quotes = [
    "Success is not the key to happiness. Happiness is the key to success!",
    "Believe in yourself and you’re halfway there.",
    "Every expert was once a beginner.",
    "Hard work beats talent when talent doesn’t work hard.",
    "Your limitation—it's only your imagination."
];

function changeQuote() {
    let quoteElement = document.getElementById("quote");
    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    quoteElement.style.opacity = "0";  // Fade out effect
    setTimeout(() => {
        quoteElement.innerText = randomQuote;
        quoteElement.style.opacity = "1";  // Fade in effect
    }, 500);
}

// Change quote every 5 seconds
setInterval(changeQuote, 5000);

// Load the first quote on page load
window.onload = changeQuote;



/*eshwar added*/

particlesJS("particles-js", {
    particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2 }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            grab: { distance: 200, line_linked: { opacity: 0.6 } },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});
document.addEventListener("DOMContentLoaded", function () {
    const lines = [
        "Your personalized student portal.",
        "Manage assignments, schedules, and more.",
        "Stay organized. Stay ahead."
    ];
    const quoteElement = document.getElementById("quote");
    const exploreBtn = document.querySelector(".explore-btn");
    let lineIndex = 0;

    function typeLine(line, charIndex = 0) {
        if (charIndex < line.length) {
            quoteElement.textContent += line.charAt(charIndex);
            setTimeout(() => typeLine(line, charIndex + 1), 40);
        } else {
            lineIndex++;
            if (lineIndex < lines.length) {
                setTimeout(() => {
                    quoteElement.textContent += "\n"; // line break
                    typeLine(lines[lineIndex]);
                }, 600);
            } else {
                exploreBtn.style.opacity = 1;
                exploreBtn.style.transform = "translateY(0)";
            }
        }
    }

    quoteElement.textContent = "";
    exploreBtn.style.opacity = 0;
    exploreBtn.style.transform = "translateY(20px)";
    typeLine(lines[lineIndex]);
});


