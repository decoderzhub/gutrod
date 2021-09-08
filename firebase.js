import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyBpbC-XabbDgeQhXQYlCT-NnVT3Nyi-UJ4",
  authDomain: "footbread-whatsapp.firebaseapp.com",
  projectId: "footbread-whatsapp",
  storageBucket: "footbread-whatsapp.appspot.com",
  messagingSenderId: "1069255510891",
  appId: "1:1069255510891:web:addcb594a96f8fd8da1a2e"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
