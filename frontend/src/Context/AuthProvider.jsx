// Import React and the Hooks we need here
import React, { useState, useEffect, useContext, createContext } from "react";
const AuthContext =createContext();
import services from "../Services/Services.service";
import  getAuth  from "../Components/Utils/auth";

export const useAuth = () => {
  return useContext(AuthContext);
};
// Create a provider component
export const AuthProvider = ({ children }) => {
 
  const [serviceDatas, setServiceDatas] = useState([]);
 const [isLogged, setIsLogged] = useState(false);
 const [isAdmin, setIsAdmin] = useState(false);
 const [employee, setEmployee] = useState(null);
   

  // for both servies page and final order pages
  const fetchDatas = () => {

    services.getAllServcies().then((res) =>
      res.json().then((data) => {
        setServiceDatas(data.data.slice(0,8));
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
    isLogged,
    setIsLogged,
    isAdmin,
    setIsAdmin,
    employee,
   
   
  };
    console.log(employee);
   useEffect(() => {
     // Retrieve the logged in user from local storage
     const loggedInEmployee = getAuth();
     // console.log(loggedInEmployee);
     loggedInEmployee.then((response) => {
       // console.log(response);
       if (response.employee_token) {
         setIsLogged(true);
         // 3 is the employee_role for admin
         if (response.employee_role === 3) {
           setIsAdmin(true);
         }
         setEmployee(response);
       }
     });
   }, []);

  

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
