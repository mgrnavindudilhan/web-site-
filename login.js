import { 
  getAuth, 
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const auth = getAuth();

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const loginBtn = document.getElementById('loginBtn');
  const errorElement = document.getElementById('loginError');

  // Reset UI
  loginBtn.disabled = true;
  loginBtn.textContent = 'Logging in...';
  errorElement.style.display = 'none';

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Debugging
    console.log("User logged in:", userCredential.user);
    
    // Check if email is verified
    if (!userCredential.user.emailVerified) {
      alert('Please verify your email before logging in.');
      await signOut(auth);
      return;
    }
    
    // Redirect after successful login
    window.location.href = 'index.html';
  } catch (error) {
    // Handle specific errors
    let errorMessage = error.message;
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email.';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password.';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many attempts. Try again later.';
    }
    
    // Show error
    errorElement.textContent = errorMessage;
    errorElement.style.display = 'block';
    
    // Reset button
    loginBtn.disabled = false;
    loginBtn.textContent = 'Login';
    
    // Debugging
    console.error("Login error:", error.code, error.message);
  }
});

// Check auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User already logged in:", user.email);
    window.location.href = 'index.html';
  }
});
