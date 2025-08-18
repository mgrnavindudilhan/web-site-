import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBzl3oLWOzR9O0GI4mZk3kuuyZZZFS87wA",
    authDomain: "big-lanka.firebaseapp.com",
    projectId: "big-lanka",
    storageBucket: "big-lanka.appspot.com",
    messagingSenderId: "762029695088",
    appId: "1:762029695088:web:aba5cb07ba4e6b800c94b5",
    measurementId: "G-JBT2MC7ZPF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ==================== Authentication Functions ====================

/**
 * Register a new user
 * @param {string} name - User's full name
 * @param {string} email - User's email
 * @param {string} password - User's password (min 6 chars)
 * @returns {Promise<void>}
 */
export const registerUser = async (name, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

/**
 * Login existing user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<void>}
 */
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

/**
 * Logout current user
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

/**
 * Send password reset email
 * @param {string} email - User's email
 * @returns {Promise<void>}
 */
export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

/**
 * Get current user data
 * @returns {Object|null} Current user object or null if not logged in
 */
export const getCurrentUser = () => {
    return auth.currentUser;
};

// ==================== Auth State Listener ====================

/**
 * Initialize auth state listener
 * @param {function} callback - Function to call when auth state changes
 */
export const initAuthListener = (callback) => {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
};

// ==================== UI Integration ====================

/**
 * Initialize auth UI elements
 * @param {Object} elements - DOM elements
 */
export const initAuthUI = (elements = {}) => {
    const {
        loginLink,
        registerLink,
        logoutLink,
        userName,
        profileLink
    } = elements;

    initAuthListener((user) => {
        if (user) {
            // User is logged in
            if (loginLink) loginLink.style.display = 'none';
            if (registerLink) registerLink.style.display = 'none';
            if (logoutLink) logoutLink.style.display = 'inline';
            if (userName) {
                userName.style.display = 'inline';
                userName.textContent = user.displayName || user.email;
            }
            if (profileLink) profileLink.style.display = 'inline';
        } else {
            // User is logged out
            if (loginLink) loginLink.style.display = 'inline';
            if (registerLink) registerLink.style.display = 'inline';
            if (logoutLink) logoutLink.style.display = 'none';
            if (userName) userName.style.display = 'none';
            if (profileLink) profileLink.style.display = 'none';
        }
    });

    // Add logout functionality if logout link exists
    if (logoutLink) {
        logoutLink.addEventListener('click', async (e) => {
            e.preventDefault();
            const { success, error } = await logoutUser();
            if (!success) {
                console.error('Logout error:', error);
                alert('Error signing out: ' + error);
            }
        });
                                   }
};
