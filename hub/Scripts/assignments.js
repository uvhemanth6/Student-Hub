document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;
  
    if (localStorage.getItem("darkMode") === "enabled") {
      body.classList.add("dark-mode");
      toggleButton.textContent = "☀️ Light Mode";
    }
  
    toggleButton.addEventListener("click", function () {
      body.classList.toggle("dark-mode");
      localStorage.setItem("darkMode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
      toggleButton.textContent = body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
  
    const form = document.getElementById("assignment-form");
    const assignmentsList = document.getElementById("assignments-list");
    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
  
    function renderAssignments() {
      assignmentsList.innerHTML = "";
      assignments.forEach((assignment, index) => {
        const item = document.createElement("div");
        item.className = "col-md-4 mb-3";
        item.innerHTML = `
          <div class="card assignment-card">
            <h5>${assignment.name}</h5>
            <p>Due: ${assignment.date}</p>
            <button class="btn btn-danger btn-sm" onclick="deleteAssignment(${index})">Delete</button>
          </div>
        `;
        assignmentsList.appendChild(item);
      });
    }
  
    window.deleteAssignment = function (index) {
      assignments.splice(index, 1);
      localStorage.setItem("assignments", JSON.stringify(assignments));
      renderAssignments();
    };
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("assignment-name").value;
      const date = document.getElementById("due-date").value;
      assignments.push({ name, date });
      localStorage.setItem("assignments", JSON.stringify(assignments));
      renderAssignments();
      form.reset();
    });
  
    renderAssignments();
  });
  