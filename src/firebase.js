import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

initializeApp({
    apiKey: "AIzaSyBE7po0LlPyaeGjmKcBCh5n5sBy-Sk5690",
    authDomain: "ne-beri-vinchik.firebaseapp.com",
    databaseURL: "https://ne-beri-vinchik-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ne-beri-vinchik",
    storageBucket: "ne-beri-vinchik.appspot.com",
    messagingSenderId: "147872825140",
    appId: "1:147872825140:web:6ae81cc39de848538cef61",
    measurementId: "G-DYFL6W6H5C"
})

const db = getFirestore()
export default db

