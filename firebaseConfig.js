import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyAxbhX8-JmJ92u_tvN9KhXkNw069LhIFQk",
    authDomain: "projectdidong-470db.firebaseapp.com",
    databaseURL: "https://projectdidong-470db-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "projectdidong-470db",
    storageBucket: "projectdidong-470db.firebasestorage.app",
    messagingSenderId: "861972738843",
    appId: "1:861972738843:web:5a174916b15db833cf59be",

};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

const realtimeDB = getDatabase(app);

const storage = getStorage(app);

export { auth, db, realtimeDB, storage };
export default app;