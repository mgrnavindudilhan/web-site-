<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD42ySRBUHcyzBOpkuYqsUv3IGSvvLxJG8",
    authDomain: "big-3f919.firebaseapp.com",
    projectId: "big-3f919",
    storageBucket: "big-3f919.firebasestorage.app",
    messagingSenderId: "154450195458",
    appId: "1:154450195458:web:3bd3d6551ce87893a8631b",
    measurementId: "G-YSVHLT9FC9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
