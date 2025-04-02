import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import PulseLoader from "react-spinners/ClipLoader";

import loginService from "../../Services/login.Service";
import { motion } from "framer-motion";

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    let valid = true;

    if (!employee_email) {
      setEmailError("Please enter your email address first");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(employee_email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      setLoading(false);
      return;
    }

    const formData = { employee_email, employee_password };
    const loginEmployee = loginService.logIn(formData);

    loginEmployee
      .then((response) => {
        if (response.status === "success") {
          if (response.data.employee_token) {
            localStorage.setItem("employee", JSON.stringify(response.data));
          }
          location.pathname === "/login"
            ? window.location.replace("/")
            : window.location.reload();
        } else {
          setServerError(response.message);
        }
      })
      .catch((err) =>
        setServerError("An error occurred. Please try again later." + err)
      )
      .finally(() => setLoading(false));
  };
  
function guestLogin() {
  setEmail("helu@gmail.com");
  setPassword("12345678");

  const userConfirmed = window.confirm(
    "YOU HAVE LIMITED ACCESS TO THE ADMIN PANEL. Do you want to continue?"
  );

  if (userConfirmed) {
    setTimeout(() => {
      handleSubmit(new Event("submit")); // Manually trigger the login
    }, 100); // Slight delay to allow state update
  }
}


  return (
    <motion.div
      className=" h-[300px] w-[500px] mx-auto gap-9 p-4 px-3 mt-9"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 w-full mt-24">
        <h1 className="text-green-600 text-xl font-bold mb-4">
          Login to Your Account
        </h1>
        {serverError && (
          <p className="text-red-500 text-sm mt-1 mb-3 ">{serverError}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="employee_email"
              value={employee_email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              className="w-full text-black p-3 border border-green-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="employee_password"
              value={employee_password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="w-full p-3 border text-black  border-gray-00 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all"
          >
            {loading ? (
              <span className="flex justify-center items-center">
                <PulseLoader size={10} color={"#fff"} />
              </span>
            ) : (
              "Login"
            )}
          </button>
          <button className="px-3 py-1 bg-red-600 text-white">
            <span onClick={guestLogin}>Guest Login</span>
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default LoginForm;
