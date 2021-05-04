import firebase from 'firebase/app'
import "firebase/storage";
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();