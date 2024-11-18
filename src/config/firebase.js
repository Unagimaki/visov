import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDWVFHGYDSztaZlzVpK20sFn37q1JQ5NUI",
  authDomain: "gpt-telegram-8ab7d.firebaseapp.com",
  databaseURL: "https://poll-visov.europe-west1.firebasedatabase.app",
  projectId: "gpt-telegram-8ab7d",
  storageBucket: "gpt-telegram-8ab7d.appspot.com",
  messagingSenderId: "695735492546",
  appId: "1:695735492546:web:685082663e30eb60e1405b"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const database = getDatabase(app)
export { auth, database }


