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

  const sendButton = document.getElementById("sendMessage");
  const inputField = document.getElementById("messageInput");
  const chatBox = document.getElementById("chat-messages");

  sendButton.addEventListener("click", sendMessage);
  inputField.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const text = inputField.value.trim();
    if (text === "") return;

    addMessage("user", text);
    inputField.value = "";

    // Simulate AI Reply
    setTimeout(() => {
      const replies = [
        "That's interesting! 🤖",
        "Tell me more! 😄",
        "I'm here to help! 💡",
        "Cool! 🚀",
        "Haha! 😆",
        "Absolutely! ✅",
        "Hmm... 🤔"
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      addMessage("other", reply);
    }, 1000);
  }

  function addMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender);

    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.innerHTML = text;

    msgDiv.appendChild(bubble);
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});

// ParticlesJS Config
particlesJS("particles-js", {
  particles: {
    number: { value: 60 },
    size: { value: 3 },
    color: { value: "#ffffff" },
    line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.3, width: 1 },
    move: { enable: true, speed: 2 }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "grab" }
    }
  }
});

