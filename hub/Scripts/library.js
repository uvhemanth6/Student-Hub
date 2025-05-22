

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


document.addEventListener("DOMContentLoaded", function () {
    loadDepartments();
});



const departments = ["CSE", "ECE", "Mechanical", "Civil", "Electrical"];
const books = {
    "CSE": [
        { title: "Artificial Intelligence", author: "Stuart Russell", available: true, link: "https://dpvipracollege.in/wp-content/uploads/2023/01/Russell-S.-Norvig-P.-Artificial-intelligence-a-modern-approach-2edPH2003T1112s.pdf" },
        { title: "Data Structures", author: "Mark Weiss", available: false, link: "https://www.uoitc.edu.iq/images/documents/informatics-institute/Competitive_exam/DataStructures.pdf" }
    ],
    "ECE": [
        { title: "Digital Electronics", author: "Morris Mano", available: true, link: "https://www.srecwarangal.ac.in/ece-downloads/Digital%20Electronics.pdf" },
        { title: "Microprocessors", author: "Ramesh Gaonkar", available: true, link: "https://www.vssut.ac.in/lecture_notes/lecture1423722820.pdf" }
    ],
    "Mechanical": [
        { title: "Thermodynamics", author: "Cengel", available: true, link: "https://iunajaf.edu.iq/Gradual/Publicationoflectures/uploadsPdf/pdfcoffee.com_engineering-thermodynamics-by-cengel-boles-and-kanoglu-9th-edition-pdf-free.pdf%20-%202023.01.13%20-%2006.32.12pm.pdf" },
        { title: "Fluid Mechanics", author: "Robert Fox", available: false, link: "https://ahsheikh.github.io/Courses/NumMod/FM_RobertFox.pdf" }
    ],
    "Civil": [
        { title: "Structural Analysis", author: "RC Hibbeler", available: true, link: "https://ebookyab.ir/files/Sample%20-%20Structural%20Analysis%20in%20SI%20Units%2010th%20Global%20Edition%20by%20Russell%20Hibbeler.pdf" },
        { title: "Concrete Technology", author: "MS Shetty", available: true, link: "https://zealpolytechnic.com/wp-content/uploads/2023/04/Concrete-Technology-Theory-and-Practice-Civil-Sem-III.pdf" }
    ],
    "Electrical": [
        { title: "Power Systems", author: "CL Wadhwa", available: true, link: "https://mrcet.com/downloads/digital_notes/EEE/Power%20System%20Operation%20and%20Control.pdf" },
        { title: "Electric Machines", author: "P.S. Bimbhra", available: false, link: "https://mrcet.com/downloads/digital_notes/EEE/15122022/ELECRICAL%20MACHINES%20-I%20DIGITAL%20NOTES.pdf" }
    ]
};

// Load departments dynamically
function loadDepartments() {
    let deptContainer = document.getElementById("departments");
    deptContainer.innerHTML = "";  
    departments.forEach(dept => {
        let col = document.createElement("div");
        col.className = "col-md-4 mb-3";
        col.innerHTML = `<div class="card p-3 text-center bg-light" onclick="showBooks('${dept}')">
                            <h5>${dept}</h5>
                         </div>`;
        deptContainer.appendChild(col);
    });
}

// Show books in the selected department
function showBooks(dept) {
    document.getElementById("booksSection").style.display = "block";
    document.getElementById("deptName").innerText = dept;
    document.getElementById("departmentsContainer").style.display = "none";

    let booksContainer = document.getElementById("books");
    booksContainer.innerHTML = "";
    books[dept].forEach(book => {
        let col = document.createElement("div");
        col.className = "col-md-6 mb-3";
        col.innerHTML = `<div class="card p-3">
                            <h5>${book.title} 
                                <a href="${book.link}" target="_blank" class="btn btn-primary btn-sm">Soft Copy</a>
                            </h5>
                            <p>Author: ${book.author}</p>
                            <p>Status: <strong>${book.available ? "Available" : "Not Available"}</strong></p>
                        </div>`;
        booksContainer.appendChild(col);
    });
}

// Back to departments
function goBack() {
    document.getElementById("booksSection").style.display = "none";
    document.getElementById("departmentsContainer").style.display = "block";
}

// Search books function
function searchBooks() {
    let filter = document.getElementById("searchBox").value.toLowerCase();
    let booksList = document.querySelectorAll("#books .card");
    booksList.forEach(book => {
        let title = book.querySelector("h5").innerText.toLowerCase();
        book.style.display = title.includes(filter) ? "block" : "none";
    });
}

// Load departments on page load
window.onload = loadDepartments;