import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Overview from "./Pages/OverView";

import { Routes, Route } from "react-router-dom";

import SalesPage from "./Pages/SalesPage";
import OrdersPage from "./Pages/OrdersPage";
import AnalyticsPage from "./Pages/AnalyticsPage";
import AddPatients from "./Components/Patients/AddPatients";
import Employees from "./Components/Employees/Employees";
import EditEmployees from "./Components/Employees/EditEmployees";
import NewOrder from "./Components/NewOrder/NewOrder";
import Services from "./Components/Servcies/Services";
import EmployeePage from "./Pages/ProductPage";
import PatientsPage from "./Pages/PatientsPage";
import { Toaster } from "react-hot-toast";
import EditPatient from "./Components/Patients/EditPatient";
import PlaceOrder from "./Components/Orders/PlaceOrder";
import CustomerOrder from "./Components/Patients/CustomerOrder";
import EditOrders from "./Components/Orders/EditOrders";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
        {/* BG */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        <Sidebar />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/users" element={<PatientsPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/add_user" element={<AddPatients />} />
          <Route path="/add_employee" element={<Employees />} />
          <Route path="/new_order" element={<NewOrder />} />
          <Route path="/new_service" element={<Services />} />
          <Route path="/add_order/:customer_id" element={<PlaceOrder />} />
          <Route path="/customer_order/:order_id" element={<CustomerOrder />} />
          <Route path="/login" element={<Login/>} />
          <Route
            path="/edit_employee/:employee_id"
            element={<EditEmployees />}
          />
          <Route path="/edit_customer/:customer_id" element={<EditPatient />} />
          <Route path="/edit_orders/:order_id" element={<EditOrders />} />
        </Routes>
        <Toaster position="right-top" />
      </div>
    </>
  );
}

export default App;
