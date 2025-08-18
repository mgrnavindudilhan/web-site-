import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updatePassword,
    updateEmail,
    reauthenticateWithCredential,
    EmailAuthProvider
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

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
const db = getFirestore(app);

// ==================== Authentication Functions ====================

/**
 * Register a new user with additional user data
 * @param {string} name - User's full name
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {Object} additionalData - Additional user data
 * @returns {Promise<Object>} - {success: boolean, user?: Object, error?: string}
 */
export const registerUser = async (name, email, password, additionalData = {}) => {
    try {
        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update user profile with display name
        await updateProfile(userCredential.user, { displayName: name });
        
        // Create user document in Firestore
        const userDocRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userDocRef, {
            uid: userCredential.user.uid,
            displayName: name,
            email: email,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            ...additionalData
        });
        
        return { 
            success: true, 
            user: {
                ...userCredential.user,
                ...additionalData
            } 
        };
    } catch (error) {
        return { 
            success: false, 
            error: error.message 
        };
    }
};

/**
 * Login existing user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} - {success: boolean, user?: Object, error?: string}
 */
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Update last login time in Firestore
        const userDocRef = doc(db, "users", userCredential.user.uid);
        await updateDoc(userDocRef, {
            lastLogin: new Date().toISOString()
        });
        
        return { 
            success: true, 
            user: userCredential.user 
        };
    } catch (error) {
        return { 
            success: false, 
            error: error.message 
        };
    }
};

/**
 * Logout current user
 * @returns {Promise<Object>} - {success: boolean, error?: string}
 */
export const logoutUser = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { 
            success: false, 
            error: error.message 
        };
    }
};

/**
 * Send password reset email
 * @param {string} email - User's email
 * @returns {Promise<Object>} - {success: boolean, error?: string}
 */
export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true };
    } catch (error) {
        return { 
            success: false, 
            error: error.message 
        };
    }
};

/**
 * Update user password
 * @param {Object} user - Firebase user object
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise<Object>} - {success: boolean, error?: string}
 */
export const updateUserPassword = async (user, currentPassword, newPassword) => {
    try {
        // Reauthenticate user
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        
        // Update password
        await updatePassword(user, newPassword);
        return { success: true };
    } catch (error) {
        return { 
            success: false, 
            error: error.message 
        };
    }
};

/**
 * Update user profile (name and email)
 * @param {Object} user - Firebase user object
 * @param {string} displayName - New display name
 * @param {string} email - New email
 * @param {string} currentPassword - Current password for reauthentication
 * @returns {Promise<Object>} - {success: boolean, user?: Object, error?: string}
 */
export const updateUserProfile = async (user, displayName, email, currentPassword) => {
    try {
        // Reauthenticate user if changing email
        if (email !== user.email) {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updateEmail(user, email);
        }
        
        // Update display name
        if (displayName !== user.displayName) {
            await updateProfile(user, { displayName });
        }
        
        // Update Firestore document
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
            displayName,
            email: email || user.email
        });
        
        return { 
            success: true, 
            user: {
                ...user,
                displayName,
                email: email || user.email
            }
        };
    } catch (error) {
        return { 
            success: false, 
            error: error.message 
        };
    }
};

// ==================== User Data Functions ====================

/**
 * Get current user data from Firestore
 * @param {string} uid - User ID
 * @returns {Promise<Object>} - User data object
 */
export const getUserData = async (uid) => {
    try {
        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting user data:", error);
        return null;
    }
};

/**
 * Get current authenticated user
 * @returns {Object|null} - Firebase user object or null
 */
export const getCurrentUser = () => {
    return auth.currentUser;
};

// ==================== Auth State Listener ====================

/**
 * Initialize auth state listener
 * @param {function} callback - Function to call when auth state changes
 * @returns {function} - Unsubscribe function
 */
export const initAuthListener = (callback) => {
    return onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Get additional user data from Firestore
            const userData = await getUserData(user.uid);
            callback({
                ...user,
                ...userData
            });
        } else {
            callback(null);
        }
    });
};

// ==================== UI Integration ====================

/**
 * Initialize auth UI elements
 * @param {Object} elements - DOM elements
 * @param {function} onAuthChange - Callback when auth state changes
 */
export const initAuthUI = (elements = {}, onAuthChange = null) => {
    const {
        loginLink,
        registerLink,
        logoutLink,
        userName,
        profileLink
    } = elements;
    
    // Initialize auth state listener
    const unsubscribe = initAuthListener((user) => {
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
        
        // Call additional callback if provided
        if (onAuthChange) {
            onAuthChange(user);
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
    
    // Return unsubscribe function
    return unsubscribe;
};
