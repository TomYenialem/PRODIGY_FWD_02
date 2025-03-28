import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import employeeService from "../../Services/employee.service";
import { PulseLoader } from "react-spinners";
import { toast } from "react-hot-toast";

const EmployeeTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredemployees, setFilteredemployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchEmployesData = async () => {
    setLoading(true);
    try {
      const data = await employeeService.getAllemployess();
      setFilteredemployees(data.data);
      console.log(data.data);
      setApiError(false);
    } catch (err) {
      setApiError(true);
      setApiErrorMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployesData();
  }, []);

  const searchItems = filteredemployees.filter(
    (item) =>
      item.employee_first_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.employee_last_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.employee_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.employee_phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (id) => {
    setEmployeeToDelete(id);
    setShowModal(true);
  };

  const deleteEmployee = () => {
    // if (!isAdmin) {
    //   toast.error("You are not authorized to perform this action.");
    //   return;
    // }
    if (employeeToDelete) {
      const employee = employeeService.deleteEmploye(employeeToDelete);
      employee.then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
          fetchEmployesData();
        }
      });
      setShowModal(false);
    }
  };
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin w-10 h-10 text-blue-500 border-4 border-t-blue-500 rounded-full"></div>
        </div>
      ) : (
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <>
            {apiError && (
              <div className="text-red-500 text-center mt-4">
                {apiErrorMessage}
              </div>
            )}
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold text-gray-100">
                employee List
              </h2>
              <Link to="/add_employee">
                <button className="bg-green-600 rounded px-4 py-2 hover:bg-green-800 mb-3">
                  Add Employee
                </button>
              </Link>
            </div>
            <div className="flex justify-end items-center mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
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
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Edit
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-700">
                  {searchItems.map((employee) => (
                    <motion.tr
                      key={employee.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                        <img src="" />
                        {employee.employee_first_name}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {employee.employee_last_name}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        ${employee.employee_email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {employee.employee_phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {employee.company_role_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {employee.active_employee === 1 ? (
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
                        <Link to={`/edit_employee/${employee.employee_id}`}>
                          <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                            <Edit size={18} />
                          </button>
                        </Link>
                        <button className="text-red-400 hover:text-red-300">
                          <Trash2
                            size={18}
                            onClick={() =>
                              handleDeleteClick(employee.employee_id)
                            }
                          />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>

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
                    onClick={deleteEmployee}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};
export default EmployeeTable;
