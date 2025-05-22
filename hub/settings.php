<?php
session_start();

if (!isset($_SESSION['email'])) {
    header("Location: login-signup.php");
    exit();
}

$host = 'localhost';
$db = 'student_hub';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

$stmt = $pdo->prepare("SELECT name, email FROM users WHERE email = ?");
$stmt->execute([$_SESSION['email']]);
$user = $stmt->fetch();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Settings</title>
    <link rel="stylesheet" href="Styles/settings.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body>
    <div id="particles-js"></div>

    <nav class="navbar navbar-expand-lg" style="background-color: #007bff;">
        <div class="container">
            <a class="navbar-brand text-white fw-bold" href="home.php">Student Hub</a>
            <div class="collapse navbar-collapse justify-content-end">
                <ul class="navbar-nav">
                    <li class="nav-item"><a class="nav-link text-white" href="home.php">Home</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="assignment.html">Assignments</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="timetable.html">Time Table</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="chat.html">Chats</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="notes.html">Notes</a></li>
                    <li class="nav-item"><a class="nav-link text-white " href="remainders.html">Remainders</a></li>
                    <li class="nav-item"><a class="nav-link text-white" href="library.html">Library</a></li>
                    <li class="nav-item"><a class="nav-link text-white fw-bold" href="settings.php">Settings</a></li>
                    <li class="nav-item d-flex align-items-center">
                        <button id="dark-mode-toggle" class="btn btn-outline-light me-2 dark-mode-btn">🌙 Dark Mode</button>
                        <a href="logout.php" class="btn btn-danger">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container mt-4 settings-content">
        <h2>Settings</h2>
        <div class="profile-box d-flex align-items-center gap-3 mb-4 p-3 shadow-sm rounded">
    <div class="profile-circle">
        <span class="initials"><?php echo strtoupper(substr($user['name'], 0, 1)); ?></span>
    </div>
    <div>
        <h5 class="mb-0 fw-bold"><?php echo htmlspecialchars($user['name']); ?></h5>
        <small class="text-muted"><?php echo htmlspecialchars($user['email']); ?></small>
    </div>
</div>




        <div class="mb-3">
            <label for="themeSelect" class="form-label">Theme</label>
            <select id="themeSelect" class="form-select">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="fontSizeSelect" class="form-label">Font Size</label>
            <select id="fontSizeSelect" class="form-select">
                <option value="small">Small</option>
                <option value="medium" selected>Medium</option>
                <option value="large">Large</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="languageSelect" class="form-label">Language</label>
            <select id="languageSelect" class="form-select">
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="de">German</option>
            </select>
        </div>

        <div class="mb-3">
            <label class="form-label">Enable Notifications</label><br>
            <input type="checkbox" id="notificationToggle" class="form-check-input"> Enable
        </div>

        <div class="mb-3">
            <label class="form-label">Auto-Save Notes</label><br>
            <input type="checkbox" id="autoSaveNotesToggle" class="form-check-input"> Enable
        </div>

        <div class="mb-3">
            <label class="form-label">Profile Visibility</label><br>
            <select id="profileVisibility" class="form-select">
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="friends">Friends Only</option>
            </select>
        </div>

        <button class="btn btn-primary w-100" onclick="saveSettings()">Save Settings</button>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="Scripts/settings.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/particles.js"></script>
    <script>
        particlesJS("particles-js", {
            particles: {
                number: { value: 80 },
                color: { value: ["#0c68a5", "#4277a2","#99d7cc", "#acb6e5"] },
                shape: { type: "circle" },
                opacity: { value: 0.6 },
                size: { value: 3 },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#99d7cc",
                    opacity: 0.5,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    bounce: false
                }
            },
            interactivity: {
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                },
                modes: {
                    repulse: { distance: 100 },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    </script>
</body>
</html>
