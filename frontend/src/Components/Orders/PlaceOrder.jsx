import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import customers from "../../Services/AddPatient.service";
import { useAuth } from "../../Context/AuthProvider";
import{Edit} from 'lucide-react'

import { Link } from "react-router-dom";
import SendServices from "./SendServcies";

function PlaceOrder() {
  const { customer_id } = useParams();
  const [singleCustomer, setSingleCustomer] = useState({});
    const [selectedServices, setSelectedServices] = useState([]);

  const checkedService = (service_id, ischecked) => {
    if (ischecked) {
      setSelectedServices([...selectedServices, service_id]);
    } else {
      setSelectedServices(selectedServices.filter((id) => id !== service_id));
    }
  };
  const { serviceDatas } = useAuth();

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
    <div className="h-auto min-h-screen bg-green-900 p-4 pb-32">
      {/* Customer Details */}
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg w-full max-w-md text-white rounded-xl border border-gray-700 p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className=" font-semibold text-green-500 mb-2">Customer Details</h1>
        <div className="">
          <p className="">
            <span className=" text-green-400">Name:</span>{" "}
            {singleCustomer.customer_first_name}{" "}
            {singleCustomer.customer_last_name}
          </p>
          <p className="">
            <span className=" text-green-400">Email:</span>{" "}
            {singleCustomer.customer_email}
          </p>
          <p className="">
            <span className=" text-green-400">Phone:</span>{" "}
            {singleCustomer.customer_phone_number}
          </p>
          <div className="flex items-center space-x-2">
            <span className=" text-green-400">Status:</span>
            {singleCustomer.active_customer_status === 1 ? (
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                Active
              </span>
            ) : (
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                Inactive
              </span>
            )}
            <Link
              to={`/edit_customer/${singleCustomer.customer_id}`}
            >
              <span>
                <Edit />
              </span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Order Selection & Add New Order Form */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-3">
        {/* Select Orders */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 w-full ">
          <h1 className="text-green-600 mb-4 text-xl font-semibold">
            Select Orders
          </h1>
          <div className="space-y-4 overflow-x-auto pb-80 h-[100px]">
            {serviceDatas.map((service) => (
              <div
                key={service.service_id}
                className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
              >
                <div className="text-white">
                  <h2 className="font-semibold text-lg text-green-600">
                    {service.service_name}
                  </h2>
                  <p className="text-sm text-gray-300">
                    {service.service_description}
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-green-600"
                  checked={selectedServices.includes(service.service_id)}
                  onChange={(e) =>
                    checkedService(service.service_id, e.target.checked)
                  }
                />
              </div>
            ))}
          </div>
        </div>

       
       <SendServices
         customerId={singleCustomer.customer_id}

         selectedServices={selectedServices}

       />
      </div>
    </div>
  );
}

export default PlaceOrder;
