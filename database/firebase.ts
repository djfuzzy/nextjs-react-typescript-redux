import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/performance';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

if (process.env.NODE_ENV !== 'test' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);

  if (typeof window !== 'undefined') {
    if ('measurementId' in firebaseConfig) {
      firebase.analytics();
      firebase.performance();
    }
  }

  try {
    firebase.auth().signInAnonymously();
  } catch (error) {
    // TODO: Do something with error
    console.log(error);
  }
}

export default firebase;
