import { motion } from "framer-motion";

import StatCard from "../Components/StatCard/StatCard";
import Header from "../Components/Header/Header";

import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import {
  Stethoscope,
  BriefcaseMedical,
} from "lucide-react";


import ProductChart from "../Components/Employees/EmployeeChart";
import ProductTable from "../Components/Employees/EmployeeTable";
import CategoryChart from "../Components/Employees/CatagoryChart";

const EmployeePage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Employees" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Employees"
            icon={Package}
            value={624}
            color="#6366F1"
          />
          <StatCard
            name="Top Employees"
            icon={TrendingUp}
            value={89}
            color="#10B981"
          />
          <StatCard
            name="Specialist Doctors"
            icon={BriefcaseMedical}
            value={23}
            color="#F59E0B"
          />
          <StatCard
            name="Staff"
            icon={Stethoscope}
            value={500}
            color="#EF4444"
          />
        </motion.div>

        <ProductTable />

        {/* CHARTS */}
        <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
          <ProductChart />
          <CategoryChart />
        </div>
      </main>
    </div>
  );
};
export default EmployeePage;
