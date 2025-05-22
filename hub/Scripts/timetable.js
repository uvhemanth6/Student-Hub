document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("dark-mode-toggle");
  const body = document.body;

  // Load Dark Mode preference from Local Storage
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    toggleButton.textContent = "☀️ Light Mode";
  }

  // Toggle Dark Mode
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

// ⏰ Floating Clock Logic
// ⏰ Centered Clock Logic
function updateClock() {
  const clock = document.getElementById("centered-clock");
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  clock.textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();
particlesScript.src = "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js";
particlesScript.onload = () => {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": {
                "type": "circle",
                "stroke": { "width": 0, "color": "#000000" },
                "polygon": { "nb_sides": 5 }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": { "enable": false }
            },
            "size": {
                "value": 4,
                "random": true,
                "anim": { "enable": false }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 3,
                "direction": "none",
                "out_mode": "out"
            }
        },
        "interactivity": {
            "events": {
                "onhover": { "enable": true, "mode": "repulse" },
                "onclick": { "enable": true, "mode": "push" }
            },
            "modes": {
                "repulse": { "distance": 100 },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });
};
document.body.appendChild(particlesScript);