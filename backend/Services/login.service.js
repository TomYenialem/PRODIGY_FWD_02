// Import the query function from the db.config.js file
const conn = require("../Db/dbConfig");
// Import the bcrypt module to do the password comparison
const bcrypt = require("bcryptjs");
// Import the employee service to get employee by email

// Handle employee login
async function getEmployeeByEmail(employee_email) {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";
  const rows = await conn.query(query, [employee_email]);
  return rows;
}

async function logIn(employeeData) {
  try {
    let returnData = {}; // Object to be returned
    const employee = await getEmployeeByEmail(
      employeeData.employee_email
    );
    if (employee.length === 0) {
      returnData = {
        status: "fail",
        message: "Employee does not exist",
      };
      return returnData;
    }
    const passwordMatch = await bcrypt.compare(
      employeeData.employee_password,
      employee[0].employee_password_hashed
    );
    if (!passwordMatch) {
      returnData = {
        status: "fail",
        message: "Incorrect password",
      };
      return returnData;
    }
    returnData = {
      status: "success",
      data: employee[0],
    };
    return returnData;
  } catch (error) {
    console.log(error);
  }
}

// Export the function
module.exports = {
  logIn,
};
