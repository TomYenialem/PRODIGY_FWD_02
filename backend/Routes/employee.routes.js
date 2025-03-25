const express=require('express')
const routes=express.Router();
const employeeFunction=require('../Controllers/employee.controller')

routes.post("/add_employee", employeeFunction.createEmployee)
routes.get('/get_employees',employeeFunction.getAllEmployees)
routes.delete("/delete_emloyee/:id", employeeFunction.deleteEmployees);
routes.put("/edit_employee/:id", employeeFunction.editEmployesInfo);
routes.get("/single_employee/:id", employeeFunction.getSingleEmployeeInfo);


module.exports=routes;