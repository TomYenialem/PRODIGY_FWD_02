import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import orders from "../../Services/orders.service";
import { motion } from "framer-motion";

function CustomerOrder() {
  const [singleOrderData, setSingleOrderData] = useState(null);
  const { order_id } = useParams();

  const fetchSingleOrderList = async () => {
    try {
      const singleOrder = await orders.singleOrder(order_id);

      if (singleOrder.error) {
        console.log(singleOrder.error);
        return;
      }

      // Set the order data (which is an object, not an array)
      setSingleOrderData(singleOrder?.data[0]);
      console.log(singleOrder.data[0]); // Check the data structure in console
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleOrderList();
  }, [order_id]);

  return (
    <>
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {!singleOrderData?.order_id ? (
          <div className="container text-center mt-20">
            <h1 className="mb-2 text-white text-xl font-bold">
              Order Not Found
            </h1>
            <Link to="/customer_info">
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                Check It Again
              </button>
            </Link>
          </div>
        ) : (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-5xl space-y-6 p-4">
              {/* Customer Info & Status */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-b-4 border-red-500">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">
                      {singleOrderData?.customer_first_name}{" "}
                      {singleOrderData?.customer_last_name}
                    </h2>
                    <p className="text-gray-400">
                      We will keep you updated on the progress of your service
                      request...
                    </p>
                  </div>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      singleOrderData?.order_status === 0
                        ? "bg-yellow-500"
                        : singleOrderData?.order_status === 1
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                  >
                    {singleOrderData?.order_status === 0
                      ? "Received"
                      : singleOrderData?.order_status === 1
                      ? "In Progress"
                      : "Completed"}
                  </span>
                </div>
              </div>

              {/* Customer Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-b-4 border-red-500">
                  <p className="text-sm text-gray-400">CUSTOMER</p>
                  <h2 className="text-xl font-bold">
                    {singleOrderData?.customer_first_name}{" "}
                    {singleOrderData?.customer_last_name}
                  </h2>
                  <p>
                    <strong>Email:</strong> {singleOrderData?.customer_email}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {singleOrderData?.customer_phone_number}
                  </p>
                  <p>
                    <strong>Active Customer:</strong>
                    {singleOrderData?.active_customer_status === 1
                      ? "Yes"
                      : "No"}
                  </p>
                </div>
              </div>

              {/* Request Service Box */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-b-4 border-red-500">
                <p className="uppercase text-gray-400">
                  {singleOrderData?.vehicle_type}
                </p>
                <h3 className="text-xl font-bold mt-2">Request Service</h3>
                <div className="border-t border-gray-700 pt-3">
                  {singleOrderData?.order_services?.length > 0 ? (
                    <div className="space-y-4">
                      {singleOrderData?.order_services.map((service, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-gray-700 rounded-lg shadow"
                        >
                          <div>
                            <h4 className="text-lg font-semibold">
                              {service?.service_name}
                            </h4>
                            <p className="text-gray-400">
                              {service?.service_description}
                            </p>
                          </div>
                          <span
                            className={`px-4 py-1 rounded-full text-sm font-semibold ${
                              service?.order_status === 0
                                ? "bg-yellow-500"
                                : service?.order_status === 1
                                ? "bg-blue-500"
                                : "bg-green-500"
                            }`}
                          >
                            {service?.order_status === 0
                              ? "Received"
                              : service?.order_status === 1
                              ? "In Progress"
                              : "Completed"}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">No services found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}

export default CustomerOrder;
