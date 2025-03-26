const express = require('express');
const route=express.Router();
const login =require('./login.routes')
const employee=require('./employee.routes')
const patinets=require('./patient.routes')
const services=require('./Services.routes')
const orders=require('./orders.routes')

route.use(login)
route.use( employee)
route.use(patinets)
route.use(services)
route.use(orders)

module.exports = route;