import React, { useState } from "react";
import { Edit, Search, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";


function Services() {
    const [searchCustomer, setSearchCustomer] = useState("");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-9 w-full p-4 px-3 mx-5">
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-3 md:p-6 border border-gray-700 md:m-8 w-[100%]">
        <h1 className="text-green-600 mb-4 font-bold">Servcies</h1>
        <div className="flex justify-between items-center mb-4 border-b border-gray-700 p-3">
          <h2>Tiles</h2>

          <div className="">
            <Link to="/edit_employee">
              <button className="text-indigo-400 hover:text-indigo-300 mr-5">
                <Edit size={18} />
              </button>
            </Link>
            <button className="text-red-400 hover:text-red-300 ">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-3  md:p-6 border border-gray-700 md:m-8 w-[100%] h-[40%]">
        <h1 className="text-green-600"> Add New Services</h1>
        <form>
          <div className="mb-4">
            <div className="mb-4 mt-4">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Services"
                value={searchCustomer}
                onChange={(e) => setSearchCustomer(e.target.value)}
                className="block w-[100%] px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
              />
            </div>
            <br />
            <button
              type="submit"
              className="px-10 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 transition duration-300 focus:ring focus:ring-green-300"
            >
              Add Services
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Services;
