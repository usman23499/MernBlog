const express=require('express');
const bodyParser = require('body-parser') // for make middle ware
const connect=require("./config/db");

const routers = require('./routes/userRoutes');
const postRouters = require("./routes/postRoutes");
require('dotenv').config();
const app=express();

// connect mongodb 
connect();

// app.get('/',(req,res)=>{ // define path

//     res.send("Hello EXPRESS");
// });

app.use(bodyParser.json()); // is se hum object send and recive data
app.use('/',routers);
app.use('/',postRouters);
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Listen karlea");

});
