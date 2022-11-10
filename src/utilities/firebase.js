import { useCallback, useEffect, useState } from 'react';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, signInWithCredential, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { connectDatabaseEmulator } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyDeXyI8AKOh3VzAkNPLyVvMXT-F-GMmcaQ",
    authDomain: "cs397-react-app-vite.firebaseapp.com",
    projectId: "cs397-react-app-vite",
    storageBucket: "cs397-react-app-vite.appspot.com",
    messagingSenderId: "90392073506",
    appId: "1:90392073506:web:cfbd2f84665ee33de7417b",
    measurementId: "G-F4TMSGW235"
  };

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const database = getDatabase(firebase);

if (!window.EMULATION && import.meta.env.VITE_EMULATE) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000);
  console.log("connected");
  console.log(database); 

  signInWithCredential(auth,GoogleAuthProvider.credential(
    '{"sub": "fJBGrLtGB6BnDf4fh0E7CJuzIjKi", "email": "raucervan@gmail.com", "displayName":"rc","email_verified": true}'
  ));

  window.EMULATION = true;
}



export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  console.log(path); 
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();
  
  useEffect(() => (
    onAuthStateChanged(getAuth(firebase), setUser)
  ), []);

  return [user];
};

