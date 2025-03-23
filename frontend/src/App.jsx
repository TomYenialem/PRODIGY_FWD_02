import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Overview from "./Pages/OverView";

import {Routes,Route} from 'react-router-dom'
import ProductPage from "./Pages/ProductPage";
import UsersPage from "./Pages/UsersPage";
import SalesPage from "./Pages/SalesPage";
import OrdersPage from "./Pages/OrdersPage";
import AnalyticsPage from "./Pages/AnalyticsPage";
import AddUsers from "./Components/Users/AddUsers";
import Employees from "./Components/Products/Employees";
import EditEmployees from "./Components/Products/EditEmployees";
import NewOrder from "./Components/NewOrder/NewOrder";
import Services from "./Components/Servcies/Services";

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
          <Route path="/products" element={<ProductPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/add_user" element={<AddUsers />} />
          <Route path="/add_employee" element={<Employees />} />
          <Route path="/new_order" element={<NewOrder />} />
          <Route path="/new_service" element={<Services/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
