const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

signupBtn.onclick = (() => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});

loginBtn.onclick = (() => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});

signupLink.onclick = (() => {
  signupBtn.click();
  return false;
});
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".form-inner .login");
  const signupForm = document.querySelector(".form-inner .signup");

  function showError(input, message) {
    let errorSpan = input.nextElementSibling;
    if (!errorSpan || !errorSpan.classList.contains("error-message")) {
      errorSpan = document.createElement("span");
      errorSpan.className = "error-message";
      input.parentElement.appendChild(errorSpan);
    }
    errorSpan.textContent = message;
    errorSpan.style.color = "red";
    errorSpan.style.display = "block";
    errorSpan.style.marginTop = "5px";
  }

  function clearError(input) {
    let errorSpan = input.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains("error-message")) {
      errorSpan.remove();
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Real-time validation for login form inputs
  function setupLoginRealtimeValidation() {
    const emailInput = loginForm.querySelector("input[placeholder='Email Address']");
    const passwordInput = loginForm.querySelector("input[placeholder='Password']");

    emailInput.addEventListener("input", function () {
      if (isValidEmail(this.value)) {
        clearError(this);
      }
    });

    passwordInput.addEventListener("input", function () {
      if (this.value.length >= 6) {
        clearError(this);
      }
    });
  }

  // Real-time validation for signup form inputs
  function setupSignupRealtimeValidation() {
    const nameInput = signupForm.querySelector("input[placeholder='Name']");
    const emailInput = signupForm.querySelector("input[placeholder='Email Address']");
    const passwordInput = signupForm.querySelector("input[placeholder='Password']");
    const confirmPasswordInput = signupForm.querySelector("input[placeholder='Confirm password']");

    nameInput.addEventListener("input", function () {
      if (this.value.trim() !== "") {
        clearError(this);
      }
    });

    emailInput.addEventListener("input", function () {
      if (isValidEmail(this.value)) {
        clearError(this);
      }
    });

    passwordInput.addEventListener("input", function () {
      if (this.value.length >= 6) {
        clearError(this);
      }
    });

    confirmPasswordInput.addEventListener("input", function () {
      if (this.value === passwordInput.value && this.value !== "") {
        clearError(this);
      }
    });
  }

  function validateLoginForm(event) {
    let isValid = true;
    const emailInput = loginForm.querySelector("input[placeholder='Email Address']");
    const passwordInput = loginForm.querySelector("input[placeholder='Password']");

    clearError(emailInput);
    clearError(passwordInput);

    if (!isValidEmail(emailInput.value)) {
      showError(emailInput, "Invalid email address.");
      isValid = false;
    }

    if (passwordInput.value.length < 6) {
      showError(passwordInput, "Password must be at least 6 characters long.");
      isValid = false;
    }

    if (!isValid) {
      event.preventDefault();
    }
  }

  function validateSignupForm(event) {
    let isValid = true;
    const nameInput = signupForm.querySelector("input[placeholder='Name']");
    const emailInput = signupForm.querySelector("input[placeholder='Email Address']");
    const passwordInput = signupForm.querySelector("input[placeholder='Password']");
    const confirmPasswordInput = signupForm.querySelector("input[placeholder='Confirm password']");

    clearError(nameInput);
    clearError(emailInput);
    clearError(passwordInput);
    clearError(confirmPasswordInput);

    if (nameInput.value.trim() === "") {
      showError(nameInput, "Name cannot be empty.");
      isValid = false;
    }

    if (!isValidEmail(emailInput.value)) {
      showError(emailInput, "Invalid email address.");
      isValid = false;
    }

    if (passwordInput.value.length < 6) {
      showError(passwordInput, "Password must be at least 6 characters long.");
      isValid = false;
    }

    if (confirmPasswordInput.value !== passwordInput.value) {
      showError(confirmPasswordInput, "Passwords do not match.");
      isValid = false;
    }

    if (!isValid) {
      event.preventDefault();
    }
  }

  loginForm.addEventListener("submit", validateLoginForm);
  signupForm.addEventListener("submit", validateSignupForm);
  setupLoginRealtimeValidation();
  setupSignupRealtimeValidation();
});