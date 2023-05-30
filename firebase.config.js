
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
export const firebaseConfig = {
  apiKey: "AIzaSyA6IPcFldp7J8bandrBDy3rCrixsdPAFts",
  authDomain: "focusflow-4eb15.firebaseapp.com",
  databaseURL: "https://focusflow-4eb15-default-rtdb.firebaseio.com",
  projectId: "focusflow-4eb15",
  storageBucket: "focusflow-4eb15.appspot.com",
  messagingSenderId: "713746266423",
  appId: "1:713746266423:web:0102190e54ad9499bac2b2",
  measurementId: "G-0GWBF9LNH7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

 export{
    app,auth,db
 }