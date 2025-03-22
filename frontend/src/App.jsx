import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Overview from "./Pages/OverView";

import {Routes,Route} from 'react-router-dom'
import ProductPage from "./Pages/ProductPage";

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
          <Route path="/products" element={<ProductPage/>} />
          {/* // <Route path="/users" element={<UsersPage />} />
          // <Route path="/sales" element={<SalesPage />} />
          // <Route path="/orders" element={<OrdersPage />} />
          // <Route path="/analytics" element={<AnalyticsPage />} />
          // <Route path="/settings" element={<SettingsPage />} />  */}
        </Routes>
      </div>
    </>
  );
}

export default App;
