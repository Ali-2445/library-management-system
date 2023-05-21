import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const config = {
  // apiKey: "AIzaSyDEWhmlkC5v7kCs23HowbHDRCl0WsbxBj4",
  // authDomain: "library-c06a0.firebaseapp.com",
  // projectId: "library-c06a0",
  // storageBucket: "library-c06a0.appspot.com",
  // messagingSenderId: "438355591176",
  // appId: "1:438355591176:web:ca314ab320f63bffd311bd",
  // measurementId: "G-D74EDDPT9V",
  apiKey: "AIzaSyCjWR894RpnnXdHPH7vgRGTFsK8nob4B5k",
  authDomain: "library-270ed.firebaseapp.com",
  projectId: "library-270ed",
  storageBucket: "library-270ed.appspot.com",
  messagingSenderId: "618333617992",
  appId: "1:618333617992:web:6c1ce0941c50eda54bfd7d",
};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
