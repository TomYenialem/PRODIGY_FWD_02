// Import React and the Hooks we need here
import React, { useState, useEffect, useContext, createContext } from "react";
const AuthContext =createContext();
import services from "../Services/Services.service";

export const useAuth = () => {
  return useContext(AuthContext);
};
// Create a provider component
export const AuthProvider = ({ children }) => {
 
  const [serviceDatas, setServiceDatas] = useState([]);


  // for both servies page and final order pages
  const fetchDatas = () => {
    services.getAllServcies().then((res) =>
      res.json().then((data) => {
        setServiceDatas(data.data);
      })
    );
  };
  useEffect(() => {
    fetchDatas();
  }, []);

  

  const value = {
   
    serviceDatas,
    setServiceDatas,
    fetchDatas,
   
   
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
