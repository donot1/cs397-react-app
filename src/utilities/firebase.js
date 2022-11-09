import { useCallback, useEffect, useState } from 'react';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { initializeApp } from 'firebase/app';

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
const database = getDatabase(firebase);

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
  console.log("DB UPDATE PRINTING");
  console.log(path); 
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};
