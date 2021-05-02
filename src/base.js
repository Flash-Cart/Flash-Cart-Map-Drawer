import firebase from 'firebase/app'
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // dados da api aqui
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);