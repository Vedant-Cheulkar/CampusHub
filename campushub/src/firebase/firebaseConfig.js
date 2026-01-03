import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCIOPMBeFbbo5wjhksvjTXSB7jcJHrOSNI",
    authDomain: "campushub-40146.firebaseapp.com",
    projectId: "campushub-40146",
    storageBucket: "campushub-40146.firebasestorage.app",
    messagingSenderId: "392585521090",
    appId: "1:392585521090:web:28213714f18af9aa25985b",
    measurementId: "G-47WX2SKSF5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);




// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCIOPMBeFbbo5wjhksvjTXSB7jcJHrOSNI",
//   authDomain: "campushub-40146.firebaseapp.com",
//   projectId: "campushub-40146",
//   storageBucket: "campushub-40146.firebasestorage.app",
//   messagingSenderId: "392585521090",
//   appId: "1:392585521090:web:28213714f18af9aa25985b",
//   measurementId: "G-47WX2SKSF5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);