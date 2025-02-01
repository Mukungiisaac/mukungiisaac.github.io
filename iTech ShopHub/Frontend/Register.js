// register.js

// Handle form submission
document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
  
    // Error message elements
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const confirmPasswordError = document.getElementById("confirm-password-error");
  
    let isValid = true;
  
    // Clear previous errors
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
  
    // Validate name
    if (name.trim() === "") {
      nameError.textContent = "Full name is required.";
      isValid = false;
    }
  
    // Validate email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailPattern)) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }
  
    // Validate password
    if (password.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters long.";
      isValid = false;
    }
  
    // Validate confirm password
    if (password !== confirmPassword) {
      confirmPasswordError.textContent = "Passwords do not match.";
      isValid = false;
    }
  
    // If form is valid, simulate submission
    if (isValid) {
      alert(`Registration successful!\nName: ${name}\nEmail: ${email}`);
      // Perform actual registration logic here, e.g., send data to a server
    }
  });
  