import React, { useState, useEffect } from "react";
import employeeService from "../../Services/employee.service";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Context/AuthProvider";

function Employees() {
  const {isAdmin}=useAuth()
  const [formData, setFormData] = useState({
    employee_first_name: "",
    employee_last_name: "",
    employee_phone: "",
    active_employee:1,
    company_role_id: 2,
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const { employee_id } = useParams();
  const navigate = useNavigate();


  // Fetch employee data on component mount
  useEffect(() => {
    if (employee_id) {
      employeeService
        .getSingleEmployee(employee_id)
        .then((data) => {
       
          if (data) {
            setFormData({
              employee_first_name: data.data[0].employee_first_name || "",
              employee_last_name: data.data[0].employee_last_name || "",
              employee_phone: data.data[0].employee_phone || "",
              active_employee: data.data[0].active_employee,
              company_role_id: data.data[0].company_role_id || "",
            });
          }
         
        })
        .catch((error) => {
          setServerError("Failed to fetch employee data.");
          console.error(error);
        });
    }
  }, [employee_id]);

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
      if (!isAdmin) {
            toast.error("You must be an admin to access this page.");
            setLoading(false);
            return;
          }

    try {
      const response = await employeeService.editEmployee(
        employee_id,
        formData
      );
      if (response.error) {
        setServerError(response.error);
        toast.error(response.error);
      } else {
        setServerError("");
        toast.success("Employee updated successfully");
        navigate(-1);
      }
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          error.message ||
          "Error updating employee"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 bg-opacity-50 backdrop-blur-md md:p-6">
      <div className="w-[300px] sm:w-[500px] bg-gray-800 text-white border border-gray-700 rounded-lg p-6">
        <h1 className="text-xl font-semibold mb-6 text-start text-green-600">
          <span className="text-gray-50">Employee Name:</span>{" "}
          {formData.employee_first_name + " " + formData.employee_last_name}
        </h1>

        {serverError && <p className="text-red-500">{serverError}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="employee_first_name"
              placeholder="Enter First Name"
              value={formData.employee_first_name}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="employee_last_name"
              placeholder="Enter Last Name"
              value={formData.employee_last_name}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <select
              name="company_role_id"
              value={formData.company_role_name}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-400 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1">Nurse</option>
              <option value="2">Doctor</option>
              <option value="3">Admin</option>
            </select>
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="employee_phone"
              placeholder="Enter Phone Number"
              value={formData.employee_phone}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              name="active_employee"
              checked={formData.active_employee}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="active_employee">
              {formData.active_employee ? (
                <p className="text-green-600">Active Employee</p>
              ) : (
                <p className="text-red-600">Inactive Employee</p>
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

export default Employees;
