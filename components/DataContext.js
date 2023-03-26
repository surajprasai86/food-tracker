import React, { createContext, useState, useEffect } from "react";
import firebase from "firebase/app";
import {auth} from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import foodData from "../data/data.json";
import userFoodConsumptionDetails from "../data/userFoodConsumptionDetails.json"
import nutrientsPerFood from "../data/nutrientsPerFood.json"

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
//   const [data, setData] = useState([]);
  const [user, loading, error]  = useAuthState(auth)
  const [authState, setAuthState] = useState({});


  useEffect(() => {
    // Fetch data here and set the state
    
    // fetchData();

    // Set up Firebase authentication state listener
      if (user) {
        setAuthState({ user });
      } else {
        setAuthState({});
      }

    return () => {
      // authListener();
    };
  }, []);

  return (
    <DataContext.Provider value={{ foodData, authState, setAuthState, userFoodConsumptionDetails, nutrientsPerFood,  user }}>
      {children}
    </DataContext.Provider>
  );
};
