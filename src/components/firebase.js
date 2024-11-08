import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCd9KWokYgDeJPx4ODCCpa0Cpcd2Bf0Kfk",
    authDomain: "yts-clone-d1ac0.firebaseapp.com",
    projectId: "yts-clone-d1ac0",
    storageBucket: "yts-clone-d1ac0.appspot.com", 
    messagingSenderId: "91099039839",
    appId: "1:91099039839:web:2b4f7b34eb1bc76cbd33ea",
    measurementId: "G-GR9C7G8V8D"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log("Firebase App initialized:", app.name); 
export { auth };
