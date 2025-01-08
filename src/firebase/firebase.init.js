// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDVRN3tiM_mwkzOOMbedEUo_0IAYTs_WPw",
//   authDomain: "food-sharing-dc7c3.firebaseapp.com",
//   projectId: "food-sharing-dc7c3",
//   storageBucket: "food-sharing-dc7c3.firebasestorage.app",
//   messagingSenderId: "952711467376",
//   appId: "1:952711467376:web:02d098a771d719afc8ffb5"
// };

const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;