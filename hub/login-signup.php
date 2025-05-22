<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Signup Form</title>
  <link rel="stylesheet" href="./Styles/login-signup.css">
</head>
<body>
<div class="wrapper">
      <div class="title-text">
        <div class="title login">Login Form</div>
        <div class="title signup">Signup Form</div>
      </div>
      <div class="form-container">
        <div class="slide-controls">
          <input type="radio" name="slide" id="login" checked>
          <input type="radio" name="slide" id="signup">
          <label for="login" class="slide login">Login</label>
          <label for="signup" class="slide signup">Signup</label>
          <div class="slider-tab"></div>
        </div>
        <div class="form-inner">
          <form action="login.php" method="POST" class="login">
            <pre>
            </pre>
            <!-- Display error message if exists -->
            <?php
            session_start();
            if (isset($_SESSION['error'])) {
                echo '<div style="color: red; text-align: center; margin-bottom: 10px;">' . $_SESSION['error'] . '</div>';
                unset($_SESSION['error']); // Clear the error after displaying
            }
            ?>
            <!-- Display success message if exists -->
            <?php
            if (isset($_SESSION['success'])) {
                echo '<div style="color: green; text-align: center; margin-bottom: 10px;">' . $_SESSION['success'] . '</div>';
                unset($_SESSION['success']); // Clear the success message after displaying
            }
            ?>
            <div class="field">
              <input type="text" name="email" placeholder="Email Address" required>
            </div>
            <div class="field">
              <input type="password" name="password" placeholder="Password" required>
            </div>
            <div class="pass-link"><a href="#">Forgot password?</a></div>
            <div class="field btn">
              <div class="btn-layer"></div>
              <input type="submit" value="Login">
            </div>
            <div class="signup-link">Create an account <a href="">Signup now</a></div>
            <div class="logo-container">
              <img src="./Images/logo.jpg" alt="Logo" class="logo">
            </div>
          </form>
          <form action="signup.php" method="POST" class="signup">
            <div class="field">
              <input type="text" name="name" placeholder="Name" required>
            </div>
            <div class="field">
              <input type="text" name="email" placeholder="Email Address" required>
            </div>
            <div class="field">
              <input type="password" name="password" placeholder="Password" required>
            </div>
            <div class="field">
              <input type="password" name="confirm_password" placeholder="Confirm password" required>
            </div>
            <div class="field btn">
              <div class="btn-layer"></div>
              <input type="submit" value="Signup">
            </div>
            <div class="signup-link">Already have an account? <a href="">Login</a></div>
          </form>
        </div>
      </div>
    </div>
  <script src="./Scripts/login-signup.js"></script>
</body>
</html>