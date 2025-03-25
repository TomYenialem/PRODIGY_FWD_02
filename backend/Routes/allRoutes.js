const express = require('express');
const route=express.Router();
const login =require('./login.routes')
const employee=require('./employee.routes')
const patinets=require('./patient.routes')

route.use(login)
route.use( employee)
route.use(patinets)

module.exports = route;