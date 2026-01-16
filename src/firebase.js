import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBpZXKoC0JVsZA0w9mohUIMCABRbHUEpxE",
  authDomain: "rushlimit-fb7be.firebaseapp.com",
  databaseURL: "https://rushlimit-fb7be-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rushlimit-fb7be",
  storageBucket: "rushlimit-fb7be.firebasestorage.app",
  messagingSenderId: "265548040753",
  appId: "1:265548040753:web:3729c4f46d47c52e1ae310"
};


 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);


