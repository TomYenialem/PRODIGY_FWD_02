import React, { useState } from "react";

function Employees() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    role: "User",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // Add API call or backend integration here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 bg-opacity-50 backdrop-blur-md md:p-6">
      <div className="w-[300px] sm:w-[500px]  bg-gray-800 text-white border border-gray-700 rounded-lg p-6">
        <h1 className="text-xl font-semibold mb-6 text-start text-green-600">
          Edit Employee
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>


          <div className="mb-4">
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-400 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Doctor</option>
              <option>Patient</option>
              <option>Admin</option>
            </select>
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <input
              type="text"
              id="number"
              name="number"
              placeholder="Enter Phone Number"
              value={formData.number}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2 mt-2"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-10 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 transition duration-300 focus:ring focus:ring-green-300"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Employees;
