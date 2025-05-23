import {
  BarChart2,
  DollarSign,
  Menu,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import loginService from "../../Services/login.Service";
import { useAuth } from "../../Context/AuthProvider";
import toast from "react-hot-toast";

const SIDEBAR_ITEMS = [
  { name: "Dashboard", icon: BarChart2, color: "#6366f1", href: "/" },
  { name: "Employees", icon: ShoppingBag, color: "#8B5CF6", href: "/employee" },
  { name: "Patient", icon: Users, color: "#EC4899", href: "/users" },
  { name: "Incomes", icon: DollarSign, color: "#10B981", href: "/sales" },
  { name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },
  {
    name: "Services",
    icon: TrendingUp,
    color: "#3B82F6",
    href: "/new_service",
  },
  { name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
];

const Sidebar = () => {
  const { isLogged, setIsLogged } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleNavigation = (href) => {
    if (!isLogged && href !== "/" && href !== "/analytics") {
      toast.error("Please log in first to access this page.");
      return;
    }
    navigate(href);
  };

  const logout = () => {
    loginService.logout();
    setIsLogged(false);
    navigate("/"); 
  };

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <div key={item.href}>
              <button
                onClick={() => handleNavigation(item.href)}
                className="w-full text-left"
              >
                <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                  <item.icon
                    size={20}
                    style={{ color: item.color, minWidth: "20px" }}
                  />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        className="ml-4 whitespace-nowrap"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.3 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </button>
            </div>
          ))}
        </nav>

        {isLogged ? (
          <button
            onClick={logout}
            className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-red-700 transition-colors mb-2 text-white"
          >
            <LogOut size={20} style={{ minWidth: "20px", color: "red" }} />
            {isSidebarOpen && (
              <span className="ml-4 whitespace-nowrap">Logout</span>
            )}
          </button>
        ) : (
          <p className="text-center text-gray-400 "></p>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;
