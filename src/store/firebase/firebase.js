import firebase from 'firebase/app';

import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAbL2XAGUB_KMVaMr4yWlrTC96qVcL6Kx0",
  authDomain: "where-to-run-svistel.firebaseapp.com",
  databaseURL: "https://where-to-run-svistel.firebaseio.com",
  projectId: "where-to-run-svistel",
  storageBucket: "where-to-run-svistel.appspot.com",
  messagingSenderId: "194357125177",
  appId: "1:194357125177:web:7cd0476d36893b1640ade8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
  storage, firebase as default
}