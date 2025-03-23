import React, { useState } from "react";

function AddUsers() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
    <div className="  bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8 mx-10 my-10">
      <div className="bg-gray-800 text-white p-6 border border-gray-800 rounded-lg shadow-lg w-[500px] h-auto">
        <h1 className="text-xl font-semibold mb-4 text-start border-b-0 text-green-600">
          Add New Patient
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter patient name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter patient email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter phoneNumber"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className=" px-10 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 transition duration-300 focus:ring focus:ring-green-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUsers;
