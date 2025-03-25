const express = require('express');
const route=express.Router();
const login =require('./login.routes')
const employee=require('./employee.routes')

route.use(login)
route.use( employee)

module.exports = route;