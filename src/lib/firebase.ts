import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, writeBatch, doc, collection, setDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJXpU_zztkQIUeLP3Ob0rdRcamLZLH-Q4",
  authDomain: "knowlex-afae5.firebaseapp.com",
  projectId: "knowlex-afae5",
  storageBucket: "knowlex-afae5.appspot.com",
  messagingSenderId: "902355489403",
  appId: "1:902355489403:web:0f56a191de9e26d90388de",
  measurementId: "G-QXGK66B5JL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Function to create initial data for a new user
export const createInitialUserData = async (userId: string, email: string) => {
  const batch = writeBatch(db);

  // 1. Create the user profile document
  const userRef = doc(db, 'users', userId);
  batch.set(userRef, { email, role: 'user', createdAt: serverTimestamp() });

  // 2. Default Tasks
  const tasks = [
    { text: 'Complete initial consultation', completed: true },
    { text: 'Draft personal statement', completed: false },
    { text: 'Request recommendation letters', completed: false },
  ];
  tasks.forEach(task => {
    const taskRef = doc(collection(db, 'tasks'));
    batch.set(taskRef, { ...task, userId });
  });

  // 3. Default Documents
  const documents = [
    { text: 'Passport & ID', uploaded: false },
    { text: 'Academic Transcripts', uploaded: false },
    { text: 'Language Test Scores', uploaded: false },
  ];
  documents.forEach(docItem => {
    const docRef = doc(collection(db, 'documents'));
    batch.set(docRef, { ...docItem, userId });
  });

  await batch.commit();
};

export default app;