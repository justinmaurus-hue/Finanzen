import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


 const firebaseConfig = {
    apiKey: "AIzaSyBvi3-K3LhOEyZzT_f5AlhBNDro6mnzN28",
    authDomain: "finanzen-db874.firebaseapp.com",
    projectId: "finanzen-db874",
    storageBucket: "finanzen-db874.firebasestorage.app",
    messagingSenderId: "394767875296",
    appId: "1:394767875296:web:6175256bf961c0f6d26485"
  };



const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
