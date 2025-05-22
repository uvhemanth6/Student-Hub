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
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';
$confirm_password = isset($_POST['confirm_password']) ? $_POST['confirm_password'] : '';

// Validate form data
$errors = [];

if (empty($name)) {
    $errors[] = "Name is required.";
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Invalid email address.";
}

if (strlen($password) < 6) {
    $errors[] = "Password must be at least 6 characters long.";
}

if ($password !== $confirm_password) {
    $errors[] = "Passwords do not match.";
}

// Check if email already exists
$stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->fetchColumn() > 0) {
    $errors[] = "Email already exists.";
}

// If there are errors, redirect back with error message
if (!empty($errors)) {
    $_SESSION['error'] = implode("<br>", $errors);
    header("Location: login-signup.php");
    exit();
}

// Hash the password and save the user
$hashed_password = password_hash($password, PASSWORD_BCRYPT);
$stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
$stmt->execute([$name, $email, $hashed_password]);

// Redirect to login page with success message
$_SESSION['success'] = "Signup successful! Please log in.";
header("Location: login-signup.php");
exit();
?>