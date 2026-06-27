import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
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

export { app, db, auth };
