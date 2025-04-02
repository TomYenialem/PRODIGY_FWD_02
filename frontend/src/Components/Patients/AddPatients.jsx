import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import customers from "../../Services/AddPatient.service";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Context/AuthProvider";

function AddUsers() {
  const { isAdmin } = useAuth();
  const [formData, setFormData] = useState({
    customer_email: "",
    customer_first_name: "",
    customer_last_name: "",
    customer_phone_number: "",
    active_customer_status: 1,
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [serverError, setServerError] = useState("");

  const resetForm = () => {
    setFormData({
      customer_email: "",
      customer_first_name: "",
      customer_last_name: "",
      customer_phone_number: "",
      active_customer_status: 1,
    });
    setEmailError("");
    setFirstNameRequired("");
    setServerError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear errors when user starts typing
    if (name === "customer_email" && emailError) setEmailError("");
    if (name === "customer_first_name" && firstNameRequired)
      setFirstNameRequired("");
  };

  const validateForm = () => {
    let valid = true;

    if (!formData.customer_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }

    if (!formData.customer_email) {
      setEmailError("Email is required");
      valid = false;
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(formData.customer_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isAdmin) {
      toast.error("You must be an admin to access this page.");
      setLoading(false);
      return;
    }

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await customers.addCustomers(formData);
      const data = await response.json();

      if (data.error) {
        setServerError(data.error);
        toast.error(data.error);
      } else {
        toast.success(data.message || "Patient added successfully");
        resetForm();
        navigate("/users");
      }
    } catch (error) {
      console.error("Error adding patient:", error);
      const errorMsg =
        error.response?.data?.message || error.message || "An error occurred";
      setServerError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8 mx-10 my-10">
      <div className="bg-gray-800 text-white p-6 border border-gray-800 rounded-lg shadow-lg w-[500px] h-auto">
        <h1 className="text-xl font-semibold mb-4 text-start border-b-0 text-green-600">
          Add New Patient
        </h1>
        {serverError && (
          <div className="text-red-600 text-start mb-4">{serverError}</div>
        )}

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* First Name Field */}
          <div className="mb-2">
            <input
              type="text"
              id="customer_first_name"
              name="customer_first_name"
              placeholder="Enter patient name"
              value={formData.customer_first_name}
              required
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {firstNameRequired && (
              <div className="text-red-500 text-sm mt-1">
                {firstNameRequired}
              </div>
            )}
          </div>

          {/* Last Name Field */}
          <div className="mb-5">
            <input
              type="text"
              id="customer_last_name"
              name="customer_last_name"
              placeholder="Enter patient Last name"
              value={formData.customer_last_name}
              required
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email Field */}
          <div className="mb-5">
            <input
              type="email"
              id="customer_email"
              name="customer_email"
              placeholder="Enter patient email"
              value={formData.customer_email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {emailError && (
              <div className="text-red-500 text-sm mt-1">{emailError}</div>
            )}
          </div>

          {/* Phone Field */}
          <div className="mb-5">
            <input
              type="text"
              id="customer_phone_number"
              name="customer_phone_number"
              required
              placeholder="Enter phoneNumber"
              value={formData.customer_phone_number}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-10 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 transition duration-300 focus:ring focus:ring-green-300"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-10 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUsers;
