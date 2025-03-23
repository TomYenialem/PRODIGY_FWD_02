import React, { useState } from 'react'
import { motion } from 'framer-motion';

function NewOrder() {
    const [searchCustomer, setSearchCustomer] = useState('');
  return (
    <motion.div
      className="md:p-6 bg-gray-800  backdrop-blur-md w-full flex items-center  b "
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 p-6 w-[50%]">
        <h1 className='font-bold size-9/12 text-green-600'>New Order</h1>
        <p>Create a new order for a customer.</p>
        <form>
          <div className="mb-4">
            <div className="mb-4 mt-4">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={searchCustomer}
                onChange={(e)=>setSearchCustomer(e.target.value)}
                className="block w-[100%] px-3 py-2 border border-gray-400 rounded-md bg-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
              />
            </div>
            <br />
            <button
              type="submit"
              className="px-10 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 transition duration-300 focus:ring focus:ring-green-300"
            >
              Add Customers
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default NewOrder