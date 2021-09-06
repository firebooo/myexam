const express = require('express');
const app = express();
const routes = require('./routes');
const cookie = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cookie());

app.use(session({
    secret:'hello',
    resave:false,
    saveUninitialized:false,
    cookie:('name','value',{
        maxAge:60,
        secure:false,
        resave:false,
        httpOnly:false
    })
}))

app.use('/public/',express.static('./public/'))

app.use(routes);

app.listen(3001,()=>{
    console.log("Server at http://localhost:3001");
});