import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const patientAdmissionsData = [
  { name: "Jul", patients: 120 },
  { name: "Aug", patients: 200 },
  { name: "Sep", patients: 320 },
  { name: "Oct", patients: 280 },
  { name: "Nov", patients: 350 },
  { name: "Dec", patients: 450 },
  { name: "Jan", patients: 390 },
  { name: "Feb", patients: 370 },
  { name: "Mar", patients: 420 },
  { name: "Apr", patients: 400 },
  { name: "May", patients: 460 },
  { name: "Jun", patients: 500 },
];

const PatientAdmissionsChart = () => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Monthly Patient Admissions
      </h2>

      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={patientAdmissionsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey={"name"} stroke="#9ca3af" />
            <YAxis
              stroke="#9ca3af"
              domain={[
                0,
                Math.max(...patientAdmissionsData.map((d) => d.patients)) + 50,
              ]}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Line
              type="monotone"
              dataKey="patients"
              stroke="#6366F1"
              strokeWidth={4}
              dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
export default PatientAdmissionsChart;
