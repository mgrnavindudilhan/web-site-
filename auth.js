import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBzl3oLWOzR9O0GI4mZk3kuuyZZZFS87wA",
  authDomain: "big-lanka.firebaseapp.com",
  projectId: "big-lanka",
  storageBucket: "big-lanka.appspot.com",
  messagingSenderId: "762029695088",
  appId: "1:762029695088:web:aba5cb07ba4e6b800c94b5",
  measurementId: "G-JBT2MC7ZPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Registration Function
if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const name = document.getElementById('registerName').value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name
      });
      alert('Registration successful!');
      window.location.href = 'index.html';
    } catch (error) {
      alert('Error: ' + error.message);
    }
  });
}

// Login Function
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = 'index.html';
    } catch (error) {
      alert('Error: ' + error.message);
    }
  });
}

// Auth State Listener (for all pages)
onAuthStateChanged(auth, (user) => {
  const loginLink = document.getElementById('loginLink');
  const registerLink = document.getElementById('registerLink');
  const logoutLink = document.getElementById('logoutLink');
  const userName = document.getElementById('userName');

  if (user) {
    // User is logged in
    if (loginLink) loginLink.style.display = 'none';
    if (registerLink) registerLink.style.display = 'none';
    if (logoutLink) logoutLink.style.display = 'inline';
    if (userName) {
      userName.style.display = 'inline';
      userName.textContent = user.displayName || user.email;
    }
  } else {
    // User is logged out
    if (loginLink) loginLink.style.display = 'inline';
    if (registerLink) registerLink.style.display = 'inline';
    if (logoutLink) logoutLink.style.display = 'none';
    if (userName) userName.style.display = 'none';
  }
});

// Logout Function
if (document.getElementById('logoutLink')) {
  document.getElementById('logoutLink').addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      window.location.href = 'index.html';
    } catch (error) {
      alert('Error signing out: ' + error.message);
    }
  });
}
