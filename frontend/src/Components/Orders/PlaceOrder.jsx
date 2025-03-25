import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import customers from "../../Services/AddPatient.service";

function PlaceOrder() {
  const { customer_id } = useParams();
  const [singleCustomer, setSingleCustomer] = useState({});

  const fetchCustomer = async () => {
    try {
      const res = await customers.singleCustomer(customer_id);
      if (res.error) {
        console.error(res.error);
        return;
      }
      setSingleCustomer(res.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <div className=" bg-gray-900 p-6">
      <motion.div
        className="bg-opacity-50 backdrop-blur-md shadow-lg  w-full max-w-md bg-gray-800 text-whiterounded-xl border border-gray-700 p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-semibold text-green-500 mb-4">
          Customer Details
        </h1>
        <div className="space-y-3">
          <p className="text-lg">
            <span className="font-semibold text-green-400">Name:</span>{" "}
            {singleCustomer.customer_first_name}{" "}
            {singleCustomer.customer_last_name}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-green-400">Email:</span>{" "}
            {singleCustomer.customer_email}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-green-400">Phone:</span>{" "}
            {singleCustomer.customer_phone_number}
          </p>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-green-400">Status:</span>
            {singleCustomer.active_customer_status === 1 ? (
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                Active
              </span>
            ) : (
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                Inactive
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default PlaceOrder;
