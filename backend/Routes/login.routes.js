const express=require('express')
const routes=express.Router();
const loginFunction=require('../Controllers/login.controller')

routes.post('/login',loginFunction.logIn)

module.exports=routes;