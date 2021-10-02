const express=require('express');
const bodyParser = require('body-parser') // for make middle ware
const connect=require("./config/db");
const path = require('path');
const routers = require('./routes/userRoutes');
const postRouters = require("./routes/postRoutes");
const profileRouters = require("./routes/profileRoutes");

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
app.use('/',profileRouters);

const PORT=process.env.PORT || 5000;

if ('production' === 'production') {
	app.use(express.static(path.join(__dirname, '/client/build/')));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        // is se we can access recat routes
	});
}
app.listen(PORT,()=>{
    console.log("Listen karlea");

});
