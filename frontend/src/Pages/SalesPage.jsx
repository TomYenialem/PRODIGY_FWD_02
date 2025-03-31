import { motion } from "framer-motion";

import Header from "../Components/Header/Header";
import StatCard from "../Components/StatCard/StatCard";
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

import SalesCatagory from "../Components/Sales/SalesCatagory";
import SalesOverView from "../Components/Sales/SalesOverView";

const salesStats = {
  totalRevenue: "$234,567",
  averageOrderValue: "$78.90",
  conversionRate: "3.45%",
  IncomeGrowth: "12.3%",
};

const SalesPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Incomes Dashboard" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* SALES STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Revenue"
            icon={DollarSign}
            value={salesStats.totalRevenue}
            color="#6366F1"
          />
          <StatCard
            name="Avg. Income Value"
            icon={ShoppingCart}
            value={salesStats.averageOrderValue}
            color="#10B981"
          />
          <StatCard
            name="Conversion Rate"
            icon={TrendingUp}
            value={salesStats.conversionRate}
            color="#F59E0B"
          />
          <StatCard
            name="Income Growth"
            icon={CreditCard}
            value={salesStats.IncomeGrowth}
            color="#EF4444"
          />
        </motion.div>

        <SalesOverView/>

        <div className="grid grid-cols-1gap-8 mb-8">
          <SalesCatagory/>
        </div>
      </main>
    </div>
  );
};
export default SalesPage;
