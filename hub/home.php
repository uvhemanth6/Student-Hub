<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: login-signup.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Hub - Home</title>
    <link rel="stylesheet" href="Styles/home.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <!-- Bootstrap JS (CDN) --> 
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>

</head>
<body>

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="#">Student Hub</a>
            
            <!-- Toggler Button -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
    
            <!-- Collapsible Menu -->
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link nav-link text-white fw-bold" href="home.php">Home</a></li>
                    <li class="nav-item"><a class="nav-link nav-link text-white fw-bold" href="assignment.html">Assignments</a></li>
                    <li class="nav-item"><a class="nav-link text-white fw-bold" href="timetable.html">Time Table</a></li>
                    <li class="nav-item"><a class="nav-link text-white fw-bold" href="chat.html">chats</a></li>
                    <li class="nav-item"><a class="nav-link text-white fw-bold" href="notes.html">Notes</a></li>
                    <li class="nav-item"><a class="nav-link text-white fw-bold" href="remainders.html">Remainders</a></li>
                    <li class="nav-item"><a class="nav-link text-white fw-bold" href="library.html">Library</a></li>
                    <li class="nav-item"><a class="nav-link text-white fw-bold" href="settings.php">Settings</a></li>
                    <li class="nav-item d-flex align-items-center">
                        <button id="dark-mode-toggle" class="btn btn-outline-light me-2 dark-mode-btn">🌙 Dark Mode</button>
                        <a href="logout.php" class="btn btn-danger logout-btn">Logout <i class="fas fa-sign-out-alt"></i></a>
                    </li>
                </ul>
            </div>
            
        </div>
    </nav>
    

    <header class="hero-section">
    <div class="hero-section text-center">
        <h1 class="hero-title">Welcome to Student Hub</h1>
        <p id="quote" class="hero-subtitle"></p>
        <button class="explore-btn">Explore Now</button>
    </div>        
</header>


    <div id="particles-js"></div>
    <section class="features py-5">
        <div class="container">
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="feature-box floating" onclick="location.href='assignment.html'">
                        <i class="bi bi-clipboard-check assignments-icon"></i>
                        <h3>Assignments</h3>
                        <p>Manage and track your assignments efficiently.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-box floating" onclick="location.href='timetable.html'">
                        <i class="bi bi-calendar-week timetable-icon"></i>
                        <h3>Time Table</h3>
                        <p>Connect and collaborate with classmates.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-box floating" onclick="location.href='notes.html'">
                        <i class="bi bi-journal-text notes-icon"></i>
                        <h3>Notes</h3>
                        <p>Organize and access your study notes easily.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-box floating" onclick="location.href='remainders.html'">
                        <i class="bi bi-alarm remainders-icon"></i>
                        <h3>Reminders</h3>
                        <p>Set reminders and never miss deadlines.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-box floating" onclick="location.href='chat.html'">
                        <i class="bi bi-chat-dots chat-icon"></i>
                        <h3>Chat</h3>
                        <p>Connect and collaborate with classmates.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-box floating" onclick="location.href='library.html'">
                        <i class="bi bi-book library-icon"></i>
                        <h3>Library</h3>
                        <p>Connect and collaborate with classmates.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-box floating" onclick="location.href='settings.php'">
                        <i class="bi bi-gear settings-icon"></i>
                        <h3>Settings</h3>
                        <p>Customize your preferences for a better experience.</p>
                    </div>
                </div>
            </div>
        </div>
        
    </section>
    
</script>
<script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
<script src="Scripts/home.js"></script>

    <script src="Scripts/home.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.10.2/lottie.min.js"></script>
<script>
    // Load Lottie animation
    lottie.loadAnimation({
        container: document.getElementById('hero-animation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'Animations/student-hero.json' // update with correct path
    });
</script>

</body>
</html>
