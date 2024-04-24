import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyCICsvLbtb5NGq0zCP5UG-FvOxJoGwe3Go",
    authDomain: "losrecuerdosdelaabuela-826a0.firebaseapp.com",
    projectId: "losrecuerdosdelaabuela-826a0",
    storageBucket: "losrecuerdosdelaabuela-826a0.appspot.com",
    messagingSenderId: "965383450774",
    appId: "1:965383450774:web:df3aca52661c18be1b12b7"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)