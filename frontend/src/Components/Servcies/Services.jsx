import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import services from "../../Services/Services.service";

import { motion } from "framer-motion";
import {useAuth} from '../../Context/AuthProvider'

function Services() {
  const { isAdmin } = useAuth();
  const [service_name, setService_name] = useState("");
  const [service_description, setService_description] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const { serviceDatas, setServiceDatas, fetchDatas } = useAuth();
  
  const [showModal, setShowModal] = useState(false);
 const [serviceToDelete, setServiceToDelete] = useState(null);
 const handleToDelete = (id) => {
   setServiceToDelete(id);
   setShowModal(true);
 };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

      if (!isAdmin) {
            toast.error("You must be an admin to access this page.");
            setLoading(false);
            return;
          }
    if (!service_name || !service_description) {
      toast.error("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const data = { service_name, service_description };
      if (editingId) {
        const response = await services.editService(editingId, data);
        const result = await response.json();
        if (result.error) {
          setServerError(result.error);
        } else {
          toast.success("Service updated successfully");
          setServiceDatas((prev) =>
            prev.map((service) =>
              service.service_id === editingId
                ? { ...service, ...data }
                : service
            )
          );
          resetForm();
        }
      } else {
        const response = await services.addNewServices(data);
        const result = await response.json();
        if (result.error) {
          setServerError(result.error);
        } else {
          toast.success("New service added successfully");
          setServiceDatas([...serviceDatas, result.data]);
          resetForm();
        }
      }
    } catch (error) {
      setServerError("Something went wrong. Please try again.");
    } finally {
      fetchDatas();
      setLoading(false);
    }
  };


  const conformToDetete = () => {
    if (serviceToDelete) {
      const response = services.deleteService(serviceToDelete);
      response.then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        toast.success(data.message);
        fetchDatas();
      });
      setShowModal(false);
    }
  };
  const checkToDelete = () => {
    // if (isAdmin) {
      conformToDetete();
    // } else {
    //   toast.error("You are not authorized to delete this service.");
    //   setShowModal(false);
    // }
  };

  // Prepare form for editing
  const editInputValues = (service) => {
    setService_name(service.service_name);
    setService_description(service.service_description);
    setEditingId(service.service_id); // Set editing ID
  };

  // Reset form after submit or cancel
  const resetForm = () => {
    setService_name("");
    setService_description("");
    setEditingId(null);
    setServerError("");
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-9 w-full p-4 px-3 mx-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Service List Section */}
      <div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 w-full overflow-y-auto scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-500
"
      >
        <h1 className="text-green-600 mb-4 font-bold text-xl">Services</h1>
        {loading ? (
          <p className="flex justify-center"> Loading...</p>
        ) : (
          <div className="space-y-4">
            {serviceDatas.map((service) => (
              <div
                key={service.service_id}
                className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="text-white text-lg font-semibold">
                    {service.service_name}
                  </p>
                  <p className="text-sm text-gray-300">
                    {service.service_description}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    className="text-indigo-400 hover:text-indigo-300"
                    onClick={() => editInputValues(service)}
                  >
                    <Edit size={20} />
                  </button>

                  <button className="text-red-400 hover:text-red-300">
                    <Trash2
                      size={20}
                      onClick={() => handleToDelete(service.service_id)}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Service Section */}
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 w-full">
        <h1 className="text-green-600 text-xl font-bold mb-4">
          Add New Service
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-300 block mb-1">Service Name</label>
            <input
              type="text"
              id="service"
              name="service_name"
              placeholder="Enter Service Name"
              value={service_name}
              onChange={(e) => setService_name(e.target.value)}
              className="w-full px-3 py-2 border border-gray-500 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-300 block mb-1">
              Service Description
            </label>
            <textarea
              id="description"
              name="service_description"
              placeholder="Enter Service Description"
              rows={4}
              value={service_description}
              onChange={(e) => setService_description(e.target.value)}
              className="w-full px-3 py-2 border border-gray-500 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-800 text-white rounded-md hover:bg-green-900 transition duration-300 focus:ring focus:ring-green-300"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Service"}
          </button>
        </form>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold text-gray-900">
                Confirm Deletion
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowModal(false)}
              >
                ✖
              </button>
            </div>
            <div className="py-4">
              <p className="text-gray-800">
                Are you sure you want to delete this employee?
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-700"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={checkToDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Services;
