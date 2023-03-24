
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDv5Ttg5iO2-R8sUnDtpAtAIm5i2pyj6Hg",
  authDomain: "food-guide-27977.firebaseapp.com",
  projectId: "food-guide-27977",
  storageBucket: "food-guide-27977.appspot.com",
  messagingSenderId: "681519160205",
  appId: "1:681519160205:web:de58b91c633c9855e23bc4",
  measurementId: "G-WFEMN4K7G6"
};


// const app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

