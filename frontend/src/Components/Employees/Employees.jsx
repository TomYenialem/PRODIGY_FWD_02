import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import employeeService from "../../Services/employee.service";
import { useAuth } from "../../Context/AuthProvider";
import toast from "react-hot-toast";

function Employees() {
  const navigate = useNavigate();
  const {isAdmin}=useAuth()

  // State management
  const [formData, setFormData] = useState({
    employee_email: "",
    employee_first_name: "",
    employee_last_name: "",
    employee_phone: "",
    employee_password: "",
    active_employee: 1,
    company_role_id: 1, // Default to Doctor
  });

  // Error handling state
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);


  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "company_role_id" ? Number(value) : value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setServerError(""); 
  if(!isAdmin) {
    toast.error("You are not authorized to add an employee.");
    setLoading(false);
    return;
  }

  try {
    if (formData.employee_password.length < 8) {
      setServerError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    const response = await employeeService.createEmployee({
      ...formData,
      active_employee: Number(formData.active_employee),
      company_role_id: Number(formData.company_role_id),
    });

    // If backend response contains an error
    if (response && response.error) {
      setServerError(response.data.error);
      setLoading(false);
      return;
    }

    navigate("/employee");
  } catch (error) {
    console.error("❌ Request Error:", error);

    // Extract error message properly
    if (error.response && error.response.data && error.response.data.error) {
      setServerError(error.response.data.error); 
    } else if (error.message) {
      setServerError(error.message);
    } else {
      setServerError("An unexpected error occurred. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};




  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gray-800 bg-opacity-50 backdrop-blur-md md:p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="w-[300px] sm:w-[500px] bg-gray-800 text-white border border-gray-700 rounded-lg p-6">
        <h1 className="text-xl font-semibold mb-6 text-start text-green-600">
          Add Employee
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {serverError && (
            <p className="text-red-500 text-center">{serverError}</p>
          )}

          <input
            type="text"
            name="employee_first_name"
            placeholder="Enter First Name"
            value={formData.employee_first_name}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />

          {/* Last Name */}
          <input
            type="text"
            name="employee_last_name"
            placeholder="Enter Last Name"
            value={formData.employee_last_name}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />

          {/* Email */}
          <input
            type="email"
            name="employee_email"
            required
            placeholder="Enter Email"
            value={formData.employee_email}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />

          {/* Role Selection */}
          <select
            name="company_role_id"
            required
            value={formData.company_role_id}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-400 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={1}>Doctor</option>
            <option value={2}>Nurse</option>
            <option value={3}>Admin</option>
          </select>

          {/* Phone Number */}
          <input
            type="text"
            name="employee_phone"
            required
            placeholder="Enter Phone Number"
            value={formData.employee_phone}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />

          {/* Password */}
          <input
            type="password"
            name="employee_password"
            required
            placeholder="Enter Password"
            value={formData.employee_password}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="px-10 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 transition duration-300 focus:ring focus:ring-green-300"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Employees;
