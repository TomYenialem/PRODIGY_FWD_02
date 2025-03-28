import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import customers from "../../Services/AddPatient.service";
import { parseISO,formatDistanceToNow } from "date-fns";
import { Link as LucideLink,Edit } from "lucide-react";
const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const[loading,setLoading]=useState(false)
    const filtered = filteredUsers.filter(
      (user) =>
        user.customer_first_name.toLowerCase().includes(searchTerm) ||
        user.customer_email.toLowerCase().includes(searchTerm)||
        user.customer_last_name.toLowerCase().includes(searchTerm)||
        user.customer_phone_number.toLowerCase().includes(searchTerm)
    );

  const getAllPateints=async()=>{
    setLoading(true)
    try {
      const response=await customers.getCustomer()
 
        if(response.error){
      
          return
        }
        setFilteredUsers(response.data.slice(0,10))
   
      
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    getAllPateints()
  },[])

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
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold text-gray-100 pb-2">
                Users
              </h2>
              <Link to="/add_user">
                <button className="bg-green-400 px-4 py-2 rounded hover:bg-green-700 mb-2">
                  Add User
                </button>
              </Link>
            </div>
            <div className="flex justify-end mb-6 p-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(Event) => setSearchTerm(Event.target.value)}
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
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Father Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Added Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      E/D
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-700 ">
                  {filtered?.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                              {user.customer_first_name.charAt(0)}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-100">
                              {user.customer_first_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-100">
                          {user.customer_last_name}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {user.customer_email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {user.customer_added_date
                            ? formatDistanceToNow(
                                parseISO(user.customer_added_date),
                                { addSuffix: true }
                              )
                            : "N/A"}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.active_customer_status === 1 ? (
                          <>
                            <p className="bg-green-600 rounded-2xl px-3 py-1">
                              Active
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="bg-red-600 rounded-2xl px-3 py-1">
                              Inactive
                            </p>
                          </>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                          <Link to={`/edit_customer/${user.customer_id}`}>
                            <Edit size={18} />
                          </Link>
                        </button>
                        <button className="text-red-400 hover:text-red-300">
                          <Link to={`/add_order/${user.customer_id}`}>
                            <LucideLink size={18} />
                          </Link>
                        </button>
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
export default UsersTable;
