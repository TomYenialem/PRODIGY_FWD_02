import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import orders from "../../Services/orders.service";
import { useAuth } from "../../Context/AuthProvider";

function EditOrders() {
  const [loading, setLoading] = useState(false);
  const [order_status, setOrderStatus] = useState(0);
  const [serverError, setServerError] = useState("");
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { order_id } = useParams();

  const editOrdersInfo = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      toast.error("You must be an admin to access this page");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const update = { order_status };
      const response = await orders.editOrders(order_id, update);

      if (response.error) {
        setServerError(response.error);
      } else {
        toast.success("Order updated successfully");
        navigate(-1);
        setServerError("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (



 <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 w-full max-w-lg mx-auto h-[250px] mt-16 ">
      <h1 className="text-green-600 text-xl font-bold mb-4 text-center">
    Edit  Order
      </h1>
     <form onSubmit={editOrdersInfo} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Order Status</label>
            <select
              value={order_status}
              onChange={(e) => setOrderStatus(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>Received</option>
              <option value={1}>In Progress</option>
              <option value={2}>Completed</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition disabled:bg-gray-600"
          >
            {loading ? (
              <span className="flex justify-center items-center space-x-2">
                <span>Please wait</span>
                <PulseLoader size={8} color={"#ffffff"} />
              </span>
            ) : (
              "Update"
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

export default EditOrders;
