const express = require('express');

const options = require('./options')

const routes = express.Router();

routes.all('*',(req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
})


routes.post('/login',options.login);

routes.post('/taddclass',options.taddclass);

routes.get('/getmyclass',options.getmyclass);

routes.post('/delmyclass',options.delmyclass);

routes.post('/getTerm',options.getTerm);

routes.post('/saddclass',options.saddclass)

module.exports = routes;