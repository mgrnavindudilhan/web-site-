import { 
  getAuth, 
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Initialize Firebase Auth
const auth = getAuth();

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const loginBtn = document.getElementById('loginBtn');
  const errorElement = document.getElementById('loginError');

  // UI යාවත්කාලීන කිරීම
  loginBtn.disabled = true;
  loginBtn.textContent = 'Logging in...';
  errorElement.style.display = 'none';

  try {
    // පිවිසුම් උත්සාහ කරන්න
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Debugging තොරතුරු
    console.log("පිවිසුම සාර්ථකයි:", userCredential.user);
    console.log("Email සත්‍යාපනය කර ඇත්තේද?", userCredential.user.emailVerified);
    
    // Email සත්‍යාපනය පරීක්ෂා කරන්න
    if (!userCredential.user.emailVerified) {
      alert('ඔබගේ ඊමේල් ලිපිනය තවම සත්‍යාපනය කර නැත. ඔබගේ ඊමේල් එකේ එවන ලද සත්‍යාපන ලිපිය පරීක්ෂා කරන්න.');
      await signOut(auth);
      return;
    }
    
    // සාර්ථක පිවිසුමෙන් පසු යළි-යොමුව
    window.location.href = 'index.html';
  } catch (error) {
    // දෝෂ සැකසුම
    console.error("පිවිසුම් දෝෂය:", error.code, error.message);
    
    let errorMessage = error.message;
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'මෙම ඊමේල් ලිපිනය සමඟ ගිණුමක් නැත';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'වැරදි මුරපදය';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'බොහෝ උත්සාහයන්. කරුණාකර පසුව උත්සාහ කරන්න';
    }
    
    errorElement.textContent = errorMessage;
    errorElement.style.display = 'block';
    
    // UI යළි සකසන්න
    loginBtn.disabled = false;
    loginBtn.textContent = 'Login';
  }
});

// පවතින පිවිසුම් තත්ත්වය පරීක්ෂා කරන්න
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("පරිශීලකයා දැනටමත් පිවිසුණු අයෙක්:", user.email);
    window.location.href = 'index.html';
  }
});
