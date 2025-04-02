import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import orders from "../../Services/orders.service";
import { useAuth } from "../../Context/AuthProvider";

function SendServices({
  customer_id,
  selectedServices,

}) {
  const [order_description, setOrderDescription] = useState("");
  const [order_total_price, setOrderTotalPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [active_order, setActive_order] = useState(1);
  const [order_status, setOrderStatus] = useState(0);
  const [serviceCompleted, setServiceCompleted] = useState(0);
  const { isAdmin } = useAuth(); 
  const navigate = useNavigate();

  const submitOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);

        if (!isAdmin) {
          toast.error("You must be an admin to access this page.");
          setIsLoading(false);
          return;
        }
    try {
      // Ensure that undefined values are replaced with null before sending to the backend
      const orderData = {
        customer_id: customer_id || null,
        order_description: order_description || null,
        order_total_price:
          order_total_price && !isNaN(order_total_price)
            ? parseFloat(order_total_price)
            : null,
        active_order: active_order || null,
        order_status: order_status || null,
        order_services: Array.isArray(selectedServices)
          ? selectedServices.map((serviceId) => ({
              service_id: serviceId || null,
              service_completed: serviceCompleted || null,
            }))
          : null,
        employee_id: null, // Ensure null if not needed
        vehicle_id: null,
        order_hash: null,
      };

      console.log("Sending Order Data:", orderData); // Debugging log

      const orderResponse = await orders.sendOrderInfo(orderData);

      if (orderResponse.error) {
        setServerError(orderResponse.error);
        toast.error(orderResponse.error);
      } else {
        toast.success(orderResponse.message);
        navigate("/orders");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || error.toString();
      setServerError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 w-full max-w-lg mx-auto">
      <h1 className="text-green-600 text-xl font-bold mb-4 text-center">
        Additional Order
      </h1>
      <form onSubmit={submitOrder} className="space-y-4">
        {/* Service Description */}
        <div>
          <label className="text-gray-300 block mb-1">
            Service Description
          </label>
          <textarea
            placeholder="Enter Service Description"
            rows={4}
            value={order_description}
            onChange={(e) => setOrderDescription(e.target.value)}
            className="w-full min-w-0 px-3 py-2 border border-gray-500 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Price Input */}
        <div>
          <label className="text-gray-300 block mb-1">Price</label>
          <input
            type="number"
            placeholder="Enter Price"
            value={order_total_price}
            onChange={(e) => setOrderTotalPrice(e.target.value)}
            className="w-full min-w-0 px-3 py-2 border border-gray-500 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full text-white px-4 py-2 rounded-md transition duration-200 ${
            isLoading ||
            selectedServices.length === 0 ||
            order_total_price === ""
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={
            isLoading ||
            selectedServices.length === 0 ||
            order_total_price === ""
          }
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <span>Processing...</span>
              <PulseLoader size={10} color={"#ffffff"} />
            </div>
          ) : (
            "Add Service"
          )}
        </button>
      </form>

      {/* Display server error if any */}
      {serverError && (
        <div className="text-red-600 mt-2 text-center">{serverError}</div>
      )}
    </div>
  );
}

export default SendServices;
