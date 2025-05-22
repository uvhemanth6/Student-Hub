document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        toggleButton.textContent = "☀️ Light Mode";
    }

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

    loadSettings();
});

function saveSettings() {
    const settings = {
        theme: document.getElementById("themeSelect").value,
        fontSize: document.getElementById("fontSizeSelect").value,
        language: document.getElementById("languageSelect").value,
        notifications: document.getElementById("notificationToggle").checked,
        autoSaveNotes: document.getElementById("autoSaveNotesToggle").checked,
        profileVisibility: document.getElementById("profileVisibility").value
    };

    localStorage.setItem("userSettings", JSON.stringify(settings));
    alert("Settings saved successfully!");
    applySettings();
}

function loadSettings() {
    const savedSettings = JSON.parse(localStorage.getItem("userSettings"));

    if (savedSettings) {
        document.getElementById("themeSelect").value = savedSettings.theme;
        document.getElementById("fontSizeSelect").value = savedSettings.fontSize;
        document.getElementById("languageSelect").value = savedSettings.language;
        document.getElementById("notificationToggle").checked = savedSettings.notifications;
        document.getElementById("autoSaveNotesToggle").checked = savedSettings.autoSaveNotes;
        document.getElementById("profileVisibility").value = savedSettings.profileVisibility;
        applySettings();
    }
}

function applySettings() {
    const theme = document.getElementById("themeSelect").value;
    const fontSize = document.getElementById("fontSizeSelect").value;

    document.body.style.fontSize =
        fontSize === "small" ? "14px" : fontSize === "large" ? "18px" : "16px";

    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}