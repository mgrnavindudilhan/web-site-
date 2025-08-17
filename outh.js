// ලොගින් පෝරමය
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // පරිශීලකයා පිවිසවීම
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "admin-dashboard.html"; // සාර්ථක විට යොමුව
        })
        .catch((error) => {
            document.getElementById('errorMsg').textContent = "දෝෂය: " + error.message;
        });
});

// පරිශීලක සැසි පරීක්ෂා කිරීම
auth.onAuthStateChanged((user) => {
    if (user) {
        // පරිශීලකයා දැනටමත් පිවිසී ඇති නම්
        if (window.location.pathname.includes('login.html')) {
            window.location.href = "admin-dashboard.html";
        }
    } else {
        // පරිශීලකයා පිවිසී නැති නම්
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = "login.html";
        }
    }
});
