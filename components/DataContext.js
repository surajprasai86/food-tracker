import React, { createContext, useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [authState, setAuthState] = useState({});

  useEffect(() => {
    // Fetch data here and set the state
    const fetchData = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      setData(data);
    };
    // fetchData();

    // Set up Firebase authentication state listener
    const authListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthState({ user });
      } else {
        setAuthState({});
      }
    });

    return () => {
      authListener();
    };
  }, []);

  return (
    <DataContext.Provider value={{ data, authState, setAuthState }}>
      {children}
    </DataContext.Provider>
  );
};
