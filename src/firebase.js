import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/messaging';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
const messaging = firebase.messaging();
const messagingConfig = {vapidKey: process.env.REACT_APP_VAPID_KEY};
const publicKey = messagingConfig;

export const getToken = async (setTokenFound) => {
  let currentToken = "";
  console.log(publicKey)
  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    if (currentToken) {
      console.log("currentToken is TRUE")
      setTokenFound(true);
    } else {
      console.log("currentToken is FALSE")
      setTokenFound(false);
    }
  } catch(error) {
    console.log("An error occurred while retrieving token. ", error);
  }

  return currentToken;
}

// export const onMessageListner = () => {
//   new Promise( resolve => {
//     messaging.onMessage( payload => resolve(payload));
//   });
// }

export { auth, firestore }