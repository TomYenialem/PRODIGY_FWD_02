import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Edit } from "lucide-react";
import orders from "../../Services/orders.service";
import { parseISO, formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const OrdersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [apiError, setApiError] = useState(false);
  const [ordersData, setOrdersData] = useState([]);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // const filtered=ordersData.filter((order)=>{
  //   return order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  // })

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await orders.getAllOrders();
        if (response.error) {
          setApiError(true);
          setApiErrorMessage(response.error);
        }
        setOrdersData(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin w-10 h-10 text-blue-500 border-4 border-t-blue-500 rounded-full"></div>
        </div>
      ) : (
        <>
          <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {apiError && (
              <p className="text-red-500 text-sm">{apiErrorMessage}</p>
            )}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-100">
                Order List
              </h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Patient Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide divide-gray-700">
                  {ordersData.map((order) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                        {order.order_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                        {order.customer_first_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                        ${order.customer_phone_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.order_status === 0
                              ? "bg-yellow-600 text-white-800"
                              : order.order_status === 1
                              ? "bg-red-600 text-white-800"
                              : order.order_status === 2
                              ? "bg-green-600 text-white-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.order_status === 0
                            ? "Received"
                            : order.order_status === 1
                            ? "Pending"
                            : order.order_status === 2
                            ? "Completed"
                            : ""}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {formatDistanceToNow(parseISO(order.order_date))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <Link to={`/customer_order/${order.order_id}`}>
                          <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                            <Eye size={18} />
                          </button>
                        </Link>
                        <Link to={`/edit_orders/${order.order_id}`}>
                          <button className="text-yellow-300 hover:text-indigo-300 mr-2">
                            <Edit size={18} />
                          </button>
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};
export default OrdersTable;
