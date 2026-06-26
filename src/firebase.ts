import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "triple-hangout-pjmtp",
  appId: "1:984336169274:web:ecd88064cfb98a0c457803",
  apiKey: "AIzaSyDeCcZL2FqU3OF9yaDFaHAHu1fIadFq-3M",
  authDomain: "triple-hangout-pjmtp.firebaseapp.com",
  storageBucket: "triple-hangout-pjmtp.firebasestorage.app",
  messagingSenderId: "984336169274"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-juicelab-dd508dcc-cb21-42b7-9bd6-d968970e4102");
const auth = getAuth(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab at a a time.
    console.warn("Firestore offline persistence requires only one tab to be open.");
  } else if (err.code === 'unimplemented') {
    // The current browser does not support all of the features required to enable persistence
    console.warn("Firestore offline persistence is not supported in this browser.");
  }
});

export { app, db, auth };
