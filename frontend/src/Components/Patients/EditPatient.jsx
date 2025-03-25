import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import customers from "../../Services/AddPatient.service";

function EditPatient() {
  const [formData, setFormData] = useState({
    customer_first_name: "",
    customer_last_name: "",
    customer_phone_number: "",
    active_customer_status: 1,
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const { customer_id } = useParams();
  const navigate = useNavigate();

  // Fetch customer data on component mount
  useEffect(() => {
    if (customer_id) {
       customers.singleCustomer(customer_id)
        .then((data) => {
          if (data) {
          
            setFormData({
              customer_first_name: data.data[0].customer_first_name || "",
              customer_last_name: data.data[0].customer_last_name || "",

              customer_phone_number: data.data[0].customer_phone_number || "",
        
                active_customer_status: data.data[0].active_customer_status || 1,
            });
          }
        })
        .catch((error) => {
          setServerError("Failed to fetch customer data.");
          
        });
    }
  }, [customer_id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await customers.editCustomerInfo(
        customer_id,
        formData
      );
      if (response.error) {
        setServerError(response.error);
        toast.error(response.error);
      } else {
        setServerError("");
        toast.success("customer updated successfully");
        navigate(-1);
      }
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          error.message ||
          "Error updating customer"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 bg-opacity-50 backdrop-blur-md md:p-6">
      <div className="w-[300px] sm:w-[500px] bg-gray-800 text-white border border-gray-700 rounded-lg p-6">
        <h1 className="text-xl font-semibold mb-6 text-start text-green-600">
          <span className="text-gray-50">Edit:</span> {formData.customer_email}
        </h1>

        {serverError && <p className="text-red-500">{serverError}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="customer_first_name"
              placeholder="Enter First Name"
              value={formData.customer_first_name}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="customer_last_name"
              placeholder="Enter Last Name"
              value={formData.customer_last_name}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="customer_phone_number"
              placeholder="Enter Phone Number"
              value={formData.customer_phone_number}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              name="active_customer_status"
              checked={formData.active_customer_status}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="active_customer">
              {formData.active_customer_status ? (
                <p className="text-green-600">Active customer</p>
              ) : (
                <p className="text-red-600">Inactive customer</p>
              )}
            </label>
          </div>

          <button
            type="submit"
            className="px-10 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 transition duration-300 focus:ring focus:ring-green-300"
            disabled={loading}
          >
            {loading ? "Editing..." : "Edit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPatient;
