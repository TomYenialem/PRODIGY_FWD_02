import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../Components/Header/Header";
import StatCard from "../Components/StatCard/StatCard";
import UserGrowth from "../Components/Patients/UserGrowth";
import UserActivity from "../Components/Patients/UserActivity";
import Patients  from '../Components/Patients/PatientTable'

const userStats = {
  totalPatients: 1845,
  newPatientToday: 43,
  churnRate: "2.4%",
};

const UsersPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Users" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Patients"
            icon={UsersIcon}
            value={userStats.totalPatients.toLocaleString()}
            color="#6366F1"
          />
          <StatCard
            name="New Patients Today"
            icon={UserPlus}
            value={userStats.newPatientToday}
            color="#10B981"
          />
        
          <StatCard
            name="Churn Rate"
            icon={UserX}
            value={userStats.churnRate}
            color="#EF4444"
          />
        </motion.div>

        <Patients />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
         <UserGrowth/>
          <UserActivity/> 
         
        </div>
      </main>
    </div>
  );
};
export default UsersPage;
