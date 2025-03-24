import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import employeeService from "../../Services/employee.service";
import { PulseLoader } from "react-spinners";

const EmployeeTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredemployees, setFilteredemployees] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  const fetchEmployesData = () => {
    setLoading(true);
    try {
      const data = employeeService.getAllemployess();

      data.then((data) => {
        setFilteredemployees(data.data);
        console.log(data.data);
        setApiError(false);
        setApiErrorMessage(null);
      });
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
      item.employee_first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.employee_last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.employee_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.employee_phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {Loading ? (
        <div className="center_loader">
          <PulseLoader size={10} color={"#123abc"} />
        </div>
      ) : (
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {Loading ? (
            <h1>Loading...</h1>
          ) : (
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
                          <img
                            src="data:image/jpeg;base64,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"
                            alt="employee img"
                            className="size-10 rounded-full"
                          />
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
                          <Link to="/edit_employee">
                            <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                              <Edit size={18} />
                            </button>
                          </Link>
                          <button className="text-red-400 hover:text-red-300">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </motion.div>
      )}
    </>
  );
};
export default EmployeeTable;
