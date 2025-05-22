<?php
session_start();

// Database connection
$host = 'localhost';
$db = 'student_hub';
$user = 'root'; // Default XAMPP MySQL username
$pass = ''; // Default XAMPP MySQL password (empty)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Get form data
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

// Check if user exists
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    // Successful login
    $_SESSION['loggedin'] = true;
    $_SESSION['email'] = $email;
    header("Location: home.php");
    exit();
} else {
    // Failed login
    $_SESSION['error'] = "Invalid email or password.";
    header("Location: login-signup.php");
    exit();
}
?>