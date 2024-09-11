import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import { Alert } from "react-native";


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


export const addDataToDb = async (userInfo: any) => {
  const { fare, pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude, vehicle, distance } = userInfo;

  try {
    const docRef = await addDoc(collection(db, "User_Data"), {
      fare: fare,
      pickupLatitude: pickupLatitude,
      pickupLongitude: pickupLongitude,
      dropoffLatitude: dropoffLatitude,
      dropoffLongitude: dropoffLongitude,
      vehicle: vehicle,
      distance: distance
    });

    // Show success alert
    Alert.alert("Success", "Data has been added to the database successfully!");
  } catch (error) {
    // Show error alert
    Alert.alert("Error", "There was an issue adding the data. Please try again.");
    console.error("Error adding document: ", error);
  }
};