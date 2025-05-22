

document.addEventListener("DOMContentLoaded", () => {
    loadReminders();
    setInterval(updateCountdowns, 1000);
});

function addReminder() {
    const reminderInput = document.getElementById('reminderInput');
    const reminderTime = document.getElementById('reminderTime');
    const reminderList = document.getElementById('reminderList');

    const reminderText = reminderInput.value.trim();
    const reminderDateTime = new Date(reminderTime.value).getTime();

    if (!reminderText || isNaN(reminderDateTime)) {
        alert("Please enter a valid reminder and time!");
        return;
    }

    const reminder = { text: reminderText, time: reminderDateTime };
    saveReminder(reminder);
    displayReminder(reminder);

    reminderInput.value = '';
    reminderTime.value = '';
}

function saveReminder(reminder) {
    let reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    reminders.push(reminder);
    localStorage.setItem('reminders', JSON.stringify(reminders));
}

function loadReminders() {
    let reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    const reminderList = document.getElementById('reminderList');
    reminderList.innerHTML = "";

    reminders.forEach(reminder => displayReminder(reminder));
}

function displayReminder(reminder) {
    const reminderList = document.getElementById('reminderList');
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

    const timeLeft = document.createElement('span');
    timeLeft.classList.add('countdown');
    timeLeft.setAttribute("data-time", reminder.time);

    li.innerHTML = `<strong>${reminder.text}</strong><br><small>${new Date(reminder.time).toLocaleString()}</small>`;
    li.appendChild(timeLeft);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
    removeBtn.textContent = 'Delete';
    removeBtn.onclick = () => removeReminder(reminder, li);

    li.appendChild(removeBtn);
    reminderList.appendChild(li);
}

function removeReminder(reminder, element) {
    let reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    reminders = reminders.filter(r => r.time !== reminder.time);
    localStorage.setItem('reminders', JSON.stringify(reminders));
    element.remove();
}

function updateCountdowns() {
    const now = new Date().getTime();
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    const countdownElements = document.querySelectorAll('.countdown');

    countdownElements.forEach(el => {
        const time = parseInt(el.getAttribute("data-time"));
        const timeDiff = time - now;

        if (timeDiff <= 0) {
            el.parentElement.remove();
            removeReminder({ time }, null);
        } else {
            el.textContent = formatTimeLeft(timeDiff);
        }
    });
}

function formatTimeLeft(ms) {
    const sec = Math.floor(ms / 1000) % 60;
    const min = Math.floor(ms / 1000 / 60) % 60;
    const hrs = Math.floor(ms / 1000 / 60 / 60) % 24;
    const days = Math.floor(ms / 1000 / 60 / 60 / 24);

    return `${days}d ${hrs}h ${min}m ${sec}s left`;
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

if (localStorage.getItem('darkMode') === 'enabled') {
body.classList.add('dark-mode');
darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener('click', () => {
body.classList.toggle('dark-mode');
if (body.classList.contains('dark-mode')) {
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('darkMode', 'enabled');
} else {
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', 'disabled');
}
});

// Alarm Toggle
let alarmEnabled = true;
const alarmToggleBtn = document.getElementById('alarm-toggle');
const alarmSound = document.getElementById('alarmSound');

if (localStorage.getItem('alarmEnabled') === 'false') {
alarmEnabled = false;
alarmToggleBtn.innerHTML = '<i class="fas fa-bell-slash"></i> Alarm Off';
alarmToggleBtn.classList.remove('btn-secondary');
alarmToggleBtn.classList.add('btn-outline-secondary');
}

function toggleAlarm() {
alarmEnabled = !alarmEnabled;
if (alarmEnabled) {
    alarmToggleBtn.innerHTML = '<i class="fas fa-bell"></i> Alarm On';
    alarmToggleBtn.classList.remove('btn-outline-secondary');
    alarmToggleBtn.classList.add('btn-secondary');
    localStorage.setItem('alarmEnabled', 'true');
} else {
    alarmToggleBtn.innerHTML = '<i class="fas fa-bell-slash"></i> Alarm Off';
    alarmToggleBtn.classList.remove('btn-secondary');
    alarmToggleBtn.classList.add('btn-outline-secondary');
    localStorage.setItem('alarmEnabled', 'false');
}
}

// Reminder Logic
let reminders = [];

window.onload = function() {
const savedReminders = localStorage.getItem('reminders');
if (savedReminders) {
    reminders = JSON.parse(savedReminders);
    displayReminders();
}
checkReminders(); // Start checking reminders on page load
};

function addReminder() {
const reminderText = document.getElementById('reminderInput').value;
const reminderTime = document.getElementById('reminderTime').value;

if (reminderText && reminderTime) {
    const reminder = {
        id: Date.now(),
        text: reminderText,
        time: new Date(reminderTime).getTime(),
        triggered: false
    };
    reminders.push(reminder);
    saveToLocalStorage();
    displayReminders();
    document.getElementById('reminderInput').value = '';
    document.getElementById('reminderTime').value = '';
} else {
    alert('Please enter a reminder and select a time!');
}
}

function displayReminders() {
const reminderList = document.getElementById('reminderList');
reminderList.innerHTML = '';

reminders.forEach(reminder => {
    const reminderItem = document.createElement('li');
    reminderItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    const reminderDate = new Date(reminder.time);
    reminderItem.innerHTML = `
        <div>
            <strong>${reminder.text}</strong><br>
            <small>${reminderDate.toLocaleString()}</small>
        </div>
        <button class="btn btn-danger btn-sm" onclick="deleteReminder(${reminder.id})">
            <i class="fas fa-trash"></i> Delete
        </button>
    `;
    reminderList.appendChild(reminderItem);
});
}

function deleteReminder(id) {
if (confirm('Are you sure you want to delete this reminder?')) {
    reminders = reminders.filter(r => r.id !== id);
    saveToLocalStorage();
    displayReminders();
}
}

function checkReminders() {
const now = Date.now();
reminders.forEach(reminder => {
    if (!reminder.triggered && reminder.time <= now) {
        reminder.triggered = true;
        if (alarmEnabled) {
            playAlarm();
        }
        alert(`Reminder: ${reminder.text}`);
        saveToLocalStorage();
    }
});
setTimeout(checkReminders, 1000); // Check every second
}

function playAlarm() {
alarmSound.currentTime = 0; // Reset to start
alarmSound.play().catch(error => {
    console.error('Error playing alarm sound:', error);
    alert('Failed to play alarm sound. Please ensure your browser allows audio playback.');
});
}

function saveToLocalStorage() {
localStorage.setItem('reminders', JSON.stringify(reminders));
}
alarmToggleBtn.classList.add('btn-outline-secondary');
alarmToggleBtn.classList.remove('btn-secondary');
localStorage.setItem('alarmEnabled', 'false');


// Check for expired reminders and play alarm
setInterval(() => {
if (!alarmEnabled) return;

const now = new Date().getTime();
const reminders = JSON.parse(localStorage.getItem('reminders')) || [];

reminders.forEach(reminder => {
    if (now >= reminder.time) {
        alarmSound.play();
    }
});
}, 1000);

// Load Particles.js
document.addEventListener("DOMContentLoaded", function () {
const particlesScript = document.createElement("script");
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
});
