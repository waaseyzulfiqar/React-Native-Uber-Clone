import { initializeApp } from "firebase/app";
import { collection, query, where, onSnapshot, getFirestore, doc, updateDoc, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD20P3W0sWy-8KM1lMoP_40LYhuA9SVlXI",
  authDomain: "uber-clone-82727.firebaseapp.com",
  projectId: "uber-clone-82727",
  storageBucket: "uber-clone-82727.appspot.com",
  messagingSenderId: "125266475510",
  appId: "1:125266475510:web:e5290f0b72f45e87e06fd7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const addDataToDb = (ride: any) => {
  return addDoc(collection(db, "Ride"), ride);
};

export{
  query, where, onSnapshot,doc, updateDoc,db, collection 
}